import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
  // --- STRUKTUR DASAR ---
  container: {
    flex: 1,
    backgroundColor: '#053F5C', // Warna dasar disamakan dengan header
  },
  // --- HEADER TERPADU ---
  header: {
    height: 280, // Header tinggi untuk informasi profil
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20, // Padding untuk status bar
    backgroundColor: 'rgba(0,0,0,0.3)', // Overlay gelap agar teks kontras
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 50 : 60,
    left: 20,
    padding: 5,
  },
  profileInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileRole: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  // --- KONTEN UTAMA ---
  contentBody: {
    flex: 1,
    backgroundColor: '#F4F6F8', // Latar belakang konten yang cerah
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // Efek "sheet" yang menumpuk di bawah header
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    paddingHorizontal: 25,
    marginTop: 25,
    marginBottom: 15,
  },
  infoSection: {
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  infoIcon: {
    marginRight: 20,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.TEXT_GRAY,
    fontWeight: '600',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginHorizontal: 20,
  },
});

export default styles;