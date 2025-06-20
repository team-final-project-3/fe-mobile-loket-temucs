import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; // Impor FontAwesome5
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import styles from './style';
import { COLORS } from '../Constant/colors';

// Menerima 'navigation' dan 'route' untuk data dinamis
const TicketScreen = ({ navigation, route }) => {
  // State untuk mengontrol visibilitas modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State untuk office name and address
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Ambil data tiket dan queueId dari parameter route, atau gunakan nilai default
  const { ticketData, queueId } = route.params || { 
    ticketData: { 
      ticketNumber: 'B-0010', 
      date: '16/06/2025' 
    },
    queueId: null
  };

  // State for ticket detail fetched from API
  const [ticketDetail, setTicketDetail] = useState(null);
  const [loadingTicket, setLoadingTicket] = useState(true);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      if (!queueId) {
        console.warn('queueId tidak tersedia di route.params');
        setLoadingTicket(false);
        return;
      }
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('Token tidak tersedia');
          setLoadingTicket(false);
          return;
        }
        const response = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/queue/loket-ticket/${queueId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          console.error('Gagal mengambil detail tiket:', data?.message || data);
          setLoadingTicket(false);
          return;
        }
        console.log('Detail Tiket:', data);
        setTicketDetail(data);
      } catch (error) {
        console.error('Terjadi kesalahan saat fetch detail tiket:', error);
      } finally {
        setLoadingTicket(false);
      }
    };
    fetchTicketDetail();
  }, [queueId]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.error('Token tidak tersedia');
          setBranchName('Nama Cabang');
          setBranchAddress('Alamat belum tersedia');
          setLoadingProfile(false);
          return;
        }

        const decoded = JSON.parse(base64.decode(token.split('.')[1]));
        const loketId = decoded?.loketId;

        if (!loketId) {
          console.error('loketId tidak ditemukan dalam token');
          setBranchName('Nama Cabang');
          setBranchAddress('Alamat belum tersedia');
          setLoadingProfile(false);
          return;
        }

        const response = await fetch(`https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Gagal mengambil data profil:', data?.message || data);
          setBranchName('Nama Cabang');
          setBranchAddress('Alamat belum tersedia');
          setLoadingProfile(false);
          return;
        }

        const loketName = data?.loket?.name || 'Nama Cabang';
        const address = data?.loket?.branch?.address || 'Alamat belum tersedia';
        setBranchName(loketName);
        setBranchAddress(address);
      } catch (error) {
        console.error('Terjadi kesalahan saat fetch profile:', error);
        setBranchName('Nama Cabang');
        setBranchAddress('Alamat belum tersedia');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  // Fungsi untuk kembali ke halaman utama (Dashboard)
  const handleBackToHome = () => {
      setIsModalVisible(false); // Tutup modal dulu
      navigation.popToTop();   // Kembali ke layar paling atas di stack
  };

  if (loadingProfile) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY_ORANGE} />
      
      {/* === MODAL SUKSES === */}
      <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
      >
          <View style={styles.modalOverlay}>
              <View style={styles.successModalContainer}>
                  {/* Tombol Close (X) */}
                  <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                      <Ionicons name="close" size={24} color="#888" />
                  </TouchableOpacity>
                  
                  {/* Ikon Smile */}
                  <View style={styles.successIconContainer}>
                      <FontAwesome5 name="smile-beam" size={48} color={COLORS.background} />
                  </View>

                  <Text style={styles.successTitle}>Tiket Berhasil di Cetak</Text>

                  {/* Tombol Kembali ke Beranda */}
                  <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
                      <Text style={styles.homeButtonText}>Kembali ke Beranda</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>

      {/* Header Halaman */}
      <View style={styles.navigationHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={24} color={COLORS.background} />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>Tiket Antrean</Text>
      </View>

      {/* Konten Halaman */}
      <View style={styles.content}>
        <Text style={styles.officeName}>{branchName}</Text>
        <Text style={styles.officeAddress}>{branchAddress}</Text>

        <View style={styles.statusBoxContainer}>
          <View style={styles.statusBoxBlue}>
            <Text style={styles.statusLabel}>Terakhir Dilayani</Text>
            <Text style={styles.statusValue}>KT-008</Text>
          </View>
          <View style={styles.statusBoxOrange}>
            <Text style={styles.statusLabel}>Menunggu</Text>
            <Text style={styles.statusValue}>2</Text>
          </View>
        </View>

        <View style={styles.ticketCard}>
          <Text style={styles.branchText}>Kantor Cabang {branchName}</Text>
          <Text style={styles.ticketLabel}>Nomor Antrian Anda</Text>
          <Text style={styles.ticketNumber}>
            {loadingTicket ? 'Loading...' : (ticketDetail && ticketDetail.ticketNumber ? ticketDetail.ticketNumber : (ticketData && ticketData.ticketNumber ? ticketData.ticketNumber : ''))}
          </Text>
          <Text style={styles.dateText}>
            Tanggal Ambil Antrean: {loadingTicket ? 'Loading...' : (ticketDetail && ticketDetail.bookingDate ? new Date(ticketDetail.bookingDate).toLocaleDateString() : (ticketData && ticketData.date ? ticketData.date : ''))}
          </Text>
        </View>
        
        {/* Tombol Cetak Tiket sekarang membuka modal */}
        <TouchableOpacity style={styles.printButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.printButtonText}>Cetak Tiket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TicketScreen;
