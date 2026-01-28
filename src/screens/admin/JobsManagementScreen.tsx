import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { IHandles } from "react-native-modalize/lib/options";
import { CreateEditJobBottomSheet } from "../../components/CreateEditJobBottomSheet";
import { JobActionsBottomSheet } from "../../components/JobActionsBottomSheet";
import { BorderRadius, Colors, Spacing } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import { useAdminJobs } from "../../hooks/useJobs";
import type { AdminJob } from "../../services/jobs.service";

export default function JobsManagementScreen({ navigation }: any) {
  const { user, logout } = useContext(AuthContext);
  const { data: jobs, isLoading, refetch } = useAdminJobs();

  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);

  const createEditModalRef = useRef<IHandles>(null);
  const actionsModalRef = useRef<IHandles>(null);

  const handleCreateJob = () => {
    setSelectedJob(null);
    createEditModalRef.current?.open();
  };

  const handleEditJob = (job: AdminJob) => {
    setSelectedJob(job);
    createEditModalRef.current?.open();
  };

  const handleDeleteJob = (job: AdminJob) => {
    // Job is already deleted in the modal with alert
    refetch();
  };

  const handleJobPress = (job: AdminJob) => {
    navigation.navigate("JobDetails", { jobId: job.id });
  };

  const handleThreeDotsPress = (job: AdminJob) => {
    setSelectedJob(job);
    actionsModalRef.current?.open();
  };

  const renderJobCard = ({ item }: { item: AdminJob }) => (
    <TouchableOpacity
      style={styles.jobCard}
      onPress={() => handleJobPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.jobCardHeader}>
        <View style={styles.jobCardInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobMeta}>
            📍 {item.location} • 💰 {item.salary}
          </Text>
          <Text style={styles.jobApplicants}>
            👥 {item.applicants?.length || 0} applicants
          </Text>
        </View>
        <TouchableOpacity
          style={styles.threeDotsButton}
          onPress={() => handleThreeDotsPress(item)}
        >
          <Text style={styles.threeDots}>⋮</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.jobCardFooter}>
        <View
          style={[
            styles.statusBadge,
            item.status === 1 ? styles.statusActive : styles.statusClosed,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === 1 ? "Active" : "Closed"}
          </Text>
        </View>
        <Text style={styles.jobDate}>{item.createdDay}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Jobs Management</Text>
          <Text style={styles.headerSubtitle}>Manage all job postings</Text>
        </View>
        <TouchableOpacity onPress={() => setShowUserModal(true)}>
          {user?.image ? (
            <Image
              source={{
                uri: user?.image,
              }}
              style={styles.avatar}
            />
          ) : (
            <AntDesign name="user" size={24} color={Colors.text} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateJob}>
        <Text style={styles.createButtonText}>+ Create New Job</Text>
      </TouchableOpacity>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={jobs || []}
          renderItem={renderJobCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.jobsList}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No jobs posted yet</Text>
            </View>
          }
        />
      )}

      {/* User Profile Modal */}
      <Modal
        visible={showUserModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUserModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUserModal(false)}
        >
          <View style={styles.userModal}>
            <View style={styles.userModalHeader}>
              <Image
                source={{
                  uri: user?.image,
                }}
                style={styles.modalAvatar}
              />
              <View style={styles.userModalInfo}>
                <Text style={styles.modalName}>{user?.username}</Text>
                <Text style={styles.modalRole}>Admin</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                setShowUserModal(false);
                logout();
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Create/Edit Job Bottom Sheet */}
      <CreateEditJobBottomSheet
        modalRef={createEditModalRef}
        job={selectedJob}
        onSuccess={() => refetch()}
      />

      {/* Job Actions Bottom Sheet */}
      <JobActionsBottomSheet
        modalRef={actionsModalRef}
        job={selectedJob}
        onEdit={handleEditJob}
        onDelete={handleDeleteJob}
      />
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
    padding: Spacing.lg,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: Spacing.md,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  createButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  createButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  jobsList: {
    padding: Spacing.md,
  },
  jobCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  jobCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  jobCardInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  jobMeta: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  jobApplicants: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
  threeDotsButton: {
    padding: Spacing.xs,
    justifyContent: "center",
  },
  threeDots: {
    fontSize: 24,
    color: Colors.textSecondary,
    fontWeight: "bold",
  },
  jobCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  statusActive: {
    backgroundColor: "#E8F5E9",
  },
  statusClosed: {
    backgroundColor: "#FFEBEE",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  jobDate: {
    fontSize: 12,
    color: Colors.textSecondary,
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
    color: Colors.textSecondary,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 16,
  },
  userModal: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.sm,
  },
  userModalInfo: {
    flex: 1,
  },
  modalName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  modalRole: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  logoutButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.backgroundLight,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
  },
});
