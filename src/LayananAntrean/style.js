import { StyleSheet } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Latar belakang utama menjadi putih
    },
    navigationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: COLORS.PRIMARY_ORANGE,
        height: 60, // Tinggi tetap untuk header
    },
    backButton: {
        position: 'absolute',
        left: 15,
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    staticContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#F0F2F5',
        paddingBottom: 20, // Menambahkan jarak di bawah kontainer abu-abu
    },
    branchName: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#053F5C',
    },
    branchAddress: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
        height: 45, 
    },
    queueStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 10,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingVertical: 15,
        marginHorizontal: 5,
        backgroundColor: 'white',
    },
    borderServed: { borderColor: '#429EBD' },
    borderWaiting: { borderColor: COLORS.PRIMARY_ORANGE },
    borderTotal: { borderColor: '#A9A9A9' },
    statLabel: { fontSize: 12, color: '#666',  },
    statValue: { fontSize: 22, fontWeight: 'bold', marginTop: 5 },
    valueServed: { color: '#429EBD' },
    valueWaiting: { color: COLORS.PRIMARY_ORANGE },
    valueTotal: { color: '#666' },
    
    // Konten yang bisa di-scroll
    scrollableContent: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -10, // Menumpuk di atas background abu-abu
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingTop: 20,
        marginBottom: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        height: 50,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 10,
    },
    serviceList: {
        flex: 1, // Memastikan list mengisi ruang
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        // Shadow untuk efek 'elevated'
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
        marginRight: 15,
    },
    checkboxSelected: {
        backgroundColor: '#fff', // Latar belakang tetap saat dipilih
        borderColor: COLORS.PRIMARY_ORANGE,
        borderWidth: 7, // Membuat lingkaran di dalam
    },
    serviceName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    footer: {
        padding: 20,
        paddingTop: 10,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    submitButton: {
        backgroundColor: '#28A745',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
