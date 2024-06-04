import { SF, SW, SH } from '../../utils';
import { StyleSheet } from 'react-native';

export default PaymentStyle = (Colors) => StyleSheet.create({
  SetbgImage: {
    width: SW(35),
    height: SH(35),
  },
  SetFlexRowArrowLeftThree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SH(30),
  },
  FlexRowCreditCard: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  IconSetBorderWidth: {
    borderWidth: SH(1),
    borderColor: Colors.light_gray_text_color,
    paddingLeft: SH(7),
    paddingRight: SH(7),
    borderRadius: SH(5),
  },
  SetTextWidth: {
    width: '75%'
  },
  CreditCardText: {
    fontSize: SF(15),
    fontWeight: '600',
    marginLeft: SH(20),
    color: Colors.black_text_color
  },
  YouNeedsText: {
    fontSize: SF(13),
    fontWeight: '600',
    marginLeft: SH(20),
    paddingTop: SH(5),
    lineHeight: 19,
    color: Colors.gray_text_color
  },
  SetParegraphViewStyle: {
    marginLeft: SH(70),
    paddingTop: SH(20),
    paddingBottom: SH(20),
  },
  ParegraphTextStyleset: {
    fontSize: SF(15),
    fontWeight: '600',
    paddingTop: SH(5),
    lineHeight: SH(22),
    color: Colors.gray_text_color,
    borderTopWidth: SH(1),
    borderTopColor: Colors.light_gray_text_color,
    paddingTop: SH(20),
  },
  MinStyleViewPhotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  MinFlexView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  MinViewSigninScreen: {
    width: '90%',
    height: '100%',
    marginHorizontal: '5%',
    paddingBottom: SH(30),
  },
  CardTextStyle: {
    fontSize: SF(20),
    fontWeight: '600',
    borderTopColor: Colors.light_gray_text_color,
    borderTopWidth: SH(0.5),
    paddingTop: SH(30),
    paddingBottom: SH(15),
    color: Colors.theme_background
  },
  SetFlexRowArrowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SH(30),
  },
  SetFlexRowArrowLeftTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SH(15),
    borderBottomWidth: SH(0.3),
    borderBottomColor: Colors.light_gray_text_color,
    paddingBottom: SH(25),
  },
  FlexRowCreditCardTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SH(30),
  },
  BottomBorder: {
    borderBottomColor: Colors.light_gray_text_color,
    borderBottomWidth: SH(0.3),
    paddingBottom: SH(20)
  },
  CardTextStyleThree: {
    fontSize: SF(20),
    fontWeight: '600',
    paddingTop: SH(30),
    borderTopColor: Colors.light_gray_text_color,
    borderTopWidth: SH(0.3),
    paddingBottom: SH(15),
    marginTop: SH(30),
    color:Colors.theme_background,
  },
  CardTextStyleTwo: {
    fontSize: SF(20),
    fontWeight: '600',
    paddingTop: SH(30),
    paddingBottom: SH(15),
    color:Colors.theme_background,
  },
});