import { StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { COLORS } from "../Constant/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5", 
  },

  // --- STYLES UNTUK HEADER ---
  headerWrapper: {
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 44,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  headerLeft: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerRight: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    padding: 5,
  },
  // --- AKHIR STYLES HEADER ---

  branchInfoCardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  branchInfoTextContainer: {
    flex: 1,
  },
  branchName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#053F5C",
    marginBottom: 4,
  },
  branchAddress: {
    fontSize: 14,
    color: "#555",
  },
  queueStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 15,
    marginHorizontal: 8,
    backgroundColor: "white",
  },
  borderServed: {
    borderColor: "#A9A9A9",
  },
  borderTotal: {
    borderColor: "#A9A9A9",
  },
  statLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "600",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  valueServed: {
    color:'#666', 
  },
  valueTotal: {
    color: "#666",
  },
  formSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF', // Tambahkan background putih agar konsisten
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F2F5", // Warna diubah agar kontras
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  serviceListContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#BDBDBD",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    borderColor: COLORS.PRIMARY_ORANGE,
    backgroundColor: "#FFF7F0",
  },
  serviceName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  footer: {
    padding: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  submitButton: {
    backgroundColor: "#28A745",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  width: '80%',
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalTitle: {
  fontSize: 19,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
  textAlign: 'center',
},
modalMessage: {
  fontSize: 13,
  color: '#555',
  marginBottom: 20,
  textAlign: 'center',
},
modalButton: {
  backgroundColor: '#053F5C',
  paddingVertical: 10,
  paddingHorizontal: 45,
  borderRadius: 8,
},
modalButtonText: {
  color: 'white',
  fontSize: 16, 
  fontWeight: 'bold',
},

});

export default styles;
