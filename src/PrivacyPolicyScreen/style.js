// /screens/PrivacyPolicy/style.js
import { StyleSheet } from 'react-native';

const privacyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#FF6F00',
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 8,
    padding: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    color: '#555',
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
    marginLeft: 10,
    color: '#555',
  },
  understandButton: {
    backgroundColor: '#053F5C',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-end',
    // Atur panjang button di sini:
    width: 150, // contoh: panjang tetap 200
    // atau gunakan minWidth/maxWidth sesuai kebutuhan
    // minWidth: 150,
    // maxWidth: 300,
  },
  understandButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Pastikan teks berada di tengah
  },
});

export default privacyStyles;
