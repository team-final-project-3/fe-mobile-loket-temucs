import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { COLORS } from '../Constant/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        height: 65,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    contentWrapper: {
        padding: 15, // dikurangi dari 20
        paddingBottom: 20, // dikurangi dari 40
    },
    branchInfoCard: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    branchName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#053F5C',
        textAlign: 'center',
    },
    branchAddress: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
        marginBottom: 16,
        textAlign: 'center',
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
        borderColor: '#429EBD',
    },
    borderTotal: {
        borderColor: '#A9A9A9',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 5,
    },
    valueServed: {
        color: '#429EBD',
    },
    valueTotal: {
        color: '#666',
    },
    formContainer: {
        backgroundColor: COLORS.PRIMARY_ORANGE,
        borderRadius: 12,
        padding: 15, // dikurangi dari 20
        marginBottom: 10, // dikurangi dari 20
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    formTitle: {
        color: '#FFFFFF',
        fontSize: 18, // dikurangi dari 20
        fontWeight: 'bold',
        marginBottom: 12, // dikurangi dari 20
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    inputGroup: {
        marginBottom: 10, // dikurangi dari 15
    },
    inputLabel: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: 'black',
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        color: '#888',
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#28A745',
        paddingVertical: 12, // dikurangi dari 15
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8, // dikurangi dari 10
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
