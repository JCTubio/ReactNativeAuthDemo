import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 46,
  },
  title: {
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
  errorMessage: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default styles;
