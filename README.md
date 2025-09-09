# MoodSync Frontend

MoodSync is a WebApp that allows you and your friends to identify your mood and plan an evening based on it.
A responsive browser + mobile React application made on JavaScript + React.

## Implemented

- **Developed** user authentication (login/register) with token management.
- **Created** daily question interface based on DiSC personality assessment.
- **Built** circle management system with invitation functionality.
- **Implemented** real-time progress tracking.
- **Designed** user profile management with editable fields and data persistence.
- **Developed** match preview functionality for compatibility.
- **Created** hardProposals system (non-AI generated content) for evening activity suggestions.

**In Development:**

- Mobile-responsive phone view optimization
- Performance enhancements and code optimization
- Advanced user settings and preferences
- Final design overhaul with enhanced component library

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

### Routing System

- `/` → redirects to `/home`
- `/login` → LoginPage (unauthenticated)
- `/register` → RegisterPage (unauthenticated)
- `/home` → HomePage (authenticated)
- `/profile` → ProfilePage (authenticated)
- `/questions` → QuestionInterfacePage (authenticated)
- `/tracking-board` → TrackingBoardPage (authenticated)
- `/match-preview` → MatchPreviewPage (authenticated)

## Technology Stack

- **Frontend**: React 18, JavaScript ES6+, Vite
- **Styling**: Tailwind CSS, Custom CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Build Tools**: Vite, ESLint
- **Deployment**: Render (hosting platform)

### **Implemented** Architecture Benefits

- **Achieved** separation of concerns by isolating logic from UI presentation.
- **Created** reusable UI components.
- **Established** maintainable codebase with easy-to-locate functionality.
- **Built** scalable foundation allowing addition of new features

### Invalid Routes

- Any invalid path → redirects to `/login` (unauthenticated) or `/home` (authenticated)

**Established** and **maintained** the following development standards:

1. **Enforced** file limits under 200 lines for optimal maintainability
2. **Separated** custom hooks for reusability
3. **Implemented** descriptive component naming conventions

### Folder Architecture Guidelines

- **UI Components**: Organized in `src/components/UI/` for pure presentational elements
- **Logic Components**: Placed in `src/components/` for business logic integration
- **Custom Hooks**: Centralized in `src/hooks/` for reusable business logic
- **Pages**: Structured in `src/pages/` for route-specific components

### Best Practices

**Implemented** comprehensive quality measures:

- **Utilized** JavaScript + React best practices
- **Integrated** error boundaries and loading states throughout the application
- **Established** consistent naming conventions across the codebase
- **Conducted** component testing in isolation for reliability
