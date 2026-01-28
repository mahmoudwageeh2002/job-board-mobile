# Welcome to your Job Board app

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Features

### Authentication

- Login and Register functionality
- Role-based access control (Admin/Job Seeker)
- Persistent authentication with AsyncStorage

### Admin View

The admin interface includes two main tabs:

#### Jobs Management Tab

- View all job postings with applicant counts
- Create new job postings via bottom sheet modal
- Edit existing jobs with pre-filled forms
- Delete jobs with confirmation
- View job details and applicants
- Navigate to detailed job view showing:
  - Complete job information
  - List of all applicants
  - Applicant resumes and cover letters
  - Applicant status management

#### Users Management Tab

- View all registered users
- Display user statistics (total users, admins, job seekers)
- User profile information with role badges

### Job Seeker View

The job seeker interface includes two main tabs:

#### Jobs Tab

- Browse available job listings
- Search and filter jobs
- View detailed job information
- Apply to jobs via bottom sheet modal:
  - Upload resume (PDF, DOC, DOCX)
  - Write optional cover letter
  - Submit application

#### Applications Tab

- View all submitted applications
- Track application status
- View application details
- Delete applications
- Pull to refresh

## Demo Accounts

### Admin Account

- Username: `emilys`
- Password: `emilyspass`

### Job Seeker Account

- Username: `averyp`
- Password: `averyppass`

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npx expo start
   ```

3. Run on your preferred platform:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app

## Technology Stack

- React Native with Expo
- React Navigation for routing
- React Query for data fetching and caching
- AsyncStorage for local data persistence
- Axios for API requests
- React Native Modalize for bottom sheets
- Expo Document Picker for file selection

## Project Structure

```
src/
├── App.tsx
├── components/
│   ├── ApplyBottomSheet.tsx
│   ├── CreateEditJobBottomSheet.tsx
│   └── JobActionsBottomSheet.tsx
├── constants/
│   └── theme.ts
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useJobs.ts
├── navigation/
│   ├── RootNavigator.tsx
│   ├── AuthStack.tsx
│   ├── AdminStack.tsx
│   └── JobSeekerTabs.tsx
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── admin/
│   │   ├── JobsManagementScreen.tsx
│   │   ├── JobDetailsScreen.tsx
│   │   └── UsersManagementScreen.tsx
│   └── jobseeker/
│       ├── JobsScreen.tsx
│       ├── JobDetailsScreen.tsx
│       └── ApplicationsScreen.tsx
└── services/
    ├── api.ts
    ├── auth.service.ts
    ├── jobs.service.ts
    └── application.service.ts
```
