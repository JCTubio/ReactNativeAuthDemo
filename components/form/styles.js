import { StyleSheet } from 'react-native';
import buttonStyles from '../../styles/buttons';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: colors.brand,
    color: colors.brand,
    marginBottom: 18,
    ...buttonStyles.default,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default styles;
