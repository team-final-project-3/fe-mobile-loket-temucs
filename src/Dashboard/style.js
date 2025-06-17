import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F8',
  },
  container: {
    flex: 1, // Added to ensure ScrollView fills the safe area and prevents overlap with status bar
  },
  contentWrapper: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F27F0C',
  },
  profileIcon: {
    padding: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    marginLeft: 3,
    fontWeight: 'bold',
    fontSize: 12,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  currentQueueCard: {
    backgroundColor: '#053F5C',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  currentQueueTitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  currentQueueNumber: {
    fontSize: 56,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // ++ MODAL LOGOUT STYLES ++
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F27F0C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modalTextContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutModalButton: {
    backgroundColor: '#DC3545',
  },
  logoutModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ++ DAFTAR ANTRIAN STYLES (MENYATU) ++
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10, // Memberi jarak ke kartu di bawahnya
  },
  listWrapper: {
    borderRadius: 12,
    marginBottom: 40,
    // Efek shadow untuk keseluruhan kartu
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchFilterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F27F0C',
    // Hanya sudut atas
    borderTopRightRadius: 12,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      marginRight: 6, // lebih kecil
      height: 36, // tambah tinggi tetap
    },
    searchIcon: {
      paddingLeft: 8, // lebih kecil
    },
    searchInput: {
      flex: 1,
      paddingVertical: 6, // lebih kecil
      paddingHorizontal: 6, // lebih kecil
      fontSize: 13, // lebih kecil
      color: '#333',
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10, // lebih kecil
      paddingVertical: 6, // lebih kecil
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    filterButtonOnline: {
      borderColor: '#28A745', // Warna border saat online
  },
  filterButtonOffline: {
    borderColor: '#DC3545', // Warna border saat offline
  },
  filterButtonText: {
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
  filterButtonTextActive: {
    // Optional: jika ingin teks juga berubah warna
  },
  tableContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomLeftRadius: 12, // Hanya sudut bawah
    borderBottomRightRadius: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
  },
});

export default styles;
