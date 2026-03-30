import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '@/constants/theme';
import { Camera as CameraIcon, Image as ImageIcon, Zap, RotateCcw, X, Check } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.12.216:8000';

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImage(photo?.uri || null);
      } catch (e) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePredict = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        name: 'leaf.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await axios.post(`${API_BASE_URL}/api/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        // Navigate to result screen with data
        router.push({
          pathname: '/results',
          params: { 
            data: JSON.stringify(response.data),
            image: image
          }
        });
      } else {
        Alert.alert('Analysis Failed', response.data.error || 'The image was not recognized as a plant leaf.');
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert('Error', 'Connection to server failed. Please check your internet and API URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={StyleSheet.absoluteFill} />
      
      {!image ? (
        <View style={styles.cameraBox}>
          <CameraView style={styles.camera} ref={cameraRef}>
            <View style={styles.overlay}>
              <View style={styles.scanFrame} />
            </View>
          </CameraView>
          
          <View style={styles.controls}>
            <TouchableOpacity style={styles.sideBtn} onPress={pickImage}>
              <ImageIcon size={28} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shutterBtn} onPress={takePicture}>
              <View style={styles.shutterInner} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sideBtn} onPress={() => {/* flip camera */}}>
              <RotateCcw size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.tipText}>Position the leaf inside the frame</Text>
        </View>
      ) : (
        <View style={styles.previewBox}>
          <Image source={{ uri: image }} style={styles.previewImage} />
          
          <View style={styles.previewControls}>
            <TouchableOpacity style={[styles.controlBtn, styles.cancelBtn]} onPress={() => setImage(null)}>
              <X size={24} color="#fff" />
              <Text style={styles.controlText}>Retake</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.controlBtn, styles.predictBtn]} 
              onPress={handlePredict}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Zap size={24} color="#fff" />
                  <Text style={styles.controlText}>Predict Disease</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  cameraBox: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#4ade80',
    borderStyle: 'dashed',
    borderRadius: 20,
  },
  controls: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  shutterBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  sideBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    position: 'absolute',
    bottom: 140,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  previewBox: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  previewImage: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  previewControls: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  controlBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  cancelBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  predictBtn: {
    backgroundColor: Colors.secondary,
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
