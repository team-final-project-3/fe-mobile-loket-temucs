import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#F97316', // Latar belakang oranye
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    // Membuat container menjadi transparan dan menyesuaikan posisi
    backgroundColor: 'transparent',
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -55, // Setengah dari tinggi (110 / 2)
  },
  logo: {
    // Membuat gambar logo mengisi seluruh area container
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginTop: 60, // Memberi ruang untuk logo
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
      fontSize: 14,
      color: '#4A5568',
      marginBottom: 8,
      alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#006D77', // Warna biru tua
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // Gaya baru untuk error
  inputError: {
    borderColor: 'red', // Border merah saat error
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-start', // Rata kiri
  },
});

export default styles;
