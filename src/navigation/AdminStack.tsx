import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../constants/theme";
import JobDetailsScreen from "../screens/admin/JobDetailsScreen";
import JobsManagementScreen from "../screens/admin/JobsManagementScreen";
import UsersManagementScreen from "../screens/admin/UsersManagementScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AdminTabs() {
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
        tabBarStyle: {
          backgroundColor: Colors.tabBackground,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingTop: 5,
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
        name="Jobs"
        component={JobsManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen
        name="JobDetails"
        component={JobDetailsScreen}
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
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
  },
  logoutButton: {
    padding: Spacing.xs,
  },
});
