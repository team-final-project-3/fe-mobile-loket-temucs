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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style"; // Pastikan path ini benar
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const logoPath = require("../../assets/images/logoic.png"); // Pastikan path ini benar

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");

    if (username.trim() === "") {
      setUsernameError("Username tidak boleh kosong");
      isValid = false;
    }
    if (password.trim() === "") {
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
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("loketId", String(data?.loket?.id ?? ""));
        await AsyncStorage.setItem("userToken", data.token ?? "");
        await AsyncStorage.setItem("username", data?.loket?.username ?? "");
        await AsyncStorage.setItem("loketName", data?.loket?.name ?? "");
        await AsyncStorage.setItem(
          "branchName",
          data?.loket?.branch?.name ?? ""
        );
        await AsyncStorage.setItem(
          "branchAddress",
          data?.loket?.branch?.address ?? ""
        );

        onLoginSuccess();
      } else {
        const errorMessage = data.message || "Username atau kata sandi salah";
        setUsernameError(errorMessage);
        setPasswordError(errorMessage);
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Terjadi Kesalahan", "Tidak dapat terhubung ke server.");
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100} // Sesuaikan offset jika perlu
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollContainer} // PERUBAHAN: Style untuk container scroll
            contentContainerStyle={styles.scrollContentContainer} // PERUBAHAN: Style untuk konten di dalam scroll
            keyboardShouldPersistTaps="handled"
          >
            <Modal transparent visible={isLoading}>
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            </Modal>

            <View style={styles.card}>
              <View style={styles.logoContainer}>
                <Image source={logoPath} style={styles.logo} />
              </View>
              <Text style={styles.title}>Masuk</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={[styles.input, usernameError ? styles.inputError : null]}
                  placeholder="Masukkan username Anda"
                  placeholderTextColor="#A0AEC0"
                  onChangeText={(text) => {
                    const cleanedText = text.replace(/\s/g, "");
                    setUsername(cleanedText);
                    setUsernameError("");
                    setPasswordError("");
                  }}
                  value={username}
                  autoCapitalize="none"
                />
                {usernameError ? (
                  <Text style={styles.errorText}>{usernameError}</Text>
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Kata Sandi</Text>
                <View
                  style={[
                    styles.passwordWrapper,
                    passwordError ? styles.inputError : null,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Masukkan kata sandi Anda"
                    placeholderTextColor="#A0AEC0"
                    onChangeText={(text) => {
                      const cleanedText = text.replace(/\s/g, "");
                      setPassword(cleanedText);
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
                      name={isPasswordVisible ? "eye-off" : "eye"}
                      size={24}
                      color="#718096"
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>Masuk</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>
              Dengan masuk atau mendaftar, kamu menyetujui{" "}
              <Text style={styles.linkText} onPress={navigateToTerms}>
                Ketentuan Layanan
              </Text>{" "}
              dan{" "}
              <Text style={styles.linkText} onPress={navigateToPrivacyPolicy}>
                Kebijakan Privasi
              </Text>
              .
            </Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}