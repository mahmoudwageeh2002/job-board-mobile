import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationsService } from "../services/applications.service";
import { JobApplication, jobsService } from "../services/jobs.service";

export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsService.getAllJobs(),
  });
};

export const useActiveJobs = () => {
  return useQuery({
    queryKey: ["jobs", "active"],
    queryFn: () => jobsService.getActiveJobs(),
  });
};

export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsService.getJobById(id),
    enabled: !!id,
  });
};

// Admin hooks
export const useAdminJobs = () => {
  return useQuery({
    queryKey: ["admin", "jobs"],
    queryFn: () => jobsService.getAdminJobs(),
  });
};

export const useAdminJob = (id: string) => {
  return useQuery({
    queryKey: ["admin", "job", id],
    queryFn: () => jobsService.getAdminJobById(id),
    enabled: !!id,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => jobsService.getUsers(),
  });
};

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationsService.getApplications(),
  });
};

export const useApplyJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (application: JobApplication) =>
      applicationsService.addApplication(application),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export const useHasApplied = (jobId: string) => {
  return useQuery({
    queryKey: ["application", jobId],
    queryFn: () => applicationsService.hasApplied(jobId),
    enabled: !!jobId,
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applicationsService.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
