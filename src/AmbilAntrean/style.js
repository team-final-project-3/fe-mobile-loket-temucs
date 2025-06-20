import { StyleSheet } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
    // ... (semua style lain tetap sama) ...
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    navigationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: COLORS.PRIMARY_ORANGE,
        position: 'relative',
        height: 60,
    },
    backButton: {
        position: 'absolute',
        left: 15,
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentWrapper: {
        padding: 20,
    },
    branchInfoCard: {
        marginBottom: 20,
    },
    branchName: {
        fontSize: 35,
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
    borderServed: {
        borderColor: '#429EBD',
    },
    borderWaiting: {
        borderColor: COLORS.PRIMARY_ORANGE,
    },
    borderTotal: {
        borderColor: '#A9A9A9',
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
    valueServed: {
        color: '#429EBD',
    },
    valueWaiting: {
        color: COLORS.PRIMARY_ORANGE,
    },
    valueTotal: {
        color: '#666',
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
        marginBottom: 10,
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
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'white',
    },
    dividerText: {
        color: 'white',
        marginHorizontal: 10,
        fontSize: 12,
    },

    submitButton: {
        backgroundColor: '#28A745',
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