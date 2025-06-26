// SplashScreenStyle.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F27F0C',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.8,
    height: height * 0.28,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#F27F0C',
  },
  footerText: {
    fontSize: width < 400 ? 12 : 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 50, 
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default styles;
