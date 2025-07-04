import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons } from "@expo/vector-icons";
import base64 from "base-64";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./style";

const API_URL = "https://temucs-tzaoj.ondigitalocean.app";
const headerBg = require("../../assets/images/header.png");

const DokumenPersyaratanScreen = ({ navigation, route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const { selectedServices, namaLengkap, email, noTelepon } = route.params || {};
  const queueIdRef = useRef(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!selectedServices || selectedServices.length === 0) {
        setDocuments([]);
        setLoading(false);
        return;
      }
      
      try {
        const serviceIds = selectedServices.map((service) => service.id);
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");

        const response = await fetch(
          `${API_URL}/api/documents/by-services/loket`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ serviceIds }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gagal mengambil dokumen: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        const rawDocs = Array.isArray(data.data) ? data.data : [];

        const processedDocs = rawDocs.map((doc) => ({
          id: doc.id,
          name: doc.name || doc.title || "Dokumen",
          count: doc.quantity || 1,
        }));

        setDocuments(processedDocs);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [selectedServices]);

  const handleConfirmAmbilAntrean = async () => {
    setIsModalVisible(false);
    setIsBooking(true);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Otentikasi gagal. Silakan login kembali.");

      const decoded = JSON.parse(base64.decode(token.split(".")[1]));
      const loketId = decoded?.loketId;
      const branchId = decoded?.branchId;

      if (!loketId || !branchId) throw new Error("ID Loket atau Branch tidak ditemukan di token.");

      const serviceIds = selectedServices.map((service) => service.id);

      const payload = {
        name: namaLengkap,
        loketId,
        branchId,
        serviceIds,
        email: email || undefined,
        phoneNumber: noTelepon || undefined,
      };

      // --- LOG UNTUK MELIHAT PAYLOAD YANG DIKIRIM ---
      console.log("Mengirim Payload Antrean:", JSON.stringify(payload, null, 2));

      const response = await fetch(
        `${API_URL}/api/queue/book-offline`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseJson = await response.json();

      if (!response.ok) {
        // --- LOG JIKA TERJADI ERROR DARI SERVER ---
        console.error("Respon Error dari Server:", JSON.stringify(responseJson, null, 2));
        throw new Error(responseJson.message || "Terjadi kesalahan saat membuat antrean.");
      }

      // --- LOG UNTUK MELIHAT RESPON SUKSES DARI SERVER ---
      console.log("Respon Sukses dari Server:", JSON.stringify(responseJson, null, 2));

      queueIdRef.current = responseJson.queue.id || null;
      setShowSuccessModal(true);
    } catch (error) {
      Alert.alert("Gagal Membuat Antrean", error.message);
    } finally {
      setIsBooking(false);
    }
  };

  const handleLihatTiket = () => {
    setShowSuccessModal(false);
    navigation.popToTop(); 
    navigation.navigate("Ticket", {
      queueId: queueIdRef.current,
      namaLengkap: namaLengkap,
    });
  };

  const handleAmbilAntreanPress = () => {
    if (!namaLengkap || namaLengkap.trim() === "") {
      Alert.alert("Error", "Nama lengkap tidak boleh kosong.");
      return;
    }
    if (!selectedServices || selectedServices.length === 0) {
      Alert.alert("Error", "Silakan pilih minimal satu layanan.");
      return;
    }
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ImageBackground source={headerBg} style={{ width: "100%" }} resizeMode="cover">
        <View style={styles.headerWrapper}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons name="chevron-back-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>Konfirmasi Layanan</Text>
            </View>
            <View style={styles.headerRight} />
          </View>
        </View>
      </ImageBackground>

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentBody}>
            <Text style={styles.mainTitle}>Dokumen Persyaratan</Text>
            <Text style={styles.infoText}>
              Untuk mempercepat proses layanan, mohon siapkan dokumen-dokumen berikut ini.
            </Text>

            <View style={styles.card}>
              {loading ? (
                <ActivityIndicator size="large" color="#E38E39" style={{ marginVertical: 40 }} />
              ) : documents.length === 0 ? (
                <Text style={styles.noDocumentText}>
                  Tidak ada dokumen persyaratan khusus untuk layanan yang Anda pilih.
                </Text>
              ) : (
                documents.map((doc, index) => (
                  <View key={doc.id} style={[styles.documentItem, index === documents.length - 1 && { borderBottomWidth: 0 }]}>
                    <Ionicons name="checkmark-circle" size={22} color="#28A745" />
                    <Text style={styles.documentText}>
                      {doc.name}
                      {doc.count > 1 && <Text style={styles.quantityText}> x{doc.count}</Text>}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, isBooking && styles.submitButtonDisabled]}
            onPress={handleAmbilAntreanPress}
            disabled={isBooking}
          >
            {isBooking ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Ambil Antrean</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal Konfirmasi */}
      <Modal
        transparent
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentRow}>
              <View style={styles.modalIconWrapper}>
                <Feather name="smile" size={55} color="#E2B282" />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>Apakah Anda Yakin?</Text>
                <Text style={styles.modalMessage}>Anda akan menyetujui pembuatan antrian</Text>
              </View>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmAmbilAntrean}
                disabled={isBooking}
              >
                {isBooking ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmButtonText}>Lanjutkan</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Sukses */}
      <Modal
        transparent
        animationType="fade"
        visible={showSuccessModal}
        onRequestClose={handleLihatTiket}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View style={styles.successIconWrapper}>
                <MaterialCommunityIcons name="check-bold" size={40} color={"white"} />
              </View>
              <Text style={styles.successTitle}>Antrean Berhasil Dibuat!</Text>
            </View>
            <TouchableOpacity style={styles.successButton} onPress={handleLihatTiket}>
              <Text style={styles.successButtonText}>Lihat Tiket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DokumenPersyaratanScreen;
