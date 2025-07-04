import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },

  // --- STYLES UNTUK HEADER ---
  headerWrapper: {
    // Memberi padding atas untuk menghindari status bar sistem
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 44,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, // Tinggi tetap agar stabil
    paddingHorizontal: 10,
  },
  headerLeft: {
    width: 40, // Kolom kiri untuk tombol kembali
  },
  headerCenter: {
    flex: 1, // Kolom tengah untuk judul, mengisi sisa ruang
    alignItems: 'center',
  },
  headerRight: {
    width: 40, // Kolom kanan sebagai spacer agar judul presisi di tengah
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    padding: 5,
  },
  // --- AKHIR STYLES HEADER ---

  contentWrapper: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexGrow: 1, 
  },
  branchInfoCard: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  branchName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#053F5C',
  },
  branchAddress: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    marginBottom: 16,
  },
    queueStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 15,
    marginHorizontal: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  borderServed: {
    borderColor: '#A9A9A9',
  },
  borderTotal: {
    borderColor: '#A9A9A9',
  },
  statLabel: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
  },
  valueServed: {
    color: '#666',
  },
  valueTotal: {
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#FBA44E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  formTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 8,
  },
  inputError: {
    borderColor: '#D32F2F',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dividerText: {
    color: '#FFFFFF',
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 20 : 15,
    backgroundColor: '#F0F2F5',
  },
  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
