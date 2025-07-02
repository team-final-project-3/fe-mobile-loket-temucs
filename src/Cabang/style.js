import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F8",
  },
  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginLeft: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchSortContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 10,
    height: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftSection: {
    alignItems: "center",
    marginRight: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 9,
    color: "#6B7280",
    fontWeight: "500",
  },
  middleSection: {
    flex: 1,
  },
  branchName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  branchAddress: {
    fontSize: 12,
    color: "#6B7280",
  },
  rightSection: {
    alignItems: "center",
    marginLeft: 16,
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
  },
  statusOpen: {
    backgroundColor: "#D1FAE5",
  },
  statusClosed: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  queueInfo: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  queueText: {
    fontSize: 11,
    color: "#92400E",
    fontWeight: "bold",
  },
  // Skeleton Styles
  skeletonIcon: {
    backgroundColor: "#E5E7EB",
  },
  skeletonLineShort: {
    width: 30,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  skeletonLineMedium: {
    width: "60%",
    height: 14,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonLineLong: {
    width: "90%",
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  skeletonStatus: {
    width: 60,
    height: 20,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    marginBottom: 8,
  },
  skeletonQueue: {
    width: 70,
    height: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
  },
});

export default styles;
