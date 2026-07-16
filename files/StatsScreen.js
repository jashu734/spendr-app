// screens/StatsScreen.js

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  COLORS,
  FONT,
  SPACING,
} from '../constants/colors';

export default function StatsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        Stats
      </Text>

      <Text style={styles.subtitle}>
        Coming soon — Day 13
      </Text>

      <Text style={styles.emoji}>
        📊
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: COLORS.text,
    fontSize: FONT.xl,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },

  subtitle: {
    color: COLORS.textMuted,
    fontSize: FONT.md,
  },

  emoji: {
    fontSize: 48,
    marginTop: SPACING.lg,
  },
});