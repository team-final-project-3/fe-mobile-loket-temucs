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
import * as Animatable from "react-native-animatable";
import styles from "./style";

const headerBg = require("../../assets/images/header.png");

const privacyData = [
  {
    icon: "document-text-outline",
    title: "1. Data yang Kami Kumpulkan",
    content: [
      "Nama lengkap untuk identifikasi.",
      "Nomor telepon dan/atau email untuk verifikasi dan komunikasi.",
      "Informasi layanan dan kantor cabang yang Anda pilih.",
    ],
  },
  {
    icon: "server-outline",
    title: "2. Bagaimana Kami Menggunakan Data Anda",
    content: [
      "Memproses pendaftaran dan pemesanan nomor antrean Anda.",
      "Mengirimkan notifikasi dan informasi terkait status antrean.",
      "Menghubungi Anda untuk konfirmasi atau jika terjadi kendala layanan.",
      "Menganalisis data secara anonim untuk peningkatan kualitas aplikasi.",
    ],
  },
  {
    icon: "shield-checkmark-outline",
    title: "3. Keamanan dan Penyimpanan Data",
    content: [
      "Semua data pribadi Anda disimpan dalam server yang aman dan dienkripsi.",
      "Kami tidak akan pernah menjual atau membagikan data Anda kepada pihak ketiga untuk tujuan pemasaran tanpa persetujuan eksplisit Anda.",
      "Akses ke data pribadi dibatasi hanya untuk personel yang berwenang.",
    ],
  },
  {
    icon: "person-circle-outline",
    title: "4. Hak Anda Sebagai Pengguna",
    content: [
      "Anda berhak untuk mengakses dan meninjau data pribadi yang kami simpan.",
      "Anda dapat meminta koreksi atau penghapusan data Anda sesuai dengan ketentuan yang berlaku.",
    ],
  },
];

export default function PrivacyPolicyScreen({ navigation }) {
  const handleUnderstand = () => {
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
          <Ionicons name="arrow-back" size={28} color={"#FFF"} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kebijakan Privasi</Text>
      </ImageBackground>

      {/* [PENINGKATAN] Bungkus konten dengan Animatable.View untuk efek fade-in */}
      <Animatable.View
        style={styles.contentBody}
        animation="fadeInUp"
        duration={800}
        delay={200}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {privacyData.map((section, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name={section.icon} size={22} color="#053F5C" />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              {section.content.map((point, pointIndex) => (
                <View key={pointIndex} style={styles.bulletPointContainer}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletPointText}>{point}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </Animatable.View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.understandButton}
          onPress={handleUnderstand}
        >
          <Text style={styles.understandButtonText}>Saya Mengerti</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
