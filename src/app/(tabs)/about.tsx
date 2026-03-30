import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '@/constants/theme';
import { Info, Database, Cpu, Leaf } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={StyleSheet.absoluteFill} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>About PlantCare AI</Text>
        </View>

        <View style={styles.section}>
          <BlurView intensity={20} tint="dark" style={styles.card}>
            <View style={styles.cardHeader}>
              <Database size={24} color="#10b981" />
              <Text style={styles.cardTitle}>The Dataset</Text>
            </View>
            <Text style={styles.cardText}>
              Built on 87,000+ RGB images of healthy and diseased crop leaves across 38 classes and 14 species.
            </Text>
            <View style={styles.statList}>
              <Text style={styles.statItem}>🟢 Train: 70,295 images</Text>
              <Text style={styles.statItem}>🔵 Val: 17,572 images</Text>
            </View>
          </BlurView>

          <BlurView intensity={20} tint="dark" style={styles.card}>
            <View style={styles.cardHeader}>
              <Cpu size={24} color="#3b82f6" />
              <Text style={styles.cardTitle}>The AI Model</Text>
            </View>
            <Text style={styles.cardText}>
              Custom CNN architecture optimized for mobile inference. Trained for 20+ epochs with 98% validation accuracy.
            </Text>
          </BlurView>

          <BlurView intensity={20} tint="dark" style={styles.card}>
            <View style={styles.cardHeader}>
              <Leaf size={24} color="#f97316" />
              <Text style={styles.cardTitle}>Our Mission</Text>
            </View>
            <Text style={styles.cardText}>
              Empowering farmers with instant, accurate disease diagnosis to improve crop yield and sustainability.
            </Text>
          </BlurView>
        </View>

        <Text style={styles.footerText}>Version 1.0.0 • Made with ❤️ for Agriculture</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  section: {
    gap: 16,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.textSecondary,
  },
  statList: {
    marginTop: 12,
    gap: 4,
  },
  statItem: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 40,
    color: Colors.dark.textSecondary,
    fontSize: 12,
  },
});
