import AsyncStorage from "@react-native-async-storage/async-storage";
import { JobApplication } from "./jobs.service";

const APPLICATIONS_KEY = "@job_applications";

class ApplicationsService {
  async getApplications(): Promise<JobApplication[]> {
    try {
      const data = await AsyncStorage.getItem(APPLICATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting applications:", error);
      return [];
    }
  }

  async addApplication(application: JobApplication): Promise<void> {
    try {
      const applications = await this.getApplications();
      applications.push(application);
      await AsyncStorage.setItem(
        APPLICATIONS_KEY,
        JSON.stringify(applications),
      );
    } catch (error) {
      console.error("Error adding application:", error);
      throw error;
    }
  }

  async getApplicationByJobId(
    jobId: string,
  ): Promise<JobApplication | undefined> {
    try {
      const applications = await this.getApplications();
      return applications.find((app) => app.jobId === jobId);
    } catch (error) {
      console.error("Error getting application:", error);
      return undefined;
    }
  }

  async hasApplied(jobId: string): Promise<boolean> {
    try {
      const application = await this.getApplicationByJobId(jobId);
      return !!application;
    } catch (error) {
      return false;
    }
  }

  async deleteApplication(id: string): Promise<void> {
    try {
      const applications = await this.getApplications();
      const filtered = applications.filter((app) => app.id !== id);
      await AsyncStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting application:", error);
      throw error;
    }
  }

  async clearAllApplications(): Promise<void> {
    try {
      await AsyncStorage.removeItem(APPLICATIONS_KEY);
    } catch (error) {
      console.error("Error clearing applications:", error);
      throw error;
    }
  }
}

export const applicationsService = new ApplicationsService();
