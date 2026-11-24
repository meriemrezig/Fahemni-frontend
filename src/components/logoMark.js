import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../colors';

export default function LogoMark({ size = 80 }) {
  const box = size * 0.7;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: box,
          height: box,
          borderRadius: size * 0.16,
          backgroundColor: colors.yellow,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View style={{ position: 'absolute' }}>
        <MaterialCommunityIcons name="line-scan" size={size * 0.45} color={colors.night} />
      </View>
    </View>
  );
}