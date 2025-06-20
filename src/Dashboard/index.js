import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://temucs-tzaoj.ondigitalocean.app';

export default function DashboardScreen({ navigation, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [queueData, setQueueData] = useState([]);
  const [greeting, setGreeting] = useState('Memuat...');
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [currentQueueNumber, setCurrentQueueNumber] = useState('Memuat...');
  const [decodedToken, setDecodedToken] = useState(null);

  const formattedDate = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id });

  useEffect(() => {
    const fetchGreetingFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('Token tidak ditemukan');

        const decoded = jwtDecode(token);
        setDecodedToken(decoded);

        const branchId = decoded?.branchId;
        let branchName = decoded.name;

        const response = await fetch(`${API_URL}/api/branch/${branchId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          branchName = data?.name || branchName;
        }

        const hour = new Date().getHours();
        let greetingMsg = 'Selamat Malam';
        if (hour < 11) greetingMsg = 'Selamat Pagi';
        else if (hour < 15) greetingMsg = 'Selamat Siang';
        else if (hour < 19) greetingMsg = 'Selamat Sore';

        setGreeting(`${greetingMsg}, ${branchName}`);
      } catch (error) {
        console.error('Gagal ambil cabang:', error);
        setGreeting('Selamat Datang, KCP Kota');
      }
    };

    fetchGreetingFromToken();
  }, []);

  const fetchCurrentQueueNumber = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Token tidak ditemukan');

      const response = await fetch(`${API_URL}/api/queue/inprogress/loket`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Response bukan JSON:', text);
        throw new Error('Response dari server bukan JSON');
      }

      const data = await response.json();

      if (!response.ok) {
        if (data?.message === 'Tidak ada antrian yang sedang dilayani.') {
          setCurrentQueueNumber('0');
          return;
        }
        console.log('Response Error:', data);
        throw new Error('Gagal mengambil antrean saat ini');
      }

      if (data?.ticketNumber) {
        setCurrentQueueNumber(data.ticketNumber);
      } else {
        setCurrentQueueNumber('Belum Ada');
      }
    } catch (error) {
      console.error('Gagal mengambil antrean saat ini:', error);
      setCurrentQueueNumber('Gagal memuat');
    }
  };

  const fetchWaitingQueue = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Token tidak ditemukan');

      const decoded = jwtDecode(token);
      setDecodedToken(decoded);

      const response = await fetch(`${API_URL}/api/queue/waiting/loket`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Gagal ambil antrean waiting:', data);
        return;
      }

      const formatted = data.map(item => ({
        id: item.id.toString(),
        noTiket: item.ticketNumber,
        nama: item.name || '-',
        status: item.userId ? 'Online' : 'Offline',
        waktu: format(new Date(item.bookingDate), 'HH:mm', { locale: id })
      }));

      setQueueData(formatted);
    } catch (error) {
      console.error('Gagal mengambil antrean waiting:', error);
    }
  };

  useEffect(() => {
    // Fetch langsung pertama kali
    fetchCurrentQueueNumber();
    fetchWaitingQueue();

    // Interval refresh setiap 10 detik
    const intervalId = setInterval(() => {
      fetchCurrentQueueNumber();
      fetchWaitingQueue();
    }, 10000);

    // Bersihkan interval saat unmount
    return () => clearInterval(intervalId);
  }, []);

  const filteredQueueData = queueData.filter(item => {
    const matchesQuery =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.noTiket.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || item.status.toLowerCase() === filterStatus;
    return matchesQuery && matchesStatus;
  });

  const handleFilterChange = () => {
    if (filterStatus === 'all') setFilterStatus('online');
    else if (filterStatus === 'online') setFilterStatus('offline');
    else setFilterStatus('all');
  };

  const renderFilterButton = () => {
    let iconName = 'filter';
    let text = 'Filter';
    let buttonStyle = styles.filterButton;
    let textStyle = styles.filterButtonText;
    let iconColor = '#333';

    if (filterStatus === 'online') {
      iconName = 'radio-button-on-outline';
      text = 'Online';
      buttonStyle = [styles.filterButton, styles.filterButtonOnline];
      textStyle = [styles.filterButtonText, styles.filterButtonTextActive];
      iconColor = '#28A745';
    } else if (filterStatus === 'offline') {
      iconName = 'radio-button-off-outline';
      text = 'Offline';
      buttonStyle = [styles.filterButton, styles.filterButtonOffline];
      textStyle = [styles.filterButtonText, styles.filterButtonTextActive];
      iconColor = '#DC3545';
    }

    return (
      <TouchableOpacity style={buttonStyle} onPress={handleFilterChange}>
        <Ionicons name={iconName} size={20} color={iconColor} />
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderQueueItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 1.5 }]}>{item.noTiket}</Text>
      <Text style={[styles.tableCell, { flex: 3 }]}>{item.nama}</Text>
      <Text style={[styles.tableCell, { flex: 2 }]}>{item.status}</Text>
      <Text style={[styles.tableCell, { flex: 2, textAlign: 'right' }]}>{item.waktu}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#F27F0C" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation?.navigate?.('Profile')}
        >
          <Ionicons name="person-circle" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
          <Ionicons name="exit-outline" size={18} color="white" />
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>
      </View>

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
                onPress={() => {
                  setLogoutModalVisible(false);
                  onLogout();
                }}
              >
                <Text style={styles.logoutModalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.welcomeText}>{greeting}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>

          <View style={styles.currentQueueCard}>
            <Text style={styles.currentQueueTitle}>No antrean saat ini:</Text>
            <Text style={styles.currentQueueNumber}>{currentQueueNumber}</Text>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AmbilAntrean')}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.actionButtonText}>Ambil Antrean</Text>
          </TouchableOpacity>

          <Text style={styles.listTitle}>Daftar Antrean</Text>

          <View style={styles.listWrapper}>
            <View style={styles.searchFilterSection}>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Cari data antrean"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#888"
                />
              </View>
              {renderFilterButton()}
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>No Tiket</Text>
                <Text style={[styles.tableHeaderText, { flex: 3 }]}>Nama</Text>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Status</Text>
                <Text style={[styles.tableHeaderText, { flex: 2, textAlign: 'right' }]}>Waktu Datang</Text>
              </View>
              <FlatList
                data={filteredQueueData}
                renderItem={renderQueueItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
