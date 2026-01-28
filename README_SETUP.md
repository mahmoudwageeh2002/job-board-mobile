# Job Board Mobile App - Setup Complete 🎉

## Overview

A LinkedIn-inspired job board mobile application built with React Native and Expo, featuring role-based authentication and navigation.

## Features Implemented

### ✅ Authentication System

- Login and Register screens with LinkedIn-inspired design
- AsyncStorage for token and user data persistence
- Axios API integration with DummyJSON API
- Automatic token refresh with interceptors
- Role-based navigation (Admin vs User)

### ✅ Admin Features

- Bottom tab navigation with 2 tabs:
  - **Jobs Tab**: Manage all job postings
  - **Users Tab**: Manage all users
- Logout functionality in header

### ✅ Job Seeker Features

- Bottom tab navigation with 2 tabs:
  - **Jobs Tab**: Browse and search jobs
    - Navigate to Job Details screen
  - **Applications Tab**: Track job applications
- Logout functionality in header

### ✅ LinkedIn-Inspired Theme

- Professional blue color scheme (#0A66C2)
- Clean, modern UI components
- Consistent spacing and typography
- Card-based layouts

## Project Structure

```
job-board-mobile/
├── src/
│   ├── App.tsx                          # Main app entry
│   ├── services/
│   │   ├── api.ts                       # Axios instance with interceptors
│   │   └── auth.service.ts              # Authentication service
│   ├── context/
│   │   └── AuthContext.tsx              # Auth state management
│   ├── constants/
│   │   └── theme.ts                     # LinkedIn-inspired theme
│   ├── navigation/
│   │   ├── RootNavigator.tsx            # Root navigation logic
│   │   ├── AuthStack.tsx                # Auth screens stack
│   │   ├── AdminStack.tsx               # Admin bottom tabs
│   │   └── JobSeekerTabs.tsx            # Job seeker bottom tabs
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx          # Login screen
│   │   │   └── RegisterScreen.tsx       # Register screen
│   │   ├── admin/
│   │   │   ├── JobsManagementScreen.tsx # Admin jobs management
│   │   │   └── UsersManagementScreen.tsx# Admin users management
│   │   └── jobseeker/
│   │       ├── JobsScreen.tsx           # Browse jobs
│   │       ├── JobDetailsScreen.tsx     # Job details
│   │       └── ApplicationsScreen.tsx   # User applications
│   └── components/                       # Reusable components
├── index.js                              # App entry point
└── package.json

```

## Navigation Flow

```
App Start
    │
    ├─→ Not Authenticated → AuthStack
    │       ├─→ LoginScreen
    │       └─→ RegisterScreen
    │
    └─→ Authenticated
            │
            ├─→ Admin Role → AdminStack (Bottom Tabs)
            │       ├─→ Jobs Tab
            │       └─→ Users Tab
            │
            └─→ User Role → JobSeekerTabs (Bottom Tabs)
                    ├─→ Jobs Tab
                    │    └─→ JobDetailsScreen
                    └─→ Applications Tab
```

## Demo Credentials

For testing with DummyJSON API:

- **Username**: emilys
- **Password**: emilyspass

## Key Technologies

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **TypeScript** - Type safety
- **DummyJSON API** - Mock backend

## Theme Colors

- **Primary Blue**: #0A66C2 (LinkedIn Blue)
- **Secondary Blue**: #378FE9
- **Background**: #FFFFFF
- **Background Light**: #F3F6F8
- **Text**: #000000
- **Text Secondary**: #666666
- **Success**: #057642
- **Error**: #CC1016

## API Integration

The app uses DummyJSON API for authentication:

- Base URL: `https://dummyjson.com`
- Auth endpoints:
  - POST `/auth/login` - Login
  - POST `/auth/refresh` - Refresh token
  - GET `/auth/me` - Get current user

## Storage

User data stored in AsyncStorage:

- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token
- `user` - User object with role

## Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Next Steps

- Implement actual job listings API
- Add job creation/editing for admins
- Implement job application functionality
- Add user profile management
- Implement search and filters
- Add notifications
- Implement real-time updates
