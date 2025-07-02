import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  StatusBar,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
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
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [sortOption, setSortOption] = useState("asc");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    getLocationAndFetchBranches();
  }, []);

  const toggleSortOption = () => {
    const newOption = sortOption === "asc" ? "desc" : "asc";
    setSortOption(newOption);

    if (userLocation) {
      setLoading(true);
      fetchBranches(userLocation.latitude, userLocation.longitude, newOption);
    }
  };

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

      fetchBranches(latitude, longitude, sortOption);
    } catch (error) {
      console.error("Gagal mengambil lokasi:", error);
    }
  };

  const fetchBranches = async (userLat, userLon, sort = "asc") => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await fetch(BRANCH_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (!result || !Array.isArray(result.data)) {
        throw new Error('Response does not contain "data" array');
      }

      const branchesWithQueue = result.data.map((branch) => {
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

      if (sort === "asc") {
        branchesWithQueue.sort((a, b) => a.queue - b.queue);
      } else {
        branchesWithQueue.sort((a, b) => b.queue - a.queue);
      }

      setBranches(branchesWithQueue);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBranches = useMemo(() => {
    return branches.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [branches, debouncedQuery]);

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
          <View style={[styles.iconContainer, styles.skeletonIcon]} />
          <View style={styles.skeletonLineShort} />
        </View>

        <View style={styles.middleSection}>
          <View style={styles.skeletonLineMedium} />
          <View style={styles.skeletonLineLong} />
        </View>

        <View style={styles.rightSection}>
          <View style={styles.skeletonStatus} />
          <View style={styles.skeletonQueue} />
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

          <TouchableOpacity
            style={styles.sortButton}
            onPress={toggleSortOption}
          >
            <FontAwesome5
              name={
                sortOption === "asc" ? "sort-amount-down-alt" : "sort-amount-up"
              }
              size={18}
              color="#333"
            />
            <Text style={styles.sortButtonText}>Sort by</Text>
          </TouchableOpacity>
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
            keyboardShouldPersistTaps="handled"
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={5}
            ListEmptyComponent={
              <View style={{ alignItems: "center", marginTop: 40 }}>
                <Ionicons name="alert-circle-outline" size={48} color="#ccc" />
                <Text style={{ color: "#888", marginTop: 10 }}>
                  Cabang tidak ditemukan
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
