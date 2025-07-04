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
  Modal,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import base64 from "base-64";

import styles from "./style";
import { COLORS } from "../Constant/colors";

const API_URL = "https://temucs-tzaoj.ondigitalocean.app";
const headerBg = require("../../assets/images/header.png");

const LayananAntreanScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [lastInProgressTicket, setLastInProgressTicket] = useState("Memuat...");
  const [totalQueue, setTotalQueue] = useState("Memuat...");
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          alert("Token tidak ditemukan. Silakan login kembali.");
          navigation.goBack();
          return;
        }

        const decoded = JSON.parse(base64.decode(token.split(".")[1]));
        const loketId = decoded?.loketId;
        if (!loketId) {
          alert("loketId tidak ditemukan dalam token.");
          navigation.goBack();
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const responses = await Promise.all([
          fetch(`${API_URL}/api/loket/${loketId}/profile`, { headers }),
          fetch(`${API_URL}/api/service/loket`, { headers }),
          fetch(`${API_URL}/api/queue/inprogress/loket`, { headers }),
          fetch(`${API_URL}/api/queue/count/loket`, { headers }),
        ]);

        const [profileResponse, servicesResponse, lastTicketRes, countRes] = responses;

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setBranchName(profileData?.loket?.name || "-");
          setBranchAddress(profileData?.loket?.branch?.address || "-");
        }

        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServices(servicesData);
        }

        if (lastTicketRes.status === 404) {
          setLastInProgressTicket("-");
        } else if (lastTicketRes.ok) {
          const lastTicketData = await lastTicketRes.json();
          setLastInProgressTicket(lastTicketData.ticketNumber || "-");
        }

        if (countRes.ok) {
          const countData = await countRes.json();
          setTotalQueue(countData.totalQueue ?? "-");
        }
      } catch (error) {
        alert("Gagal memuat data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation]);

  const filteredServices = services
    .filter((service) => service.status === true)
    .filter((service) =>
      service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSelectService = (service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id);

    if (isSelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      if (selectedServices.length >= 5) {
        setShowLimitModal(true);
        return;
      }
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNext = () => {
    const { namaLengkap, email, noTelepon } = route.params || {};
    navigation.navigate("DokumenPersyaratan", {
      selectedServices,
      namaLengkap,
      email,
      noTelepon,
    });
  };

  const renderServiceItem = (item) => {
    const isSelected = selectedServices.some((s) => s.id === item.id);
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.serviceItem}
        onPress={() => handleSelectService(item)}
      >
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Ionicons name="checkmark" size={16} color={COLORS.PRIMARY_ORANGE} />}
        </View>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ImageBackground source={headerBg} style={{ width: "100%" }} resizeMode="cover">
        <View style={styles.headerWrapper}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Pilih Layanan</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
        </View>
      </ImageBackground>

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View style={styles.branchInfoCardRow}>
                  <View style={styles.branchInfoTextContainer}>
                    <Text style={styles.branchName}>{branchName}</Text>
                    <Text style={styles.branchAddress}>{branchAddress}</Text>
                  </View>
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

                <View style={styles.formSection}>
                  <Text style={styles.selectionTitle}>Butuh Layanan apa?</Text>
                  <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Cari jenis layanan"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholderTextColor="#999"
                    />
                  </View>
                  <Text style={{ textAlign: "right", marginTop: 5, color: "#888" }}>
                    Dipilih: {selectedServices.length} / 5
                  </Text>
                </View>

                {loading ? (
                  <ActivityIndicator size="large" color={COLORS.PRIMARY_ORANGE} style={{ marginTop: 40 }} />
                ) : (
                  <View style={styles.serviceListContainer}>
                    {filteredServices.length > 0 ? (
                      filteredServices.map((item) => renderServiceItem(item))
                    ) : (
                      <Text style={{ textAlign: 'center', color: '#666', marginTop: 30 }}>
                        Layanan tidak ditemukan
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                selectedServices.length === 0 && styles.submitButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={selectedServices.length === 0}
            >
              <Text style={styles.submitButtonText}>Selanjutnya</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* --- MODAL --- */}
      <Modal
        visible={showLimitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLimitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Peringatan Pilihan Layanan</Text>
            <Text style={styles.modalMessage}>
              Anda hanya dapat memilih maksimal 5 jenis layanan.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowLimitModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LayananAntreanScreen;
