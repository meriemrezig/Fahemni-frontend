import React from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LogoMark from '../components/logoMark';
import Button from '../components/button';
import { colors } from '../colors';

const FEATURES = [
  { icon: 'scan-outline', text: 'Photographie un panneau' },
  { icon: 'checkmark-circle-outline', text: 'Découvre sa signification' },
  { icon: 'volume-medium-outline', text: "Écoute l'explication, en FR ou en arabe" },
];

export default function WelcomeScreen({ navigation }) {
  const go = () => navigation.replace('Scan');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.hero}>
        <LogoMark size={110} />
        <Text style={styles.title}>FAHEMNI</Text>
        <Text style={styles.tagline}>Comprends chaque panneau.</Text>
      </View>

      <View style={styles.features}>
        {FEATURES.map((f) => (
          <View key={f.text} style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons name={f.icon} size={20} color={colors.yellow} />
            </View>
            <Text style={styles.featureText}>{f.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button label="Commencer" onPress={go} style={{ alignSelf: 'stretch' }} />
        <Pressable onPress={go} style={{ marginTop: 18 }}>
          <Text style={styles.skip}>Passer l&apos;introduction</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.night, paddingHorizontal: 24 },
  hero: { flex: 1.1, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.white, fontSize: 30, fontWeight: '800', letterSpacing: 2, marginTop: 16 },
  tagline: { color: '#B8C4D2', fontSize: 15, marginTop: 8 },
  features: { gap: 14, marginBottom: 28 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { color: colors.white, fontSize: 14, flex: 1 },
  footer: { alignItems: 'center', paddingBottom: 12 },
  skip: { color: '#B8C4D2', fontSize: 13, textDecorationLine: 'underline' },
});