import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// [PERUBAHAN] Mengimpor style dari file terpisah
import styles from './style';

// --- KOMPONEN LAYAR ---
export default function TermsAndConditionsScreen({ navigation }) {
  const handleAgree = () => {
    navigation.goBack(); // Kembali ke layar sebelumnya
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header dengan gambar */}
      <ImageBackground
        // Pastikan path ke aset gambar sudah benar
        source={require('../../assets/images/header.png')}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={24} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Syarat & Ketentuan</Text>
        </View>
      </ImageBackground>

      {/* Konten Kartu */}
      <View style={styles.card}>
        <ScrollView 
            contentContainerStyle={styles.scrollViewContent} 
            showsVerticalScrollIndicator={false}
        >
          <Text style={styles.cardTitle}>SYARAT DAN KETENTUAN PENGGUNAAN TEMUCS</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Pengantar</Text>
            <Text style={styles.paragraph}>
              Aplikasi ini disediakan oleh TemuCS untuk memudahkan pengguna melakukan pemesanan layanan secara praktis tanpa harus menunggu lama di tempat layanan.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Penggunaan Aplikasi</Text>
            <Text style={styles.paragraph}>
              Pengguna wajib memasukkan data dengan benar, tidak menyalahgunakan sistem, serta bertanggung jawab atas data yang diberikan.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Hak dan Kewajiban</Text>
            <Text style={styles.bulletPoint}>• Pengguna bertanggung jawab penuh atas akun yang dimiliki.</Text>
            <Text style={styles.bulletPoint}>• TemuCS berhak menghentikan akses pengguna jika terjadi pelanggaran terhadap ketentuan yang berlaku.</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Pengumpulan Data</Text>
            <Text style={styles.paragraph}>
              Kami mengumpulkan data seperti nama dan nomor telepon untuk keperluan verifikasi, layanan pelanggan, dan peningkatan kualitas layanan.
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* Spacer View untuk mendorong kartu ke atas */}
      <View style={{ flex: 1 }} />

      {/* Tombol "Saya Setuju" yang mengambang di kanan bawah */}
      <View style={styles.agreeButtonContainer}>
        <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
          <Text style={styles.agreeButtonText}>Saya Setuju</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
