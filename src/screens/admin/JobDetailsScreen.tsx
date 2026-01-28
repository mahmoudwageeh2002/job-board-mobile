import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BorderRadius, Colors, Spacing } from "../../constants/theme";
import { useAdminJob } from "../../hooks/useJobs";
import type { Applicant } from "../../services/jobs.service";

export default function JobDetailsScreen({ route, navigation }: any) {
  const { jobId } = route.params;
  const { data: job, isLoading } = useAdminJob(jobId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "#2196F3";
      case "reviewed":
        return "#FF9800";
      case "accepted":
        return "#4CAF50";
      case "rejected":
        return "#F44336";
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "submitted":
        return { backgroundColor: "#E3F2FD" };
      case "reviewed":
        return { backgroundColor: "#FFF3E0" };
      case "accepted":
        return { backgroundColor: "#E8F5E9" };
      case "rejected":
        return { backgroundColor: "#FFEBEE" };
      default:
        return { backgroundColor: Colors.backgroundLight };
    }
  };

  const renderApplicant = ({ item }: { item: Applicant }) => (
    <View style={styles.applicantCard}>
      <View style={styles.applicantHeader}>
        <View style={styles.applicantAvatar}>
          <Ionicons name="person" size={24} color={Colors.primary} />
        </View>
        <View style={styles.applicantInfo}>
          <Text style={styles.applicantName}>{item.username}</Text>
          <Text style={styles.applicantId}>ID: {item.userId}</Text>
        </View>
        <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.applicantContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <AntDesign name="file" size={16} color={Colors.text} /> Resume
          </Text>
          <Text style={styles.sectionText}>{item.resumeText}</Text>
        </View>

        {item.coverLetter && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <AntDesign name="mail" size={16} color={Colors.text} /> Cover
              Letter
            </Text>
            <Text style={styles.sectionText}>{item.coverLetter}</Text>
          </View>
        )}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading job details...</Text>
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={Colors.error} />
        <Text style={styles.errorText}>Job not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Job Info Card */}
        <View style={styles.jobInfoCard}>
          <View style={styles.jobHeader}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <View
              style={[
                styles.jobStatusBadge,
                job.status === 1
                  ? styles.jobStatusActive
                  : styles.jobStatusClosed,
              ]}
            >
              <Text style={styles.jobStatusText}>
                {job.status === 1 ? "Active" : "Closed"}
              </Text>
            </View>
          </View>

          <View style={styles.jobDetails}>
            <View style={styles.jobDetailRow}>
              <Ionicons name="location" size={18} color={Colors.primary} />
              <Text style={styles.jobDetailText}>{job.location}</Text>
            </View>
            <View style={styles.jobDetailRow}>
              <Ionicons name="cash" size={18} color={Colors.primary} />
              <Text style={styles.jobDetailText}>{job.salary}</Text>
            </View>
            <View style={styles.jobDetailRow}>
              <Ionicons name="person" size={18} color={Colors.primary} />
              <Text style={styles.jobDetailText}>
                Posted by {job.createdBy}
              </Text>
            </View>
            <View style={styles.jobDetailRow}>
              <Ionicons name="calendar" size={18} color={Colors.primary} />
              <Text style={styles.jobDetailText}>{job.createdDay}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{job.description}</Text>
          </View>
        </View>

        {/* Applicants Section */}
        <View style={styles.applicantsSection}>
          <View style={styles.applicantsHeader}>
            <Text style={styles.applicantsTitle}>
              Applicants ({job.applicants?.length || 0})
            </Text>
          </View>

          {job.applicants && job.applicants.length > 0 ? (
            <FlatList
              data={job.applicants}
              renderItem={renderApplicant}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.applicantsList}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="people-outline"
                size={48}
                color={Colors.textLight}
              />
              <Text style={styles.emptyStateText}>No applicants yet</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.xl,
  },
  errorText: {
    marginTop: Spacing.md,
    fontSize: 16,
    color: Colors.error,
  },
  jobInfoCard: {
    backgroundColor: Colors.background,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  jobTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  jobStatusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  jobStatusActive: {
    backgroundColor: "#E8F5E9",
  },
  jobStatusClosed: {
    backgroundColor: "#FFEBEE",
  },
  jobStatusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  jobDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  jobDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  jobDetailText: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  descriptionSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  applicantsSection: {
    margin: Spacing.md,
    marginTop: 0,
  },
  applicantsHeader: {
    marginBottom: Spacing.md,
  },
  applicantsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  applicantsList: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  applicantCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  applicantHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  applicantAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 2,
  },
  applicantId: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  applicantContent: {
    gap: Spacing.md,
  },
  section: {
    gap: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  sectionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  applicantActions: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
  },
  reviewButton: {
    backgroundColor: "#2196F3",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
  actionButtonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    backgroundColor: Colors.background,
    padding: Spacing.xxl,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyStateText: {
    marginTop: Spacing.md,
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
