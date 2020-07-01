import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 46,
  },
  title: {
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
  errorMessage: {
    color: colors.error,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default styles;
