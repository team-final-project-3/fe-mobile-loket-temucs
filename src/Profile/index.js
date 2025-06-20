import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground, // 1. Import ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import styles from './style';
import { COLORS } from '../Constant/colors';

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    // Set loading to true each time we fetch
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log("Token:", token);

      if (!token) {
        console.error("Token tidak tersedia");
        // Make sure to stop loading on error
        setLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const loketId = decoded?.loketId;

      if (!loketId) {
        console.error("loketId tidak ditemukan dalam token");
        // Make sure to stop loading on error
        setLoading(false);
        return;
      }

      const response = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      // Always stop loading at the end
      setLoading(false);
    }
  };

  useEffect(() => {
    // This listener will re-fetch data every time the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfileData();
    });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  // Show a loading indicator while fetching data
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
      
      {/* 2. Replace View with ImageBackground */}
      <ImageBackground
        source={{ uri: 'https://www.transparenttextures.com/patterns/gplay.png' }} // A subtle pattern from a reliable source
        style={styles.navigationHeader}
        imageStyle={styles.headerPatternImage} // Style for the pattern image itself
        resizeMode="repeat" // Ensures the pattern tiles correctly
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </ImageBackground>

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
