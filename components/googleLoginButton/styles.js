import { StyleSheet } from 'react-native';
import buttonStyles from '../../styles/buttons';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.google,
    color: colors.google,
    ...buttonStyles.default,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
