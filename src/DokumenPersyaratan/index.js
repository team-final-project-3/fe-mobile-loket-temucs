import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import base64 from 'base-64';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import styles from './style';
import { COLORS } from '../Constant/colors';

const headerBg = require('../../assets/images/header.png');

const DokumenPersyaratanScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [queueId, setQueueId] = useState(null);
  const { selectedServices, namaLengkap, email, noTelepon } = route.params || {};
  const queueIdRef = useRef(null);

  const getDocumentsByServiceIds = async (serviceIds) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');

      const response = await fetch('https://temucs-tzaoj.ondigitalocean.app/api/documents/by-services/loket', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serviceIds }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gagal mengambil dokumen: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      Alert.alert('Error', error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedServices || selectedServices.length === 0) {
        setDocuments([]);
        return;
      }
      setLoading(true);
      try {
        const serviceIds = selectedServices.map(service => service.id);
        const docs = await getDocumentsByServiceIds(serviceIds);
        setDocuments(docs);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [selectedServices]);

  const handleConfirmAmbilAntrean = async () => {
    setIsModalVisible(false);
    setIsBooking(true);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Otentikasi gagal. Silakan login kembali.');

      const decoded = JSON.parse(base64.decode(token.split('.')[1]));
      const loketId = decoded?.loketId;
      const branchId = decoded?.branchId;

      if (!loketId || !branchId) throw new Error('ID Loket atau Branch tidak ditemukan di token.');

      const serviceIds = selectedServices.map(service => service.id);

      const payload = {
        name: namaLengkap,
        loketId,
        branchId,
        serviceIds,
        email: email || '',
        phoneNumber: noTelepon || '',
      };

      const response = await fetch('https://temucs-tzaoj.ondigitalocean.app/api/queue/book-offline', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.message || 'Terjadi kesalahan saat membuat antrean.');
      }

      setQueueId(responseJson.queue.id);
      queueIdRef.current = responseJson.queue.id || null;
      setShowSuccessModal(true);

    } catch (error) {
      Alert.alert('Gagal Membuat Antrean', error.message);
    } finally {
      setIsBooking(false);
    }
  };

  const handleLihatTiket = () => {
    setShowSuccessModal(false);
    if (queueIdRef.current) {
      navigation.navigate('Ticket', { queueId: queueIdRef.current });
    } else {
      navigation.navigate('Ticket');
    }
  };

  const handleAmbilAntreanPress = () => {
    if (!namaLengkap || namaLengkap.trim() === '') {
      Alert.alert('Error', 'Nama lengkap tidak boleh kosong.');
      return;
    }
    if (!selectedServices || selectedServices.length === 0) {
      Alert.alert('Error', 'Silakan pilih minimal satu layanan.');
      return;
    }
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ImageBackground source={headerBg} style={styles.navigationHeader} resizeMode="cover">
        <View style={styles.overlay} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambil Antrean</Text>
      </ImageBackground>

      <Modal transparent animationType="fade" visible={isModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentRow}>
              <View style={styles.modalIconWrapper}>
                <MaterialCommunityIcons name="emoticon-confused-outline" size={45} color="#fff" />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>Apakah Anda Yakin?</Text>
                <Text style={styles.modalMessage}>Anda akan membuat antrean baru</Text>
              </View>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleConfirmAmbilAntrean}>
                <Text style={styles.confirmButtonText}>Lanjutkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent animationType="fade" visible={showSuccessModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={styles.successIconWrapper}>
                <FontAwesome6 name="smile-beam" size={40} color="white" />
              </View>
              <Text style={styles.successTitle}>Antrean Berhasil Dibuat</Text>
            </View>
            <TouchableOpacity style={styles.successButton} onPress={handleLihatTiket}>
              <Text style={styles.successButtonText}>Lihat Tiket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Dokumen Persyaratan</Text>
        <View style={styles.card}>
          <Text style={styles.infoText}>Mohon untuk mempersiapkan dokumen-dokumen berikut ini.</Text>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE} style={{ marginTop: 20 }} />
          ) : (
            <ScrollView style={styles.documentList}>
              {documents.length === 0 ? (
                <Text style={styles.documentText}>Tidak ada dokumen persyaratan.</Text>
              ) : (
                documents.map((doc) => (
                  <View key={doc.id} style={styles.documentItem}>
                    <Text style={styles.documentText}>{doc.name || doc.title || 'Dokumen'}</Text>
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isBooking && { backgroundColor: '#ccc' }]}
          onPress={handleAmbilAntreanPress}
          disabled={isBooking}
        >
          {isBooking ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Ambil Antrean</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DokumenPersyaratanScreen;
