// screens/HomeScreen.js

import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  FONT,
  SPACING,
} from '../constants/colors';

import ExpenseCard from '../components/ExpenseCard';

const formatINR = (n) =>
  'Rs. ' +
  Number(n).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });

export default function HomeScreen({
  expenses,
  navigation,
}) {
  const total = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            onPress={() =>
              navigation.navigate('Detail', {
                expense: item,
              })
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>
              THIS WEEK
            </Text>

            <Text style={styles.headerTotal}>
              {formatINR(total)}
            </Text>

            <Text style={styles.headerSub}>
              {expenses.length} expenses logged
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>
              📭
            </Text>

            <Text style={styles.emptyText}>
              No expenses yet — tap + to add one
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  listContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  header: {
    paddingVertical: SPACING.lg,
    marginBottom: SPACING.md,
  },

  headerLabel: {
    color: COLORS.textMuted,
    fontSize: FONT.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },

  headerTotal: {
    color: COLORS.text,
    fontSize: FONT.display,
    fontWeight: '800',
    marginTop: SPACING.xs,
  },

  headerSub: {
    color: COLORS.textDim,
    fontSize: FONT.sm,
    marginTop: SPACING.xs,
  },

  empty: {
    alignItems: 'center',
    paddingTop: SPACING.xxl * 2,
  },

  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: FONT.md,
  },
});