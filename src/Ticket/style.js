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
    height: 80, // Sesuaikan tinggi header jika perlu
    position: 'relative',
    // backgroundColor dihapus
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Warna teks dibuat putih agar kontras
  },

  // === KONTEN UTAMA ===
  content: {
    padding: 20,
  },
  officeName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#053F5C',
    marginBottom: 4,
  },
  officeAddress: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },

  // === STATUS BOX ===
  statusBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statusBoxBlue: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#429EBD',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  statusBoxOrange: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY_ORANGE,
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#053F5C',
  },

  // === TIKET ===
  ticketCard: {
    backgroundColor: '#053F5C',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  branchText: {
    fontSize: 20,
    color: COLORS.background,
    fontWeight: '600',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    width: '100%',
    textAlign: 'center',
  },
  ticketLabel: {
    fontSize: 16,
    color: COLORS.background,
    marginBottom: 5,
    marginTop: 15,
  },
  ticketNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.background,
    marginTop: 10,
  },
  printButton: {
    backgroundColor: '#28A745',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  printButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // === MODAL POP-UP ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successModalContainer: {
    width: '90%',
    maxWidth: 340,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 25,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 5,
  },
  successIconContainer: {
    backgroundColor: COLORS.PRIMARY_ORANGE,
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'white',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  modalHomeButton: {
    backgroundColor: '#053F5C',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  modalHomeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#053F5C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  homeButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
