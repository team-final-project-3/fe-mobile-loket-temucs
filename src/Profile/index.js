import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import styles from './style'; // Pastikan path ini benar
import { COLORS } from '../Constant/colors'; // Pastikan path ini benar

const headerBg = require('../../assets/images/header.png');

// --- PERUBAHAN UTAMA ---
// Komponen sekarang menerima prop `onLogout` dari App.js
const ProfileScreen = ({ navigation, onLogout }) => {
  const [username, setUsername] = useState('Memuat...');
  const [branchAddress, setBranchAddress] = useState('Memuat...');
  const [loading, setLoading] = useState(true);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  // --- PERUBAHAN UTAMA ---
  // Fungsi ini sekarang jauh lebih sederhana.
  // Ia hanya memanggil fungsi `onLogout` yang diterima dari App.js.
  const handleLogout = () => {
    setLogoutModalVisible(false);
    // Panggil fungsi logout dari App.js untuk menangani semua logika
    if (onLogout) {
      onLogout();
    }
  };

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      // Jika tidak ada token, panggil `onLogout` untuk kembali ke Login
      if (!token) {
        if (onLogout) onLogout();
        return;
      }

      const decoded = jwtDecode(token);
      const loketId = decoded?.loketId;
      if (!loketId) {
        setLoading(false);
        if (onLogout) onLogout(); // Logout jika data penting tidak ada di token
        return;
      }

      const response = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUsername(data?.loket?.name || 'Nama Loket');
        setBranchAddress(data?.loket?.branch?.address || 'Alamat cabang tidak tersedia');
      } else {
        setUsername('Gagal Memuat');
        setBranchAddress('Gagal Memuat');
        // Jika token tidak valid/kedaluwarsa (error 401), logout otomatis
        if (response.status === 401) {
            if (onLogout) onLogout();
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setUsername('Error');
      setBranchAddress('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Memastikan `onLogout` tersedia sebelum menambahkan listener
    if (onLogout) {
        const unsubscribe = navigation.addListener('focus', fetchProfileData);
        return unsubscribe;
    }
  }, [navigation, onLogout]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F6F8' }}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Modal Logout */}
      <Modal
        transparent
        animationType="fade"
        visible={isLogoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentRow}>
              <View style={styles.iconBackground}>
                <MaterialCommunityIcons name="emoticon-confused-outline" size={40} color="white" />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>Apakah Anda Yakin?</Text>
                <Text style={styles.modalMessage}>Anda akan keluar dari aplikasi ini</Text>
              </View>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutModalButton]}
                onPress={handleLogout} // Memanggil handleLogout yang sudah diperbaiki
              >
                <Text style={styles.logoutModalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLogoutModalVisible(true)} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={26} color="white" />
        </TouchableOpacity>

        <View style={styles.profileInfoContainer}>
          <View style={styles.profileAvatarWrapper}>
            <Ionicons name="business" size={50} color="#053F5C" />
          </View>
          <Text style={styles.profileName}>{username}</Text>
        </View>
      </ImageBackground>

      {/* Konten Profil */}
      <ScrollView style={styles.contentBody} showsVerticalScrollIndicator={false}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informasi Loket</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location-sharp" size={24} color={COLORS.PRIMARY_ORANGE} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Lokasi</Text>
                <Text style={styles.infoValue}>{branchAddress}</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.infoRow}>
              <Ionicons name="time-sharp" size={24} color={COLORS.PRIMARY_ORANGE} style={styles.infoIcon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Jam Operasional</Text>
                <Text style={styles.infoValue}>09:00 - 16:00 WIB</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
