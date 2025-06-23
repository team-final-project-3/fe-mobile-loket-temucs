import React, { useState, useEffect, useCallback } from 'react';
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
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'https://temucs-tzaoj.ondigitalocean.app';
const headerBg = require('../../assets/images/header.png');

export default function DashboardScreen({ navigation, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [queueData, setQueueData] = useState([]);
  const [greeting, setGreeting] = useState('Memuat...');
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [currentQueueNumber, setCurrentQueueNumber] = useState('Memuat...');
  const [decodedToken, setDecodedToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formattedDate = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id });

  const fetchAllData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Token tidak ditemukan');

      const decoded = jwtDecode(token);
      setDecodedToken(decoded);

      const branchId = decoded?.branchId;
      let branchName = decoded.name;

      const branchRes = await fetch(`${API_URL}/api/branch/${branchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (branchRes.ok) {
        const branchData = await branchRes.json();
        branchName = branchData?.name || branchName;
      }

      const hour = new Date().getHours();
      const greetings = hour < 11 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 19 ? 'Selamat Sore' : 'Selamat Malam';
      setGreeting(`${greetings}, ${branchName}`);

      const inProgressRes = await fetch(`${API_URL}/api/queue/inprogress/loket`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (inProgressRes.status === 404) {
        setCurrentQueueNumber('0');
      } else if (inProgressRes.ok) {
        const inProgressData = await inProgressRes.json();
        setCurrentQueueNumber(inProgressData.ticketNumber || '0');
      } else {
        setCurrentQueueNumber('-');
      }

      const waitingRes = await fetch(`${API_URL}/api/queue/waiting/loket`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (waitingRes.ok) {
        const waitingData = await waitingRes.json();
        const formattedData = waitingData.map(item => ({
          id: item.id.toString(),
          noTiket: item.ticketNumber,
          nama: item.name || '-',
          status: item.userId ? 'Online' : 'Offline',
          waktu: format(new Date(item.bookingDate), 'HH:mm', { locale: id }),
        }));
        setQueueData(formattedData);
      } else {
        setQueueData([]);
      }
    } catch (err) {
      console.error('Gagal mengambil data dashboard:', err);
      setGreeting('Selamat Datang');
      setCurrentQueueNumber('-');
      setQueueData([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      fetchAllData();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchAllData();
  }, []);

  const handleRefreshPress = () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      fetchAllData();
    }
  };

  const filteredQueueData = queueData.filter(item => {
    const matchQuery =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.noTiket.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus =
      filterStatus === 'all' || item.status.toLowerCase() === filterStatus;
    return matchQuery && matchStatus;
  });

  const handleFilterChange = () => {
    setFilterStatus(prev =>
      prev === 'all' ? 'online' : prev === 'online' ? 'offline' : 'all'
    );
  };

  const renderFilterButton = () => {
    let icon = 'filter';
    let label = 'Filter';
    let style = styles.filterButton;
    let textStyle = styles.filterButtonText;
    let iconColor = '#333';

    if (filterStatus === 'online') {
      icon = 'radio-button-on-outline';
      label = 'Online';
      style = [styles.filterButton, styles.filterButtonOnline];
      textStyle = [styles.filterButtonText, styles.filterButtonTextActive];
      iconColor = '#28A745';
    } else if (filterStatus === 'offline') {
      icon = 'radio-button-off-outline';
      label = 'Offline';
      style = [styles.filterButton, styles.filterButtonOffline];
      textStyle = [styles.filterButtonText, styles.filterButtonTextActive];
      iconColor = '#DC3545';
    }

    return (
      <TouchableOpacity style={style} onPress={handleFilterChange}>
        <Ionicons name={icon} size={20} color={iconColor} />
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderQueueItem = ({ item }) => {
    const online = item.status === 'Online';
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 2 }]}>{item.noTiket}</Text>
        <Text style={[styles.tableCell, { flex: 3 }]} numberOfLines={1}>{item.nama}</Text>
        <View style={[styles.statusCellContainer, { flex: 2 }]}>
          <View style={[styles.statusBadge, online ? styles.statusBadgeOnline : styles.statusBadgeOffline]}>
            <Text style={online ? styles.statusTextOnline : styles.statusTextOffline}>{item.status}</Text>
          </View>
        </View>
        <Text style={[styles.tableCell, { flex: 1.5, textAlign: 'right' }]}>{item.waktu}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F4F8' }}>
        <ActivityIndicator size="large" color="#053F5C" />
        <Text style={{ marginTop: 15, fontSize: 16, color: '#053F5C' }}>Memuat Data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutModalVisible(true)}>
          <Ionicons name="exit-outline" size={18} color="white" />
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Modal transparent animationType="fade" visible={isLogoutModalVisible} onRequestClose={() => setLogoutModalVisible(false)}>
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
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.logoutModalButton]} onPress={() => { setLogoutModalVisible(false); onLogout(); }}>
                <Text style={styles.logoutModalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#053F5C", "#28A745"]} />}>
        <View style={styles.contentWrapper}>
          <Text style={styles.welcomeText}>{greeting}</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>

          <View style={styles.currentQueueCard}>
            <Text style={styles.currentQueueTitle}>No antrean saat ini:</Text>
            <Text style={styles.currentQueueNumber}>{currentQueueNumber}</Text>
          </View>

          <TouchableOpacity style={[styles.refreshButton, isRefreshing && styles.buttonDisabled]} onPress={handleRefreshPress} disabled={isRefreshing}>
            {isRefreshing ? <ActivityIndicator size="small" color="white" /> : <><Ionicons name="refresh" size={15} color="white" /><Text style={styles.refreshButtonText}>Update Antrean</Text></>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AmbilAntrean')}>
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
                  placeholder="Cari nama atau no. tiket"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#888"
                />
              </View>
              {renderFilterButton()}
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>No Tiket</Text>
                <Text style={[styles.tableHeaderText, { flex: 3 }]}>Nama</Text>
                <Text style={[styles.tableHeaderText, { flex: 2 }]}>Status</Text>
                <Text style={[styles.tableHeaderText, { flex: 1.5, textAlign: 'right' }]}>Waktu</Text>
              </View>
              {filteredQueueData.length > 0 ? (
                <FlatList
                  data={filteredQueueData}
                  renderItem={renderQueueItem}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.emptyListText}>Tidak ada antrean.</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
