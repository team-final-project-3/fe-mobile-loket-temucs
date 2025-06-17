import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import styles from './style';
import { COLORS } from '../Constant/colors';

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [loading, setLoading] = useState(true); // Tambahkan loading state

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log("Token:", token);

      if (!token) {
        console.error("Token tidak tersedia");
        return;
      }

      const decoded = jwtDecode(token);
      const loketId = decoded?.loketId;

      if (!loketId) {
        console.error("loketId tidak ditemukan dalam token");
        return;
      }

      const response = await fetch(`https://3fd5pjgv-3000.asse.devtunnels.ms/api/loket/${loketId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pastikan token dikirim
        },
      });
      const data = await response.json();

      if (response.ok) {
        const loketName = data?.loket?.name || 'Pengguna';
        const address = data?.loket?.branch?.address || 'Alamat belum tersedia';
        setUsername(loketName);
        setBranchAddress(address);
      } else {
        console.error("Gagal mengambil data profil:", data?.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY_ORANGE} />
      <View style={styles.navigationHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.headerCard}>
        <View style={styles.iconContainer}>
          <Ionicons name="business-outline" size={40} color={COLORS.DARK_TEAL} />
        </View>
        <Text style={styles.branchName}>{username}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={24} color={COLORS.PRIMARY_ORANGE} style={styles.infoIcon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>LOKASI</Text>
            <Text style={styles.infoValue}>{branchAddress}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.infoRow}>
          <Ionicons name="time" size={24} color={COLORS.PRIMARY_ORANGE} style={styles.infoIcon} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Jam Operasional</Text>
            <Text style={styles.infoValue}>09:00 - 16:00</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
