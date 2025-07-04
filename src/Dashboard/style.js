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
    paddingTop: 10,
  },
  headerImage: {
    width: "100%",
    paddingBottom: 20,
    marginTop: -40,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    marginTop: 15,
  },
  profileIcon: {
    marginRight: 5,
    marginLeft: 0,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 0,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "left",
  },
  dateText: {
    fontSize: 11,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "left",
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
    fontSize: 43,
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
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    shadowColor: '#3B82F6',
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
    paddingVertical: 4,
    paddingRight: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
  },
  filterButtonOnline: {
    backgroundColor: '#ABEEBA',
  },
  filterButtonOffline: {
    backgroundColor: '#FFA3A3',
  },
  filterButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  tableContainer: {
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  
  // Style untuk Kolom (mengatur lebar/flex)
  columnNoTiket: {
    flex: 2.5,
    paddingRight: 5,
  },
  columnNama: {
    flex: 2.5,
    paddingHorizontal: 5,
  },
  columnStatus: {
    flex: 2,
    paddingHorizontal: 5,
  },
  columnWaktu: {
    flex: 1.5,
    paddingLeft: 5,
  },

  // Style untuk Teks di Header (mengatur perataan & font)
  headerTextLeft: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    textAlign: 'left',
  },
  headerTextCenter: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    textAlign: 'center',
  },
  headerTextRight: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    textAlign: 'right',
  },

  // Style untuk Teks di Sel (mengatur perataan & font)
  cellTextLeft: {
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'left',
  },
  cellTextCenter: {
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },
  cellTextRight: {
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'right',
  },

  emptyListText: {
    textAlign: 'center',
    paddingVertical: 40,
    color: '#6B7280',
    fontSize: 14,
  },
});

export default styles;