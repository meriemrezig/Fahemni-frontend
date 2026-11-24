import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../colors';

const SIZE = 28;
const T = 4;

export default function ScanFrame({ size = 150, children }) {
  return (
    <View style={{ width: size, height: size }}>
      <View style={[styles.corner, styles.tl]} />
      <View style={[styles.corner, styles.tr]} />
      <View style={[styles.corner, styles.bl]} />
      <View style={[styles.corner, styles.br]} />
      <View style={styles.center}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  corner: { position: 'absolute', width: SIZE, height: SIZE, borderColor: colors.yellow },
  tl: { top: 0, left: 0, borderTopWidth: T, borderLeftWidth: T, borderTopLeftRadius: 12 },
  tr: { top: 0, right: 0, borderTopWidth: T, borderRightWidth: T, borderTopRightRadius: 12 },
  bl: { bottom: 0, left: 0, borderBottomWidth: T, borderLeftWidth: T, borderBottomLeftRadius: 12 },
  br: { bottom: 0, right: 0, borderBottomWidth: T, borderRightWidth: T, borderBottomRightRadius: 12 },
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
});