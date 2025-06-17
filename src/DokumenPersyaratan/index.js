import React, { useState } from 'react';
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
import styles from './style';
import { COLORS } from '../Constant/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const DokumenPersyaratanScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { selectedServices } = route.params || {};

  const handleConfirmAmbilAntrean = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 300);
  };

  const handleLihatTiket = () => {
    setShowSuccessModal(false);
    navigation.navigate('Ticket'); // Pastikan 'Ticket' sesuai dengan nama di Stack.Screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY_ORANGE} />

      {/* Modal Konfirmasi */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentRow}>
              <View style={styles.modalIconWrapper}>
                <MaterialCommunityIcons
                  name="emoticon-confused-outline"
                  size={45}
                  color="#fff"
                />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>Apakah Anda Yakin?</Text>
                <Text style={styles.modalMessage}>Anda akan membuat antrean baru</Text>
              </View>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmAmbilAntrean}
              >
                <Text style={styles.confirmButtonText}>Lanjutkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Sukses */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={styles.successIconWrapper}>
                <FontAwesome6 name="smile-beam" size={40} color="white" />
              </View>
              <Text style={styles.successTitle}>Antrian Berhasil Dibuat</Text>
            </View>
            <TouchableOpacity
              style={styles.successButton}
              onPress={handleLihatTiket}
            >
              <Text style={styles.successButtonText}>Lihat Tiket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header Navigasi */}
      <View style={styles.navigationHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambil Antrean</Text>
      </View>

      {/* Konten Utama */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Dokumen Persyaratan</Text>

        <View style={styles.card}>
          <Text style={styles.infoText}>Mohon untuk mempersiapkan dokumen-dokumen berikut ini.</Text>

          <View style={styles.documentList}>
            <View style={styles.documentItem}>
              <Text style={styles.documentText}>KTP (Kartu Tanda Penduduk) Asli</Text>
            </View>
            <View style={styles.documentItem}>
              <Text style={styles.documentText}>KK (Kartu Keluarga)</Text>
            </View>
            <View style={styles.documentItem}>
              <Text style={styles.documentText}>NPWP (Nomor Pokok Wajib Pajak)</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.submitButtonText}>Ambil Antrean</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DokumenPersyaratanScreen;
