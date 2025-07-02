import { StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { COLORS } from "../Constant/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    position: "relative",
  },

  backButton: {
    position: "absolute",
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    padding: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  branchInfoCardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  branchInfoTextContainer: {
    flex: 1,
  },

  branchName: {
    fontSize: 30,
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
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  borderServed: {
    borderColor: "#429EBD",
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
    color: "#429EBD",
  },

  valueTotal: {
    color: "#666",
  },

  formSection: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },

  searchIcon: {
    marginLeft: 10,
  },

  serviceList: {
    flex: 1,
  },

  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#EEE",
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
    borderColor: "#E0E0E0",
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
    padding: 20,
    paddingBottom: Platform.OS === "android" ? 30 : 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 3,
    borderTopColor: "#F0F0F0",
  },

  submitButton: {
    backgroundColor: "#28A745",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
