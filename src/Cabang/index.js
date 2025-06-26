import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";

const headerBg = require("../../assets/images/header.png");
const BRANCH_URL = "https://temucs-tzaoj.ondigitalocean.app/api/branch/loket";

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function NearestBranchScreen({ navigation }) {
  const [branches, setBranches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [sortOption, setSortOption] = useState("terdekat");
  const [showSortModal, setShowSortModal] = useState(false);

  useEffect(() => {
    getLocationAndFetchBranches();
  }, [sortOption]);

  const getLocationAndFetchBranches = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Izin Lokasi Ditolak",
          "Aktifkan izin lokasi untuk menghitung jarak."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      fetchBranches(latitude, longitude);
    } catch (error) {
      console.error("Gagal mengambil lokasi:", error);
    }
  };

  const fetchBranches = async (userLat, userLon) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await fetch(BRANCH_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (!result || !Array.isArray(result.branches)) {
        throw new Error('Response does not contain "branches" array');
      }

      const branchesWithQueue = result.branches.map((branch) => {
        const distance =
          userLat && userLon
            ? getDistance(
                userLat,
                userLon,
                branch.latitude,
                branch.longitude
              ).toFixed(2)
            : "-";

        return {
          id: branch.id.toString(),
          name: branch.name,
          address: branch.address,
          latitude: branch.latitude,
          longitude: branch.longitude,
          isOpen: branch.status,
          queue: branch.activeQueueCount ?? 0,
          distance: distance,
        };
      });

      if (sortOption === "terdekat") {
        branchesWithQueue.sort(
          (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
        );
      } else if (sortOption === "antrian-terkecil") {
        branchesWithQueue.sort((a, b) => a.queue - b.queue);
      } else if (sortOption === "antrian-terbanyak") {
        branchesWithQueue.sort((a, b) => b.queue - a.queue);
      }

      setBranches(branchesWithQueue);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBranches = branches.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBranchCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="location-outline" size={24} color="#D97706" />
          </View>
          <Text style={styles.distanceText}>
            {item.distance !== "-" ? `${item.distance} km` : "-"}
          </Text>
        </View>

        <View style={styles.middleSection}>
          <Text style={styles.branchName}>{item.name}</Text>
          <Text style={styles.branchAddress}>{item.address}</Text>
        </View>

        <View style={styles.rightSection}>
          <View
            style={[
              styles.statusButton,
              item.isOpen ? styles.statusOpen : styles.statusClosed,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: item.isOpen ? "#065F46" : "#991B1B" },
              ]}
            >
              {item.isOpen ? "Buka" : "Tutup"}
            </Text>
          </View>
          <View style={styles.queueInfo}>
            <Text style={styles.queueText}>{item.queue} Antrean</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const SkeletonCard = () => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.leftSection}>
          <View
            style={[styles.iconContainer, { backgroundColor: "#E5E7EB" }]}
          />
          <View
            style={{
              width: 30,
              height: 8,
              backgroundColor: "#E5E7EB",
              borderRadius: 4,
            }}
          />
        </View>

        <View style={styles.middleSection}>
          <View
            style={{
              width: "60%",
              height: 14,
              backgroundColor: "#E5E7EB",
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <View
            style={{
              width: "90%",
              height: 10,
              backgroundColor: "#E5E7EB",
              borderRadius: 4,
            }}
          />
        </View>

        <View style={styles.rightSection}>
          <View
            style={{
              width: 60,
              height: 20,
              backgroundColor: "#E5E7EB",
              borderRadius: 20,
              marginBottom: 8,
            }}
          />
          <View
            style={{
              width: 70,
              height: 16,
              backgroundColor: "#E5E7EB",
              borderRadius: 12,
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <Text style={styles.headerTitle}>Cabang Terdekat</Text>
      </ImageBackground>

      <View style={styles.container}>
        <View style={styles.searchSortContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari Lokasi"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => setShowSortModal((prev) => !prev)}
            >
              <Ionicons name="filter" size={15} color="#333" />
              <Text style={styles.sortButtonText}>
                {sortOption === "antrian-terkecil"
                  ? "⬆️ Terkecil"
                  : sortOption === "antrian-terbanyak"
                  ? "⬇️ Terbanyak"
                  : "Filter"}
              </Text>
            </TouchableOpacity>

            {showSortModal && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSortOption("antrian-terkecil");
                    setShowSortModal(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>
                    ⬆️ Antrian Terkecil
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSortOption("antrian-terbanyak");
                    setShowSortModal(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>
                    ⬇️ Antrian Terbanyak
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {loading ? (
          <FlatList
            data={Array(5).fill(0)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <SkeletonCard />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={filteredBranches}
            renderItem={renderBranchCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
