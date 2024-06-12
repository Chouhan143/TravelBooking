import {StyleSheet, Dimensions, Platform} from 'react-native';
import {SF, SH, SW, Fonts, Colors} from '../../utils';

export default BookingTabStyle = Colors =>
  StyleSheet.create({
    minstyleviewphotograpgy: {
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      backgroundColor: Colors.white_bg_color,
      position: 'relative',
    },
    bgcolorset: {
      backgroundColor: Colors.white_bg_color,
      height: '100%',
    },
    FlewRows: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    Departuredateview: {
      borderBottomWidth: SH(1),
    },
    Departuredatext: {
      fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(14),
      paddingTop: SH(20),
    },
    minflexview: {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.white_text_color,
    },
    TabBoxTwo: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    TabsettextActiveBoxTwo: {
      paddingVertical: SH(5),
      paddingHorizontal: SH(10),
      textAlign: 'center',
      width: '33%',
      borderBottomWidth: SW(2),
      borderBottomColor: Colors.theme_background,
    },
    longimageOne: {
      width: SW(40),
      height: SH(50),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: SH(23),
      paddingBottom: SH(30),
    },
    contentContainerStyle: {
      width: '100%',
      height: 'auto',
    },
    MinHeightStyleChild: {
      backgroundColor: Colors.white_text_color,
      marginHorizontal: SH(15),
      borderRadius: SW(7),
      borderColor: Colors.black_text_color,
      borderWidth: SW(0.7),
      padding: SH(15),
      shadowColor: Colors.gray_text_color,
      shadowOffset: {
        width: SW(0),
        height: Platform.OS === 'ios' ? 2 : 5,
        minHeight: '100%',
      },
      shadowOpacity: 1,
      shadowRadius: Platform.OS === 'ios' ? 2 : 50,
      elevation: Platform.OS === 'ios' ? 1 : 6,
    },
    FlightTabBoxTwo: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      padding: SH(2),
      borderRadius: SW(7),
      backgroundColor: Colors.theme_background,
    },
    FlightTabsettextActiveBoxTwo: {
      paddingVertical: SH(3),
      paddingHorizontal: SH(10),
      textAlign: 'center',
      width: '50%',
      borderRadius: SW(7),
      backgroundColor: Colors.white_text_color,
    },
    FlightTabsettextBoxTwo: {
      paddingVertical: SH(3),
      paddingHorizontal: SH(10),
      textAlign: 'center',
      width: '50%',
    },
    FlightTabsettextTwo: {
      color: Colors.white_text_color,
      textTransform: 'uppercase',
      fontSize: SF(16),
      textAlign: 'center',
      paddingVertical: SH(0),
      paddingHorizontal: SH(10),
    },
    FlightTabsettextActiveTwo: {
      color: Colors.black_text_color,
      textTransform: 'uppercase',
      fontSize: SF(16),
      textAlign: 'center',
      paddingVertical: SH(0),
      paddingHorizontal: SH(10),
    },
    MinHeightStyle: {
      height: '100%',
      marginVertical: SH(15),
    },
    FlightMainBox: {
      paddingTop: SH(15),
    },
    WithFrom: {
      width: '100%',
    },
    FromText: {
      color: Colors.gray_text_color,
      fontSize: SF(18),
      paddingBottom: SH(10),
    },
    dropdownStyleTwo: {
      borderBottomColor: Colors.gray_text_color,
      minHeight: SH(50),
    },
    WithFrom: {
      width: '100%',
    },
    ToText: {
      color: Colors.gray_text_color,
      fontSize: SF(18),
      paddingBottom: SH(10),
      paddingTop: SH(15),
    },
    dropdownStyleTwo: {
      borderBottomColor: Colors.gray_text_color,
      minHeight: SH(50),
    },
    FlewRow: {
      flexDirection: 'row',
    },
    inputUnderLineWidth: {
      width: '50%',
    },
    inputUnderLine: {
      backgroundColor: Colors.white_text_color,
      width: '100%',
      color: Colors.black_text_color,
      borderRadius: SW(7),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: SW(0),
      height: SH(40),
      marginBottom: SH(12),
      paddingLeft: SW(7),
      borderBottomWidth: SW(1),
      borderBottomColor: Colors.shadow_color,
    },
    DateFrom: {
      color: Colors.shadow_color,
    },
    TabsettextActiveTwo: {
      color: Colors.theme_background,
      textTransform: 'uppercase',
      fontSize: SF(16),
      textAlign: 'center',
      paddingVertical: SH(3),
      paddingHorizontal: SH(10),
    },
    TabsettextTwo: {
      color: Colors.black_text_color,
      textTransform: 'uppercase',
      fontSize: SF(16),
      textAlign: 'center',
      paddingVertical: SH(3),
      paddingHorizontal: SH(10),
    },
    TabsettextBoxTwo: {
      paddingVertical: SH(5),
      paddingHorizontal: SH(10),
      textAlign: 'center',
      width: '33%',
    },
    longimageTwo: {
      width: SW(50),
      height: SH(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    longimageThree: {
      width: SW(50),
      height: SH(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    MinHeightStyle: {
      height: '100%',
      marginVertical: SH(15),
    },
    FlightMinHeightStyle: {
      marginVertical: SH(15),
    },
    MinHeightStyleChild: {
      backgroundColor: Colors.white_text_color,
      marginHorizontal: SH(15),
      borderRadius: SW(7),
      borderColor: Colors.black_text_color,
      borderWidth: SW(0.7),
      padding: SH(15),
      shadowColor: Colors.gray_text_color,
      shadowOffset: {
        width: SW(0),
        height: Platform.OS === 'ios' ? 2 : 5,
        minHeight: '100%',
      },
      shadowOpacity: 1,
      shadowRadius: Platform.OS === 'ios' ? 2 : 50,
      elevation: Platform.OS === 'ios' ? 1 : 6,
    },
    dropdownStyleTwo: {
      borderBottomColor: Colors.gray_text_color,
      minHeight: SH(50),
    },
    WithFrom: {
      width: '100%',
    },
    FlightMainBox: {
      paddingTop: SH(15),
    },
    FromText: {
      color: Colors.gray_text_color,
      fontSize: SF(18),
      paddingBottom: SH(10),
    },
    ToText: {
      color: Colors.gray_text_color,
      fontSize: SF(18),
      paddingBottom: SH(10),
      paddingTop: SH(15),
    },
    FlewRow: {
      flexDirection: 'row',
    },
    inputUnderLine: {
      backgroundColor: Colors.white_text_color,
      width: '100%',
      color: Colors.black_text_color,
      borderRadius: SW(7),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: SW(0),
      height: SH(40),
      marginBottom: SH(12),
      paddingLeft: SW(7),
      borderBottomWidth: SW(1),
      borderBottomColor: Colors.shadow_color,
    },
    DepartureText: {
      color: Colors.black_text_color,
      fontSize: SF(16),
      paddingTop: SH(15),
    },
    inputUnderLineWidth: {
      width: '50%',
    },
    inputUnderLineTow: {
      width: '100%',
      color: Colors.black_text_color,
      borderRadius: SW(7),
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingLeft: SW(0),
      height: SH(40),
      marginBottom: SH(12),
      paddingRight: SW(6),
      borderBottomWidth: SW(1),
      borderBottomColor: Colors.shadow_color,
    },
    textRight: {
      textAlign: 'right',
    },
    DateFrom: {
      color: Colors.shadow_color,
    },
    TextRight: {
      textAlign: 'right',
      color: Colors.shadow_color,
    },
    SelectPersonBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    SelectPersonBoxChild: {
      width: '31%',
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
      overflow: 'hidden',
      borderRadius: SW(7),
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: SH(10),
      borderWidth: SW(0.5),
      borderColor: Colors.light_gray_text_color,
      marginHorizontal: SH(3),
    },
    Adultstext: {
      color: Colors.black_text_color,
      textAlign: 'center',
      fontSize: SF(16),
    },
    AdultstextYears: {
      color: Colors.gray_text_color,
      textAlign: 'center',
      fontSize: SF(14),
    },
    FlexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: SH(10),
    },
    IconCommon: {
      fontSize: SF(25),
    },
    plusColor: {
      color: Colors.green,
    },
    minusColor: {
      color: Colors.red_color,
    },
    totalStyle: {
      color: Colors.black_text_color,
      fontSize: SF(18),
      paddingHorizontal: SH(10),
    },
    EconomyText: {
      color: Colors.black_text_color,
      fontSize: SF(16),
    },
    PadTop: {
      paddingTop: SH(20),
    },
    BookingDateBoxWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    BookingDateBox: {
      borderWidth: SW(1),
      borderColor: Colors.green,
      borderRadius: SW(3),
      paddingHorizontal: SH(7),
      paddingVertical: SH(5),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: SH(5),
    },
    BookingDateText: {
      color: Colors.black_text_color,
      fontSize: SF(13),
    },
    BookingDateTextTwo: {
      color: Colors.LightBlackText,
      fontSize: SF(12),
    },
    inputUnderLineWidthSetOne: {
      width: '40%',
    },
    inputUnderLineWidthSetTwo: {
      width: '30%',
    },
    FlewRowAlinCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    BookingDateBoxTwo: {
      borderWidth: SW(1),
      borderColor: Colors.black_text_color,
      borderRadius: SW(3),
      paddingHorizontal: SH(7),
      paddingVertical: SH(5),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: SH(5),
    },
    BookingACBoxWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(15),
    },
    BookingACBox: {
      padding: SH(10),
      borderWidth: SW(1),
      borderColor: Colors.black_text_color,
      borderRadius: SW(20),
      marginRight: SH(8),
    },
    BookingACBoxActive: {
      padding: SH(10),
      borderWidth: SW(1),
      borderColor: Colors.black_text_color,
      borderRadius: SW(20),
      marginRight: SH(8),
    },
    BookingAcSelectText: {
      fontSize: SF(14),
      color: Colors.gray_text_color,
    },
    BookingAcUnSelectText: {
      color: Colors.theme_background,
      fontSize: SF(14),
    },
    OffersText: {
      fontSize: SF(18),
      fontWeight: '600',
      textAlign: 'left',
      color: Colors.black_text_color,
    },
    MainViewOffers: {
      paddingRight: SW(12),
      backgroundColor: Colors.light_gray_text_color,
    },
    OffersImg: {
      height: SH(150),
      width: SW(220),
      borderRadius: SW(7),
    },
    FlatListView: {
      paddingHorizontal: '3.5%',
    },
    BgWhite: {
      backgroundColor: Colors.white_text_color,
      height: '90%',
    },
  });
