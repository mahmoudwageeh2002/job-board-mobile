import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { ApplyBottomSheet } from "../../components/ApplyBottomSheet";
import { BorderRadius, Colors, Spacing } from "../../constants/theme";
import { useHasApplied, useJob } from "../../hooks/useJobs";
export default function JobDetailsScreen({ route, navigation }: any) {
  const { jobId } = route.params || {};
  const applyModalRef = useRef<Modalize>(null);
  const { data: job, isLoading, error } = useJob(jobId);
  const { data: hasApplied, refetch: refetchAppliedStatus } =
    useHasApplied(jobId);
  const handleApply = () => {
    applyModalRef.current?.open();
  };
  const handleApplicationSuccess = () => {
    refetchAppliedStatus();
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (error || !job) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={64} color={Colors.error} />
        <Text style={styles.errorText}>Job not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.createdBy}</Text>
            </View>
            {job.status === 1 && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Active</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Details</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name="location-outline"
              size={20}
              color={Colors.primary}
            />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{job.location}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cash-outline" size={20} color={Colors.primary} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Salary</Text>
              <Text style={styles.detailValue}>{job.salary}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={Colors.primary}
            />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Posted Date</Text>
              <Text style={styles.detailValue}>{job.createdDay}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="briefcase-outline"
              size={20}
              color={Colors.primary}
            />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={styles.detailValue}>
                {job.status === 1 ? "Active" : "Closed"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{job.description}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.description}>
            • Relevant experience in the field{"\n"} • Strong communication
            skills{"\n"} • Team player with problem-solving abilities{"\n"} •
            Attention to detail{"\n"}
          </Text>
        </View>
        <View style={styles.spacing} />
      </ScrollView>
      <View style={styles.footer}>
        {hasApplied ? (
          <View style={styles.appliedContainer}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.success}
            />
            <Text style={styles.appliedText}>Already Applied</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.applyButton,
              job.status !== 1 && styles.applyButtonDisabled,
            ]}
            onPress={handleApply}
            disabled={job.status !== 1}
          >
            <Ionicons name="send" size={20} color={Colors.textWhite} />
            <Text style={styles.applyButtonText}>
              {job.status === 1 ? "Apply Now" : "Position Closed"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ApplyBottomSheet
        ref={applyModalRef}
        jobId={job.id}
        jobTitle={job.title}
        companyName={job.createdBy}
        onSuccess={handleApplicationSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    color: Colors.textWhite,
    fontWeight: "600",
  },
  header: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  companyName: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  activeBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  activeBadgeText: {
    color: Colors.textWhite,
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  spacing: {
    height: 80,
  },
  footer: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  appliedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
    backgroundColor: "#f0f9f4",
    borderRadius: BorderRadius.xl,
    gap: Spacing.sm,
  },
  appliedText: {
    color: Colors.success,
    fontSize: 16,
    fontWeight: "600",
  },
  applyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    gap: Spacing.sm,
  },
  applyButtonDisabled: {
    backgroundColor: Colors.textLight,
  },
  applyButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
  },
});
