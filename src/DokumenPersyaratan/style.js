import { StyleSheet } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: COLORS.PRIMARY_ORANGE,
    height: 60,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#053F5C',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  documentList: {
    gap: 10,
  },
  documentItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  documentText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
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
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  confirmButton: {
    backgroundColor: '#28A745',
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  backgroundColor: '#E78C26', // or COLORS.PRIMARY_ORANGE
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15,
},
successIconWrapper: {
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: '#E78C26',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},

successTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
},

successButton: {
  backgroundColor: '#28A745',
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
},

successButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},

});

export default styles;
