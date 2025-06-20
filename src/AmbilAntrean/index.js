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
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import styles from './style';
import { COLORS } from '../Constant/colors';

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

        // Fetch info loket/cabang
        const response = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Gagal mengambil data profil:', data?.message || data);
          setLoadingProfile(false);
          return;
        }

        setBranchName(data?.loket?.name || 'Nama Cabang');
        setBranchAddress(data?.loket?.branch?.address || 'Alamat belum tersedia');

        // Fetch antrean in progress
        const queueRes = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const queueData = await queueRes.json();

        if (queueRes.ok && queueData && queueData.ticketNumber) {
          setLastInProgressTicket(queueData.ticketNumber);
        } else {
          setLastInProgressTicket('-');
        }

        // Fetch total antrean
        const countRes = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/count/loket`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const countData = await countRes.json();

        if (countRes.ok && countData && typeof countData.totalQueue === 'number') {
          setTotalQueue(countData.totalQueue);
        } else {
          setTotalQueue('-');
        }

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
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY_ORANGE} />
      <View style={styles.navigationHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambil Antrean</Text>
      </View>
      <ScrollView>
        <View style={styles.contentWrapper}>
          <View style={styles.branchInfoCard}>
            <Text style={styles.branchName}>{branchName}</Text>
            <Text style={styles.branchAddress}>{branchAddress}</Text>
          </View>

          <View style={styles.queueStatsContainer}>
            <View style={[styles.statBox, styles.borderServed]}>
              <Text style={styles.statLabel}>Sedang Dilayani</Text>
              <Text style={[styles.statValue, styles.valueServed]}>
                {lastInProgressTicket}
              </Text>
            </View>

            <View style={[styles.statBox, styles.borderTotal]}>
              <Text style={styles.statLabel}>Jumlah Antrian</Text>
              <Text style={[styles.statValue, styles.valueTotal]}>
                {totalQueue}
              </Text>
            </View>
          </View>

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
                placeholder={contactError || "Masukkan email Anda"}
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
                placeholder={contactError || "Masukkan nomor telepon Anda"}
                placeholderTextColor={contactError ? 'red' : '#999'}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleAmbilAntrean}>
            <Text style={styles.submitButtonText}>Ambil Antrean</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AmbilAntreanScreen;
