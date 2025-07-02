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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import base64 from "base-64";

import styles from "./style";
import { COLORS } from "../Constant/colors";

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

        const profileResponse = await fetch(
          `https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`,
          { headers }
        );
        if (!profileResponse.ok) {
          const errorText = await profileResponse.text();
          throw new Error(
            `Gagal mengambil profil: ${profileResponse.status} ${errorText}`
          );
        }
        const profileData = await profileResponse.json();
        setBranchName(profileData?.loket?.name || "-");
        setBranchAddress(profileData?.loket?.branch?.address || "-");

        const servicesResponse = await fetch(
          "https://temucs-tzaoj.ondigitalocean.app/api/service/loket",
          { headers }
        );
        if (!servicesResponse.ok) {
          const errorText = await servicesResponse.text();
          throw new Error(
            `Gagal mengambil layanan: ${servicesResponse.status} ${errorText}`
          );
        }
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        const lastTicketRes = await fetch(
          "https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket",
          { headers }
        );
        if (lastTicketRes.status === 404) {
          setLastInProgressTicket("-");
        } else {
          const lastTicketData = await lastTicketRes.json();
          setLastInProgressTicket(
            lastTicketRes.ok && lastTicketData?.ticketNumber
              ? lastTicketData.ticketNumber
              : "-"
          );
        }

        const countRes = await fetch(
          "https://temucs-tzaoj.ondigitalocean.app/api/queue/count/loket",
          { headers }
        );
        const countData = await countRes.json();
        setTotalQueue(
          countRes.ok && typeof countData?.totalQueue === "number"
            ? countData.totalQueue
            : "-"
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
      if (selectedServices.length >= 5) {
        Alert.alert(
          "Batas Layanan",
          "Anda hanya dapat memilih maksimal 5 layanan."
        );
        return;
      }
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
          {isSelected && (
            <Ionicons
              name="checkmark"
              size={16}
              color={COLORS.PRIMARY_ORANGE}
            />
          )}
        </View>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
      </TouchableOpacity>
    );
  };

  const renderListHeader = () => (
    <>
      <View style={styles.branchInfoCardRow}>
        <View style={styles.branchInfoTextContainer}>
          <Text style={styles.branchName}>{branchName}</Text>
          <Text style={styles.branchAddress}>{branchAddress}</Text>
        </View>
      </View>

      <View style={styles.queueStatsContainer}>
        <View style={[styles.statBox, styles.borderServed]}>
          <Text style={styles.statLabel}>Total Antrean</Text>
          <Text style={[styles.statValue, styles.valueServed]}>
            {lastInProgressTicket}
          </Text>
        </View>
        <View style={[styles.statBox, styles.borderTotal]}>
          <Text style={styles.statLabel}>Jumlah Antrean</Text>
          <Text style={[styles.statValue, styles.valueTotal]}>
            {totalQueue}
          </Text>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.selectionTitle}>Butuh Layanan apa?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari jenis layanan"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
        </View>
        <Text
          style={{
            textAlign: "right",
            marginTop: 5,
            marginRight: 10,
            color: "#888",
          }}
        >
          Dipilih: {selectedServices.length} / 5
        </Text>
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
        <Text style={styles.headerTitle}>Pilih Layanan</Text>
      </ImageBackground>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "android" ? 80 : 0}
      >
        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.PRIMARY_ORANGE}
              style={{ flex: 1, justifyContent: "center" }}
            />
          ) : (
            <FlatList
              ListHeaderComponent={renderListHeader}
              data={filteredServices}
              renderItem={renderServiceItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.serviceList}
              contentContainerStyle={{ paddingBottom: 140 }}
              keyboardShouldPersistTaps="handled"
            />
          )}

          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
              <Text style={styles.submitButtonText}>Selanjutnya</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LayananAntreanScreen;
