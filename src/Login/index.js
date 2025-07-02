import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const logoPath = require("../../assets/images/icons.png");
const bgPattern = require("../../assets/images/header.png");

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    const cleanedUsername = username.trim();
    const cleanedPassword = password.trim();
    let isValid = true;

    setUsernameError("");
    setPasswordError("");

    if (cleanedUsername === "") {
      setUsernameError("Username tidak boleh kosong");
      isValid = false;
    }
    if (cleanedPassword === "") {
      setPasswordError("Kata sandi tidak boleh kosong");
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://temucs-tzaoj.ondigitalocean.app/api/loket/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: cleanedUsername,
            password: cleanedPassword,
          }),
        }
      );

      const data = await response.json();
      const timestamp = new Date().toISOString();

      if (response.ok) {
        const loket = data.loket || data.user || {};

        await AsyncStorage.setItem("userToken", data.token ?? "");
        await AsyncStorage.setItem("loketId", String(loket?.id ?? ""));
        await AsyncStorage.setItem("username", loket?.username ?? "");
        await AsyncStorage.setItem("loketName", loket?.name ?? "");
        await AsyncStorage.setItem("branchName", loket?.branch?.name ?? "");
        await AsyncStorage.setItem(
          "branchAddress",
          loket?.branch?.address ?? ""
        );

        // ✅ Log tunggal untuk message dan token
        console.log(`[LOGIN SUCCESS] ${data.message} | Token: ${data.token}`);

        onLoginSuccess();
      } else {
        const errorMessage = data.message || "Username atau kata sandi salah";
        setUsernameError(" ");
        setPasswordError(errorMessage);

        console.warn(`[LOGIN FAILED] ${errorMessage}`);
      }
    } catch (error) {
      console.error(`[LOGIN ERROR] ${error.message}`);
      Alert.alert(
        "Terjadi Kesalahan",
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToTerms = () => {
    navigation.navigate("TermsAndConditions");
  };

  const navigateToPrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy");
  };

  return (
    <ImageBackground
      source={bgPattern}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.bgOverlay} />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContentContainer}
              keyboardShouldPersistTaps="handled"
            >
              <Modal transparent visible={isLoading}>
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                  <Text style={{ color: "white", marginTop: 10 }}>
                    Memproses...
                  </Text>
                </View>
              </Modal>

              <View style={styles.logoContainer}>
                <Image source={logoPath} style={styles.logo} />
              </View>

              <View style={styles.card}>
                <Text style={styles.title}>Masuk</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      usernameError ? styles.inputError : null,
                    ]}
                  >
                    <Ionicons name="person-outline" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Masukkan username Anda"
                      placeholderTextColor="#A0AEC0"
                      onChangeText={(text) => {
                        const cleaned = text
                          .replace(/^\s+|\s+$/g, "")
                          .replace(/\s{2,}/g, " ");
                        setUsername(cleaned);
                        setUsernameError("");
                        setPasswordError("");
                      }}
                      value={username}
                      autoCapitalize="none"
                    />
                  </View>
                  {usernameError !== "" && (
                    <Text style={styles.errorText}>{usernameError}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Kata Sandi</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      passwordError ? styles.inputError : null,
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Masukkan kata sandi"
                      placeholderTextColor="#A0AEC0"
                      onChangeText={(text) => {
                        setPassword(text.replace(/\s/g, ""));
                        setUsernameError("");
                        setPasswordError("");
                      }}
                      value={password}
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={
                          isPasswordVisible ? "eye-off-outline" : "eye-outline"
                        }
                        size={24}
                        color="#718096"
                      />
                    </TouchableOpacity>
                  </View>
                  {passwordError !== "" && (
                    <Text style={styles.errorText}>{passwordError}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <Text style={styles.loginButtonText}>Masuk</Text>
                  <Ionicons
                    name="log-in-outline"
                    size={22}
                    color="white"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.footerText}>
                Dengan masuk, Anda menyetujui{" "}
                <Text style={styles.linkText} onPress={navigateToTerms}>
                  Ketentuan Layanan
                </Text>{" "}
                &{" "}
                <Text style={styles.linkText} onPress={navigateToPrivacyPolicy}>
                  Kebijakan Privasi
                </Text>
                .
              </Text>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
