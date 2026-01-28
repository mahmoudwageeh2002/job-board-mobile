import React, { useContext, useState } from "react";
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
import { BorderRadius, Colors, Spacing } from "../../constants/theme";
import { AuthContext } from "../../context/AuthContext";
import { useUsers } from "../../hooks/useJobs";
import type { User } from "../../services/jobs.service";

export default function UsersManagementScreen() {
  const { user: currentUser, logout } = useContext(AuthContext);
  const { data: users, isLoading, refetch } = useUsers();
  const [showUserModal, setShowUserModal] = useState(false);

  const renderUserCard = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.fullName}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.roleContainer}>
          <View
            style={[
              styles.roleBadge,
              item.role === "admin" ? styles.roleAdmin : styles.roleUser,
            ]}
          >
            <Text style={styles.roleText}>
              {item.role === "admin" ? " Admin" : "Job Seeker"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Users Management</Text>
          <Text style={styles.headerSubtitle}>Manage all users</Text>
        </View>
        <TouchableOpacity onPress={() => setShowUserModal(true)}>
          <Image
            source={{
              uri: currentUser?.image,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={users || []}
          renderItem={renderUserCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.usersList}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No users found</Text>
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
                  uri: currentUser?.image,
                }}
                style={styles.modalAvatar}
              />
              <View style={styles.userModalInfo}>
                <Text style={styles.modalName}>{currentUser?.username}</Text>
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
    paddingTop: Spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
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
  statsContainer: {
    flexDirection: "row",
    padding: Spacing.md,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  usersList: {
    padding: Spacing.md,
  },
  userCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  roleContainer: {
    flexDirection: "row",
  },
  roleBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  roleAdmin: {
    backgroundColor: "#FFF3E0",
  },
  roleUser: {
    backgroundColor: "#E3F2FD",
  },
  roleText: {
    fontSize: 12,
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
