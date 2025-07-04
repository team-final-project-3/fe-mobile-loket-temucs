import {
  StyleSheet,
  Platform,
  StatusBar as RNStatusBar,
  Dimensions,
} from "react-native";
import { COLORS } from "../Constant/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  // --- PERUBAHAN --- paddingTop dihapus dari container
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8", // Warna background disamakan
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  // Style header yang lama dihapus
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  officeName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#053F5C",
  },
  officeAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },

  // --- MODIFIKASI BAGIAN INI ---
  // STATUS BOX
  statusBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 25,
  },
  statusBoxBlue: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#A9A9A9", // Warna border biru
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Background diubah menjadi putih
  },
  // Diubah dari statusBoxOrange menjadi statusBoxGray agar lebih sesuai
  statusBoxGray: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#A9A9A9', // Warna border abu-abu
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Background diubah menjadi putih
  },
  statusLabel: {
    fontSize: 14,
    color: "#666",
  },
  statusValue: {
    fontSize: 24,
    fontWeight: "bold",
    // Warna spesifik dipindahkan ke style baru di bawah
  },
  // Style baru untuk warna angka agar sesuai dengan border
  statusValueBlue: {
    color: '#666', // Warna angka biru
  },
  statusValueGray: {
    color: '#666', // Warna angka abu-abu
  },
  // --- AKHIR MODIFIKASI ---

  // TICKET CARD
  ticketCard: {
    backgroundColor: "#053F5C",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  branchText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
    paddingBottom: 8,
    width: "100%",
    textAlign: "center",
  },
  // --- MODIFIKASI BAGIAN INI ---
  // Style 'userGreeting' dipecah menjadi container dan text
  userGreetingContainer: {
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 12,
    marginBottom: 15,
    width: '100%', // Memastikan lebar container penuh
  },
  userGreetingText: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#053F5C',
    fontSize: 16,
  },
  // --- AKHIR MODIFIKASI ---
  ticketLabel: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  ticketNumber: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 13,
    color: "#FFFFFF",
  },
  printButton: {
    backgroundColor: "#28A745",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  printButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successModalContainer: {
    width: "90%",
    maxWidth: 360,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
  },
  successIconContainer: {
    // --- PERUBAHAN --- Warna disamakan dengan tombol print
    backgroundColor: "#28A745",
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
    textAlign: "center",
  },
  modalHomeButton: {
    backgroundColor: "#053F5C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "stretch", // Tombol dibuat full-width
  },
  modalHomeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default styles;
