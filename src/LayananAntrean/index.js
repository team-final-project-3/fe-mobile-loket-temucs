// ...import statements
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import base64 from "base-64";

import styles from "./style";
import { COLORS } from "../Constant/colors";

const LayananAntreanScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [lastInProgressTicket, setLastInProgressTicket] = useState("Memuat...");
  const [totalQueue, setTotalQueue] = useState("Memuat...");

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

        // Fetch Profile
        const profileResponse = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
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
          { headers: { Authorization: `Bearer ${token}` } }
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
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const lastTicketData = await lastTicketRes.json();
        setLastInProgressTicket(
          lastTicketRes.ok && lastTicketData?.ticketNumber ? lastTicketData.ticketNumber : "-"
        );

        // Fetch Total Queue
        const countRes = await fetch(
          "https://temucs-tzaoj.ondigitalocean.app/api/queue/count/loket",
          { headers: { Authorization: `Bearer ${token}` } }
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
          {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.PRIMARY_ORANGE}
      />

      {/* Header */}
      <View style={styles.navigationHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={COLORS.background}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambil Antrean</Text>
      </View>

      {/* Info Cabang */}
      <View style={styles.staticContent}>
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
            <Text style={styles.statLabel}>Jumlah Antrian</Text>
            <Text style={[styles.statValue, styles.valueTotal]}>
              {totalQueue}
            </Text>
          </View>
        </View>
      </View>

      {/* Layanan */}
      <View style={styles.scrollableContent}>
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

        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.PRIMARY_ORANGE}
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={filteredServices}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.serviceList}
          />
        )}
      </View>

      {/* Tombol Next */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
          <Text style={styles.submitButtonText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LayananAntreanScreen;
