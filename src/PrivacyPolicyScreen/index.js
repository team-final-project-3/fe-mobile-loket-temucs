import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import privacyStyles from './style';

export default function PrivacyPolicyScreen({ navigation }) {
  const handleUnderstand = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={privacyStyles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header dengan background batik */}
      <ImageBackground
        source={require('../../assets/images/header.png')}
        style={privacyStyles.headerImage}
        resizeMode="cover"
      >
        <View style={privacyStyles.headerOverlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={privacyStyles.backButton}>
            <Ionicons name="chevron-back-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={privacyStyles.headerTitle}>Kebijakan Privasi</Text>
        </View>
      </ImageBackground>

      {/* Content Card */}
      <View style={privacyStyles.card}>
        <ScrollView contentContainerStyle={privacyStyles.scrollViewContent}>
          <Text style={privacyStyles.cardTitle}>KEBIJAKAN PRIVASI TEMUCS</Text>

          <Text style={privacyStyles.sectionTitle}>1. Data yang Dikumpulkan</Text>
          <Text style={privacyStyles.paragraph}>Kami mengumpulkan informasi berikut dari pengguna:</Text>
          <Text style={privacyStyles.bulletPoint}>• Nama lengkap</Text>
          <Text style={privacyStyles.bulletPoint}>• Nomor telepon</Text>
          <Text style={privacyStyles.bulletPoint}>• Lokasi kantor cabang yang dipilih</Text>

          <Text style={privacyStyles.sectionTitle}>2. Penggunaan Data</Text>
          <Text style={privacyStyles.paragraph}>Data pribadi Anda digunakan untuk:</Text>
          <Text style={privacyStyles.bulletPoint}>• Verifikasi identitas</Text>
          <Text style={privacyStyles.bulletPoint}>• Mengambil nomor antrean</Text>
          <Text style={privacyStyles.bulletPoint}>• Menghubungi pengguna bila diperlukan</Text>

          <Text style={privacyStyles.sectionTitle}>3. Penyimpanan & Keamanan Data</Text>
          <Text style={privacyStyles.bulletPoint}>• Data disimpan secara terenkripsi</Text>
          <Text style={privacyStyles.bulletPoint}>• Tidak dibagikan kepada pihak ketiga tanpa izin Anda</Text>
          <Text style={privacyStyles.bulletPoint}>• Kami berkomitmen menjaga kerahasiaan data pengguna</Text>

          <Text style={privacyStyles.sectionTitle}>4. Hak Pengguna</Text>
          <Text style={privacyStyles.bulletPoint}>• Anda berhak mengakses, memperbarui, dan menghapus data pribadi Anda kapan saja</Text>
          <Text style={privacyStyles.bulletPoint}>• Permintaan dapat dilakukan melalui kontak resmi TemuCS</Text>

          <TouchableOpacity style={privacyStyles.understandButton} onPress={handleUnderstand}>
            <Text style={privacyStyles.understandButtonText}>Saya Mengerti</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
