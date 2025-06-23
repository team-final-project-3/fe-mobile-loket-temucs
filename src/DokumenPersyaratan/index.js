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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


import styles from './style';

// Path ke gambar header
const headerBg = require('../../assets/images/header.png');

const DokumenPersyaratanScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const { selectedServices, namaLengkap, email, noTelepon } = route.params || {};
  const queueIdRef = useRef(null);

  // ... (Logika fetch dan handle tetap sama)
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedServices || selectedServices.length === 0) {
        setDocuments([]);
        return;
      }
      setLoading(true);
      try {
        const serviceIds = selectedServices.map(service => service.id);
        
        // --- FETCH ASLI (Gunakan ini di produksi) ---
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
        const docs = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
        setDocuments(docs);
        // --- END FETCH ASLI ---

      } catch (error) {
         Alert.alert('Error', error.message);
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
        email: email || undefined, // Kirim undefined jika kosong
        phoneNumber: noTelepon || undefined, // Kirim undefined jika kosong
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
    navigation.popToTop(); // Kembali ke halaman paling awal (Dashboard)
    navigation.navigate('Ticket', { queueId: queueIdRef.current });
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

      {/* Header dibuat lebih tinggi dan bersih */}
      <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Konfirmasi Layanan</Text>
      </ImageBackground>
      
      {/* Modal konfirmasi */}
      <Modal transparent animationType="fade" visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        {/* ... (Konten Modal Konfirmasi tidak diubah) */}
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
               <TouchableOpacity style={[styles.modalButton, styles.confirmButton]} onPress={handleConfirmAmbilAntrean} disabled={isBooking}>
                {isBooking ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmButtonText}>Lanjutkan</Text>}
               </TouchableOpacity>
             </View>
           </View>
         </View>
      </Modal>

      {/* Modal sukses */}
      <Modal transparent animationType="fade" visible={showSuccessModal} onRequestClose={handleLihatTiket}>
        {/* ... (Konten Modal Sukses tidak diubah) */}
         <View style={styles.modalOverlay}>
           <View style={styles.modalContainer}>
             <View style={{ alignItems: 'center', marginBottom: 20 }}>
               <View style={styles.successIconWrapper}>
                <FontAwesome5 name="smile-beam" size={48} color={'white'} />
               </View>
               <Text style={styles.successTitle}>Antrean Berhasil Dibuat!</Text>
                <Text style={styles.modalMessage}>Silahkan lihat tiket Anda</Text>
             </View>
             <TouchableOpacity style={styles.successButton} onPress={handleLihatTiket}>
               <Text style={styles.successButtonText}>Lihat Tiket</Text>
             </TouchableOpacity>
           </View>
         </View>
      </Modal>
      
      {/* Konten utama dengan layout "sheet" */}
      <View style={styles.contentBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.mainTitle}>Dokumen Persyaratan</Text>
          <Text style={styles.infoText}>
            Untuk mempercepat proses layanan, mohon menyiapkan dokumen-dokumen berikut ini.
          </Text>

          <View style={styles.card}>
            {loading ? (
              <ActivityIndicator size="large" color="#E38E39" style={{ marginVertical: 40 }} />
            ) : (
              documents.length === 0 ? (
                <Text style={styles.noDocumentText}>Tidak ada dokumen persyaratan khusus untuk layanan yang Anda pilih.</Text>
              ) : (
                documents.map((doc, index) => (
                  <View key={doc.id || index} style={styles.documentItem}>
                    <Ionicons name="checkmark-circle" size={22} color="#28A745" />
                    <Text style={styles.documentText}>{doc.name || doc.title || 'Dokumen'}</Text>
                  </View>
                ))
              )
            )}
          </View>
        </ScrollView>
        
        {/* Tombol Aksi diletakkan di bawah */}
        <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.submitButton, isBooking && styles.submitButtonDisabled]}
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
      </View>
    </SafeAreaView>
  );
};

export default DokumenPersyaratanScreen;