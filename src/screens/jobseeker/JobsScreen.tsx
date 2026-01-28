import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { BorderRadius, Colors, Spacing } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import { useJobs } from "../../hooks/useJobs";

export default function JobsScreen({ navigation }: any) {
  const { data: jobs, isLoading, error, refetch, isRefetching } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const handleJobPress = (jobId: string) => {
    navigation.navigate("JobDetails", { jobId });
  };

  /** 🔍 Filter jobs by title */
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [jobs, searchQuery]);

  const renderJobItem = ({ item: job }: any) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => handleJobPress(job.id)}
    >
      <View style={styles.jobHeader}>
        <View style={styles.jobHeaderLeft}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.createdBy}</Text>
        </View>

        {job.status === 1 ? (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>Open</Text>
          </View>
        ) : (
          <View style={styles.closedBadge}>
            <Text style={styles.activeBadgeText}>Closed</Text>
          </View>
        )}
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.jobDetailItem}>
          <Ionicons
            name="location-outline"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.jobLocation}>{job.location}</Text>
        </View>

        <View style={styles.jobDetailItem}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.jobDate}>{job.createdDay}</Text>
        </View>
      </View>

      <Text style={styles.jobSalary}>{job.salary}</Text>
      <Text style={styles.jobDescription} numberOfLines={2}>
        {job.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Find Jobs</Text>
          <Text style={styles.headerSubtitle}>
            {filteredJobs.length} opportunities available
          </Text>
        </View>

        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          {user?.image ? (
            <Image source={{ uri: user.image }} style={styles.userImage} />
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={36}
              color={Colors.textLight}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* 🔽 User Dropdown Modal */}
      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.dropdown}>
            {/* User Info */}
            <View style={styles.userRow}>
              {user?.image ? (
                <Image
                  source={{ uri: user.image }}
                  style={styles.dropdownImage}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={40}
                  color={Colors.textLight}
                />
              )}
              <Text style={styles.userName}>
                {user?.firstName + " " + user?.lastName || "User"}
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Logout */}
            <TouchableOpacity
              style={styles.logoutRow}
              onPress={() => {
                setMenuVisible(false);
                logout();
              }}
            >
              <Ionicons name="log-out-outline" size={20} color={Colors.error} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Jobs List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading jobs...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color={Colors.error} />
          <Text style={styles.errorText}>Failed to load jobs</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch as any}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="briefcase-outline"
                size={64}
                color={Colors.textLight}
              />
              <Text style={styles.emptyText}>No jobs found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },

  /* Header */
  header: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    paddingTop: Spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  /* Dropdown */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dropdown: {
    position: "absolute",
    top: 90,
    right: 16,
    width: 220,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  dropdownImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: "500",
  },

  /* Search */
  searchSection: {
    padding: Spacing.md,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: 16,
    color: Colors.text,
  },

  /* List */
  listContent: {
    padding: Spacing.md,
    paddingTop: 0,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
  },
  errorText: {
    marginTop: Spacing.md,
    color: Colors.error,
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  retryButtonText: {
    color: Colors.textWhite,
    fontWeight: "600",
  },

  emptyContainer: {
    padding: Spacing.xxl,
    alignItems: "center",
  },
  emptyText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
    fontSize: 16,
  },

  /* Job Card */
  jobCard: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  jobHeaderLeft: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  companyName: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    height: 24,
    justifyContent: "center",
  },
  closedBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    height: 24,
    justifyContent: "center",
  },
  activeBadgeText: {
    color: Colors.textWhite,
    fontSize: 12,
    fontWeight: "600",
  },
  jobDetails: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  jobDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  jobDate: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  jobSalary: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  jobDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.border,
  },
});
