import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '@/constants/theme';
import { ChevronLeft, Share2, ShieldCheck, AlertTriangle, Lightbulb, ThermometerSun, Leaf, Activity } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function ResultsScreen() {
  const router = useRouter();
  const { data, image } = useLocalSearchParams<{ data: string, image: string }>();
  
  const result = data ? JSON.parse(data) : null;
  const isHealthy = result?.disease?.toLowerCase().includes('healthy');
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `PlantCare AI Diagnosis: My ${result.plant} appears to have ${result.disease}. Treatment: ${result.treatment}`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (!result) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#0f172a', '#1e293b']} style={StyleSheet.absoluteFill} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Diagnosis Result</Text>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Share2 size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Image Preview */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.mainImage} />
          <View style={[styles.confidenceBadge, { backgroundColor: isHealthy ? '#059669' : '#dc2626' }]}>
            <Activity size={16} color="#fff" />
            <Text style={styles.confidenceText}>{Math.round(result.confidence * 100)}% Match</Text>
          </View>
        </View>

        {/* Result Content */}
        <View style={styles.content}>
          <View style={styles.mainInfo}>
            <Text style={styles.plantName}>{result.plant}</Text>
            <View style={styles.diseaseRow}>
              {isHealthy ? (
                <ShieldCheck size={28} color="#10b981" />
              ) : (
                <AlertTriangle size={28} color="#f59e0b" />
              )}
              <Text style={[styles.diseaseName, { color: isHealthy ? '#10b981' : '#f97316' }]}>
                {result.disease.replace(/_/g, ' ')}
              </Text>
            </View>
          </View>

          {/* Cards */}
          <BlurView intensity={20} tint="dark" style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Lightbulb size={20} color="#fbbf24" />
              <Text style={styles.cardTitle}>Expert Treatment Advice</Text>
            </View>
            <Text style={styles.cardDesc}>{result.treatment}</Text>
          </BlurView>

          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <View style={styles.iconCircle}>
                <Leaf size={20} color="#4ade80" />
              </View>
              <Text style={styles.gridVal}>Check Daily</Text>
              <Text style={styles.gridLbl}>Leaf Health</Text>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.iconCircle}>
                <ThermometerSun size={20} color="#f97316" />
              </View>
              <Text style={styles.gridVal}>Morning</Text>
              <Text style={styles.gridLbl}>Best Time to Spray</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.doneBtn} 
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.doneBtnText}>Return to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  imageContainer: {
    padding: 20,
    height: 350,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  confidenceBadge: {
    position: 'absolute',
    bottom: 35,
    right: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  confidenceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    padding: 24,
    flex: 1,
  },
  mainInfo: {
    marginBottom: 24,
  },
  plantName: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  diseaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  diseaseName: {
    fontSize: 28,
    fontWeight: '800',
    flex: 1,
  },
  infoCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  cardDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  gridItem: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridVal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  gridLbl: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginTop: 2,
  },
  doneBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
  },
  doneBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
