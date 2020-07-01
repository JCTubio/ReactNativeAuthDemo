import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessageContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  errorMessage: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorMessageHidden: {
    height: 50,
  },
  redirectTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  linkText: {
    color: colors.brand,
    fontWeight: '500',
  },
  socialLoginButtons: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
  socialButtonWrapper: {
    marginBottom: 20,
  },
  dividerWrapper: {
    marginHorizontal: 30,
    marginBottom: 30,
  },
});

export default styles;
