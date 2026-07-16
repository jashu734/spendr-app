// screens/AddScreen.js

import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  COLORS,
  FONT,
  RADIUS,
  SPACING,
} from "../constants/colors";

import VibePicker from "../components/VibePicker";

const CATEGORIES = [
  { key: "food", label: "🍔 Food" },
  { key: "travel", label: "✈️ Travel" },
  { key: "entertainment", label: "🎬 Entertainment" },
  { key: "other", label: "📦 Other" },
];

export default function AddScreen({
  onAdd,
  navigation,
}) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [vibe, setVibe] = useState(null);
  const [note, setNote] = useState("");

  const [amountError, setAmountError] =
    useState("");

  const [vibeError, setVibeError] =
    useState("");

  const validate = () => {
    let valid = true;

    if (
      !amount ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0
    ) {
      setAmountError(
        "Enter a valid amount greater than 0"
      );
      valid = false;
    } else {
      setAmountError("");
    }

    if (!vibe) {
      setVibeError(
        "Please pick a vibe for this expense"
      );
      valid = false;
    } else {
      setVibeError("");
    }

    return valid;
  };

  const resetForm = () => {
    setAmount("");
    setCategory("food");
    setVibe(null);
    setNote("");

    setAmountError("");
    setVibeError("");
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newExpense = {
      id: String(Date.now()),
      amount: Number(amount),
      category,
      vibe,
      note: note.trim(),
      date: Date.now(),
    };

    onAdd(newExpense);

    resetForm();

    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          Add Expense
        </Text>

        <Text style={styles.label}>
          Amount (Rs.)
        </Text>

        <TextInput
          style={[
            styles.input,
            amountError
              ? styles.inputError
              : null,
          ]}
          value={amount}
          onChangeText={(text) => {
            setAmount(text);

            if (amountError) {
              setAmountError("");
            }
          }}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={
            COLORS.textDim
          }
          returnKeyType="done"
          maxLength={7}
        />

        {amountError ? (
          <Text style={styles.errorText}>
            {amountError}
          </Text>
        ) : null}

        <Text style={styles.label}>
          Category
        </Text>

        <View style={styles.chipRow}>
          {CATEGORIES.map((cat) => {
            const isSelected =
              category === cat.key;

            return (
              <Pressable
                key={cat.key}
                onPress={() =>
                  setCategory(cat.key)
                }
                style={[
                  styles.chip,
                  isSelected &&
                    styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected &&
                      styles.chipTextSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>
          Vibe
        </Text>

        <VibePicker
          selected={vibe}
          onSelect={setVibe}
        />

        {vibeError ? (
          <Text style={styles.errorText}>
            {vibeError}
          </Text>
        ) : null}

        <Text style={styles.label}>
          Note{" "}
          <Text style={styles.optional}>
            (optional)
          </Text>
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.noteInput,
          ]}
          value={note}
          onChangeText={setNote}
          placeholder="What's the story behind this expense?"
          placeholderTextColor={
            COLORS.textDim
          }
          multiline
          numberOfLines={3}
          maxLength={100}
          textAlignVertical="top"
        />

        <Text style={styles.charCount}>
          {note.length}/100
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.submitBtn,
            pressed &&
              styles.submitBtnPressed,
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            Add Expense
          </Text>
        </Pressable>
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

  title: {
    color: COLORS.text,
    fontSize: FONT.xl,
    fontWeight: "800",
    marginBottom: SPACING.xl,
  },

  label: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
    marginTop: SPACING.lg,
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: FONT.lg,
    fontWeight: "700",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  errorText: {
    color: COLORS.danger,
    fontSize: FONT.xs,
    marginTop: SPACING.xs,
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },

  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },

  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  chipText: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    fontWeight: "600",
  },

  chipTextSelected: {
    color: COLORS.white,
  },

  noteInput: {
    height: 80,
    paddingTop: SPACING.sm,
  },

  optional: {
    color: COLORS.textDim,
    fontWeight: "400",
    fontSize: FONT.xs,
  },

  charCount: {
    color: COLORS.textDim,
    fontSize: FONT.xs,
    textAlign: "right",
    marginTop: 2,
  },

  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: "center",
    marginTop: SPACING.xl,
  },

  submitBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  submitText: {
    color: COLORS.white,
    fontSize: FONT.md,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});