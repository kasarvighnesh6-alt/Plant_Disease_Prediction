import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '@/constants/theme';
import { Scan, Microscope, Brain, Zap, ChevronRight, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  const metrics = [
    { icon: '🦠', val: '38', lbl: 'Diseases', color: '#f87171' },
    { icon: '🌾', val: '14', lbl: 'Crops', color: '#4ade80' },
    { icon: '🧠', val: '87K+', lbl: 'Samples', color: '#60a5fa' },
    { icon: '⚡', val: '<3s', lbl: 'Inference', color: '#fbbf24' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={StyleSheet.absoluteFill}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>Farmer John 🌿</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Settings size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => router.push('/scan')}
        >
          <LinearGradient
            colors={['#1e3a8a', '#2563eb', '#f97316']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroContent}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>🤖 AI Powered</Text>
              </View>
              <Text style={styles.heroTitle}>Plant Disease{"\n"}Recognition</Text>
              <Text style={styles.heroSub}>Scan your crop leaves to identify diseases instantly.</Text>
              
              <View style={styles.scanNowBtn}>
                <Scan size={20} color="#fff" />
                <Text style={styles.scanNowText}>Start Scanning</Text>
              </View>
            </View>
            <View style={styles.heroIconBg}>
              <Text style={styles.heroIconLarge}>🌿</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {metrics.map((m, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statIcon}>{m.icon}</Text>
              <Text style={styles.statVal}>{m.val}</Text>
              <Text style={styles.statLbl}>{m.lbl}</Text>
            </View>
          ))}
        </View>

        {/* Action Cards */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
            <Microscope size={24} color="#3b82f6" />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Disease Library</Text>
            <Text style={styles.actionSub}>Learn about 38 common crop diseases.</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIcon, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <Brain size={24} color="#10b981" />
          </View>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>AI Insights</Text>
            <Text style={styles.actionSub}>Personalized tips for your farm.</Text>
          </View>
          <ChevronRight size={20} color={Colors.dark.textSecondary} />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  hero: {
    borderRadius: 24,
    padding: Spacing.xl,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: Spacing.xl,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  heroContent: {
    flex: 1,
    zIndex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#93c5fd',
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 34,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 14,
    color: '#e2e8f0',
    marginBottom: 20,
    opacity: 0.8,
  },
  scanNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  scanNowText: {
    color: '#fff',
    fontWeight: '700',
  },
  heroIconBg: {
    position: 'absolute',
    right: -20,
    top: -20,
    opacity: 0.1,
  },
  heroIconLarge: {
    fontSize: 150,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 58, 138, 0.4)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.secondary,
  },
  statLbl: {
    fontSize: 10,
    color: Colors.dark.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: Spacing.md,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  actionSub: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
  },
});
