import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BorderRadius, Colors, Spacing } from "../../constants/theme";
import { useApplications } from "../../hooks/useJobs";

export default function ApplicationsScreen() {
  const {
    data: applications,
    isLoading,
    refetch,
    isRefetching,
  } = useApplications();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return Colors.success;
      case "rejected":
        return Colors.error;
      case "reviewing":
        return Colors.warning;
      default:
        return Colors.info;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return "checkmark-circle";
      case "rejected":
        return "close-circle";
      case "reviewing":
        return "time";
      default:
        return "hourglass";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Applications</Text>
        <Text style={styles.headerSubtitle}>
          {applications?.length || 0} applications
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={Colors.primary}
          />
        }
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading applications...</Text>
          </View>
        ) : applications && applications.length > 0 ? (
          <View style={styles.applicationsList}>
            {applications.map((app) => (
              <View key={app.id} style={styles.applicationCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <Text style={styles.jobTitle}>{app.jobTitle}</Text>
                    <Text style={styles.companyName}>{app.companyName}</Text>
                  </View>
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.infoRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={Colors.textSecondary}
                    />
                    <Text style={styles.infoText}>
                      Applied: {app.appliedDate}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons
                      name="document-text-outline"
                      size={16}
                      color={Colors.textSecondary}
                    />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {app.resumeName}
                    </Text>
                  </View>

                  {app.coverLetter && (
                    <View style={styles.coverLetterSection}>
                      <Text style={styles.coverLetterLabel}>Cover Letter:</Text>
                      <Text style={styles.coverLetterText} numberOfLines={3}>
                        {app.coverLetter}
                      </Text>
                    </View>
                  )}

                  <View style={styles.statusContainer}>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(app.status) + "20" },
                      ]}
                    >
                      <Ionicons
                        name={getStatusIcon(app.status)}
                        size={16}
                        color={getStatusColor(app.status)}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(app.status) },
                        ]}
                      >
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="document-text-outline"
              size={64}
              color={Colors.textLight}
            />
            <Text style={styles.emptyStateTitle}>No Applications Yet</Text>
            <Text style={styles.emptyStateText}>
              Start applying to jobs to see your applications here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    // paddingTop: 20,
  },
  header: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    paddingTop: Spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    padding: Spacing.xxl,
    alignItems: "center",
  },
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
  },
  applicationsList: {
    padding: Spacing.md,
  },
  applicationCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  cardHeaderLeft: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  companyName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  deleteButton: {
    padding: Spacing.xs,
  },
  cardContent: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  coverLetterSection: {
    marginTop: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.sm,
  },
  coverLetterLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  coverLetterText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  statusContainer: {
    marginTop: Spacing.md,
    flexDirection: "row",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyState: {
    padding: Spacing.xxl,
    alignItems: "center",
    marginTop: Spacing.xxl,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
