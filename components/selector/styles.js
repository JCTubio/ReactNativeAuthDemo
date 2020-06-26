import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  inner: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    color: '#8A8F9E',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  errorMessage: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default styles;
