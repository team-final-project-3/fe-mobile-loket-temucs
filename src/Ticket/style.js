import { StyleSheet } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  navigationHeader: {
    backgroundColor: COLORS.PRIMARY_ORANGE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    height: 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
    textAlign: 'center',
    flex: 0.8,
  },
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
  
  // === STYLE BARU UNTUK MODAL ===
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 5,
  },
  successIconContainer: {
    backgroundColor: COLORS.PRIMARY_ORANGE,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
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
