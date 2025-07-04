import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "base-64";
import styles from "./style";
import { COLORS } from "../Constant/colors";

const API_URL = "https://temucs-tzaoj.ondigitalocean.app";
const headerBg = require("../../assets/images/header.png");

const InputError = ({ error }) =>
  error ? <Text style={styles.errorText}>{error}</Text> : null;

const AmbilAntreanScreen = ({ navigation }) => {
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");

  const [namaError, setNamaError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [lastInProgressTicket, setLastInProgressTicket] = useState("Memuat...");
  const [totalQueue, setTotalQueue] = useState("Memuat...");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("Autentikasi Gagal", "Sesi Anda berakhir, silakan login kembali.", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
          return;
        }

        const decoded = JSON.parse(base64.decode(token.split(".")[1]));
        const loketId = decoded?.loketId;
        if (!loketId) {
          Alert.alert("Error", "ID Loket tidak valid.", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, inProgressRes, countRes] = await Promise.all([
            fetch(`${API_URL}/api/loket/${loketId}/profile`, { headers }),
            fetch(`${API_URL}/api/queue/inprogress/loket`, { headers }),
            fetch(`${API_URL}/api/queue/count/loket`, { headers })
        ]);

        if (profileRes.ok) {
            const profileData = await profileRes.json();
            setBranchName(profileData?.loket?.name || "Nama Cabang");
            setBranchAddress(profileData?.loket?.branch?.address || "Alamat belum tersedia");
        }

        if (inProgressRes.status === 404) {
          setLastInProgressTicket("-");
        } else if (inProgressRes.ok) {
          const inProgressData = await inProgressRes.json();
          setLastInProgressTicket(inProgressData?.ticketNumber || "-");
        }

        if (countRes.ok) {
            const countData = await countRes.json();
            setTotalQueue(countData?.totalQueue ?? "-");
        }

      } catch (error) {
        console.error("Fetch Profile Error:", error);
        Alert.alert("Error", "Gagal memuat data dari server.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, [navigation]);

  const validateInput = () => {
    setNamaError("");
    setEmailError("");
    setPhoneError("");
    let isValid = true;

    if (!namaLengkap.trim()) {
        setNamaError("Nama lengkap tidak boleh kosong.");
        isValid = false;
    }

    const emailVal = email.trim();
    const phoneVal = noTelepon.trim();

    if (!emailVal && !phoneVal) {
        setEmailError("Email atau No Telepon wajib diisi.");
        setPhoneError("Email atau No Telepon wajib diisi.");
        isValid = false;
    } else {
        if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            setEmailError('Format email tidak valid.');
            isValid = false;
        }
        if (phoneVal && (phoneVal.length < 8 || phoneVal.length > 15)) {
            setPhoneError("No Telepon harus antara 8-15 digit.");
            isValid = false;
        }
    }

    return isValid;
  };

  const handleAmbilAntrean = () => {
    if (!validateInput()) return;

    navigation.navigate("LayananAntrean", {
      namaLengkap: namaLengkap.trim(),
      email: email.trim(),
      noTelepon: noTelepon.trim(),
    });
  };

  if (loadingProfile) {
    return (
      <View style={[ styles.container, { justifyContent: "center", alignItems: "center" }]} >
        <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE || '#F27F0C'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground source={headerBg} style={{ width: "100%" }} resizeMode="cover">
        <View
          style={{
            paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 44,
            paddingBottom: 10,
          }}
        >
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            paddingHorizontal: 10,
          }}>
            <View style={{ width: 40 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ padding: 5 }}
              >
                <Ionicons name="chevron-back-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.headerTitle}>Ambil Antrean</Text>
            </View>

            <View style={{ width: 40 }} />
          </View>
        </View>
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentWrapper}>
              <View style={styles.branchInfoCard}>
                <Text style={styles.branchName}>{branchName}</Text>
                <Text style={styles.branchAddress}>{branchAddress}</Text>
              </View>

              <View style={styles.queueStatsContainer}>
                <View style={[styles.statBox, styles.borderServed]}>
                  <Text style={styles.statLabel}>Sedang Dilayani</Text>
                  <Text style={[styles.statValue, styles.valueServed]}>{lastInProgressTicket}</Text>
                </View>
                <View style={[styles.statBox, styles.borderTotal]}>
                  <Text style={styles.statLabel}>Total Antrean</Text>
                  <Text style={[styles.statValue, styles.valueTotal]}>{totalQueue}</Text>
                </View>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>DATA NASABAH</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nama Lengkap *</Text>
                  <TextInput
                    style={[styles.input, namaError ? styles.inputError : null]}
                    value={namaLengkap}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/[^a-zA-Z\s.,']/g, '');
                      setNamaLengkap(cleaned);
                      if (namaError) setNamaError("");
                    }}
                    placeholder="Masukkan nama lengkap Anda"
                    placeholderTextColor="#999"
                  />
                  <InputError error={namaError} />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={[styles.input, emailError ? styles.inputError : null]}
                    value={email}
                    onChangeText={(text) => {
                      // --- MODIFIKASI DIMULAI DI SINI ---
                      // Menghapus karakter non-ASCII (termasuk emoji) dan semua spasi
                      const cleaned = text.replace(/[^\x20-\x7E]/g, '').replace(/\s/g, '');
                      setEmail(cleaned);
                      if(emailError) setEmailError("");
                      if(phoneError) setPhoneError("");
                      // --- AKHIR MODIFIKASI ---
                    }}
                    placeholder="contoh: email@domain.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <InputError error={emailError} />
                </View>

                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Atau</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>No Telepon</Text>
                  <TextInput
                    style={[styles.input, phoneError ? styles.inputError : null]}
                    value={noTelepon}
                    onChangeText={(text) => {
                      const cleaned = text.replace(/[^0-9]/g, "");
                      setNoTelepon(cleaned);
                      if(phoneError) setPhoneError("");
                      if(emailError) setEmailError("");
                    }}
                    placeholder="Masukkan No Telepon Anda"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    maxLength={15}
                  />
                  <InputError error={phoneError} />
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.footer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleAmbilAntrean}>
                <Text style={styles.submitButtonText}>Lanjutkan</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AmbilAntreanScreen;
