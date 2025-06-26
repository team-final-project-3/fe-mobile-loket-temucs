import { StyleSheet, Platform, StatusBar as RNStatusBar, Dimensions } from 'react-native';
import { COLORS } from '../Constant/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    height: 65,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    top : "auto"
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  officeName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#053F5C',
  },
  officeAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statusBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 25,
  },
  statusBoxBlue: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#429EBD',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#F0FAFF',
  },
  statusBoxOrange: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.PRIMARY_ORANGE,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFF7F0',
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
  },
  statusValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#053F5C',
  },
  ticketCard: {
    backgroundColor: '#053F5C',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  branchText: {
    fontSize: 20,
    color: COLORS.background,
    fontWeight: '600',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    paddingBottom: 8,
    width: '100%',
    textAlign: 'center',
  },
  ticketLabel: {
    fontSize: 16,
    color: COLORS.background,
  },
  ticketNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.background,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.background,
  },
  printButton: {
    backgroundColor: '#28A745',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  printButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successModalContainer: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  },
  successIconContainer: {
    backgroundColor: COLORS.PRIMARY_ORANGE,
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  modalHomeButton: {
    backgroundColor: '#053F5C',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  modalHomeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
},

});

export default styles;
