import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "base-64";
import styles from "./style";
import { COLORS } from "../Constant/colors";

const headerBg = require("../../assets/images/header.png");

const InputError = ({ error }) =>
  error ? (
    <Text style={{ color: COLORS.ERROR || "red", fontSize: 12, marginTop: 4 }}>
      {error}
    </Text>
  ) : null;

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
        if (!token) return setLoadingProfile(false);

        const decoded = JSON.parse(base64.decode(token.split(".")[1]));
        const loketId = decoded?.loketId;
        if (!loketId) return setLoadingProfile(false);

        const headers = { Authorization: `Bearer ${token}` };

        const profileRes = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`,
          { headers }
        );
        const profileData = await profileRes.json();
        if (!profileRes.ok) return setLoadingProfile(false);

        setBranchName(profileData?.loket?.name || "Nama Cabang");
        setBranchAddress(
          profileData?.loket?.branch?.address || "Alamat belum tersedia"
        );

        const inProgressRes = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket`,
          { headers }
        );
        if (inProgressRes.status === 404) {
          setLastInProgressTicket("-");
        } else {
          const inProgressData = await inProgressRes.json();
          setLastInProgressTicket(inProgressData?.ticketNumber || "-");
        }

        const countRes = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/queue/count/loket`,
          { headers }
        );
        const countData = await countRes.json();
        setTotalQueue(countData?.totalQueue ?? "-");
      } catch (error) {
        Alert.alert("Error", "Gagal memuat data.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfileData();
  }, []);

  const validateName = (name) => {
    if (!name.trim()) return "Nama lengkap tidak boleh kosong.";
    return "";
  };

  const validateEmail = (email, noTelp) => {
    const trimmedEmail = email.trim();
    const trimmedNoTelp = noTelp.trim();

    if (!trimmedEmail && !trimmedNoTelp)
      return "Email atau No Telepon wajib diisi";

    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) return "Format email tidak valid";
    }

    return "";
  };

  const validatePhone = (phone) => {
    if (!/^\d+$/.test(phone)) return "";
    if (phone.length < 8 || phone.length > 15) return "";
    return "";
  };

  const handleAmbilAntrean = () => {
    const nameErr = validateName(namaLengkap);
    const emailErr = validateEmail(email, noTelepon);
    const phoneErr = validatePhone(noTelepon);

    setNamaError(nameErr);
    setEmailError(emailErr);
    setPhoneError(phoneErr);

    if (nameErr || emailErr || phoneErr) return;

    navigation.navigate("LayananAntrean", {
      namaLengkap: namaLengkap.trim(),
      email: email.trim(),
      noTelepon: noTelepon.trim(),
    });
  };

  if (loadingProfile) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE} />
      </SafeAreaView>
    );
  }

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
          <Ionicons name="chevron-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambil Antrean</Text>
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.contentWrapper}>
            <View style={styles.branchInfoCard}>
              <Text style={styles.branchName}>{branchName}</Text>
              <Text style={styles.branchAddress}>{branchAddress}</Text>
            </View>

            <View style={styles.queueStatsContainer}>
              <View style={[styles.statBox, styles.borderServed]}>
                <Text style={styles.statLabel}>Sedang Dilayani</Text>
                <Text style={[styles.statValue, styles.valueServed]}>
                  {lastInProgressTicket}
                </Text>
              </View>
              <View style={[styles.statBox, styles.borderTotal]}>
                <Text style={styles.statLabel}>Total Antrian</Text>
                <Text style={[styles.statValue, styles.valueTotal]}>
                  {totalQueue}
                </Text>
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
                    setNamaLengkap(text);
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
                    setEmail(text);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="Masukkan email Anda"
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
                <Text style={styles.inputLabel}>No Telepon *</Text>
                <TextInput
                  style={[styles.input, phoneError ? styles.inputError : null]}
                  value={noTelepon}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/[^0-9]/g, "");
                    setNoTelepon(cleaned);
                    if (phoneError) setPhoneError("");
                  }}
                  placeholder="Masukkan No Telepon Anda"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  maxLength={15}
                />
                <InputError error={phoneError} />
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAmbilAntrean}
            >
              <Text style={styles.submitButtonText}>Lanjutkan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AmbilAntreanScreen;
