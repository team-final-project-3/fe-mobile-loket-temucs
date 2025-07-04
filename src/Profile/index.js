import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Modal,
  Alert,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import styles from "./style"; // Pastikan path ini benar
import { COLORS } from "../Constant/colors"; // Pastikan path ini benar

// Pastikan path ke gambar header benar
const headerBg = require("../../assets/images/header.png");

const ProfileScreen = ({ navigation, onLogout }) => {
  const [username, setUsername] = useState("Memuat...");
  const [branchAddress, setBranchAddress] = useState("Memuat...");
  const [loading, setLoading] = useState(true);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  // --- PERUBAHAN --- State baru untuk loading saat logout
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        if (onLogout) onLogout();
        return;
      }

      const decoded = jwtDecode(token);
      const loketId = decoded?.loketId;
      if (!loketId) {
        setLoading(false);
        if (onLogout) onLogout();
        return;
      }

      const response = await fetch(
        `https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUsername(data?.loket?.name || "Nama Loket");
        setBranchAddress(
          data?.loket?.branch?.address || "Alamat cabang tidak tersedia"
        );
      } else {
        setUsername("Gagal Memuat");
        setBranchAddress("Gagal Memuat");
        if (response.status === 401 && onLogout) {
          onLogout();
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setUsername("Error");
      setBranchAddress("Error");
    } finally {
      setLoading(false);
    }
  };

  // --- PERUBAHAN --- Logika handleLogout diperbarui
  const handleLogout = async () => {
    setIsLoggingOut(true); // Mulai loading
    try {
      await AsyncStorage.removeItem("userToken");
      // Memberi sedikit jeda agar loading terlihat
      setTimeout(() => {
        if (onLogout) {
          onLogout(); // keluar dari aplikasi
        } else {
          navigation.replace("Login"); // fallback jika onLogout tidak tersedia
        }
      }, 500); // Jeda 500ms
    } catch (error) {
      Alert.alert("Logout Gagal", "Terjadi kesalahan saat logout.");
      console.error("Logout error:", error);
      setIsLoggingOut(false); // Hentikan loading jika gagal
    }
    // Tidak perlu setIsLoggingOut(false) di sini karena komponen akan di-unmount
  };

  useEffect(() => {
    // Menggunakan 'if (onLogout)' untuk memastikan listener hanya ditambahkan jika prop ada
    if (onLogout) {
      const unsubscribe = navigation.addListener("focus", fetchProfileData);
      return unsubscribe;
    }
  }, [navigation, onLogout]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F4F6F8",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Modal
        transparent
        animationType="fade"
        visible={isLogoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentRow}>
              <View style={styles.iconBackground}>
                <Feather name="smile" size={40} color="white" />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>Apakah Anda Yakin?</Text>
                <Text style={styles.modalMessage}>
                  Anda akan keluar dari aplikasi ini
                </Text>
              </View>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModalVisible(false)}
                disabled={isLoggingOut} // Disable tombol batal saat proses logout
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              {/* --- PERUBAHAN --- Tombol Logout diperbarui */}
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutModalButton]}
                onPress={handleLogout}
                disabled={isLoggingOut} // Disable tombol saat proses logout
              >
                {isLoggingOut ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.logoutModalButtonText}>Keluar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={headerBg}
        style={styles.header}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileAvatarWrapper}>
            <Ionicons name="business" size={50} color="#053F5C" />
          </View>
          <Text style={styles.profileName}>{username}</Text>
        </View>
      </ImageBackground>

      <ScrollView
        style={styles.contentBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informasi Loket</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons
                name="location-sharp"
                size={24}
                color={COLORS.PRIMARY_ORANGE}
                style={styles.infoIcon}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Lokasi</Text>
                <Text style={styles.infoValue}>{branchAddress}</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.infoRow}>
              <Ionicons
                name="time-sharp"
                size={24}
                color={COLORS.PRIMARY_ORANGE}
                style={styles.infoIcon}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Jam Operasional</Text>
                <Text style={styles.infoValue}>09:00 - 16:00 WIB</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.logoutBottomButton}
          onPress={() => setLogoutModalVisible(true)}
        >
          <Ionicons
            name="exit-outline"
            size={22}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutBottomButtonText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
