import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Platform, 
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import styles from './style';

const headerBg = require('../../assets/images/header.png');

const TicketScreen = ({ navigation, route }) => {
  // --- BAGIAN KUNCI #1: State untuk mengontrol visibilitas modal ---
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State lain untuk data (tidak diubah)
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastInProgressTicket, setLastInProgressTicket] = useState('-');
  const [remainingInFront, setRemainingInFront] = useState(0);
  const { queueId } = route.params || {};
  const [ticketDetail, setTicketDetail] = useState(null);

  // useEffect untuk fetch data (tidak diubah)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('Token tidak ditemukan');
        const decoded = jwtDecode(token);
        const loketId = decoded?.loketId;

        const [ticketRes, remainingRes, profileRes, lastTicketRes] = await Promise.all([
          queueId ? fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/loket-ticket/${queueId}`, { headers: { Authorization: `Bearer ${token}` } }) : Promise.resolve(null),
          queueId ? fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/remaining/loket?queueId=${queueId}`, { headers: { Authorization: `Bearer ${token}` } }) : Promise.resolve(null),
          loketId ? fetch(`https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`, { headers: { Authorization: `Bearer ${token}` } }) : Promise.resolve(null),
          fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (ticketRes && ticketRes.ok) setTicketDetail(await ticketRes.json());
        if (remainingRes && remainingRes.ok) {
            const remainingData = await remainingRes.json();
            setRemainingInFront(remainingData.remainingInFront || 0);
        }
        if (profileRes && profileRes.ok) {
            const profileData = await profileRes.json();
            setBranchName(profileData?.loket?.name || 'Nama Cabang');
            setBranchAddress(profileData?.loket?.branch?.address || 'Alamat tidak tersedia');
        }
        if (lastTicketRes.status !== 404) {
            const lastTicketData = await lastTicketRes.json();
            if (lastTicketRes.ok) setLastInProgressTicket(lastTicketData.ticketNumber || '-');
        }

      } catch (error) {
        console.error('Terjadi kesalahan saat fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [queueId]);

  const handleBackToHome = () => {
    setIsModalVisible(false); // Sembunyikan modal sebelum navigasi
    navigation.popToTop();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#053F5C" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* --- BAGIAN KUNCI #2: Komponen Modal yang visibilitasnya terhubung ke state --- */}
      <Modal 
        transparent 
        animationType="fade" 
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)} // Untuk tombol back di Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={24} color="#888" />
            </TouchableOpacity>
            <View style={styles.successIconContainer}>
              <FontAwesome5 name="smile-beam" size={48} color={'#FFF'} />
            </View>
            <Text style={styles.successTitle}>Tiket Berhasil di Cetak</Text>
            <TouchableOpacity style={styles.modalHomeButton} onPress={handleBackToHome}>
              <Text style={styles.modalHomeButtonText}>Kembali ke Beranda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header (tidak diubah) */}
      <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
        <Text style={styles.headerTitle}>Tiket Antrean</Text>
      </ImageBackground>

      <ScrollView>
        <View style={styles.content}>
          {/* ... Konten tiket Anda (tidak diubah) ... */}
          <Text style={styles.officeName}>{branchName}</Text>
          <Text style={styles.officeAddress}>{branchAddress}</Text>

          <View style={styles.statusBoxContainer}>
            <View style={styles.statusBoxBlue}>
              <Text style={styles.statusLabel}>Terakhir Dilayani</Text>
              <Text style={styles.statusValue}>{lastInProgressTicket}</Text>
            </View>
            <View style={styles.statusBoxOrange}>
              <Text style={styles.statusLabel}>Menunggu</Text>
              <Text style={styles.statusValue}>{remainingInFront}</Text>
            </View>
          </View>

          <View style={styles.ticketCard}>
            <Text style={styles.branchText}>Kantor Cabang {branchName}</Text>
            <Text style={styles.ticketLabel}>Nomor Antrian Anda</Text>
            <Text style={styles.ticketNumber}>
              {ticketDetail?.ticketNumber || '-'}
            </Text>
            <Text style={styles.dateText}>
              Tanggal Ambil Antrean:{" "}
              {ticketDetail?.bookingDate ? new Date(ticketDetail.bookingDate).toLocaleDateString('id-ID') : '-'}
            </Text>
          </View>

          {/* --- BAGIAN KUNCI #3: Tombol pemicu yang mengubah state menjadi true --- */}
          <TouchableOpacity 
            style={styles.printButton} 
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.printButtonText}>Cetak Tiket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketScreen;