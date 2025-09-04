# MoodSync Frontend

A responsive mobile-first React application for the MoodSyncAPI.

## Features

- User authentication (login/register)
- Daily question interface (DiSC)
- Circle management and invitations
- Progress tracking
- User profile management
- Match preview functionality

**In Development:**

- hardProposals
- Performance optimizations
- User Settings
- Final desing overhaul: enhance components

## Quick Start

```bash
npm install
```

```bash
npm run dev
```

Open `http://localhost:5173`

## Project Structure

```bash
src/
├── pages/                 # Route components with business logic
│   ├── HomePage.jsx       # Main dashboard with circle management
│   ├── LoginPage.jsx      # User authentication
│   ├── RegisterPage.jsx   # User registration
│   ├── ProfilePage.jsx    # User profile management
│   ├── QuestionInterfacePage.jsx # Daily question interface
│   ├── TrackingBoardPage.jsx # Circle progress tracking
│   ├── MatchPreviewPage.jsx # Match preview and member details
│   └── ErrorPage.jsx      # Error handling and redirects
├── components/            # Reusable components
│   ├── UI/                # Pure UI components (buttons, inputs, etc.)
│   ├── Cards/             # Card-based components
│   ├── Features/          # Feature-specific components
│   ├── Modals/            # Modal components
│   └── Navigation/        # Navigation components
├── hooks/                 # Custom hooks for business logic
├── layouts/               # Layout components
├── contexts/              # React AuthContext
├── config/                # Configuration files
├── utils/                 # Helper functions
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles with Tailwind CSS
```

### Architecture Benefits

- **Separation of Concerns**: Business logic separated from UI presentation
- **Reusability**: UI components can be reused across different pages
- **Maintainability**: Easier to locate and modify specific functionality
- **Scalability**: New features can be added without affecting existing components

## Routing

### Valid Routes

- `/` → redirects to `/home`
- `/login` → LoginPage (unauthenticated)
- `/register` → RegisterPage (unauthenticated)
- `/home` → HomePage (authenticated)
- `/profile` → ProfilePage (authenticated)
- `/questions` → QuestionInterfacePage (authenticated)
- `/tracking-board` → TrackingBoardPage (authenticated)
- `/match-preview` → MatchPreviewPage (authenticated)

### Invalid Routes

- Any invalid path → redirects to `/login` (unauthenticated) or `/home` (authenticated)

## Development Guidelines

### Code Organization

1. **Keep files under 200 lines** for maintainability
2. **Separate business logic** into custom hooks
3. **Extract reusable UI patterns** into UI/ components
4. **Use descriptive component names** that indicate their purpose

### Folder Architecture

- **UI Components**: Place in `src/components/UI/` if pure presentational
- **Business Components**: Place in `src/components/` if containing business logic
- **Custom Hooks**: Place in `src/hooks/` for reusable business logic
- **Pages**: Place in `src/pages/` for route-specific components

### Best Practices

- Full Javascript + React
- Implement proper error boundaries and loading states
- Follow established naming conventions
- Test components in isolation when possible
