import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  divider: {
    position: 'relative',
    width: '100%',
  },
  dividerText: {
    alignSelf: 'center',
    width: 'auto',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  dividerFirstBlock: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dividerSecondBlock: {
    width: '100%',
  },
});

export default styles;
