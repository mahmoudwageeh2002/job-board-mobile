import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import type { IHandles } from "react-native-modalize/lib/options";
import { Colors } from "../constants/theme";
import type { Job } from "../services/jobs.service";

interface CreateEditJobBottomSheetProps {
  modalRef: React.RefObject<IHandles | null>;
  job?: Job | null;
  onSuccess?: () => void;
}

interface ValidationErrors {
  title?: string;
  location?: string;
  salary?: string;
  description?: string;
}

export const CreateEditJobBottomSheet: React.FC<
  CreateEditJobBottomSheetProps
> = ({ modalRef, job, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<1 | 0>(1);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const isEditMode = !!job;

  useEffect(() => {
    if (job) {
      setTitle(job.title || "");
      setLocation(job.location || "");
      setSalary(job.salary || "");
      setDescription(job.description || "");
      setStatus(job.status === 1 || job.status === 0 ? job.status : 1);
    } else {
      resetForm();
    }
  }, [job]);

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setSalary("");
    setDescription("");
    setStatus(1);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!title.trim()) {
      newErrors.title = "Job title is required";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!salary.trim()) {
      newErrors.salary = "Salary is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    modalRef.current?.close();

    setTimeout(() => {
      Alert.alert(
        "Success",
        isEditMode ? "Job updated successfully!" : "Job created successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              resetForm();
              onSuccess?.();
            },
          },
        ],
      );
    }, 300);
  };

  const handleFieldChange = (
    field: keyof ValidationErrors,
    value: string,
    setter: (value: string) => void,
  ) => {
    setter(value);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Modalize
      ref={modalRef}
      snapPoint={650}
      modalHeight={650}
      onClosed={resetForm}
      handlePosition="inside"
      handleStyle={styles.handle}
      keyboardAvoidingBehavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>
            {isEditMode ? "Edit Job" : "Create New Job"}
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Title *</Text>
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                value={title}
                onChangeText={(value) =>
                  handleFieldChange("title", value, setTitle)
                }
                placeholder="e.g. Senior React Native Developer"
                placeholderTextColor="#999"
              />
              {errors.title && (
                <Text style={styles.errorText}>{errors.title}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location *</Text>
              <TextInput
                style={[styles.input, errors.location && styles.inputError]}
                value={location}
                onChangeText={(value) =>
                  handleFieldChange("location", value, setLocation)
                }
                placeholder="e.g. San Francisco, CA"
                placeholderTextColor="#999"
              />
              {errors.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Salary *</Text>
              <TextInput
                style={[styles.input, errors.salary && styles.inputError]}
                value={salary}
                onChangeText={(value) =>
                  handleFieldChange("salary", value, setSalary)
                }
                placeholder="e.g. $120,000 - $150,000"
                placeholderTextColor="#999"
              />
              {errors.salary && (
                <Text style={styles.errorText}>{errors.salary}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  errors.description && styles.inputError,
                ]}
                value={description}
                onChangeText={(value) =>
                  handleFieldChange("description", value, setDescription)
                }
                placeholder="Enter job description..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Status *</Text>
              <View style={styles.statusContainer}>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    status === 1 && styles.statusButtonActive,
                  ]}
                  onPress={() => setStatus(1)}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      status === 1 && styles.statusButtonTextActive,
                    ]}
                  >
                    Active
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    status === 0 && styles.statusButtonActive,
                  ]}
                  onPress={() => setStatus(0)}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      status === 0 && styles.statusButtonTextActive,
                    ]}
                  >
                    Closed
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {isEditMode ? "Update Job" : "Create Job"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "android" ? 60 : 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  inputError: {
    borderColor: "#F44336",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#F44336",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  statusButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
