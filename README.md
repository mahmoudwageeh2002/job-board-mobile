# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Job Board Mobile Application

A React Native mobile application built with Expo for job management and job seeking, featuring role-based authentication and navigation.

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
