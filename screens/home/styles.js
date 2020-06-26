import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  greeting: {
    marginVertical: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  buttonText: {
    color: '#1A73E8',
    fontWeight: '500',
  },
  userDataContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexGrow: 0.75,
    marginBottom: 20,
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  fieldName: {
    fontSize: 16,
  },
  fieldValue: {
    paddingLeft: 10,
    fontSize: 14,
  },
  imageField: {
    height: 25,
    width: 25,
  },
});

export default styles;
