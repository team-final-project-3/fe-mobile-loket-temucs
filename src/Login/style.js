import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // [BARU] Overlay oranye untuk memberikan warna pada background batik
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(249, 115, 22, 0.9)', // Warna oranye dengan opasitas 90%
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  // [PEMBARUAN] Logo diposisikan relatif terhadap layar, bukan card
  logoContainer: {
    width: 200, // Ukuran disesuaikan dengan logo baru Anda
    height: 80,
    marginBottom: 20,
    alignSelf: 'center',
  },
  logo: {
    width: '110%',
    height: '110%',
    resizeMode: 'contain',
  },
  // [PEMBARUAN] Card dibuat lebih elegan
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 24, // Sudut lebih melengkung
    padding: 30, // Padding lebih luas
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 25,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
    alignSelf: 'flex-start',
    fontWeight: '500',
  },
  // [BARU] Wrapper untuk membungkus ikon dan input
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputIcon: {
    fontSize: 22,
    color: '#A0AEC0',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  // [PEMBARUAN] Gaya tombol login
  loginButton: {
    flexDirection: 'row', // Untuk menampung ikon
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#053F5C',
    paddingVertical: 15,
    borderRadius: 12, // Sudut lebih melengkung
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#053F5C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 13,
    paddingHorizontal: 20,
    marginTop: 30,
    lineHeight: 20,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  inputError: {
    borderColor: '#E53E3E', // Warna merah yang lebih soft
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 12,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;