import { StyleSheet, Platform, StatusBar } from 'react-native';

const termsStyles = StyleSheet.create({
  // --- Container dan Header ---
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerImage: {
    width: '100%',
    height: 70,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
  },
  backButton: {
    marginRight: 10,
    height: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    height: 25,
    textAlign: 'center',
  },

  // --- Konten ---
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: 'center', // agar tetap di tengah
    maxWidth: 600, // opsional untuk tampilan tablet
    height: 700, // agar konten dapat menyesuaikan tinggi
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2C3E50',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 10,
    color: '#555',
  },

  // --- Tombol Setuju di kanan bawah ---
  agreeButtonContainer: {
    position: 'absolute',
    right: 35,
    // Kurangi nilai bottom agar tombol lebih ke atas
    bottom: Platform.OS === 'android' ? (StatusBar.currentHeight || 35) + 40 : 60,
  },

  agreeButton: {
    backgroundColor: '#053F5C',
    paddingVertical: 14,
    borderRadius: 8,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  agreeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default termsStyles;
