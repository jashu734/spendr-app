// screens/ExpenseDetailScreen.js

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  FONT,
  RADIUS,
  SPACING,
} from '../constants/colors';

import { VIBES } from '../constants/vibes';

export default function ExpenseDetailScreen({
  route,
  navigation,
}) {
  const { expense } = route.params;

  const vibe = VIBES[expense.vibe];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scroll}
    >
      {/* Vibe Header */}
      <View
        style={[
          styles.vibeHeader,
          {
            backgroundColor:
              vibe?.color + '22',
          },
        ]}
      >
        <Text style={styles.vibeEmoji}>
          {vibe?.emoji}
        </Text>

        <Text
          style={[
            styles.vibeLabel,
            {
              color: vibe?.color,
            },
          ]}
        >
          {vibe?.label}
        </Text>
      </View>

      {/* Amount */}
      <Text style={styles.amount}>
        Rs. {expense.amount?.toLocaleString()}
      </Text>

      {/* Details Card */}
      <View style={styles.card}>
        <DetailRow
          label="Category"
          value={expense.category}
        />

        <DetailRow
          label="Note"
          value={
            expense.note || 'No note added'
          }
        />

        <DetailRow
          label="Date"
          value={new Date(
            expense.date
          ).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        />

        <DetailRow
          label="Vibe"
          value={vibe?.label}
        />
      </View>

      {/* Back Button */}
      <Pressable
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          ← Back to Expenses
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function DetailRow({
  label,
  value,
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>
        {label}
      </Text>

      <Text style={styles.rowValue}>
        {value}
      </Text>
    </View>
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

  vibeHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
  },

  vibeEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },

  vibeLabel: {
    fontSize: FONT.lg,
    fontWeight: '800',
  },

  amount: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },

  rowLabel: {
    color: COLORS.textMuted,
    fontSize: FONT.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  rowValue: {
    color: COLORS.text,
    fontSize: FONT.md,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: SPACING.md,
  },

  backBtn: {
    marginTop: SPACING.xl,
    padding: SPACING.md,
    alignItems: 'center',
  },

  backText: {
    color: COLORS.primary,
    fontSize: FONT.md,
    fontWeight: '700',
  },
});