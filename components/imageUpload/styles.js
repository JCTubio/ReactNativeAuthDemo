import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.brand,
    color: colors.brand,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default styles;
