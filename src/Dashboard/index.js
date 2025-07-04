import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const API_URL = "https://temucs-tzaoj.ondigitalocean.app";
const headerBg = require("../../assets/images/header.png");

export default function DashboardScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [queueData, setQueueData] = useState([]);
  const [greeting, setGreeting] = useState("Memuat...");
  const [branchName, setBranchName] = useState("KCP");
  const [currentQueueNumber, setCurrentQueueNumber] = useState("Memuat...");
  const [decodedToken, setDecodedToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formattedDate = format(new Date(), "EEEE, d MMMM yyyy", { locale: id });

  const fetchAllData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token tidak ditemukan");

      const decoded = jwtDecode(token);
      setDecodedToken(decoded);

      const branchId = decoded?.branchId;
      let initialBranchName = decoded.name;

      const branchRes = await fetch(`${API_URL}/api/branch/${branchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (branchRes.ok) {
        const branchData = await branchRes.json();
        initialBranchName = branchData?.name || initialBranchName;
      }
      setBranchName(initialBranchName);

      const hour = new Date().getHours();
      const greetingsText =
        hour < 11
          ? "Selamat Pagi"
          : hour < 15
          ? "Selamat Siang"
          : hour < 19
          ? "Selamat Sore"
          : "Selamat Malam";
      setGreeting(greetingsText);

      const inProgressRes = await fetch(
        `${API_URL}/api/queue/inprogress/loket`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (inProgressRes.status === 404) {
        setCurrentQueueNumber("-");
      } else if (inProgressRes.ok) {
        const inProgressData = await inProgressRes.json();
        setCurrentQueueNumber(inProgressData.ticketNumber || "0");
      } else {
        setCurrentQueueNumber("-");
      }

      const waitingRes = await fetch(`${API_URL}/api/queue/waiting/loket`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (waitingRes.ok) {
        const waitingData = await waitingRes.json();
        const formattedData = waitingData.map((item) => ({
          id: item.id.toString(),
          noTiket: item.ticketNumber,
          nama: item.name || "-",
          status: item.userId ? "Online" : "Offline",
          waktu: format(new Date(item.bookingDate), "HH:mm", { locale: id }),
        }));
        setQueueData(formattedData);
      } else {
        setQueueData([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data dashboard:", err);
      setGreeting("Selamat Datang");
      setCurrentQueueNumber("-");
      setQueueData([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      fetchAllData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleRefreshPress = () => {
    if (!isRefreshing) {
      setIsLoading(true);
      fetchAllData();
    }
  };

  const filteredQueueData = queueData.filter((item) => {
    const matchQuery =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.noTiket.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus =
      filterStatus === "all" || item.status.toLowerCase() === filterStatus;
    return matchQuery && matchStatus;
  });

  const handleFilterChange = () => {
    setFilterStatus((prev) =>
      prev === "all" ? "online" : prev === "online" ? "offline" : "all"
    );
  };

  const renderFilterButton = () => {
    let label = "Status";
    let statusColor = "#999";
    let style = styles.filterButton;

    if (filterStatus === "online") {
      label = "Online";
      style = [styles.filterButton, styles.filterButtonOnline];
      statusColor = "#28A745";
    } else if (filterStatus === "offline") {
      label = "Offline";
      style = [styles.filterButton, styles.filterButtonOffline];
      statusColor = "#DC3545";
    }

    return (
      <TouchableOpacity style={style} onPress={handleFilterChange}>
        {filterStatus === "all" ? (
          <Ionicons
            name="filter-outline"
            size={20}
            color="#333"
            style={{ marginRight: 8 }}
          />
        ) : (
          <View
            style={[styles.statusIndicator, { backgroundColor: statusColor }]}
          />
        )}
        <Text style={styles.filterButtonText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const renderQueueItem = ({ item }) => (
    <View style={styles.tableRow}>
      {/* Kolom No Tiket */}
      <View style={styles.columnNoTiket}>
        <Text style={styles.cellTextLeft} numberOfLines={2}>{item.noTiket}</Text>
      </View>
      {/* Kolom Nama */}
      <View style={styles.columnNama}>
        <Text style={styles.cellTextLeft} numberOfLines={1}>{item.nama}</Text>
      </View>
      {/* Kolom Status */}
      <View style={styles.columnStatus}>
        <Text style={styles.cellTextCenter}>{item.status}</Text>
      </View>
      {/* Kolom Waktu */}
      <View style={styles.columnWaktu}>
        <Text style={styles.cellTextRight}>{item.waktu}</Text>
      </View>
    </View>
  );

  const renderSkeletonRow = (_, index) => (
    <View style={styles.tableRow} key={index}>
      {[2.5, 2.5, 2, 1.5].map((flex, i) => (
        <View
          key={i}
          style={{
            flex,
            height: 12,
            backgroundColor: "#E0E0E0",
            borderRadius: 4,
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={headerBg}
        style={styles.header}
        resizeMode="cover"
      >
        <View
          style={{
            paddingTop:
              Platform.OS === "android" ? RNStatusBar.currentHeight : 44,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.profileIcon}
              onPress={() => navigation.navigate("Profile")}
            >
              <Ionicons name="person-circle" size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.welcomeText}>
                {greeting}, {branchName}
              </Text>
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.currentQueueCard}>
            <Text style={styles.currentQueueTitle}>No antrean saat ini:</Text>
            <Text style={styles.currentQueueNumber}>{currentQueueNumber}</Text>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={[
                styles.refreshButton,
                isRefreshing && styles.buttonDisabled,
              ]}
              onPress={handleRefreshPress}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="refresh" size={20} color="white" />
              )}
              <Text style={styles.actionButtonText}>Update Antrean</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("AmbilAntrean")}
            >
              <Ionicons name="add" size={24} color="white" />
              <Text style={styles.actionButtonText}>Ambil Antrean</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listHeaderContainer}>
            <Text style={styles.listTitle}>Daftar Antrean</Text>
            <TouchableOpacity
              style={styles.nearestBranchButton}
              onPress={() => navigation.navigate("NearestBranch")}
            >
              <FontAwesome6 name="map-location-dot" size={20} color="#F27F0C" />
              <Text style={styles.nearestBranchButtonText}>
                Cabang Terdekat
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listWrapper}>
            <View style={styles.searchFilterSection}>
              <View style={styles.searchContainer}>
                <Ionicons
                  name="search"
                  size={20}
                  color="#888"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Cari antrean"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#888"
                />
              </View>
              {renderFilterButton()}
            </View>

            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                {/* Header No Tiket */}
                <View style={styles.columnNoTiket}>
                  <Text style={styles.headerTextLeft}>No Tiket</Text>
                </View>
                {/* Header Nama */}
                <View style={styles.columnNama}>
                  <Text style={styles.headerTextLeft}>Nama</Text>
                </View>
                {/* Header Status */}
                <View style={styles.columnStatus}>
                  <Text style={styles.headerTextCenter}>Status</Text>
                </View>
                {/* Header Waktu */}
                <View style={styles.columnWaktu}>
                  <Text style={styles.headerTextRight}>Waktu</Text>
                </View>
              </View>

              {isLoading ? (
                Array.from({ length: 6 }).map(renderSkeletonRow)
              ) : filteredQueueData.length > 0 ? (
                <FlatList
                  data={filteredQueueData}
                  renderItem={renderQueueItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              ) : (
                <Text style={styles.emptyListText}>Tidak ada antrean.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}