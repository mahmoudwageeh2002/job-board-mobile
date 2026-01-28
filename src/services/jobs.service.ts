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

const JOBS_API_URL = "https://dummyjson.com/c/2dd7-62ed-4140-83df";

class JobsService {
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
}

export const jobsService = new JobsService();
