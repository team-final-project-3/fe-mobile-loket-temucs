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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; // Impor FontAwesome5
import styles from './style';
import { COLORS } from '../Constant/colors';

// Menerima 'navigation' dan 'route' untuk data dinamis
const TicketScreen = ({ navigation, route }) => {
  // State untuk mengontrol visibilitas modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Ambil data tiket dari parameter route, atau gunakan nilai default
  const { ticketData } = route.params || { 
    ticketData: { 
      ticketNumber: 'B-0010', 
      date: '16/06/2025' 
    } 
  };

  // Fungsi untuk kembali ke halaman utama (Dashboard)
  const handleBackToHome = () => {
      setIsModalVisible(false); // Tutup modal dulu
      navigation.popToTop();   // Kembali ke layar paling atas di stack
  };

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
        <Text style={styles.officeName}>BNI Kota</Text>
        <Text style={styles.officeAddress}>Jl. Jendral Sudirman No. 58, Jakarta Pusat</Text>

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
          <Text style={styles.branchText}>Kantor Cabang BNI - Kota</Text>
          <Text style={styles.ticketLabel}>Nomor Antrian Anda</Text>
          <Text style={styles.ticketNumber}>{ticketData.ticketNumber}</Text>
          <Text style={styles.dateText}>Tanggal Ambil Antrean: {ticketData.date}</Text>
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
