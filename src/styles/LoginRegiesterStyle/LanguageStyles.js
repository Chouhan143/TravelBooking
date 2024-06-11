import { StyleSheet } from 'react-native';
import { SF, SH, SW, Colors, Fonts } from '../../utils';

export default StyleSheet.create({
  DropdownStyles: {
    borderWidth: SH(0),
    padding: SH(0),
    paddingVertical: SH(0),
    width: '100%',
    borderRightWidth: SH(1),
    borderRadius: SH(0),
    borderRightColor: Colors.gray_text_color,
    minHeight: 'auto',
    paddingRight: SH(10),
    backgroundColor: Colors.white_text_color,
    paddingHorizontal: SH(15),
    borderRadius: SH(100)
  },
  DropdownStylestwo: {
    borderWidth: SH(0),
    padding: SH(0),
    paddingVertical: SH(0),
    width: "100%",
    borderRightWidth: SH(1),
    borderRadius: SH(0),
    borderRightColor: Colors.light_gray_text_color,
    minHeight: 'auto',
    paddingRight: SH(10),
    backgroundColor: Colors.white_text_color,
    paddingHorizontal: SH(15),
    borderRadius: SH(100)
  },
  DropdownStylesLead: {
    fontSize: SF(22),
  },
  TranslationDropdown: {
    width: '100%',
  },
  TranslationDropdowntwo: {
    width: '100%',
  },
  TranslationDropdownOpen: {
    width: '100%',
  },
  TranslationDropdownOpentwo: {
    width: '70%',
  },
  SelectText: {
    fontSize: SF(23),
    paddingVertical: SH(10),
    color: Colors.theme_background,
    marginRight: SW(10),
    fontFamily:Fonts.Poppins_Medium
  },
  Settingtext: {
    fontSize: SF(18),
    paddingBottom: SH(10),
    color: Colors.black_text_color,
    fontWeight: '500',
    paddingTop: SH(10),
    fontFamily: Fonts.Poppins_Medium,
  },
  MinView: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white_text_color,
  },
  ImageSet: {
    width: SW(100),
    height: SH(100),
    borderRadius: SH(200),
  },
  imagsetview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  DropdownStyles: {
    borderWidth: SH(1),
    padding: SH(0),
    paddingVertical: SH(5),
    width: '100%',
    borderRightWidth: SH(1),
    borderRadius: SH(0),
    borderRightColor: Colors.gray_text_color,
    minHeight: 'auto',
    paddingRight: SH(10),
    backgroundColor: Colors.white_text_color,
    paddingHorizontal: SH(15),
    borderRadius: SH(100)
  },
  DropdownStylestwo: {
    borderWidth: SH(0),
    padding: SH(0),
    paddingVertical: SH(5),
    width: "100%",
    borderRightWidth: SH(1),
    borderRadius: SH(0),
    borderRightColor: Colors.light_gray_text_color,
    minHeight: 'auto',
    paddingRight: SH(10),
    backgroundColor: Colors.white_text_color,
    paddingHorizontal: SH(15),
    borderRadius: SH(100)
  },
  DropdownStylesLead: {
    fontSize: SF(20),
  },
  TranslationDropdown: {
    width: '100%',
  },
  TranslationDropdowntwo: {
    width: '100%',
  },
  TranslationDropdownOpen: {
    width: '70%',
  },
  TranslationDropdownOpentwo: {
    width: '70%',
  },
  SelectTagWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderWidth: SW(1),
    borderColor: Colors.theme_background,
    borderRadius: SW(7),
    alignSelf: 'center',
    position: 'relative'
  },
  SettingStyle: {
    flexDirection: 'row',
    paddingLeft: SH(20),
    alignItems: 'center',
    width: '100%',
    borderWidth: SW(1),
    borderColor: Colors.black_text_color,
    borderRadius: SW(7),
    alignSelf: 'center',
    position: 'relative'
  },
  ConfirmButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    paddingTop: SH(12)
  },
  LoginButton: {
    paddingVertical: SH(0),
    width: '100%',
    borderRadius: SH(200)
  },
  LanguageMinView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '93%',
    paddingVertical: SH(10),
    marginHorizontal: SH(10),
    borderWidth: SH(1),
    paddingHorizontal: SH(10),
    marginBottom: SH(10),
    borderRadius: SH(8)
  },
  TextStyle: {
    color: Colors.black_text_color,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(18)
  },
  LanguageViewStyleModal: {
    backgroundColor: Colors.white_text_color,
    padding: SH(10),
    borderRadius: SH(10),
  },
  CloseButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: SH(10),
    paddingBottom: SH(10)
  },
  FlexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  BtnVieStyle: {
    width: '80%',
    position: 'absolute',
    bottom: SH(30),
    backgroundColor:Colors.theme_background,
    padding:SW(6),
    borderRadius:7
  },
  btnText:{
   fontFamily:Fonts.Poppins_Medium,
   color:'white',
   textAlign:'center',
   fontSize:SF(20)
  },
  DropDownIcon: {
    position: 'absolute',
    right: SW(15)
  }
});