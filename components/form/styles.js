import { StyleSheet } from 'react-native';
import buttonStyles from '../../styles/buttons';

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    color: '#4A90E2',
    marginBottom: 18,
    ...buttonStyles.default,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
