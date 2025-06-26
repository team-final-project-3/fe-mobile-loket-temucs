import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
  // --- CONTAINER UTAMA ---
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // Menambahkan padding atas untuk Android agar tidak tertimpa status bar transparan
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },

  // --- HEADER BARU DENGAN IMAGEBACKGROUND ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65, // Sesuaikan tinggi header jika perlu
    position: 'relative',
    // backgroundColor dihapus
  },

  backButton: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Warna teks dibuat putih agar kontras
  },

  // --- INFORMASI CABANG (TIDAK DIUBAH) ---
  staticContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#F0F2F5',
  },
  
  branchInfoCard:{
    // jika butuh style khusus bisa ditambahkan di sini
  },

  branchName: {
    fontSize: 28, // Sedikit disesuaikan agar rapi
    fontWeight: 'bold',
    color: '#053F5C',
    textAlign: 'center',
  },

  branchAddress: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
    minHeight: 35, // Beri tinggi minimum agar layout stabil
  },

  // --- STATISTIK ANTREAN (TIDAK DIUBAH) ---
  queueStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 15,
    marginHorizontal: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  borderServed: {
    borderColor: '#429EBD',
  },

  borderTotal: {
    borderColor: '#A9A9A9',
  },

  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600'
  },

  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },

  valueServed: {
    color: '#429EBD',
  },

  valueTotal: {
    color: '#666',
  },

  // --- KONTEN SCROLLABLE (TIDAK DIUBAH) ---
  scrollableContent: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Efek tumpukan dipertahankan
  },

  // --- FORM & PENCARIAN (TIDAK DIUBAH) ---
  selectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 20,
    marginBottom: 15,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },

  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },

  searchIcon: {
    marginLeft: 10,
  },

  // --- LIST LAYANAN (TIDAK DIUBAH) ---
  serviceList: {
    flex: 1,
  },

  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxSelected: {
    borderColor: COLORS.PRIMARY_ORANGE,
    backgroundColor: '#FFF7F0'
  },

  serviceName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1, // Agar teks tidak keluar batas
  },

  // --- FOOTER & TOMBOL (TIDAK DIUBAH) ---
  footer: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 3,
    borderTopColor: '#F0F0F0',
  },

  submitButton: {
    backgroundColor: '#28A745',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;