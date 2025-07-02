import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import styles from "./style";

const headerBg = require("../../assets/images/header.png");

const TicketScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastInProgressTicket, setLastInProgressTicket] = useState("-");
  const [totalWaiting, setTotalWaiting] = useState(0);
  const [ticketDetail, setTicketDetail] = useState(null);

  const { queueId, namaLengkap } = route.params || {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("Token tidak ditemukan");

        const decoded = jwtDecode(token);
        const loketId = decoded?.loketId;

        const [ticketRes, profileRes, lastTicketRes, waitingRes] =
          await Promise.all([
            queueId
              ? fetch(
                  `https://temucs-tzaoj.ondigitalocean.app/api/queue/loket-ticket/${queueId}`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
              : Promise.resolve(null),
            loketId
              ? fetch(
                  `https://temucs-tzaoj.ondigitalocean.app/api/loket/${loketId}/profile`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
              : Promise.resolve(null),
            fetch(
              `https://temucs-tzaoj.ondigitalocean.app/api/queue/inprogress/loket`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            fetch(
              `https://temucs-tzaoj.ondigitalocean.app/api/queue/waiting/loket`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

        if (ticketRes?.ok) setTicketDetail(await ticketRes.json());

        if (profileRes?.ok) {
          const profileData = await profileRes.json();
          setBranchName(profileData?.loket?.name || "Nama Cabang");
          setBranchAddress(
            profileData?.loket?.branch?.address || "Alamat tidak tersedia"
          );
        }

        if (lastTicketRes?.ok) {
          const lastTicketData = await lastTicketRes.json();
          setLastInProgressTicket(lastTicketData.ticketNumber || "-");
        }

        if (waitingRes?.ok) {
          const waitingData = await waitingRes.json();
          setTotalWaiting(waitingData.length);
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat fetch data:", error);
        Alert.alert("Error", "Gagal memuat data tiket.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queueId]);

  const handleBackToHome = () => {
    setIsModalVisible(false);
    navigation.popToTop();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <ActivityIndicator size="large" color="#053F5C" />
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

      <Modal transparent animationType="fade" visible={isModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#888" />
            </TouchableOpacity>
            <View style={styles.successIconContainer}>
              <MaterialCommunityIcons
                name="emoticon-happy"
                size={65}
                color="#FFF"
              />
            </View>
            <Text style={styles.successTitle}>Tiket Berhasil di Cetak</Text>
            <TouchableOpacity
              style={styles.modalHomeButton}
              onPress={handleBackToHome}
            >
              <Text style={styles.modalHomeButtonText}>Kembali ke Beranda</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={headerBg}
        style={styles.header}
        resizeMode="cover"
      >
        <Text style={styles.headerTitle}>Tiket Antrean</Text>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.officeName}>{branchName}</Text>
          <Text style={styles.officeAddress}>{branchAddress}</Text>

          <View style={styles.statusBoxContainer}>
            <View style={styles.statusBoxBlue}>
              <Text style={styles.statusLabel}>Terakhir Dilayani</Text>
              <Text style={styles.statusValue}>{lastInProgressTicket}</Text>
            </View>
            <View style={styles.statusBoxOrange}>
              <Text style={styles.statusLabel}>Jumlah Menunggu</Text>
              <Text style={styles.statusValue}>{totalWaiting}</Text>
            </View>
          </View>

          <View style={styles.ticketCard}>
            <Text style={styles.branchText}>Kantor Cabang {branchName}</Text>

            {namaLengkap ? (
              <Text style={styles.userGreeting}>Hai, {namaLengkap}</Text>
            ) : null}

            <Text style={styles.ticketLabel}>Nomor Antrean Anda</Text>
            <Text style={styles.ticketNumber}>
              {ticketDetail?.ticketNumber || "-"}
            </Text>

            <Text style={styles.dateText}>
              Tanggal Ambil Antrean:{" "}
              {ticketDetail?.bookingDate
                ? new Date(ticketDetail.bookingDate).toLocaleDateString("id-ID")
                : "-"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.printButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.printButtonText}>Cetak Tiket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketScreen;
