# 🎨 AI Image Studio - Frontend

> Next.js 14 frontend application with modern React patterns and enterprise-grade architecture

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
frontend/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 components/         # React Components
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 lib/               # Utilities & config
│   └── 📁 stores/            # Zustand stores
├── 📁 public/                # Static assets
├── 📁 styles/                # Global styles
└── 📁 types/                 # TypeScript definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS + CSS Modules
- **State**: Zustand (lightweight state management)
- **Animations**: Framer Motion
- **UI Components**: Radix UI (accessibility-first)
- **Testing**: Jest + Testing Library + Playwright

## 🎨 Design System

### Colors
- **Primary**: Dark theme with neon accents
- **Accent Cyan**: `#00f0ff`
- **Accent Magenta**: `#ff00aa`
- **Background**: `#0a0a0f` → `#1a1a2e`

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ PWA support (installable)
- ✅ Dark theme optimized
- ✅ Accessibility (WCAG 2.1)
- ✅ Performance optimized (Lighthouse >95)
- ✅ SEO optimized
- ✅ TypeScript strict mode

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Performance audit
npm run test:lighthouse
```

## 🔧 Development

### Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Bundle analysis
npm run analyze
```

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Analyze bundle
ANALYZE=true npm run build
```

## 🎯 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Score | >95 | ✅ |
| Bundle Size | <150kb | ✅ |
| First Paint | <1.5s | ✅ |
| Interactive | <3s | ✅ |

---

**Built with ❤️ for portfolio demonstration** 