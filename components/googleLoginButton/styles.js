import { StyleSheet } from 'react-native';
import buttonStyles from '../../styles/buttons';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DB4437',
    color: '#DB4437',
    ...buttonStyles.default,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
