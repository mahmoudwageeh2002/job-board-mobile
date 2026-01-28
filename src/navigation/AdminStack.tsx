import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Spacing } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";
import JobsManagementScreen from "../screens/admin/JobsManagementScreen";
import UsersManagementScreen from "../screens/admin/UsersManagementScreen";

const Tab = createBottomTabNavigator();

function LogoutButton() {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={styles.headerRight}>
      <Text style={styles.userName}>Admin: {user?.firstName}</Text>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
}

export default function AdminStack() {
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
          paddingBottom: 15,
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
        name="Jobs"
        component={JobsManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
          title: "Jobs",
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersManagementScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
          title: "Users",
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
  },
  logoutButton: {
    padding: Spacing.xs,
  },
});
