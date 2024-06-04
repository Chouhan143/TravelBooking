
import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, Colors } from '../../utils';

export default HelpScreenStyles = (Colors) => StyleSheet.create({
  MinViewScreen: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: SH(0),
    backgroundColor: Colors.white_text_color,
    height: '100%',
    width: '100%',
  },
  bgcolorset: {
    backgroundColor: Colors.white_text_color
  },
  MinContentView: {
    width: '100%',
    height: '100%',
    paddingBottom: SH(30),
  },
  TextparegraView: {
    paddingHorizontal: SH(20),
  },
  MinFlexView: {
    width: '100%',
    height: '100%',
  },
  NotificationView: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SH(10),
  },
  HelpViewStyles: {
    width: '100%',
    height: '100%',
  },
  PostionReView: {
    position: 'relative',
    right: SH(7),
    width: SW(230)
  },
  TextInputWidth: {
    backgroundColor: Colors.light_gray_text_color,
    borderRadius: SH(7),
    borderWidth: SH(1),
    borderColor: Colors.gray_text_color,
    paddingBottom: SH(100),
    paddingHorizontal: SH(10),
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
  },
  TextInputeText: {
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.gray_text_color,
    fontSize: SF(18),
    paddingTop: SH(20),
  },
  ButtonStyle: {
    position: 'absolute',
    bottom: SH(0),
    width: '100%',
    paddingHorizontal: SH(20),
    paddingBottom: SH(5),
  },
  BgColorWhite: {
    backgroundColor: Colors.white_text_color,
    marginBottom: SH(10),
    width: '100%',
    borderRadius: SH(10),
    borderBottomWidth: SH(1),
    borderColor: Colors.gray_text_color,
  },
  FlexRowArrowLeftThree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white_text_color,
    borderRadius: SH(5),
    padding: SH(10),
    paddingTop: SH(0),
  },
  FlexRowCreditCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextWidth: {
    width: '88%',
  },
  CreditCardText: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    fontWeight: '600',
    color: Colors.black_text_color,
  },
  ParegraPhViewStyle: {
    paddingVertical: SH(10),
    paddingHorizontal: SH(10),
    width: '88%',
  },
  paddibnglefttextstyle: {
    paddingLeft: SH(10),
    color: Colors.gray_text_color,
    width: SW(260),
    padding: SH(0),
    fontSize: SF(15),
    fontFamily: Fonts.Poppins_Medium,
  },
  ParegraphTextHelp: {
    fontSize: SF(17),
    fontFamily: Fonts.Poppins_Medium,
  },
  Camerastyleset: {
    width: SW(300),
    height: SH(310),
    borderRadius: SH(15),
    overflow: 'hidden',
    borderWidth: SH(0),
  },
  Flexrowcentercontain: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Markerstyleset: {
    width: SW(300),
    height: SH(310),
    borderRadius: SH(15),
    borderWidth: SH(0),
  },
  scanvicolor: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: Colors.white_text_color
  },
  MinViewAllContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BorderWidth: {
    borderWidth: SH(1),
    width: '100%',
    borderColor: Colors.theme_background,
    height: SH(55),
    borderRadius: SH(10),
  },

  PaddingsHorozonrtal: {
    paddingHorizontal: SH(20),
  },
  FlexCenterButton: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ChangeTheameBgColor: {
    height: SH(67),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: SH(200),
  },
  InputWidth: {
    width: '90%'
  },
  InputStyles: {
    backgroundColor: 'transparent',
    shadowOffset: {
      width: SW(0),
      height: SH(0),
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 0 : 0,
    elevation: Platform.OS === 'ios' ? 0 : 0,
  },
  Iconstyles: {
    width: '10%',
  },
  BgWhiteView: {
    position: 'absolute',
    paddingTop: SH(10),
    paddingBottom: SH(20),
    width: '100%',
    backgroundColor: Colors.white_text_color
  },
  succefullimgviewsethre: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  succefullyimg: {
    width: SW(330),
    height: SH(230),
  },
  AccountTextTwo: {
    color: Colors.black_text_color,
    fontSize: SF(23),
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center'
  },
  FlexRowStarSignup: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SH(15),
  },
  AccountTextSuccessfullyTwo: {
    fontSize: SF(17),
    textAlign: 'center',
    fontFamily: Fonts.Poppins_Medium,
    paddingBottom: SH(20),
    color: Colors.gray_text_color
  },
  InputUnderLineReviews: {
    borderWidth: SH(1),
    width: '100%',
    color: Colors.black_text_color,
    borderRadius: SH(7),
    fontFamily: Fonts.Poppins_Medium,
    marginBottom: SH(12),
    paddingVertical: SH(20),
    paddingHorizontal: SH(15),
    borderColor: Colors.gray_text_color,
  },
  PositionStyleInput: {
    position: 'relative',
    top: SH(-20),
    borderWidth:SH(0),
    paddingHorizontal:SH(0)
  },
  AccountButton: {
    width: '100%',
  },
  ButtonView: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  MinViewScreenTwo: {
    backgroundColor: Colors.white_text_color,
    height: '100%',
    width: '100%',
    paddingHorizontal: SH(15)
  },
  FlexDiractionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: SH(5),
    backgroundColor: Colors.light_yellow,
    borderRadius: SH(10),
  },
  FlexDiractionRowTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  ImageSet: {
    height: SH(100),
    width: SW(100),
    borderRadius: SH(20),
    marginRight: SH(20),
  },
  ParegraphWidth: {
    width: '68%',
  },
  TextParegraph: {
    fontSize: SF(13),
    color: Colors.gray_text_color,
    fontFamily: Fonts.Poppins_Medium,
    lineHeight: SH(19),
  },
  TwoNavemBerScreen: {
    fontSize: SF(13),
    color: Colors.theme_backgound,
    fontFamily: Fonts.Poppins_Medium,
  },
  ParegraphWidthTwo: {
    width: '68%',
    borderBottomColor: Colors.light_gray_text_color,
  },
  TwoNavemBerScreen: {
    fontSize: SF(13),
    color: Colors.theme_backgound,
    fontFamily: Fonts.Poppins_Medium,
  },
  SpaceBeetveen: {
    paddingHorizontal: SH(25),
  }
});
