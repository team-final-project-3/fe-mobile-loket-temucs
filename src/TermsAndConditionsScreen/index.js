import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable"; // Import Animatable
import styles from "./style";

const headerBg = require("../../assets/images/header.png");

export default function TermsAndConditionsScreen({ navigation }) {
  const handleAgree = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <ImageBackground
        source={headerBg}
        style={styles.header}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Syarat & Ketentuan</Text>
      </ImageBackground>

      {/* --- PERUBAHAN --- Konten dibungkus dengan Animatable.View */}
      <Animatable.View
        style={styles.contentBody}
        animation="fadeInUp"
        duration={800}
        delay={200}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>
            Ketentuan Penggunaan Aplikasi TemuCS
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Pengantar</Text>
            <Text style={styles.paragraph}>
              Selamat datang di TemuCS. Dengan menggunakan aplikasi ini, Anda
              setuju untuk terikat oleh syarat dan ketentuan yang ditetapkan.
              Aplikasi ini bertujuan untuk memudahkan Anda dalam memesan layanan
              secara online untuk menghindari antrean panjang.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Kewajiban Pengguna</Text>
            <Text style={styles.paragraph}>
              Anda bertanggung jawab untuk memberikan informasi yang akurat dan
              benar saat melakukan pendaftaran dan pemesanan. Dilarang keras
              menyalahgunakan aplikasi untuk tujuan yang melanggar hukum atau
              merugikan pihak lain.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Privasi dan Data</Text>
            <Text style={styles.paragraph}>
              Kami berkomitmen untuk melindungi privasi Anda. Data pribadi
              seperti nama, email, dan nomor telepon yang kami kumpulkan hanya
              akan digunakan untuk keperluan verifikasi, komunikasi terkait
              layanan, dan peningkatan kualitas aplikasi. Kami tidak akan
              membagikan data Anda kepada pihak ketiga tanpa persetujuan Anda,
              kecuali diwajibkan oleh hukum.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              4. Pembatasan Tanggung Jawab
            </Text>
            <Text style={styles.paragraph}>
              TemuCS tidak bertanggung jawab atas kerugian tidak langsung yang
              mungkin timbul dari penggunaan atau ketidakmampuan untuk
              menggunakan aplikasi. Layanan disediakan "sebagaimana adanya"
              tanpa jaminan apa pun.
            </Text>
          </View>
        </ScrollView>
      </Animatable.View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
          <Text style={styles.agreeButtonText}>Saya Mengerti dan Setuju</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
