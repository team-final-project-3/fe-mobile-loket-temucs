import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';

const styles = StyleSheet.create({
  // --- STRUKTUR DASAR ---
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },

  // --- HEADER BARU DENGAN IMAGEBACKGROUND ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  // --- KONTEN UTAMA ---
  contentBody: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },

  infoText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  noDocumentText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 15,
    paddingVertical: 30,
    fontStyle: 'italic',
  },

  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },

  documentText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginLeft: 15,
  },

  quantityText: {
    fontWeight: 'bold',
    color: 'black',
  },

  // --- FOOTER DAN TOMBOL ---
  footerWrapper: {
    backgroundColor: '#fff',
  },

  footerInner: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 40 : 30,
  },

  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  submitButtonDisabled: {
    backgroundColor: '#A9A9A9',
    elevation: 0,
    shadowOpacity: 0,
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // --- MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  modalContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  modalIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  modalTextContainer: {
    flex: 1,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },

  modalMessage: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 20,
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#E5E7EB',
  },

  confirmButton: {
    backgroundColor: '#28A745',
  },

  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },

  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  // --- MODAL SUKSES ---
  successIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E2B282',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },

  successButton: {
    backgroundColor: '#053F5C',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center', 
    paddingHorizontal: 22,  
    minWidth: 130, 
  },

  successButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- SKELETON (OPSIONAL) ---
  skeletonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  skeletonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },

  skeletonText: {
    width: 220,
    height: 16,
    borderRadius: 4,
  },
});

export default styles;
