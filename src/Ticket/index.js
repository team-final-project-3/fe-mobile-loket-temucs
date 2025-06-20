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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import styles from './style';
import { COLORS } from '../Constant/colors';

const TicketScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [lastInProgressTicket, setLastInProgressTicket] = useState('-');
  const [remainingInFront, setRemainingInFront] = useState(0);

  const { ticketData, queueId } = route.params || {
    ticketData: { ticketNumber: 'B-0010', date: '16/06/2025' },
    queueId: null,
  };

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

        const response = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/queue/loket-ticket/${queueId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setTicketDetail(data);
        } else {
          console.error('Gagal mengambil detail tiket:', data?.message || data);
        }

        // Fetch antrean di depan (remaining)
        const remainingRes = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/queue/remaining/loket?queueId=${queueId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const remainingData = await remainingRes.json();
        if (remainingRes.ok && remainingData?.remainingInFront !== undefined) {
          setRemainingInFront(remainingData.remainingInFront);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat fetch tiket:', error);
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
          setBranchName('Nama Cabang');
          setBranchAddress('Alamat belum tersedia');
          setLoadingProfile(false);
          return;
        }

        const decoded = JSON.parse(base64.decode(token.split('.')[1]));
        const loketId = decoded?.loketId;

        if (!loketId) {
          setBranchName('Nama Cabang');
          setBranchAddress('Alamat belum tersedia');
          setLoadingProfile(false);
          return;
        }

        // Loket profile
        const profileRes = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const profileData = await profileRes.json();

        if (profileRes.ok) {
          setBranchName(profileData?.loket?.name || 'Nama Cabang');
          setBranchAddress(profileData?.loket?.branch?.address || 'Alamat belum tersedia');
        }

        // Terakhir Dilayani
        const lastTicketRes = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const lastTicketData = await lastTicketRes.json();
        if (lastTicketRes.ok && lastTicketData?.ticketNumber) {
          setLastInProgressTicket(lastTicketData.ticketNumber);
        }
      } catch (error) {
        console.error('Error saat fetch data:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleBackToHome = () => {
    setIsModalVisible(false);
    navigation.popToTop();
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
      <Modal transparent animationType="fade" visible={isModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Ionicons name="close" size={24} color="#888" />
            </TouchableOpacity>
            <View style={styles.successIconContainer}>
              <FontAwesome5 name="smile-beam" size={48} color={COLORS.background} />
            </View>
            <Text style={styles.successTitle}>Tiket Berhasil di Cetak</Text>
            <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
              <Text style={styles.homeButtonText}>Kembali ke Beranda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.navigationHeader}>
        <Text style={styles.headerTitle}>Tiket Antrean</Text>
      </View>

      {/* Konten */}
      <View style={styles.content}>
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
            {loadingTicket
              ? 'Loading...'
              : ticketDetail?.ticketNumber || ticketData?.ticketNumber || '-'}
          </Text>
          <Text style={styles.dateText}>
            Tanggal Ambil Antrean:{" "}
            {loadingTicket
              ? 'Loading...'
              : ticketDetail?.bookingDate
                ? new Date(ticketDetail.bookingDate).toLocaleDateString()
                : ticketData?.date || '-'}
          </Text>
        </View>

        <TouchableOpacity style={styles.printButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.printButtonText}>Cetak Tiket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TicketScreen;
