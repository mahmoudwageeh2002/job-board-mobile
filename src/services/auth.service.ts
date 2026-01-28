import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { api } from "./api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: "admin" | "user";
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Step 1: Login and get tokens
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      const { accessToken, refreshToken } = response.data;

      // Save tokens first
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      // Step 2: Get user data using the access token
      const user = await this.getCurrentUser();

      return user;
    } catch (error: any) {
      // Clear tokens if login fails
      await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);

      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      Alert.alert("Login Error", errorMessage);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>("/auth/me");
      const userData = response.data;

      // Save user data to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user data");
      throw error;
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/auth/refresh", {
        refreshToken,
        expiresInMins: 30,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      if (newRefreshToken) {
        await AsyncStorage.setItem("refreshToken", newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      Alert.alert("Session Expired", "Please login again.");
      await this.logout();
      throw error;
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove([
      "accessToken",
      "refreshToken",
      "user",
      "@job_applications",
    ]);
  }

  async getStoredUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem("accessToken");
    return !!token;
  }

  async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem("accessToken");
  }
}

export const authService = new AuthService();
