# MoodSync Frontend

A responsive, mobile-first React application for the MoodSync API.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication**: Login and registration forms
- **User Profile**: View and edit user details
- **Modern UI**: Clean, intuitive interface with smooth transitions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend API running on `http://localhost:3000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints Used

The frontend communicates with the following backend endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Project Structure

```
src/
├── components/
│   ├── Login.jsx          # Login form component
│   ├── Register.jsx       # Registration form component
│   ├── UserProfile.jsx    # User profile display/edit
│   └── Navbar.jsx         # Navigation bar
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles with Tailwind CSS
```

## Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`

## Notes

- The application automatically checks for existing authentication tokens
- All forms include proper validation and error handling
- The design is fully responsive and works on all device sizes
- Authentication state is persisted in localStorage
