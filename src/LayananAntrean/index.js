import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView, // <-- 1. Impor KeyboardAvoidingView
  Platform,           // <-- 1. Impor Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import base64 from "base-64";

import styles from "./style";
import { COLORS } from "../Constant/colors";

const headerBg = require('../../assets/images/header.png');

const LayananAntreanScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [lastInProgressTicket, setLastInProgressTicket] = useState("Memuat...");
  const [totalQueue, setTotalQueue] = useState("Memuat...");

  // ... useEffect tetap sama ...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          Alert.alert("Error", "Token tidak ditemukan. Silakan login kembali.");
          setLoading(false);
          return;
        }

        const decoded = JSON.parse(base64.decode(token.split(".")[1]));
        const loketId = decoded?.loketId;

        if (!loketId) {
          Alert.alert("Error", "loketId tidak ditemukan dalam token.");
          setLoading(false);
          return;
        }
        
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch Profile
        const profileResponse = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`,
          { headers }
        );

        if (!profileResponse.ok) {
          const errorText = await profileResponse.text();
          throw new Error(`Gagal mengambil profil: ${profileResponse.status} ${errorText}`);
        }

        const profileData = await profileResponse.json();
        setBranchName(profileData?.loket?.name || "-");
        setBranchAddress(profileData?.loket?.branch?.address || "-");

        // Fetch Services
        const servicesResponse = await fetch(
          "https://temucs-tzaoj.ondigitalocean.app/api/service/loket",
          { headers }
        );

        if (!servicesResponse.ok) {
          const errorText = await servicesResponse.text();
          throw new Error(`Gagal mengambil layanan: ${servicesResponse.status} ${errorText}`);
        }

        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        // Fetch Last Ticket In Progress
        const lastTicketRes = await fetch(
          "https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket",
          { headers }
        );
        if (lastTicketRes.status === 404) {
            setLastInProgressTicket("-");
        } else {
            const lastTicketData = await lastTicketRes.json();
            setLastInProgressTicket(
                lastTicketRes.ok && lastTicketData?.ticketNumber ? lastTicketData.ticketNumber : "-"
            );
        }

        // Fetch Total Queue
        const countRes = await fetch(
          "https://temucs-tzaoj.ondigitalocean.app/api/queue/count/loket",
          { headers }
        );
        const countData = await countRes.json();
        setTotalQueue(
          countRes.ok && typeof countData?.totalQueue === "number" ? countData.totalQueue : "-"
        );
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


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
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNext = () => {
    if (selectedServices.length === 0) {
      Alert.alert("Perhatian", "Silakan pilih minimal satu layanan.");
      return;
    }

    const { namaLengkap, email, noTelepon } = route.params || {};
    navigation.navigate("DokumenPersyaratan", {
      selectedServices,
      namaLengkap,
      email,
      noTelepon,
    });
  };

  const renderServiceItem = ({ item }) => {
    const isSelected = selectedServices.some((s) => s.id === item.id);
    return (
      <TouchableOpacity
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

  // <-- 2. Buat komponen untuk header dari FlatList
  const renderListHeader = () => (
    <>
      {/* Info Cabang */}
      <View style={styles.branchInfoCard}>
        <Text style={styles.branchName}>{branchName}</Text>
        <Text style={styles.branchAddress}>{branchAddress}</Text>
      </View>

      {/* Statistik Antrian */}
      <View style={styles.queueStatsContainer}>
        <View style={[styles.statBox, styles.borderServed]}>
          <Text style={styles.statLabel}>Sedang Dilayani</Text>
          <Text style={[styles.statValue, styles.valueServed]}>
            {lastInProgressTicket}
          </Text>
        </View>
        <View style={[styles.statBox, styles.borderTotal]}>
          <Text style={styles.statLabel}>Jumlah Antrian</Text>
          <Text style={[styles.statValue, styles.valueTotal]}>
            {totalQueue}
          </Text>
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.selectionTitle}>Butuh Layanan apa?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari jenis layanan"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header dengan ImageBackground */}
      <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color={'white'}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pilih Layanan</Text>
      </ImageBackground>

      {/* <-- 3. Bungkus FlatList dan Footer dengan KeyboardAvoidingView */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.PRIMARY_ORANGE}
            style={{ flex: 1, justifyContent: 'center' }}
          />
        ) : (
          <FlatList
            // <-- 4. Gunakan ListHeaderComponent
            ListHeaderComponent={renderListHeader}
            data={filteredServices}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.serviceList}
            contentContainerStyle={{ paddingBottom: 20 }} // Beri sedikit padding di bawah
          />
        )}

        {/* Tombol Next (Footer) */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <Text style={styles.submitButtonText}>Selanjutnya</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LayananAntreanScreen;