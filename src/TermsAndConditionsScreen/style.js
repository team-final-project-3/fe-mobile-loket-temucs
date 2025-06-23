import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // --- STRUKTUR DASAR ---
  container: {
    flex: 1,
    backgroundColor: '#053F5C', // Warna dasar gelap agar header menyatu
  },
  header: {
    height: 110, // Header yang lebih tinggi dan proporsional
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 45 : 60,
    left: 20,
    padding: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  // --- KONTEN UTAMA "SHEET" ---
  contentBody: {
    flex: 1, // Ini adalah kunci agar konten mengisi ruang yang tersedia
    backgroundColor: '#FFFFFF', // Warna dasar putih bersih
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20, // Efek menumpuk di bawah header
    overflow: 'hidden', // Memastikan konten di dalamnya tidak keluar dari radius
  },
  scrollViewContent: {
    padding: 25,
    paddingBottom: 40, // Beri ruang di akhir scroll
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'left',
    color: '#1F2937',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24, // Jarak antar baris yang nyaman untuk dibaca
    color: '#4B5563',
    textAlign: 'justify', // Teks rata kiri-kanan agar terlihat rapi
  },
  
  // --- FOOTER & TOMBOL AKSI ---
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },
  agreeButton: {
    backgroundColor: '#053F5C', // Warna konsisten dengan tema
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  agreeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;