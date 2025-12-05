# Overview

This is a full-stack web application built with React on the frontend and Express.js on the backend. The application uses a monorepo structure with client and server code separated into distinct directories. It's configured for deployment on Replit with development tooling for hot module replacement and error overlays.

The tech stack includes:
- **Frontend**: React with Vite, TypeScript, TailwindCSS, and shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL via Drizzle ORM with Neon serverless driver
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Project Structure

The application follows a monorepo pattern with three main directories:

- **`client/`**: Frontend React application built with Vite
- **`server/`**: Backend Express.js API server
- **`shared/`**: Code shared between client and server (database schemas, types)

## Frontend Architecture

### Build System
The frontend uses **Vite** as the build tool and development server. In development mode, Vite middleware is integrated with Express for hot module replacement. The configuration includes:
- React plugin for JSX transformation
- Path aliases (`@/` for client code, `@shared/` for shared code)
- Replit-specific plugins for error overlay and development banner
- Custom build output directory (`dist/public`)

### UI Framework
The application uses **shadcn/ui**, a component system built on Radix UI primitives with TailwindCSS styling. This provides:
- Pre-built accessible components (buttons, dialogs, forms, etc.)
- Customizable through CSS variables defined in the theme
- "New York" style variant configured
- CSS variables enabled for easy theming

### State Management
**TanStack Query** (React Query) handles server state with custom configuration:
- Custom fetch wrapper (`apiRequest`) for API calls with automatic error handling
- Credentials included in all requests for session management
- Query functions with configurable 401 (unauthorized) behavior
- Infinite stale time by default (queries don't auto-refetch)
- Window focus refetching disabled

### Styling
**TailwindCSS** provides utility-first styling with:
- Custom color palette using CSS variables (HSL-based)
- Extended theme with custom colors and animations
- Multiple font families configured (Roboto, DM Sans, Fira Code, etc.)
- Responsive breakpoints (mobile at 768px)

## Backend Architecture

### Server Framework
**Express.js** serves as the API server with:
- JSON and URL-encoded body parsing
- Custom request logging middleware for API routes
- Error handling middleware for centralized error responses
- Development-only Vite integration for HMR

### Development vs Production
The server conditionally sets up Vite middleware only in development:
- **Development**: Vite transforms and serves frontend code with HMR
- **Production**: Serves pre-built static files from `dist/public`

This approach allows seamless development experience while maintaining production performance.

### API Design
API routes are defined in `server/routes.ts` with the convention:
- All routes prefixed with `/api`
- Route registration returns HTTP server instance for WebSocket support
- Storage layer abstraction for data persistence

### Storage Layer
The application implements a **storage interface pattern** (`IStorage`) that allows swapping between different data stores:
- **Current**: In-memory storage (`MemStorage`) for development/prototyping
- **Designed for**: Database-backed storage via Drizzle ORM
- Interface defines CRUD operations (getUser, createUser, etc.)

This abstraction enables:
- Easy testing with mock storage
- Transition from prototype to production database
- Multiple database backend support

## Database Architecture

### ORM Choice
**Drizzle ORM** was selected for type-safe database access:
- Schema-first approach with TypeScript types
- PostgreSQL dialect configured
- Integration with Zod for runtime validation
- Migration system (files output to `./migrations`)

### Database Schema
Current schema includes a `users` table with:
- UUID primary key (auto-generated via PostgreSQL)
- Username (unique constraint)
- Password field
- Zod schemas generated from Drizzle schema for validation

### Database Connection
Configured to use **Neon serverless PostgreSQL**:
- Connection via `@neondatabase/serverless` driver
- Connection string from `DATABASE_URL` environment variable
- Serverless-optimized for edge deployments

## Form Handling

The application uses **React Hook Form** with **Zod validation**:
- `@hookform/resolvers` bridges React Hook Form and Zod
- Schemas defined in shared directory for client/server consistency
- `drizzle-zod` generates Zod schemas from database schema

This ensures:
- Client-side validation matches server-side expectations
- Type safety from database through API to UI
- Single source of truth for data validation rules

## Build and Deployment

### Build Process
Two-stage build:
1. **Frontend**: Vite bundles React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`

Build configuration:
- ESM module format throughout
- External packages not bundled on server
- Node platform target for server bundle

### Scripts
- `dev`: Development server with tsx for TypeScript execution
- `build`: Production build (frontend + backend)
- `start`: Run production server
- `db:push`: Push schema changes to database

# External Dependencies

## UI Component Library
- **Radix UI**: Headless accessible component primitives (20+ components)
- **shadcn/ui**: Pre-styled components built on Radix UI
- **Lucide React**: Icon library
- **cmdk**: Command menu component
- **vaul**: Drawer/bottom sheet component
- **embla-carousel**: Carousel component
- **recharts**: Charting library

## Styling
- **TailwindCSS**: Utility-first CSS framework
- **class-variance-authority**: Variant-based component styling
- **tailwind-merge**: Intelligent Tailwind class merging
- **clsx**: Conditional class names

## Data Fetching and Forms
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation

## Database
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **Neon Serverless**: PostgreSQL database driver optimized for serverless
- **drizzle-kit**: Migration and introspection tool

## Development Tools
- **Vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production server
- **TypeScript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development plugins

## Utilities
- **date-fns**: Date manipulation library
- **nanoid**: Unique ID generation

## Environment Requirements
- **DATABASE_URL**: PostgreSQL connection string (required for Drizzle)
- **NODE_ENV**: Environment flag (development/production)