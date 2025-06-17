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
    justifyContent: 'center', // Memusatkan judul
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: COLORS.PRIMARY_ORANGE, // Warna oranye seperti di gambar
    position: 'relative', // Diperlukan agar tombol kembali bisa diposisikan absolut
    height: 60, // Tinggi tetap untuk header
  },
  backButton: {
    position: 'absolute', // Posisikan di kiri
    left: 15,
    padding: 5, // Area sentuh yang lebih besar
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textLight, // Teks warna putih
  },
  // Card biru di bagian atas
  headerCard: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingBottom: 40, // Beri ruang lebih di bawah untuk lekukan
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    zIndex: 1, // Pastikan card ini di atas container info
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
  // Container putih untuk semua informasi di bawah header card
  infoContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 20, // Padding tetap ada agar konten di dalamnya tidak menempel ke tepi layar
    paddingVertical: 10,
    elevation: 4,
    marginTop: -20, // Tarik container ini ke atas agar menumpuk di bawah lekukan header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Setiap baris informasi (Lokasi, Jam, dll)
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20, // Padding vertikal untuk memberi jarak
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
    fontWeight: '600', // Sedikit tebal
    marginBottom: 4,
    textTransform: 'uppercase', // Sesuai desain
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  // Garis pemisah antar infoRow
  separator: {
    height: 1,
    backgroundColor: COLORS.SEPARATOR,
    // marginHorizontal dihapus agar garis pemisah membentang selebar kontainer
  },
});

export default styles;
