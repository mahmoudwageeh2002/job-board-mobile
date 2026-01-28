import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../constants/theme";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import AdminStack from "./AdminStack";
import AuthStack from "./AuthStack";
import JobSeekerTabs from "./JobSeekerTabs";

function AppNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Not authenticated - show auth screens
  if (!user) {
    return <AuthStack />;
  }

  // Authenticated - show appropriate stack based on role
  if (user.role === "admin") {
    return <AdminStack />;
  }

  // Default to job seeker tabs for regular users
  return <JobSeekerTabs />;
}

export default function RootNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
