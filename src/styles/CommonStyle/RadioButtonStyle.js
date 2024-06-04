import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { SF, SH, SW, Colors } from '../../utils';

export default StyleSheet.create({
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: SH(18),
    width: SW(18),
    marginHorizontal: SH(5),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  flexrowradiobutton: {
    width: '100%',
    marginTop: SH(20)
  },
  RadioLabel: {
    fontSize: SF(16),
    color: Colors.TextBlackColor,
    marginLeft: SH(10),
  },

});