import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './style';
import { COLORS } from '../Constant/colors';

const AmbilAntreanScreen = ({ navigation }) => {
    const [namaLengkap, setNamaLengkap] = useState('');
    const [email, setEmail] = useState('');
    const [noTelepon, setNoTelepon] = useState('');
    const [namaError, setNamaError] = useState(''); // State untuk pesan error

    const handleAmbilAntrean = () => {
        // Karena spasi sudah dihilangkan saat input, kita hanya perlu cek apakah field kosong.
        const trimmedName = namaLengkap.trim();

        if (!trimmedName) {
            setNamaError('Nama lengkap tidak boleh kosong.');
            return;
        }
        
        // Validasi spasi tidak lagi diperlukan di sini
        setNamaError('');
        console.log({ namaLengkap: trimmedName, email, noTelepon });
        
        // === PERUBAHAN DI SINI ===
        // Mengganti Alert dengan navigasi ke halaman LayananAntrean
        navigation.navigate('LayananAntrean');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY_ORANGE} />

            {/* Header Navigasi */}
            <View style={styles.navigationHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back-outline" size={24} color={COLORS.background} />
            </TouchableOpacity>
                <Text style={styles.headerTitle}>Ambil Antrean</Text>
            </View>

            <ScrollView>
                <View style={styles.contentWrapper}>
                    {/* Info Cabang */}
                    <View style={styles.branchInfoCard}>
                        <Text style={styles.branchName}>BNI Kota</Text>
                        <Text style={styles.branchAddress}>Jl. Jendral Sudirman No. 58, Jakarta Pusat</Text>
                    </View>

                    {/* Info Antrean */}
                    <View style={styles.queueStatsContainer}>
                        {/* Box 1: Terakhir Dilayani */}
                        <View style={[styles.statBox, styles.borderServed]}>
                            <Text style={styles.statLabel}>Terakhir Dilayani</Text>
                            <Text style={[styles.statValue, styles.valueServed]}>KT-008</Text>
                        </View>
                        {/* Box 2: Menunggu */}
                        <View style={[styles.statBox, styles.borderWaiting]}>
                            <Text style={styles.statLabel}>Menunggu</Text>
                            <Text style={[styles.statValue, styles.valueWaiting]}>2</Text>
                        </View>
                        {/* Box 3: Jumlah Antrian */}
                        <View style={[styles.statBox, styles.borderTotal]}>
                            <Text style={styles.statLabel}>Jumlah Antrian</Text>
                            <Text style={[styles.statValue, styles.valueTotal]}>10</Text>
                        </View>
                    </View>

                    {/* Form Data Nasabah */}
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>DATA NASABAH</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Nama Lengkap *</Text>
                           <TextInput
    style={[styles.input, namaError ? styles.inputError : null]}
    value={namaLengkap}
    onChangeText={(text) => {
        setNamaLengkap(text); 
        if (namaError) {
            setNamaError('');
        }
    }}
    placeholder={namaError || "Masukkan nama lengkap Anda"}
    placeholderTextColor={namaError ? 'red' : '#999'}
/>

                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email (opsional)</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Masukkan email Anda"
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>No Telepon (opsional)</Text>
                            <TextInput
                                style={styles.input}
                                value={noTelepon}
                                onChangeText={setNoTelepon}
                                placeholder="Masukkan nomor telepon Anda"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Tombol Aksi */}
                    <TouchableOpacity style={styles.submitButton} onPress={handleAmbilAntrean}>
                        <Text style={styles.submitButtonText}>Ambil Antrean</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AmbilAntreanScreen;
