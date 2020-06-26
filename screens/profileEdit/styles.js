import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 1,
  },
  logoutContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textButton: {
    paddingTop: 10,
    paddingRight: 10,
  },
  textButtonText: {
    color: '#1A73E8',
    fontWeight: '500',
  },
  greeting: {
    marginTop: 32,
    marginBottom: 32,
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
  redirectTextContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  linkText: {
    color: '#1A73E8',
    fontWeight: '500',
  },
});

export default styles;
