import { StyleSheet } from 'react-native';
import { Fonts, SF, SH, SW } from '../../utils';

export default customStyles = (Colors) => StyleSheet.create({
  SpContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CloseView: {
    width: '100%'
  },
  SptextStyle: {
    color: Colors.wageningen_green,
    fontSize: SF(45),
    fontFamily: Fonts.Poppins_Medium
  },
  ModalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SH(17),
    position: 'relative',
    backgroundColor: Colors.light_gray_text_color,
    width: '100%'
  },
  ModalView: {
    width: '100%',
    backgroundColor: Colors.gray_text_color,
    borderRadius: SH(15),
    paddingVertical: SH(20),
    paddingHorizontal: SW(20),
    alignItems: "center",
  },
  ModalButtonClose: {
    alignItems: "flex-end",
    position: 'absolute',
    right: SW(20),
    top: SH(20)
  },
});