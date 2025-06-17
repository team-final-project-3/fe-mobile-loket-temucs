import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import { COLORS } from '../Constant/colors';

const initialServices = [
    { id: '1', name: 'Buat Tabungan' },
    { id: '2', name: 'Setor Tunai' },
    { id: '3', name: 'Tarik Tunai' },
    { id: '4', name: 'Transfer' },
    { id: '5', name: 'Layanan Customer Service' },
    { id: '6', name: 'Pengaduan Masalah' },
    { id: '7', name: 'Pembukaan Rekening Giro' },
    { id: '8', name: 'Aktivasi Mobile Banking' },
    { id: '9', name: 'Pinjaman' },
    { id: '10', name: 'Investasi' },
];

const LayananAntreanScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);

    const filteredServices = initialServices.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectService = (service) => {
        const isSelected = selectedServices.some(s => s.id === service.id);

        if (isSelected) {
            setSelectedServices(selectedServices.filter(s => s.id !== service.id));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleNext = () => {
        // Cek apakah ada layanan yang dipilih
        if (selectedServices.length === 0) {
            alert('Silakan pilih minimal satu layanan.');
            return;
        }
        
        // === PERUBAHAN DI SINI ===
        // Navigasi ke halaman Dokumen Persyaratan dan kirim data layanan yang dipilih
        navigation.navigate('DokumenPersyaratan', {
            selectedServices: selectedServices
        });
    };

    const renderServiceItem = ({ item }) => {
        const isSelected = selectedServices.some(s => s.id === item.id);

        return (
            <TouchableOpacity 
                style={styles.serviceItem} 
                onPress={() => handleSelectService(item)}
            >
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
                </View>
                <Text style={styles.serviceName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY_ORANGE} />

            <View style={styles.navigationHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back-outline" size={24} color={COLORS.background} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ambil Antrean</Text>
            </View>

            <View style={styles.staticContent}>
                <View style={styles.branchInfoCard}>
                    <Text style={styles.branchName}>BNI Kota</Text>
                    <Text style={styles.branchAddress}>Jl. Jendral Sudirman No. 58, Jakarta Pusat</Text>
                </View>
                <View style={styles.queueStatsContainer}>
                    <View style={[styles.statBox, styles.borderServed]}><Text style={styles.statLabel}>Terakhir Dilayani</Text><Text style={[styles.statValue, styles.valueServed]}>KT-008</Text></View>
                    <View style={[styles.statBox, styles.borderWaiting]}><Text style={styles.statLabel}>Menunggu</Text><Text style={[styles.statValue, styles.valueWaiting]}>2</Text></View>
                    <View style={[styles.statBox, styles.borderTotal]}><Text style={styles.statLabel}>Jumlah Antrian</Text><Text style={[styles.statValue, styles.valueTotal]}>10</Text></View>
                </View>
            </View>

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

                <FlatList
                    data={filteredServices}
                    renderItem={renderServiceItem}
                    keyExtractor={item => item.id}
                    style={styles.serviceList}
                />
            </View>
            
            <View style={styles.footer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
                    <Text style={styles.submitButtonText}>Selanjutnya</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LayananAntreanScreen;
