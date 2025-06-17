import { StyleSheet } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5', // Warna background abu-abu muda
    },
    navigationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: COLORS.PRIMARY_ORANGE,
        position: 'relative',
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
    contentWrapper: {
        padding: 20,
    },

    branchName: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#053F5C',
        height: 40, // Tinggi tetap untuk nama cabang
    },
    branchAddress: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
        height: 65, // Tinggi tetap untuk alamat cabang
    },
    queueStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
    // Style BARU untuk border
    borderServed: {
        borderColor: '#429EBD', // Biru
    },
    borderWaiting: {
        borderColor: COLORS.PRIMARY_ORANGE, // Oranye
    },
    borderTotal: {
        borderColor: '#A9A9A9', // Abu-abu
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
    },
    // Style BARU untuk warna nilai
    valueServed: {
        color: '#429EBD', // Biru
    },
    valueWaiting: {
        color: COLORS.PRIMARY_ORANGE, // Oranye
    },
    valueTotal: {
        color: '#666', // Abu-abu tua
    },
    formContainer: {
        backgroundColor: COLORS.PRIMARY_ORANGE,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    formTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        color: 'white',
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: 'black',
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    submitButton: {
        backgroundColor: '#28A745', // Warna hijau
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '85%'
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
