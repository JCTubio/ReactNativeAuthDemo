import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  errorMessageContainer: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  errorMessage: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorMessageHidden: {
    height: 30,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: '#4A90E2',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  redirectTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  linkText: {
    color: '#1A73E8',
    fontWeight: '500',
  },
  socialLoginButtons: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 30,
    marginBottom: 30,
  },
  googleLoginButton: {
    height: 70,
    width: '100%',
    marginBottom: 30,
  },
});

export default styles;
