import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/button';
import { colors } from '../colors';

function SpeedSign({ value, size = 120 }) {
  return (
    <View style={[styles.signOuter, { width: size, height: size, borderRadius: size / 2 }]}>
      <View
        style={[
          styles.signInner,
          { width: size * 0.74, height: size * 0.74, borderRadius: size * 0.37 },
        ]}
      >
        <Text style={{ fontSize: size * 0.3, fontWeight: '800', color: colors.night }}>{value}</Text>
      </View>
    </View>
  );
}

export default function ResultScreen({ navigation, route }) {
  const { sign, lang } = route.params;
  const [saved, setSaved] = useState(false);

  const listen = () => {
    Speech.stop();
    if (lang === 'AR') Speech.speak(sign.titleAr, { language: 'ar' });
    else Speech.speak(`${sign.title}. ${sign.meaning}`, { language: 'fr-FR' });
  };

  const share = () => Share.share({ message: `${sign.title} — ${sign.meaning}` });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Haut */}
        <View style={styles.top}>
          <Pressable style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.night} />
          </Pressable>
          <View style={styles.signPole}>
            <SpeedSign value={sign.value} />
            <View style={styles.pole} />
          </View>
        </View>

        {/* Carte */}
        <View style={styles.card}>
          <View style={styles.tag}>
            <Ionicons name="ellipse" size={8} color={colors.red} />
            <Text style={styles.tagText}>{sign.category}</Text>
          </View>

          <View style={styles.titleRow}>
            <SpeedSign value={sign.value} size={40} />
            <Text style={styles.title}>{sign.title}</Text>
          </View>
          <Text style={styles.titleAr}>{sign.titleAr}</Text>

          <View style={styles.reliabRow}>
            <Text style={styles.reliabLabel}>Fiabilité</Text>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${sign.reliability}%` }]} />
            </View>
            <Text style={styles.reliabValue}>{sign.reliability} %</Text>
          </View>

          <Text style={styles.section}>SIGNIFICATION</Text>
          <View style={styles.meaningBox}>
            <Text style={styles.meaning}>{sign.meaning}</Text>
          </View>

          <Text style={styles.section}>À RETENIR</Text>
          {sign.tips.map((t) => (
            <View key={t} style={styles.tipRow}>
              <View style={styles.dot} />
              <Text style={styles.tip}>{t}</Text>
            </View>
          ))}

          <View style={styles.actions}>
            <ActionBtn icon="volume-medium-outline" label="Écouter" onPress={listen} />
            <ActionBtn
              icon={saved ? 'bookmark' : 'bookmark-outline'}
              label="Garder"
              onPress={() => setSaved(!saved)}
            />
            <ActionBtn icon="share-social-outline" label="Partager" onPress={share} />
          </View>

          <Button
            label="Scanner un autre panneau"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 14 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionBtn({ icon, label, onPress }) {
  return (
    <Pressable style={styles.action} onPress={onPress}>
      <Ionicons name={icon} size={18} color={colors.night} />
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#DCE6F2' },
  top: { height: 230, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#DCE6F2' },
  back: {
    position: 'absolute',
    top: 12,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  signPole: { alignItems: 'center' },
  pole: { width: 6, height: 50, backgroundColor: '#9AA7B5' },
  signOuter: { backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center' },
  signInner: { backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 500,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagText: { color: colors.red, fontSize: 12, fontWeight: '600' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 14 },
  title: { flex: 1, fontSize: 22, fontWeight: '800', color: colors.night },
  titleAr: { marginTop: 6, fontSize: 14, color: colors.gray, textAlign: 'right', writingDirection: 'rtl' },
  reliabRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 },
  reliabLabel: { fontSize: 12, color: colors.night, fontWeight: '600' },
  barBg: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#E3E8EE' },
  barFill: { height: 6, borderRadius: 3, backgroundColor: colors.green },
  reliabValue: { fontSize: 12, color: colors.green, fontWeight: '700' },
  section: { fontSize: 11, fontWeight: '700', color: colors.gray, letterSpacing: 1, marginTop: 20, marginBottom: 8 },
  meaningBox: { backgroundColor: colors.mist, borderRadius: 10, padding: 12 },
  meaning: { fontSize: 13, color: colors.night, lineHeight: 19 },
  tipRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.yellow, marginTop: 7 },
  tip: { flex: 1, fontSize: 13, color: colors.night, lineHeight: 19 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#D5DCE5',
    borderRadius: 10,
    paddingVertical: 11,
  },
  actionText: { fontSize: 12, color: colors.night, fontWeight: '600' },
});