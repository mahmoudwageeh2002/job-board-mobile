import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Spacing } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";
import ApplicationsScreen from "../screens/jobseeker/ApplicationsScreen";
import JobDetailsScreen from "../screens/jobseeker/JobDetailsScreen";
import JobsScreen from "../screens/jobseeker/JobsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function LogoutButton() {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={styles.headerRight}>
      <Text style={styles.userName}>
        {user?.firstName} {user?.lastName}
      </Text>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
}

// Jobs Stack with navigation to Job Details
function JobsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="JobsList" component={JobsScreen} />
      <Stack.Screen
        name="JobDetails"
        component={JobDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "Job Details",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerTintColor: Colors.primary,
        }}
      />
    </Stack.Navigator>
  );
}

export default function JobSeekerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        headerRight: () => <LogoutButton />,
        tabBarStyle: {
          backgroundColor: Colors.tabBackground,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          marginBottom: 15,
        },
        tabBarActiveTintColor: Colors.tabIconSelected,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="JobsTab"
        component={JobsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
          tabBarLabel: "Jobs",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ApplicationsTab"
        component={ApplicationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
          tabBarLabel: "Applications",
          title: "My Applications",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.md,
    gap: Spacing.sm,
  },
  userName: {
    fontSize: 14,
    color: Colors.textSecondary,
    maxWidth: 120,
  },
  logoutButton: {
    padding: Spacing.xs,
  },
});
