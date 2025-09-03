# MoodSync Frontend

A responsive mobile-first React application for the MoodSyncAPI.

## Current Status

✅ **Core Features Implemented:**

- User authentication (login/register)
- DISC personality assessment
- Daily question interface
- Circle management and invitations
- Progress tracking
- User profile management

🚧 **In Development:**

- Match preview functionality
- Enhanced UI components
- Performance optimizations

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open `http://localhost:5173`

## Project Structure

```bash
src/
├── pages/                 # Page components with business logic
│   ├── HomePage.jsx       # Main dashboard with circle management
│   ├── LoginPage.jsx      # User authentication
│   ├── RegisterPage.jsx   # User registration
│   ├── ProfilePage.jsx    # User profile management
│   ├── FindYourMoodPage.jsx # DISC personality assessment
│   ├── QuestionInterfacePage.jsx # Daily question interface
│   ├── TrackingBoardPage.jsx # Circle progress tracking
│   └── ErrorPage.jsx      # Error handling and redirects
├── components/            # Reusable UI components
│   ├── UI/                # Pure UI components
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   ├── DiscScoreDisplay.jsx # DISC score visualization
│   │   └── DiscInfoCards.jsx # DISC personality type cards
│   ├── Navbar.jsx         # Navigation header
│   ├── CircleStatusCard.jsx # Circle status display
│   ├── CircleInvitations.jsx # Circle invitation management
│   ├── QuickActions.jsx   # Action buttons grid
│   ├── InviteFriendModal.jsx # Friend invitation modal
│   └── UserProfile.jsx    # Profile form and display
├── hooks/                 # Custom hooks for business logic
│   ├── useAuth.jsx        # Authentication state management
│   ├── useCircleManagement.js # Circle operations
│   ├── useInvitationManagement.js # Invitation handling
│   └── useDailyScore.js   # Daily score management
├── layouts/               # Layout components
├── contexts/              # React context
├── config/                # Configuration files
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles with Tailwind CSS
```

### Architecture Benefits

- **Separation of Concerns**: Business logic separated from UI presentation
- **Reusability**: UI components can be reused across different pages
- **Maintainability**: Easier to locate and modify specific functionality
- **Scalability**: New features can be added without affecting existing components

## Component Documentation

### Pages

- **HomePage**: Main dashboard with circle management
- **FindYourMoodPage**: DISC personality assessment
- **QuestionInterfacePage**: Daily question answering with progress tracking
- **TrackingBoardPage**: Circle progress monitoring
- **Auth Pages**: Login, registration, and profile management

### Components

- **UI Components**: LoadingSpinner, DiscScoreDisplay, DiscInfoCards (pure presentational)
- **Core Components**: Navbar, CircleStatusCard, CircleInvitations, QuickActions, InviteFriendModal, UserProfile

### Custom Hooks

- **useCircleManagement**: Circle creation and status management
- **useInvitationManagement**: Circle invitation operations
- **useDailyScore**: Daily score and question management
- **useAuth**: Authentication state management

## Routing

### Valid Routes

- `/` → redirects to `/home`
- `/login` → LoginPage (unauthenticated)
- `/register` → RegisterPage (unauthenticated)
- `/home` → HomePage (authenticated)
- `/profile` → ProfilePage (authenticated)
- `/find-your-mood` → FindYourMoodPage (authenticated)
- `/questions` → QuestionInterfacePage (authenticated)
- `/tracking-board` → TrackingBoardPage (authenticated)

### Invalid Routes

- Any invalid path → redirects to `/login` (unauthenticated) or `/home` (authenticated)

## Development Guidelines

### Code Organization

1. **Keep files under 300 lines** for maintainability
2. **Separate business logic** into custom hooks
3. **Extract reusable UI patterns** into UI/ components
4. **Use descriptive component names** that indicate their purpose

### Adding New Components

- **UI Components**: Place in `src/components/UI/` if pure presentational
- **Business Components**: Place in `src/components/` if containing business logic
- **Custom Hooks**: Place in `src/hooks/` for reusable business logic
- **Pages**: Place in `src/pages/` for route-specific components

### Best Practices

- Use JS-style documentation in component comments
- Implement proper error boundaries and loading states
- Follow established naming conventions
- Test components in isolation when possible
