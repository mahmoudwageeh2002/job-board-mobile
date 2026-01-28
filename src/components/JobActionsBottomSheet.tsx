import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import type { IHandles } from "react-native-modalize/lib/options";
import { Colors } from "../constants/theme";
import type { AdminJob } from "../services/jobs.service";

interface JobActionsBottomSheetProps {
  modalRef: React.RefObject<IHandles | null>;
  job: AdminJob | null;
  onEdit: (job: AdminJob) => void;
  onDelete: (job: AdminJob) => void;
}

export const JobActionsBottomSheet: React.FC<JobActionsBottomSheetProps> = ({
  modalRef,
  job,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    if (!job) return;
    modalRef.current?.close();
    setTimeout(() => {
      onEdit(job);
    }, 300);
  };

  const handleDelete = () => {
    if (!job) return;

    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete this job posting?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            modalRef.current?.close();
            setTimeout(() => {
              onDelete(job);
              Alert.alert("Success", "Job deleted successfully!");
            }, 300);
          },
        },
      ],
    );
  };

  return (
    <Modalize
      ref={modalRef}
      snapPoint={200}
      modalHeight={200}
      handlePosition="inside"
      handleStyle={styles.handle}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{job?.title}</Text>

        <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
          <AntDesign
            name="edit"
            size={20}
            color={Colors.text}
            style={{ marginEnd: 8 }}
          />
          <Text style={styles.actionText}>Edit Job</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <AntDesign
            name="delete"
            size={20}
            color={Colors.error}
            style={{ marginEnd: 8 }}
          />
          <Text style={[styles.actionText, styles.deleteText]}>Delete Job</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  handle: {
    backgroundColor: "#ddd",
    width: 40,
    height: 5,
    borderRadius: 3,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#F3F6F8",
    marginBottom: 12,
    flexDirection: "row",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  deleteText: {
    color: "#DC2626",
  },
});
