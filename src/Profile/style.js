import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
  // --- STRUKTUR DASAR ---
  container: {
    flex: 1,
    backgroundColor: '#053F5C', // Warna dasar disamakan dengan header
  },

  // --- HEADER TERPADU ---
  header: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 50 : 60,
    left: 20,
    padding: 5,
  },
  logoutButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 50 : 60,
    right: 20,
    padding: 5,
  },
  profileInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },

  // --- KONTEN UTAMA ---
  contentBody: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    paddingHorizontal: 25,
    marginTop: 25,
    marginBottom: 15,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  infoIcon: {
    marginRight: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.TEXT_GRAY,
    fontWeight: '600',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginHorizontal: 20,
  },

  // --- MODAL LOGOUT ---
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
    shadowOffset: { width: 0, height: 2 },
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
});

export default styles;
