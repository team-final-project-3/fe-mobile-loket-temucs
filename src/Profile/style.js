import { StyleSheet } from 'react-native';
import { COLORS } from '../Constant/colors'; // <- gunakan yang diekspor

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Style BARU untuk header navigasi
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: COLORS.PRIMARY_ORANGE, // Warna oranye tetap menjadi dasar
    position: 'relative',
    height: 60,
    overflow: 'hidden', // Penting untuk memastikan pola tidak keluar dari header
  },
  // Style BARU untuk gambar pola di header
  headerPatternImage: {
    opacity: 0.1, // Membuat pola terlihat subtle (samar)
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 5,
    zIndex: 1, // Memastikan tombol tetap di atas pola
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  // Card biru di bagian atas
  headerCard: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    zIndex: 1,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  branchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  // Container putih untuk semua informasi
  infoContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 4,
    marginTop: -20,
    marginHorizontal: 15, // Menambahkan margin agar kartu tidak menempel di tepi layar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Setiap baris informasi
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  infoIcon: {
    marginRight: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  // Garis pemisah
  separator: {
    height: 1,
    backgroundColor: COLORS.SEPARATOR,
  },
});

export default styles;
