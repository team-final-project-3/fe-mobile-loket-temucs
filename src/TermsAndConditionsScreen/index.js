// /screens/TermsAndConditions/index.js
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import termsStyles from './style';

export default function TermsAndConditionsScreen({ navigation }) {
  const handleAgree = () => {
    navigation.goBack(); // Kembali ke layar sebelumnya (misalnya LoginScreen)
  };

  return (
    <SafeAreaView style={termsStyles.container}>
      {/* Header */}
      <View style={termsStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={termsStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={termsStyles.headerTitle}>Syarat & Ketentuan</Text>
      </View>

      {/* Content Card */}
      <View style={termsStyles.card}>
        <ScrollView contentContainerStyle={termsStyles.scrollViewContent}>
          <Text style={termsStyles.cardTitle}>SYARAT DAN KETENTUAN PENGGUNAAN TEMUCS</Text>

          <Text style={termsStyles.sectionTitle}>1. Pengantar</Text>
          <Text style={termsStyles.paragraph}>
            Aplikasi ini disediakan oleh TemuCS untuk memudahkan pengguna melakukan pemesanan layanan tanpa harus menunggu lama di tempat.
          </Text>

          <Text style={termsStyles.sectionTitle}>2. Penggunaan Aplikasi</Text>
          <Text style={termsStyles.paragraph}>
            Pengguna wajib memasukkan data dengan benar dan tidak menyalahgunakan sistem.
          </Text>

          <Text style={termsStyles.sectionTitle}>3. Hak dan Kewajiban</Text>
          <Text style={termsStyles.bulletPoint}>
            • Pengguna bertanggung jawab atas akun mereka.
          </Text>
          <Text style={termsStyles.bulletPoint}>
            • TemuCS berhak menghentikan akses jika terdapat pelanggaran.
          </Text>

          <Text style={termsStyles.sectionTitle}>4. Pengumpulan Data</Text>
          <Text style={termsStyles.paragraph}>
            Kami mengumpulkan data seperti nama dan nomor telepon untuk keperluan verifikasi dan layanan.
          </Text>
        </ScrollView>

        <TouchableOpacity style={termsStyles.agreeButton} onPress={handleAgree}>
          <Text style={termsStyles.agreeButtonText}>Saya Setuju</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
