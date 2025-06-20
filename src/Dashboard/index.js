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

const initialQueueData = [
  { id: '1', noTiket: 'B-001', nama: 'Via Uni Rosa Sianipar', status: 'Online', waktu: '17:00 PM' },
  { id: '2', noTiket: 'B-002', nama: 'Budi Santoso', status: 'Offline', waktu: '17:01 PM' },
  { id: '3', noTiket: 'B-003', nama: 'Citra Lestari', status: 'Online', waktu: '17:02 PM' },
  { id: '4', noTiket: 'B-004', nama: 'Dewi Anjani', status: 'Online', waktu: '17:03 PM' },
  { id: '5', noTiket: 'B-005', nama: 'Eka Saputra', status: 'Offline', waktu: '17:04 PM' },
  { id: '6', noTiket: 'B-006', nama: 'Farhan Alvianto', status: 'Online', waktu: '17:05 PM' },
  { id: '7', noTiket: 'B-007', nama: 'Gita Prameswari', status: 'Offline', waktu: '17:06 PM' },
  { id: '8', noTiket: 'B-008', nama: 'Herman Sihombing', status: 'Online', waktu: '17:07 PM' },
  { id: '9', noTiket: 'B-009', nama: 'Indah Kusuma', status: 'Online', waktu: '17:08 PM' },
  { id: '10', noTiket: 'B-010', nama: 'Joko Wibowo', status: 'Offline', waktu: '17:09 PM' },
];

export default function DashboardScreen({ navigation, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [queueData, setQueueData] = useState(initialQueueData);
  const [greeting, setGreeting] = useState('Memuat...');
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [currentQueueNumber, setCurrentQueueNumber] = useState('Memuat...');

  const formattedDate = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id });

  useEffect(() => {
    const fetchGreetingFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('Token tidak ditemukan');

        const decoded = jwtDecode(token);
        const branchId = decoded?.branchId;
        let branchName = decoded.name;

        const response = await fetch(`${API_URL}/api/branch/${branchId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  useEffect(() => {
    const fetchCurrentQueueNumber = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('Token tidak ditemukan');

        const response = await fetch(`${API_URL}/api/queue`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Gagal mengambil data antrean');

        const json = await response.json();
        const data = json.data;

        if (!Array.isArray(data)) throw new Error('Format data tidak sesuai');

        const inProgressQueue = data.filter(item => {
          const logs = item.queueLogs || [];
          if (logs.length === 0) return false;
          const latestLog = logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          return latestLog.status === 'in progress';
        });

        if (inProgressQueue.length > 0) {
          const last = inProgressQueue.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          setCurrentQueueNumber(last.ticketNumber || 'Tidak Diketahui');
        } else if (data.length > 0) {
          const lastQueue = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
          setCurrentQueueNumber(lastQueue.ticketNumber || '0');
        } else {
          setCurrentQueueNumber('0');
        }
      } catch (error) {
        console.error('Gagal mengambil antrean saat ini:', error);
        setCurrentQueueNumber('Gagal memuat');
      }
    };

    fetchCurrentQueueNumber();
  }, []);

  useEffect(() => {
    let filtered = initialQueueData;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.noTiket.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status.toLowerCase() === filterStatus);
    }

    setQueueData(filtered);
  }, [searchQuery, filterStatus]);

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
                data={queueData}
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
