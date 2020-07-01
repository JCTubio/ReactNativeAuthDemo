import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 1,
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
  inputErrorMessage: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  form: {
    flex: 1,
    marginHorizontal: 30,
  },
  profilePicInputField: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profilePicUploadButton: {
    alignItems: 'center',
    padding: 10,
  },
  inputContainer: {
    height: 40,
    marginBottom: 42,
  },
  selectorContainer: {
    marginBottom: 32,
  },
  selectorInner: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 42,
    fontSize: 15,
    color: '#161F3D',
  },
  redirectTextContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  linkText: {
    color: '#1A73E8',
    fontWeight: '500',
  },
});

export default styles;
