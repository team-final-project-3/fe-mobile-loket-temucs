import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import styles from './style';
import { COLORS } from '../Constant/colors';

// Gambar header
const headerBg = require('../../assets/images/header.png');

const AmbilAntreanScreen = ({ navigation }) => {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [namaError, setNamaError] = useState('');
  const [contactError, setContactError] = useState('');
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [lastInProgressTicket, setLastInProgressTicket] = useState('Memuat...');
  const [totalQueue, setTotalQueue] = useState('Memuat...');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('Token tidak tersedia');
          setLoadingProfile(false);
          return;
        }

        const decoded = JSON.parse(base64.decode(token.split('.')[1]));
        const loketId = decoded?.loketId;

        if (!loketId) {
          console.error('loketId tidak ditemukan dalam token');
          setLoadingProfile(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const profileRes = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`, { headers });
        const profileData = await profileRes.json();

        if (!profileRes.ok) {
          console.error('Gagal mengambil data profil:', profileData?.message || profileData);
          setLoadingProfile(false);
          return;
        }

        setBranchName(profileData?.loket?.name || 'Nama Cabang');
        setBranchAddress(profileData?.loket?.branch?.address || 'Alamat belum tersedia');

        const inProgressRes = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket`, { headers });
        if (inProgressRes.status === 404) {
          setLastInProgressTicket('-');
        } else {
          const inProgressData = await inProgressRes.json();
          setLastInProgressTicket(inProgressData?.ticketNumber || '-');
        }

        const countRes = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/count/loket`, { headers });
        const countData = await countRes.json();
        setTotalQueue(countData?.totalQueue ?? '-');
      } catch (error) {
        console.error('Terjadi kesalahan saat fetch data:', error);
        Alert.alert('Error', 'Gagal memuat data.');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleAmbilAntrean = () => {
    const trimmedName = namaLengkap.trim();
    const trimmedEmail = email.trim();
    const trimmedNoTelepon = noTelepon.trim();

    let isValid = true;

    if (!trimmedName) {
      setNamaError('Nama lengkap tidak boleh kosong.');
      isValid = false;
    } else {
      setNamaError('');
    }

    if (!trimmedEmail && !trimmedNoTelepon) {
      setContactError('Wajib isi salah satu: Email atau No Telepon.');
      isValid = false;
    } else {
      setContactError('');
    }

    if (!isValid) return;

    navigation.navigate('LayananAntrean', {
      namaLengkap: trimmedName,
      email: trimmedEmail,
      noTelepon: trimmedNoTelepon,
    });
  };

  if (loadingProfile) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambil Antrean</Text>
      </ImageBackground>

      <ScrollView>
        <View style={styles.contentWrapper}>
          {/* Info Cabang */}
          <View style={styles.branchInfoCard}>
            <Text style={styles.branchName}>{branchName}</Text>
            <Text style={styles.branchAddress}>{branchAddress}</Text>
          </View>

          {/* Statistik Antrian */}
          <View style={styles.queueStatsContainer}>
            <View style={[styles.statBox, styles.borderServed]}>
              <Text style={styles.statLabel}>Sedang Dilayani</Text>
              <Text style={[styles.statValue, styles.valueServed]}>{lastInProgressTicket}</Text>
            </View>
            <View style={[styles.statBox, styles.borderTotal]}>
              <Text style={styles.statLabel}>Jumlah Antrian</Text>
              <Text style={[styles.statValue, styles.valueTotal]}>{totalQueue}</Text>
            </View>
          </View>

          {/* Form Data Nasabah */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>DATA NASABAH</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nama Lengkap *</Text>
              <TextInput
                style={[styles.input, namaError ? styles.inputError : null]}
                value={namaLengkap}
                onChangeText={(text) => {
                  setNamaLengkap(text);
                  if (namaError) setNamaError('');
                }}
                placeholder={namaError || 'Masukkan nama lengkap Anda'}
                placeholderTextColor={namaError ? 'red' : '#999'}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, contactError ? styles.inputError : null]}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (contactError) setContactError('');
                }}
                placeholder={contactError || 'Masukkan email Anda'}
                placeholderTextColor={contactError ? 'red' : '#999'}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Atau</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>No Telepon</Text>
              <TextInput
                style={[styles.input, contactError ? styles.inputError : null]}
                value={noTelepon}
                onChangeText={(text) => {
                  setNoTelepon(text);
                  if (contactError) setContactError('');
                }}
                placeholder={contactError || 'Masukkan nomor telepon Anda'}
                placeholderTextColor={contactError ? 'red' : '#999'}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Tombol Lanjut */}
          <TouchableOpacity style={styles.submitButton} onPress={handleAmbilAntrean}>
            <Text style={styles.submitButtonText}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AmbilAntreanScreen;
