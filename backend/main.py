"""
AI Image Studio - Backend API
Main application entry point with FastAPI configuration
"""

import time
from contextlib import asynccontextmanager
from typing import AsyncGenerator

import structlog
import uvicorn
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from prometheus_client import Counter, Histogram, generate_latest
from starlette.middleware.base import BaseHTTPMiddleware

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.database import create_db_and_tables, engine
from app.core.exceptions import (
    AIServiceException,
    RateLimitException,
    ValidationException,
)
from app.core.rate_limiter import RateLimiter
from app.core.security import verify_api_key
from app.infrastructure.cache import get_redis_client
from app.infrastructure.monitoring import setup_monitoring

# Logging setup
logger = structlog.get_logger()

# Metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

settings = get_settings()


class MetricsMiddleware(BaseHTTPMiddleware):
    """Custom middleware for Prometheus metrics collection"""
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Process the request
        response = await call_next(request)
        
        # Record metrics
        duration = time.time() - start_time
        REQUEST_DURATION.observe(duration)
        REQUEST_COUNT.labels(
            method=request.method,
            endpoint=request.url.path,
            status=response.status_code
        ).inc()
        
        # Add performance headers
        response.headers["X-Response-Time"] = str(duration)
        
        return response


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Rate limiting middleware"""
    
    def __init__(self, app, rate_limiter: RateLimiter):
        super().__init__(app)
        self.rate_limiter = rate_limiter
    
    async def dispatch(self, request: Request, call_next):
        # Skip rate limiting for health checks and metrics
        if request.url.path in ["/health", "/metrics", "/docs", "/openapi.json"]:
            return await call_next(request)
        
        # Get client identifier
        client_ip = request.client.host
        api_key = request.headers.get("X-API-Key")
        client_id = api_key or client_ip
        
        # Check rate limit
        if not await self.rate_limiter.is_allowed(client_id, request.url.path):
            raise RateLimitException("Rate limit exceeded")
        
        return await call_next(request)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan management"""
    logger.info("🚀 Starting AI Image Studio API")
    
    # Startup
    await create_db_and_tables()
    await setup_monitoring()
    
    # Verify Redis connection
    redis_client = await get_redis_client()
    await redis_client.ping()
    logger.info("✅ Redis connection established")
    
    logger.info("🎨 AI Image Studio API ready!")
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down AI Image Studio API")
    await redis_client.close()
    await engine.dispose()


# FastAPI application instance
app = FastAPI(
    title="AI Image Studio API",
    description="""
    🎨 **AI Image Studio** - Professional AI Image Generation Platform
    
    ## Features
    
    * **🧠 Intelligent Prompt Generation** - AI-powered prompt suggestions and optimization
    * **🖼️ Multi-Model Support** - DALL-E, Stable Diffusion, Midjourney integration
    * **⚡ Real-time Processing** - Async image generation with WebSocket updates
    * **🔧 Advanced Post-Processing** - Upscaling, filtering, and enhancement tools
    * **📊 Analytics & Monitoring** - Comprehensive usage metrics and performance tracking
    * **🔒 Enterprise Security** - Rate limiting, authentication, and data protection
    
    ## Architecture
    
    Built with **Clean Architecture** principles:
    - **Domain Layer**: Business logic and entities
    - **Application Layer**: Use cases and orchestration
    - **Infrastructure Layer**: External services and adapters
    - **Presentation Layer**: API endpoints and serialization
    
    ## Performance
    
    - ⚡ **<300ms** average response time
    - 🏗️ **Horizontal scaling** with Redis clustering
    - 📈 **Auto-scaling** based on queue depth
    - 🔄 **Circuit breakers** for external API resilience
    """,
    version="1.0.0",
    terms_of_service="https://ai-studio.tudominio.com/terms",
    contact={
        "name": "AI Image Studio Support",
        "url": "https://ai-studio.tudominio.com/contact",
        "email": "support@ai-studio.tudominio.com",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
    openapi_tags=[
        {
            "name": "images",
            "description": "Image generation and management operations",
        },
        {
            "name": "prompts",
            "description": "AI prompt generation and optimization",
        },
        {
            "name": "gallery",
            "description": "Community gallery and sharing features",
        },
        {
            "name": "processing",
            "description": "Post-processing and enhancement tools",
        },
        {
            "name": "analytics",
            "description": "Usage analytics and metrics",
        },
        {
            "name": "admin",
            "description": "Administrative operations (authenticated)",
        },
    ],
    lifespan=lifespan,
    docs_url="/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT == "development" else None,
)

# Security middleware
if settings.ENVIRONMENT == "production":
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.ALLOWED_HOSTS
    )

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Response-Time", "X-Rate-Limit-Remaining"],
)

# Compression middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Custom middleware
app.add_middleware(MetricsMiddleware)

# Rate limiting (initialize with Redis client)
rate_limiter = RateLimiter()
app.add_middleware(RateLimitMiddleware, rate_limiter=rate_limiter)

# Include API routes
app.include_router(api_router, prefix="/api/v1")


# Global exception handlers
@app.exception_handler(ValidationException)
async def validation_exception_handler(request: Request, exc: ValidationException):
    logger.warning("Validation error", error=str(exc), path=request.url.path)
    return JSONResponse(
        status_code=422,
        content={
            "error": "Validation Error",
            "message": str(exc),
            "type": "validation_error"
        }
    )


@app.exception_handler(RateLimitException)
async def rate_limit_exception_handler(request: Request, exc: RateLimitException):
    logger.warning("Rate limit exceeded", client=request.client.host, path=request.url.path)
    return JSONResponse(
        status_code=429,
        content={
            "error": "Rate Limit Exceeded",
            "message": str(exc),
            "type": "rate_limit_error"
        },
        headers={"Retry-After": "60"}
    )


@app.exception_handler(AIServiceException)
async def ai_service_exception_handler(request: Request, exc: AIServiceException):
    logger.error("AI service error", error=str(exc), service=exc.service)
    return JSONResponse(
        status_code=503,
        content={
            "error": "AI Service Unavailable",
            "message": "The AI service is temporarily unavailable. Please try again later.",
            "type": "service_error"
        }
    )


# Health check endpoint
@app.get("/health", tags=["monitoring"])
async def health_check():
    """Health check endpoint for load balancers"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }


# Metrics endpoint for Prometheus
@app.get("/metrics", tags=["monitoring"])
async def metrics():
    """Prometheus metrics endpoint"""
    return Response(
        content=generate_latest(),
        media_type="text/plain"
    )


# Root endpoint
@app.get("/", tags=["root"])
async def root():
    """API root endpoint with basic information"""
    return {
        "name": "AI Image Studio API",
        "version": "1.0.0",
        "description": "Professional AI Image Generation Platform",
        "docs_url": "/docs",
        "health_url": "/health",
        "metrics_url": "/metrics"
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
        workers=1 if settings.ENVIRONMENT == "development" else 4,
        access_log=True,
        log_config={
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "default": {
                    "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
                },
            },
            "handlers": {
                "default": {
                    "formatter": "default",
                    "class": "logging.StreamHandler",
                    "stream": "ext://sys.stdout",
                },
            },
            "root": {
                "level": "INFO",
                "handlers": ["default"],
            },
        }
    ) 