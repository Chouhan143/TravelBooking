import {SH, Fonts, SF, SW, Colors} from '../../utils';
import {StyleSheet, Platform} from 'react-native';

export default BusListScreenStyle = Colors =>
  StyleSheet.create({
    FlightsCityBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderBottomColor: Colors.black_text_color,
      borderBottomWidth: SW(0.5),
      paddingVertical: SH(15),
      paddingLeft: SH(10),
    },
    BackArrowBoxWidthSet: {
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CityMainBoxWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
    },
    CityMainBox: {
      width: '80%',
      paddingLeft: SH(20),
    },
    CityText: {
      color: Colors.theme_background,
      fontSize: SF(20),
    },
    RchSubheadTextStyle: {
      color: Colors.black_text_color,
      fontSize: SF(15),
      lineHeight: SH(16),
      paddingTop: SH(5),
    },
    HeadText: {
      color: Colors.black_text_color,
      fontSize: SF(16),
      paddingVertical: SH(20),
      paddingHorizontal: SH(15),
    },
    BusBoxWraper: {
      backgroundColor: Colors.white_text_color,
      shadowColor: Colors.gray_text_color,
      shadowOffset: {
        width: SW(0),
        height: Platform.OS === 'ios' ? 2 : 5,
        minHeight: '100%',
      },
      shadowOpacity: 1,
      shadowRadius: Platform.OS === 'ios' ? 2 : 50,
      elevation: Platform.OS === 'ios' ? 1 : 6,
      borderRadius: SW(7),
      padding: SH(10),
      marginBottom: SH(10),
    },
    TravelCompanyText: {
      color: Colors.black_text_color,
      fontSize: SF(18),
    },
    AcNonAcText: {
      color: Colors.gray_text_color,
      fontSize: SF(14),
      paddingTop: SH(7),
      fontFamily:'Poppins-Regular'
    },
    TextrightSet: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    MainPriceText: {
      color: Colors.black_text_color,
      fontSize: SF(20),
    },
    DiscountAmountText: {
      color: Colors.gray_text_color,
      fontSize: SF(14),
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      paddingTop: SH(3),
    },
    PercentaText: {
      color: Colors.green,
      fontSize: SF(14),
      paddingTop: SH(3),
    },
    FromTmeText: {
      color: Colors.black_text_color,
      fontSize: SF(16),
      paddingTop: SH(3),
    },
    BusdataTopBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    BusComonStyle: {
      color: '#000',
      fontSize: SF(14),
      paddingTop: SH(8),
      fontFamily:'Poppins-Medium',
    },
    LinkBox: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SH(8),
    },
    RatingBox: {
      width: SW(25),
      height: SH(25),
      borderRadius: SW(5),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.yellow,
    },
    RatingText: {
      color: Colors.white_text_color,
      fontSize: SF(14),
    },
    LinkBoxtext: {
      fontSize: SF(11),
      paddingHorizontal: SH(10),
      color: Colors.theme_background,
    },
    ContentContainerStyle: {
      padding: SH(10),
    },
    BuscusionStyle: {
      borderWidth: SW(1),
      borderColor: Colors.black_text_color,
      borderRadius: SW(2),
      width: '100%',
      height: SH(10),
      position: 'absolute',
      bottom: SH(10),
      backgroundColor: Colors.white_text_color,
    },
    FlexRowSeatleft: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '50%',
    },
    SeatAvlblBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SH(5),
    },
    SeatAvChildBox: {
      width: SW(60),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SH(5),
    },
    SeatAvChildBoxText: {
      color: Colors.black_text_color,
      fontSize: SF(10),
      textAlign: 'center',
    },
    TabBoxTwoMin: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SH(50),
    },
    TabBoxTwo: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: SH(10),
    },
    TabsettextActiveBoxTwo: {
      paddingVertical: SH(5),
      paddingHorizontal: SH(10),
      textAlign: 'center',
      backgroundColor: Colors.blue_color,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    TabsettextBoxTwo: {
      paddingVertical: SH(5),
      paddingHorizontal: SH(10),
      textAlign: 'center',
      width: '50%',
      borderWidth: SW(1),
      borderColor: Colors.black_text_color,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    TableftAciveBorder: {
      borderTopLeftRadius: SW(3),
      borderBottomLeftRadius: SW(3),
    },
    TablrightAciveBorder: {
      borderTopRightRadius: SW(3),
      borderBottomRightRadius: SW(3),
    },
    TabsettextActiveTwo: {
      color: Colors.white_text_color,
      textTransform: 'capitalize',
      fontSize: SF(16),
      textAlign: 'center',
      paddingVertical: SH(3),
      paddingHorizontal: SH(10),
    },
    BusSratflatlistbox: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white_text_color,
      shadowRadius: SW(2),
      shadowOffset: {
        width: SW(0),
        height: SH(-3),
      },
      shadowColor: Colors.black_text_color,
      elevation: 20,
    },
    BusFinalBoookedBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Colors.white_text_color,
      borderTopColor: Colors.black_text_color,
      borderTopWidth: SW(1),
      paddingVertical: SH(5),
    },
    Widthone: {
      width: '40%',
      paddingLeft: SH(15),
    },
    Selectedtext: {
      color: Colors.gray_text_color,
      fontSize: SF(16),
    },
    SelectedSeattext: {
      color: Colors.black_text_color,
      fontSize: SF(16),
      textAlign: 'left',
    },
    Widthtwo: {
      width: '20%',
    },
    Widththree: {
      width: '40%',
      paddingLeft: SH(20),
      paddingRight: SH(5),
    },
    ButtonStyle: {
      width: '100%',
      borderRadius: SW(10),
      height: 'auto',
      paddingVertical: SH(10),
    },
    BusComonStyleBlue: {
      color: Colors.purple,
      fontSize: SF(14),
      paddingTop: SH(8),
    },
    MinStyleViewPhotograpgyTwo: {
      height: '100%',
      width: '100%',
      backgroundColor: Colors.white_text_color,
      paddingHorizontal: '10%',
    },
    ContentContainerStyle: {
      width: '100%',
      height: 'auto',
    },
    MinViewSigninScreen: {
      width: '100%',
      height: '100%',
      marginHorizontal: '0%',
    },
  });
