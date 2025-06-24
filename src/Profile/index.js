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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import styles from './style';
import { COLORS } from '../Constant/colors';

const headerBg = require('../../assets/images/header.png');

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('Memuat...');
  const [branchAddress, setBranchAddress] = useState('Memuat...');
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return setLoading(false);

      const decoded = jwtDecode(token);
      const loketId = decoded?.loketId;
      if (!loketId) return setLoading(false);

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
    const unsubscribe = navigation.addListener('focus', fetchProfileData);
    return unsubscribe;
  }, [navigation]);

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
      
      <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileAvatarWrapper}>
            <Ionicons name="business" size={50} color="#053F5C" />
          </View>
          <Text style={styles.profileName}>{username}</Text>
        </View>
      </ImageBackground>

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
