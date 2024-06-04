import {StyleSheet} from 'react-native';
import {Fonts, SF, SH, SW} from '../../utils';

export default Login = Colors =>
  StyleSheet.create({
    Container: {
      width: '100%',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    countryCodePickerView: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
      fontSize: SF(12),
    },
    LoginText: {
      fontSize: SF(27),
      color: Colors.theme_background,
      textAlign: 'center',
      fontFamily: Fonts.Poppins_Medium,
    },
    ImageSet: {
      width: SW(180),
      height: SH(140),
    },
    TextStyle: {
      color: Colors.black_text_color,
      fontSize: SF(17),
      fontFamily: Fonts.Poppins_Medium,
    },
    registerTextStyle: {
      fontSize: SF(17),
      fontFamily: Fonts.Poppins_Bold,
      color: Colors.theme_background,
    },
    ViewTextStyle: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      paddingLeft: SH(15),
    },
    MinViewScreen: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    InputSpaceView: {
      width: '100%',
    },
    simplestatetext: {
      fontSize: SF(18),
      fontFamily: Fonts.Poppins_Medium,
      width: SW(60),
      borderBottomColor: Colors.theme_background,
    },
    simplestatetexttwoset: {
      fontSize: SF(18),
      fontFamily: Fonts.Poppins_Medium,
      paddingRight: SH(20),
      width: '100%',
      borderBottomColor: Colors.theme_background,
    },
    minviewtext: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
    },
    SetHeightmodal: {
      height: '100%',
      overflow: 'hidden',
    },
    addplacestextset: {
      paddingRight: SH(20),
      fontSize: SF(14),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.theme_background,
      borderBottomColor: Colors.theme_background,
    },
    setserachbgcolorview: {
      position: 'relative',
      zIndex: 4,
      paddingTop: SH(10),
      paddingHorizontal: SH(10),
      paddingBottom: SH(10),
      backgroundColor: Colors.theme_background,
    },

    TopSpaceRegister: {
      paddingTop: SH(50),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      paddingBottom: SH(20),
      paddingLeft: SH(15),
    },
    RegisterText: {
      fontFamily: Fonts.Poppins_Bold,
      fontWeight: '700',
      fontSize: SF(25),
      color: Colors.theme_background,
    },
    TopSpaceRegisterTwo: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
    },
    FirstNameTextStyle: {
      color: Colors.black_text_color,
      fontSize: SF(15),
      opacity: 0.7,
      fontFamily: Fonts.Poppins_Medium,
    },
    MinVieCountry: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    DropDownIconFlex: {
      flexDirection: 'row',
      alignItems: 'center',

      borderRightWidth: 1,
      paddingRight: SH(20),
      borderRightColor: Colors.light_gray_text_color,
    },
    dropdowniconright: {
      position: 'relative',
      left: SH(9),
    },
    FlexRowChekBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
    },
    SimpleTextStyle: {
      fontSize: SF(11),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      top: SH(-25),
      width: '75%',
    },
    CheckBoxView: {
      fontSize: SF(11),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      top: SH(-25),
    },
    bluecolor: {
      color: Colors.blue_color,
    },
    ButtonView: {
      width: '100%',
      paddingHorizontal: SH(20),
    },
    TopSpace: {
      width: '100%',
    },
    AlredyAndLoginBox: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    MemberTextStyle: {
      fontSize: SF(15),
      fontFamily: Fonts.Poppins_Medium,
      textAlign: 'center',
      color: Colors.black_text_color,
    },
    LoginScreenText: {
      paddingLeft: SH(10),
      fontFamily: Fonts.Poppins_Bold,
      fontSize: SF(16),
      color: Colors.theme_background,
    },
    AccountButton: {
      width: '100%',
    },
    MinViewScreen: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: Colors.white_text_color,
    },
    KeyBordTopViewStyle: {
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    MinFlexView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    MinViewSecond: {
      width: '90%',
      marginHorizontal: '5%',
    },
    LoginButton: {
      width: '100%',
      paddingHorizontal: SH(20),
    },
    MinViewBgColor: {
      backgroundColor: Colors.white_text_color,
      height: '100%',
    },
    ForgetPasswordStyles: {
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
      fontSize: SF(18),
      fontWeight: '600',
    },
    TabMinView: {
      width: '100%',
      height: '100%',
      paddingTop: SH(20),
      paddingHorizontal: SH(20),
      backgroundColor: Colors.white_text_color,
    },
    InputUnderLine: {
      backgroundColor: Colors.light_gray_text_color,
      color: Colors.black_text_color,
      width: '100%',
      height: SH(58),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: SH(10),
      fontFamily: Fonts.Poppins_Medium,
      paddingHorizontal: SH(15),
      shadowOffset: {
        width: 0,
        height: Platform.OS === 'ios' ? 0 : 25,
      },
      shadowOpacity: 0.58,
      shadowRadius: Platform.OS === 'ios' ? 0 : 25,
      elevation: Platform.OS === 'ios' ? 0 : 0,
    },
    Marginright: {
      paddingRight: SH(6),
    },
    WidthSet: {
      width: '100%',
    },
    BorderWidth: {
      borderWidth: SH(1),
      width: '100%',
      borderColor: Colors.black_text_color,
      height: SH(55),
      borderRadius: SH(10),
    },
    SearchInputBorder: {
      borderWidth: SH(0),
    },
    InputTextStyle: {
      fontSize: SF(16),
      fontFamily: Fonts.Poppins_Medium,
      width: '100%',
      backgroundColor: 'transparent',
      shadowOffset: {
        width: 0,
        height: Platform.OS === 'ios' ? 0 : 0,
      },
      shadowOpacity: 0.58,
      shadowRadius: Platform.OS === 'ios' ? 0 : 0,
      elevation: Platform.OS === 'ios' ? 0 : 0,
    },
    SeTextStyleForget: {
      fontSize: SF(15),
      fontFamily: Fonts.Poppins_Medium,
      color: Colors.black_text_color,
    },
    CenterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
  });
