import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // --- STRUKTUR DASAR ---
  container: {
    flex: 1, // Memastikan container utama mengisi seluruh layar
    backgroundColor: '#053F5C', // Warna dasar gelap, memberikan kesan serius dan aman
  },
  header: {
    height: 110, // Header yang tinggi memberikan kesan premium dan ruang yang cukup
    justifyContent: 'center', // Memastikan judul berada di tengah secara vertikal
    alignItems: 'center', // Memastikan judul berada di tengah secara horizontal
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Memberi ruang untuk status bar di Android
    backgroundColor: 'rgba(0,0,0,0.3)', // Overlay gelap agar teks putih lebih mudah dibaca di atas gambar batik
  },
  backButton: {
    position: 'absolute', // Diposisikan secara absolut relatif terhadap header
    top: Platform.OS === 'android' ? 45 : 60, // Posisi aman di bawah status bar
    left: 20,
    padding: 5,
  },
  headerTitle: {
    color: '#FFF', // Warna putih kontras tinggi
    fontSize: 22, // Ukuran font yang jelas untuk judul halaman
    fontWeight: 'bold',
  },

  // --- KONTEN UTAMA "SHEET" ---
  contentBody: {
    flex: 1, // KUNCI UTAMA: Membuat container ini mengisi sisa ruang layar secara dinamis
    backgroundColor: '#F4F6F8', // Latar belakang cerah yang bersih untuk area membaca
    borderTopLeftRadius: 25, // Sudut melengkung untuk efek "sheet" modern
    borderTopRightRadius: 25,
    marginTop: -20, // Trik untuk membuat sheet ini seolah muncul dari bawah header
    paddingHorizontal: 20, // Padding kiri-kanan agar teks tidak menempel di tepi
    paddingTop: 25, // Padding atas untuk memberi nafas dari tepi sheet
    overflow: 'hidden', // Memastikan ScrollView tidak keluar dari area melengkung
  },
  section: {
    marginBottom: 25, // Jarak vertikal antar bagian kebijakan
  },
  sectionHeader: {
    flexDirection: 'row', // Membuat ikon dan judul sejajar
    alignItems: 'center', // Memastikan ikon dan judul rapi secara vertikal
    marginBottom: 15, // Jarak dari header bagian ke kontennya
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937', // Warna teks gelap untuk kontras yang baik
    marginLeft: 10, // Jarak antara ikon dan teks judul
  },
  bulletPointContainer: {
    flexDirection: 'row', // Membuat bullet dan teks sejajar
    alignItems: 'flex-start', // Teks dimulai dari atas jika multi-baris
    marginBottom: 12, // Jarak antar poin
    paddingLeft: 10, // Memberi indentasi pada keseluruhan list
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280', // Warna bullet yang lembut
    marginTop: 8, // Menyesuaikan posisi vertikal bullet agar sejajar dengan baris pertama teks
    marginRight: 12, // Jarak antara bullet dan teks
  },
  bulletPointText: {
    flex: 1, // Memastikan teks bisa 'wrap' jika sangat panjang
    fontSize: 15,
    lineHeight: 24, // Jarak antar baris yang ideal untuk membaca paragraf
    color: '#4B5563', // Warna abu-abu tua, lebih nyaman dibaca daripada hitam pekat
  },

  // --- FOOTER & TOMBOL AKSI ---
  footer: {
    padding: 20,
    backgroundColor: '#F4F6F8', // Warna sama dengan contentBody agar terlihat menyatu
    borderTopWidth: 1, // Garis tipis sebagai pemisah visual
    borderTopColor: '#E5E7EB',
  },
  understandButton: {
    backgroundColor: '#053F5C', // Warna utama yang konsisten dengan tema
    paddingVertical: 16, // Tombol yang tinggi dan mudah disentuh
    borderRadius: 12, // Sudut tombol yang modern
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#053F5C', // Memberi efek bayangan agar tombol terlihat "mengambang"
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8, // Efek bayangan untuk Android
  },
  understandButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;