import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F97316', // Warna latar belakang utama
  },
  // BARU: Style untuk container ScrollView itu sendiri
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  // BARU: Style untuk konten di dalam ScrollView
  scrollContentContainer: {
    flexGrow: 1, // Penting! Memungkinkan konten tumbuh lebih tinggi dari layar
    justifyContent: 'center', // Konten akan berada di tengah secara vertikal
    alignItems: 'center', // Konten akan berada di tengah secara horizontal
    paddingHorizontal: 20, // Padding kiri dan kanan
    paddingVertical: 50, // Padding atas dan bawah untuk memberi ruang
  },
  card: {
    width: '100%', // Card akan mengisi lebar container (dengan padding)
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Kita pindahkan justifyContent dan alignItems ke scrollContentContainer
  },
  logoContainer: {
    backgroundColor: 'transparent',
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -55,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginTop: 60, // Ruang untuk logo
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
    backgroundColor: '#053F5C',
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
    marginTop: 25,
    // Dihapus marginBottom agar jarak lebih konsisten
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;