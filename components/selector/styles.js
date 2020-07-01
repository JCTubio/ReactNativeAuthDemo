import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  inner: {
    borderBottomColor: colors.manatee,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    color: colors.manatee,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  errorMessage: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default styles;
