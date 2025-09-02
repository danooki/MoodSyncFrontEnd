# MoodSync Frontend

A responsive mobile-first React application for the MoodSync API.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

This project is built on modular architecture separating UI components from page logic.

```
src/
├── pages/                 # Page components with business logic
│   ├── HomePage.jsx       # Main dashboard with circle management
│   ├── LoginPage.jsx      # User authentication
│   ├── RegisterPage.jsx   # User registration
│   ├── ProfilePage.jsx    # User profile management
│   ├── FindYourMoodPage.jsx # DISC personality assessment
│   └── ErrorPage.jsx      # Error handling and redirects
├── components/            # Reusable UI components
│   ├── Navbar.jsx         # Navigation header
│   ├── LoadingSpinner.jsx # Reusable loading indicator
│   ├── CircleStatusCard.jsx # Circle status display
│   ├── CircleInvitations.jsx # Circle invitation management
│   ├── QuickActions.jsx   # Action buttons grid
│   ├── InviteFriendModal.jsx # Friend invitation modal
│   └── UserProfile.jsx    # Profile form and display
├── layouts/               # Layout components
├── contexts/              # React context
├── hooks/                 # Custom hooks
├── config/                # Configuration files
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles with Tailwind CSS
```

### Architecture Benefits

1. **Separation of Concerns**: Business logic is separated from UI presentation
2. **Reusability**: UI components can be reused across different pages
3. **Maintainability**: Easier to locate and modify specific functionality
4. **Testing**: Components can be tested in isolation
5. **Scalability**: New features can be added without affecting existing components

## Routing

The application uses React Router with proper error handling for invalid routes:

### Valid Routes

- `/` → redirects to `/home`
- `/home` → shows HomePage (if authenticated)
- `/login` → shows LoginPage (if not authenticated)
- `/register` → shows RegisterPage (if not authenticated)
- `/profile` → shows ProfilePage (if authenticated)
- `/find-your-mood` → shows FindYourMoodPage (if authenticated)

### Invalid Routes

- Any invalid path → redirects to `/login` (if not authenticated) or `/home` (if authenticated)
- Uses ErrorPage component for smart redirects based on authentication status
