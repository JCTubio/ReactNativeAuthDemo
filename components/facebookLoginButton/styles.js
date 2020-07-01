import { StyleSheet } from 'react-native';
import buttonStyles from '../../styles/buttons';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b5998',
    color: '#3b5998',
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
