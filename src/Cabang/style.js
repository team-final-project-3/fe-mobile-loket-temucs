import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F8',
  },
  // --- HEADER STYLES ---
  header: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  // --- MAIN CONTAINER ---
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  // --- SEARCH & SORT ---
  searchSortContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 10,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  // --- DROPDOWN STYLES ---
  dropdownContainer: {
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 55,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 10,
    minWidth: 160,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownItemText: {
    fontSize: 12,
    color: '#333',
  },
  // --- CARD STYLES ---
  listContainer: {
    paddingBottom: 20,
    
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Card Left Section
  leftSection: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7', // Orange-100
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '500',
  },
  // Card Middle Section
  middleSection: {
    flex: 1,
  },
  branchName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  branchAddress: {
    fontSize: 12,
    color: '#6B7280',
  },
  // Card Right Section
  rightSection: {
    alignItems: 'center',
    marginLeft: 16,
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusOpen: {
    backgroundColor: '#D1FAE5', // Green-100
  },
  statusClosed: {
    backgroundColor: '#FEE2E2', // Red-100
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#065F46', // Green-800
  },
  queueInfo: {
    backgroundColor: '#FEF3C7', // Orange-100
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  queueText: {
    fontSize: 11,
    color: '#92400E', // Orange-800
    fontWeight: 'bold',
  },
});

export default styles;
