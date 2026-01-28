export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  status: number; // 1 = active, 0 = inactive
  createdBy: string;
  createdDay: string;
}

export interface Applicant {
  id: string;
  userId: string;
  username: string;
  resumeText: string;
  coverLetter: string;
  status: "submitted" | "reviewed" | "accepted" | "rejected";
}

export interface AdminJob extends Job {
  applicants: Applicant[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  resumeUri: string;
  resumeName: string;
  coverLetter?: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  image?: string;
  fullName?: string;
}

const JOBS_API_URL = "https://dummyjson.com/c/2dd7-62ed-4140-83df";
const ADMIN_JOBS_API_URL = "https://dummyjson.com/c/8fe0-3952-4183-9c20";
const USERS_API_URL = "https://dummyjson.com/c/a505-93b9-4aea-b1d8";

class JobsService {
  // Job Seeker endpoints
  async getAllJobs(): Promise<Job[]> {
    try {
      const response = await fetch(JOBS_API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  }

  async getJobById(id: string): Promise<Job | undefined> {
    try {
      const jobs = await this.getAllJobs();
      return jobs.find((job) => job.id === id);
    } catch (error) {
      console.error("Error fetching job:", error);
      throw error;
    }
  }

  // Filter active jobs only
  async getActiveJobs(): Promise<Job[]> {
    try {
      const jobs = await this.getAllJobs();
      return jobs.filter((job) => job.status === 1);
    } catch (error) {
      console.error("Error fetching active jobs:", error);
      throw error;
    }
  }

  // Admin endpoints
  async getAdminJobs(): Promise<AdminJob[]> {
    try {
      const response = await fetch(ADMIN_JOBS_API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching admin jobs:", error);
      throw error;
    }
  }

  async getAdminJobById(id: string): Promise<AdminJob | undefined> {
    try {
      const jobs = await this.getAdminJobs();
      return jobs.find((job) => job.id === id);
    } catch (error) {
      console.error("Error fetching admin job:", error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(USERS_API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}

export const jobsService = new JobsService();
