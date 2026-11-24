import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../colors';

export default function Button({ label, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }, style]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.yellow,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  label: { color: colors.night, fontSize: 16, fontWeight: '700' },
});