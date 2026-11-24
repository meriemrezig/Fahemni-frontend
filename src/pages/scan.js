import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ScanFrame from '../components/scanFrame';
import Button from '../components/button';
import { colors } from '../colors';
import { SPEED_50 } from '../signs';

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [lang, setLang] = useState('FR');

  // Plus tard : brancher ici ton modèle de reconnaissance (API / TFLite).
  const capture = () => navigation.navigate('Result', { sign: SPEED_50, lang });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brand}>
          <MaterialCommunityIcons name="line-scan" size={22} color={colors.yellow} />
          <Text style={styles.brandText}>Fahemni</Text>
        </View>
        <Pressable style={styles.langBtn} onPress={() => setLang(lang === 'FR' ? 'AR' : 'FR')}>
          <Text style={styles.langText}>{lang === 'FR' ? 'FR | عربي' : 'عربي | FR'}</Text>
        </Pressable>
      </View>

      {/* Caméra */}
      <View style={styles.cameraWrap}>
        {permission?.granted ? (
          <CameraView style={StyleSheet.absoluteFill} facing="back" enableTorch={torch} />
        ) : (
          <View style={styles.permission}>
            <Text style={styles.permText}>L&apos;accès à la caméra est nécessaire.</Text>
            <Button label="Autoriser" onPress={requestPermission} style={{ paddingHorizontal: 24 }} />
          </View>
        )}

        <View style={styles.frameWrap} pointerEvents="none">
          <ScanFrame size={170} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Panneau détecté</Text>
          </View>
        </View>
      </View>

      <Text style={styles.hint}>Place le panneau au centre du cadre</Text>

      {/* Contrôles */}
      <View style={styles.controls}>
        <Pressable style={styles.roundBtn}>
          <Ionicons name="image-outline" size={22} color={colors.white} />
        </Pressable>
        <Pressable onPress={capture} style={styles.shutterOuter}>
          <View style={styles.shutterInner} />
        </Pressable>
        <Pressable style={styles.roundBtn} onPress={() => setTorch(!torch)}>
          <Ionicons name={torch ? 'flash' : 'flash-outline'} size={22} color={colors.yellow} />
        </Pressable>
      </View>

      {/* Barre d'onglets */}
      <View style={styles.tabs}>
        <Tab icon="scan" label="Scanner" active />
        <Tab icon="grid-outline" label="Panneaux" />
        <Tab icon="time-outline" label="Historique" />
      </View>
    </SafeAreaView>
  );
}

function Tab({ icon, label, active }) {
  return (
    <View style={styles.tab}>
      <Ionicons name={icon} size={20} color={active ? colors.yellow : '#8FA0B3'} />
      <Text style={[styles.tabText, active && { color: colors.yellow }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.night },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { color: colors.white, fontSize: 18, fontWeight: '800' },
  langBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  langText: { color: colors.white, fontSize: 12 },
  cameraWrap: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1B3B5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permission: { alignItems: 'center', gap: 14, padding: 20 },
  permText: { color: colors.white, textAlign: 'center' },
  frameWrap: { alignItems: 'center' },
  badge: {
    backgroundColor: colors.yellow,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 14,
  },
  badgeText: { color: colors.night, fontWeight: '700', fontSize: 12 },
  hint: { color: '#B8C4D2', textAlign: 'center', marginVertical: 12, fontSize: 13 },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 14,
  },
  roundBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.yellow },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0A2038',
    paddingVertical: 10,
  },
  tab: { alignItems: 'center', gap: 3 },
  tabText: { color: '#8FA0B3', fontSize: 11 },
});