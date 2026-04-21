# 🎬 CineScope

A modern, production-ready movie discovery application built with **React**, **TypeScript**, **Vite**, and the **TMDB API**.

> A scalable frontend with advanced features, clean architecture, and professional UX patterns.
![Website Screenshot](screenshot.png)

## ✨ Features

### Discovery & Browsing
- 🎞️ Browse trending, now playing, and top-rated movies
- 🎯 Advanced filtering by genre, rating, and release year
- 📊 Smart sorting options (popularity, revenue, rating)
- 📖 Paginated infinite scroll for large result sets
- ⚡ Debounced search with instant feedback

### Movie Details
- 📋 Dedicated detail pages with comprehensive information
- 👥 Cast and crew information with photos
- ⭐ User reviews and ratings
- 🎬 Video trailer modal player
- 🔗 Related movie recommendations

### Watchlist Management
- 💾 Persistent watchlist with localStorage
- 🔔 Real-time toast notifications
- 📌 Live watchlist counter updates
- 🎨 Smooth UI feedback for additions/removals

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18+ |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Routing** | React Router v6 |
| **Data Fetching** | TanStack React Query (Server State) |
| **HTTP Client** | Axios |
| **State Management** | React Context API (Client State) |
| **Styling** | Tailwind CSS |
| **Linting** | ESLint |
| **CSS Processing** | PostCSS |

## 📁 Project Architecture

### Directory Structure

```
src/
├── api/                          # TMDB API client & request handlers
│   └── tmdb.ts                  # Centralized API endpoints
├── components/
│   ├── common/                  # Reusable UI components (LoadingSkeleton, Toast, etc.)
│   ├── home/                    # Home page specific components
│   ├── layout/                  # App shell, header, navigation
│   └── movies/                  # Movie feature components (Card, Grid, Filter)
├── features/
│   ├── favorites/               # Watchlist feature (isolated module)
│   └── movies/                  # Movies feature (hooks, logic)
├── hooks/                       # Custom React hooks (useDebounce, useMovies, etc.)
├── pages/                       # Page components (Home, Movies, MovieDetails, Favorites)
├── store/                       # State management (Context, Provider, Store hooks)
├── types/                       # TypeScript type definitions
├── App.tsx                      # Main app router setup
├── main.tsx                     # React DOM entry point
└── vite-env.d.ts               # Vite environment types
```

### Architectural Patterns

- **Feature-Based Organization**: Scalable folder structure grouping related logic
- **API Layer Abstraction**: All TMDB requests centralized in `api/tmdb.ts`
- **Custom Hooks**: Encapsulated logic for data fetching and state management
- **Context API**: Lightweight state management for watchlist persistence
- **React Query**: Efficient server state caching and synchronization

## 🖥️ Pages Overview

| Page | Purpose | Features |
|------|---------|----------|
| **Home** | Landing page with curated sections | Trending, Now Playing, Top Rated previews |
| **Movies/Discover** | Explore all movies | Filtering, sorting, pagination, search |
| **Movie Details** | Individual movie information | Cast, reviews, recommendations, trailer |
| **Watchlist** | Saved favorite movies | Persistent list, quick removal |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- TMDB API key (free account at [TMDB](https://www.themoviedb.org/settings/api))

### Installation Steps

#### 1. Clone and Navigate
```bash
git clone <your-repository-url>
cd tmdbMovies
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

**Get your API key:**
1. Create a [TMDB account](https://www.themoviedb.org/signup)
2. Go to Settings → API
3. Copy your API key
4. Paste it in `.env`

#### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📋 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build (optimized)
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 🏆 Why This Project Stands Out

✅ **Production-Ready Code** - Not a basic tutorial, but a real-world scalable application

✅ **Modern Architecture** - Feature-based organization, API layer abstraction, proper separation of concerns

✅ **Advanced State Management** - React Query for server state + Context API for persistent client state

✅ **Professional UX** - Skeleton loaders, debounced search, toast notifications, real-time updates

✅ **Type Safety** - Full TypeScript coverage for IDE support and error prevention

✅ **Performance Optimized** - Pagination, lazy loading, efficient caching with React Query

✅ **Reusable Components** - Modular UI components that follow composition patterns

## 🔧 Development Conventions

- **TypeScript Strict Mode** - All files use strict type checking
- **Component Naming** - PascalCase for components, camelCase for hooks
- **File Organization** - One component per file, grouped by feature
- **API Calls** - All requests go through `api/tmdb.ts` for consistency
- **Error Handling** - Try-catch blocks with user-friendly error states

## 🐛 Troubleshooting

### "API key not found" Error
- Verify `.env` file exists in project root
- Check that `VITE_TMDB_API_KEY` is spelled correctly
- Ensure no quotes around the API key value
- Restart dev server after adding/modifying `.env`

### Movies Not Loading
- Check browser console for API errors
- Verify TMDB API key is valid and active
- Check TMDB API rate limits (40 requests/10 seconds)
- Ensure internet connection is active

### Watchlist Not Persisting
- Check browser's localStorage is enabled
- Clear browser cache and reload
- Check that browser allows localStorage for this domain

## 📦 Building for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

Build output will be in the `dist/` folder. Ready for deployment to Netlify, Vercel, or any static host.

## 🌐 Deployment

### Recommended Platforms
- **Netlify** - `npm run build` → drag & drop `dist/` folder
- **Vercel** - Connect GitHub repo for automatic deployments
- **GitHub Pages** - Configure Vite for GitHub Pages hosting

### Environment Setup for Production
Add `VITE_TMDB_API_KEY` to your hosting platform's environment variables.

## 📚 Resources

- [React Documentation](https://react.dev)
- [TMDB API Docs](https://developer.themoviedb.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🚧 Future Enhancements

- [ ] Automated tests (Jest + React Testing Library)
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Offline support (Service Workers)
- [ ] User authentication & personal recommendations
- [ ] Advanced filtering with URL state persistence
- [ ] Dark mode toggle
- [ ] Movie ratings and reviews submission
- [ ] Social sharing features

## 📄 License

This project is open source and available under the MIT License.

## ⚖️ API Attribution

Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

**Important:** This product uses the TMDB API but is not endorsed or certified by TMDB. TMDB is a registered trademark of Reata Enterprises, Inc.
