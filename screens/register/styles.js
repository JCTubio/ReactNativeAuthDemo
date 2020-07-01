import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.white,
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
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputErrorMessage: {
    color: colors.error,
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
    borderBottomColor: colors.manatee,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputTitle: {
    color: colors.manatee,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: colors.manatee,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 42,
    fontSize: 15,
    color: colors.brandDark,
  },
  redirectTextContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  linkText: {
    color: colors.brand,
    fontWeight: '500',
  },
});

export default styles;
