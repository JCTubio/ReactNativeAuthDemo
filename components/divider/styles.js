import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  divider: {
    position: 'relative',
    width: '100%',
  },
  dividerText: {
    alignSelf: 'center',
    width: 'auto',
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
