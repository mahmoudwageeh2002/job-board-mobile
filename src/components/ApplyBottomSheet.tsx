/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { BorderRadius, Colors, Spacing } from "../constants/theme";
import { useApplyJob } from "../hooks/useJobs";
import { JobApplication } from "../services/jobs.service";

interface ApplyBottomSheetProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  onSuccess: () => void;
}

export const ApplyBottomSheet = React.forwardRef<
  Modalize,
  ApplyBottomSheetProps
>(({ jobId, jobTitle, companyName, onSuccess }, ref) => {
  const [resume, setResume] = useState<{ uri: string; name: string } | null>(
    null,
  );
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const applyMutation = useApplyJob();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setResume({
          uri: file.uri,
          name: file.name,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const handleApply = async () => {
    if (!resume) {
      Alert.alert("Required", "Please upload your resume");
      return;
    }

    try {
      setIsSubmitting(true);

      const application: JobApplication = {
        id: `app_${Date.now()}`,
        jobId,
        jobTitle,
        companyName,
        appliedDate: new Date().toISOString().split("T")[0],
        resumeUri: resume.uri,
        resumeName: resume.name,
        coverLetter: coverLetter.trim() || undefined,
        status: "pending",
      };

      await applyMutation.mutateAsync(application);

      Alert.alert("Success", "Application submitted successfully!");
      setResume(null);
      setCoverLetter("");
      onSuccess();

      // Close the bottom sheet
      if (ref && typeof ref === "object" && "current" in ref) {
        ref.current?.close();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modalize
      ref={ref}
      snapPoint={600}
      modalHeight={650}
      handlePosition="inside"
      handleStyle={styles.handle}
      modalStyle={styles.modal}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: "handled",
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Apply for Job</Text>
          <Text style={styles.subtitle}>{jobTitle}</Text>
          <Text style={styles.company}>{companyName}</Text>
        </View>

        <View style={styles.content}>
          {/* Resume Upload */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Resume <Text style={styles.required}>*</Text>
            </Text>
            <TouchableOpacity
              style={[styles.uploadButton, resume && styles.uploadButtonActive]}
              onPress={pickDocument}
            >
              <Ionicons
                name={resume ? "document-text" : "cloud-upload-outline"}
                size={24}
                color={resume ? Colors.success : Colors.primary}
              />
              <Text
                style={[
                  styles.uploadButtonText,
                  resume && styles.uploadButtonTextActive,
                ]}
              >
                {resume ? resume.name : "Upload Resume (PDF, DOC, DOCX)"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Cover Letter */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Cover Letter <Text style={styles.optional}>(Optional)</Text>
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Tell us why you're a great fit for this role..."
              placeholderTextColor={Colors.textLight}
              value={coverLetter}
              onChangeText={setCoverLetter}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>
              {coverLetter.length} characters
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!resume || isSubmitting) && styles.submitButtonDisabled,
            ]}
            onPress={handleApply}
            disabled={!resume || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={Colors.textWhite} />
            ) : (
              <>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.textWhite}
                />
                <Text style={styles.submitButtonText}>Submit Application</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modalize>
  );
});

const styles = StyleSheet.create({
  handle: {
    backgroundColor: Colors.border,
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  modal: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  required: {
    color: Colors.error,
  },
  optional: {
    color: Colors.textSecondary,
    fontWeight: "400",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: "dashed",
    backgroundColor: Colors.backgroundLight,
  },
  uploadButtonActive: {
    borderColor: Colors.success,
    borderStyle: "solid",
    backgroundColor: "#f0f9f4",
  },
  uploadButtonText: {
    flex: 1,
    fontSize: 14,
    color: Colors.primary,
  },
  uploadButtonTextActive: {
    color: Colors.success,
    fontWeight: "500",
  },
  textArea: {
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: 14,
    color: Colors.text,
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: Spacing.xs,
    textAlign: "right",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    marginTop: Spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
  },
});
