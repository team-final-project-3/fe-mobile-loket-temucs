import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F8',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  // --- HEADER STYLES ---
  header: {
    backgroundColor: '#053F5C',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    paddingBottom: 12,
    height: 'fit-content',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center', // Ubah dari 'center' ke 'flex-start'
    paddingHorizontal: 14,
    paddingBottom:'10',// Tambahkan paddingTop agar lebih ke atas
    marginTop:'-10',
  },
  profileIcon: {
    marginRight: 10,
    marginTop: 0.5, // Tambahkan marginTop agar icon lebih ke atas
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Ubah dari 'center' ke 'flex-start'
    padding:'0',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 0, // Pastikan tidak ada margin bawah
    marginTop: 0, // Tambahkan jika ingin lebih ke atas
  },
  dateText: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 0, // Pastikan tidak ada margin atas
  },

  currentQueueCard: {
    backgroundColor: '#053F5C',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#053F5C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
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
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  refreshButton: {
    flexDirection: 'row',
    backgroundColor: '#DC3545',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    shadowColor: '#DC3545',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#28A745',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonDisabled: {
    backgroundColor: '#E0A1A7',
  },
  listHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  nearestBranchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderColor: '#F27F0C',
    borderWidth: 1,
  },
  nearestBranchButtonText: {
    color: '#F27F0C',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 10,
  },
  listWrapper: {
    borderRadius: 16,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#959DA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  searchFilterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginRight: 10,
    height: 44,
  },
  searchIcon: {
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 10,
  },
  filterButtonOnline: {
    backgroundColor: '#E0F2F1',
  },
  filterButtonOffline: {
    backgroundColor: '#FCE4EC',
  },
  filterButtonText: {
    color: '#374151',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  tableContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#F3F4F6',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },  
  tableCell: {
    fontSize: 14,
    color: '#374151',
  },
  emptyListText: {
    textAlign: 'center',
    paddingVertical: 40,
    color: '#6B7280',
    fontSize: 14,
  },
});

export default styles;
