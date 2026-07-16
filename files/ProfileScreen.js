// screens/ProfileScreen.js

import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  COLORS,
  FONT,
  RADIUS,
  SPACING,
} from "../constants/colors";

import BudgetCard from "../components/BudgetCard";
import {
  loadProfile,
  saveProfile,
} from "../services/storage";

export default function ProfileScreen() {
  // State
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("15000");
  const [spent, setSpent] = useState(6200);
  const [editMode, setEditMode] = useState(false);

  const [nameErr, setNameErr] = useState("");
  const [budgetErr, setBudgetErr] = useState("");

  // Load saved profile on mount
  useEffect(() => {
    const fetch = async () => {
      const profile = await loadProfile();

      setName(profile.name);
      setBudget(String(profile.budget));
    };

    fetch();
  }, []);

  // Validation
  const validate = () => {
    let valid = true;

    if (!name.trim()) {
      setNameErr("Name is required");
      valid = false;
    } else {
      setNameErr("");
    }

    const num = Number(budget);

    if (!budget || isNaN(num) || num <= 0) {
      setBudgetErr("Enter a positive number");
      valid = false;
    } else {
      setBudgetErr("");
    }

    return valid;
  };

  // Save profile
  const handleSave = async () => {
    if (!validate()) return;

    await saveProfile(
      name.trim(),
      Number(budget)
    );

    setEditMode(false);

    Alert.alert(
      "Saved",
      "Profile updated successfully!"
    );
  };

  // Personality based on budget
  const getPersonality = () => {
    const b = Number(budget);

    if (b >= 20000) return "The Big Spender";
    if (b >= 10000) return "The Balanced Buyer";

    return "The Cautious Saver";
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scroll}
      >
        {/* Avatar Block */}
        <View style={styles.avatarBlock}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name
                ? name.charAt(0).toUpperCase()
                : "?"}
            </Text>
          </View>

          <Text style={styles.nameText}>
            {name || "Your Name"}
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {getPersonality()}
            </Text>
          </View>
        </View>

        {/* Edit / Save Button */}
        <Pressable
          style={({ pressed }) => [
            styles.editBtn,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() =>
            editMode
              ? handleSave()
              : setEditMode(true)
          }
        >
          <Text style={styles.editBtnText}>
            {editMode
              ? "Save Profile"
              : "Edit Profile"}
          </Text>
        </Pressable>

        {/* Edit Mode */}
        {editMode && (
          <View style={styles.form}>
            <Text style={styles.fieldLabel}>
              Your Name
            </Text>

            <TextInput
              style={[
                styles.input,
                nameErr
                  ? styles.inputError
                  : null,
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={
                COLORS.textDim
              }
            />

            {nameErr ? (
              <Text style={styles.errText}>
                {nameErr}
              </Text>
            ) : null}

            <Text
              style={[
                styles.fieldLabel,
                { marginTop: SPACING.md },
              ]}
            >
              Monthly Budget (Rs.)
            </Text>

            <TextInput
              style={[
                styles.input,
                budgetErr
                  ? styles.inputError
                  : null,
              ]}
              value={budget}
              onChangeText={setBudget}
              placeholder="e.g. 15000"
              placeholderTextColor={
                COLORS.textDim
              }
              keyboardType="numeric"
            />

            {budgetErr ? (
              <Text style={styles.errText}>
                {budgetErr}
              </Text>
            ) : null}
          </View>
        )}

        {/* Budget Card */}
        {!editMode && (
          <View
            style={{
              marginTop: SPACING.lg,
            }}
          >
            <BudgetCard
              monthlyBudget={
                Number(budget) || 15000
              }
              spent={spent}
            />
          </View>
        )}

        <Text style={styles.versionTag}>
          Spendr v1.0 Bootcamp build
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  scroll: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  avatarBlock: {
    alignItems: "center",
    paddingTop: SPACING.md,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 3,
    borderColor: COLORS.primarySoft,
  },

  avatarText: {
    color: COLORS.text,
    fontSize: FONT.xxl,
    fontWeight: "800",
  },

  nameText: {
    color: COLORS.text,
    fontSize: FONT.xl,
    fontWeight: "800",
    marginTop: SPACING.md,
  },

  badge: {
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.sm,
  },

  badgeText: {
    color: COLORS.primary,
    fontSize: FONT.sm,
    fontWeight: "700",
  },

  editBtn: {
    backgroundColor: COLORS.primary,
    marginTop: SPACING.lg,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    alignSelf: "center",
  },

  editBtnText: {
    color: COLORS.text,
    fontSize: FONT.md,
    fontWeight: "700",
  },

  form: {
    marginTop: SPACING.lg,
  },

  fieldLabel: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },

  input: {
    backgroundColor: COLORS.surfaceElevated,
    color: COLORS.text,
    fontSize: FONT.md,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  errText: {
    color: COLORS.danger,
    fontSize: FONT.xs,
    marginTop: SPACING.xs,
  },

  versionTag: {
    color: COLORS.textDim,
    fontSize: FONT.xs,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});