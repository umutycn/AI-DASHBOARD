#  AI Dashboard

A modern, full-featured analytics dashboard for AI platform management built with React, TypeScript, and Tailwind CSS. Designed to showcase AI model usage, revenue metrics, and system performance in real-time.

![Dashboard Preview](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue?logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)

##  Features

- ** Interactive Charts** — Revenue trends, traffic distribution, and performance metrics with Recharts
- ** Dark Mode Support** — Theme toggle (light/dark) with localStorage persistence
- ** Fully Responsive** — Mobile-first design optimized for all screen sizes
- ** Fast Performance** — Built with Vite for instant HMR and optimized production builds
- ** Loading States** — Skeleton loaders for smooth data fetching UX
- ** Navigation** — Collapsible sidebar with multiple route support
- ** Type-Safe** — Full TypeScript support with strict type checking
- ** Accessibility (A11y)** — WCAG compliant with semantic HTML and ARIA attributes

##  Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript 5 |
| **Styling** | Tailwind CSS, CSS-in-JS utilities |
| **Routing** | React Router v6 |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Build Tool** | Vite |
| **HTTP Client** | Axios (*configured, mock data currently*) |
| **Testing** | Vitest, React Testing Library *(coming soon)* |
| **Code Quality** | ESLint, Prettier |

##  Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 or **pnpm** ≥ 8.0.0

##  Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-dashboard.git
cd ai-dashboard
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure environment variables
```bash
cp .env.example .env.local
```

### 4. Start the development server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

##  Usage

### Development
```bash
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format with Prettier
```

### Testing (coming soon)
```bash
npm run test         # Run tests in watch mode
npm run test:ui      # Open test UI
npm run test:coverage # Generate coverage report
```

##  Project Structure

```
src/
├── components/           # Reusable React components
│   ├── charts/          # Chart components (Revenue, Traffic, Performance)
│   ├── common/          # Common UI (StatsCard, ActivityFeed, ModelTable)
│   ├── layout/          # Layout shell (MainLayout, Navbar, Sidebar)
│   └── ui/              # Base UI components (Card, Badge, Skeleton)
├── hooks/               # Custom React hooks
│   ├── useFetch.ts      # Generic data fetching hook
│   ├── useTheme.ts      # Theme management hook
│   └── index.ts
├── pages/               # Page components (Dashboard, NotFound)
├── services/
│   └── api.ts           # API client & mock data
├── store/
│   └── themeContext.tsx # Global theme context
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── index.ts         # Utility functions (cn, formatNumber, etc.)
├── App.tsx              # Root app component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

##  API & Mock Data

Currently, the app uses **mock data** with simulated network delays. Real API calls can be enabled by uncommenting the axios client in `src/services/api.ts`.

### Mock Data Endpoints

| Function | Returns | Delay |
|----------|---------|-------|
| `fetchStats()` | `StatsCard[]` | 300ms |
| `fetchRevenue()` | `RevenueData[]` | 400ms |
| `fetchTraffic()` | `TrafficData[]` | 350ms |
| `fetchPerformance()` | `PerformanceData[]` | 300ms |
| `fetchModelUsage()` | `ModelUsage[]` | 250ms |
| `fetchActivity()` | `ActivityItem[]` | 200ms |

### Environment Variables

See `.env.example` for all available configuration options:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
```

## Components Overview

### Layout Components
- **MainLayout** — Two-column layout (sidebar + main content area)
- **Navbar** — Top navigation with search, theme toggle, notifications
- **Sidebar** — Collapsible navigation menu with route links

### Chart Components
- **RevenueChart** — Gradient area chart showing revenue vs. profit
- **TrafficChart** — Donut chart for API traffic distribution
- **PerformanceChart** — Bar chart for requests/errors/latency

### Common Components
- **StatsCard** — Metric display with icon, value, and trend indicator
- **ActivityFeed** — Timeline of recent team actions
- **ModelTable** — AI model usage table with progress bars

### UI Components
- **Card** — Reusable container with hover effects
- **Badge** — Status indicator with variants (success, warning, danger)
- **Skeleton** — Loading placeholder with smooth animation

##  Theme Management

The app includes a built-in theme system:

```tsx
import { useThemeContext } from './store/themeContext';

function MyComponent() {
  const { theme, toggleTheme } = useThemeContext();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

- Saves preference to `localStorage`
- Respects system preference on first visit
- Updates `<html class="dark">` for Tailwind dark mode

##  Roadmap

- [ ] Error Boundary component
- [ ] Toast/Alert notifications for API errors
- [ ] Unit & integration tests (Vitest)
- [ ] Real API integration
- [ ] Advanced filtering & date range picker
- [ ] Export data (CSV/PDF)
- [ ] Real-time WebSocket support
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Storybook component documentation

##  Contributing

This is a learning project. Contributions welcome!

### Development Guidelines
1. Follow the existing code style (ESLint/Prettier enforced)
2. Use TypeScript for all files
3. Create feature branches: `git checkout -b feature/amazing-feature`
4. Write tests for new features
5. Keep components small and reusable
6. Document complex logic with comments

### Type Safety
- Strict TypeScript mode enabled (`strict: true` in `tsconfig.json`)
- All components must be properly typed
- Avoid using `any` type

##  License

This project is open source and available under the MIT License.

##  Author

Created as a portfolio project for frontend development role.

**Status:**  Active Development (Beginner-friendly)

---

##  Resources & Learning

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [React Router](https://reactrouter.com)

---

**Questions or suggestions?** Open an issue or reach out! 🙌
