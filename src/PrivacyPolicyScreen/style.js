import { StyleSheet, Platform, StatusBar } from 'react-native';

const privacyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  headerImage: {
    width: '100%',
    height: 75, 
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
    height: 24  ,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    height: 25,
  },

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
    height: 650, // opsional untuk tampilan tablet
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
    color: '#2C3E50',
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
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    paddingHorizontal: 25,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  understandButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default privacyStyles;
