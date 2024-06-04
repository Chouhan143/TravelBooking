
import { StyleSheet, Platform, Switch } from 'react-native';
import { SF, SH, SW, Colors } from '../../utils';

export default TicketScreenStyle = (Colors) => StyleSheet.create({
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.white_text_color,
    width: '100%',
  },
  bgColorset: {
    backgroundColor: Colors.white_text_color
  },
  MinViewSigninScreen: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SH(20)
  },
  setwidthsttyles: {
    width: '100%'
  },
  Addcoverimagetext: {
    fontSize: SF(20),
    fontWeight: '700'
  },
  profilepicsize: {
    height: SH(200),
    width: '100%',
    position: 'absolute',
    borderRadius: SH(10),
  },
  profilepicsizetwo: {
    height: SH(70),
    width: SW(20),
    position: 'absolute',
    borderRadius: SH(10),
  },
  Eventdetailstextstyles: {
    fontSize: SF(20),
    fontWeight: '700',
    color: Colors.theme_background,
  },
  Boxviewsamplw: {
    width: '100%',
    borderWidth: SH(1.5),
    borderColor: Colors.light_gray_text_color,
    height: SH(200),
    flexDirection: 'row',
    backgroundColor: Colors.theme_background,
    borderRadius: SH(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Boxviewsamplwnobortder: {
    width: '100%',
    borderColor: Colors.light_gray_text_color,
    height: SH(200),
    flexDirection: 'row',
    backgroundColor: Colors.theme_background,
    borderRadius: SH(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Boxviewsamplwtqwo: {
    width: '100%',
    height: SH(200),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallboxview: {
    width: SW(19),
    borderWidth: SH(1.5),
    borderColor: Colors.light_gray_text_color,
    height: SH(67),
    backgroundColor: Colors.theme_background,
    flexDirection: 'row',
    borderRadius: SH(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallboxviewnewdoiffrent: {
    width: SW(20),
    height: SH(70),
    flexDirection: 'row',
    borderRadius: SH(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iCOPNCENTER: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallboxviewminview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  Eventnamedata: {
    fontSize: SF(20),
    fontWeight: '600',
    color: Colors.black_text_color,
  },
  Inputstylewidth: {
    borderWidth: SH(1),
    borderColor: Colors.light_gray_text_color,
    shadowOffset: {
      width: SW(0),
      height: SW(25),
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 0,
  },
  LeadsDropdownbox: {
    width: '100%',
    borderWidth: SH(1),
    borderColor: Colors.light_gray_text_color,
  },
  LeadDropdown: {
    borderWidth: SH(1),
    width: '100%',
    borderColor: Colors.light_gray_text_color,
    paddingHorizontal: SH(10)
  },
  selectedTextStyleLead: {
    fontSize: SF(18),
  },
  Datebox: {
    borderWidth: SH(1),
    height: SH(47),
    borderColor: Colors.light_gray_text_color,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: SH(10),
  },
  datetextstyles: {
    fontSize: SF(17),
    color: Colors.theme_background,
  },
  qrcodescanner: {
    width: '100%',
    borderWidth: SH(0.5),
    height: SH(240),
    borderRadius: SH(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyleset: {
    height: SH(200),
    width: SW(200)
  },
  qrcosetitlestyles: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: SF(20),
    color: Colors.black_text_color,
    position: 'relative',
    top: SH(20)
  },
  ticketqrnumber: {
    textAlign: 'center',
    fontSize: SF(13),
    position: 'relative',
    bottom: SH(45)
  },
  nametextstyles: {
    fontSize: SF(16),
    color: Colors.gray_text_color,
  },
  nametextstylestwo: {
    fontSize: SF(18),
    color: Colors.black_text_color,
  },
  Flexviewnametitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SH(15),
    width: '80%',
    marginHorizontal: '8%'
  },
  Buttonviewset: {
    paddingVertical: SH(17),
    paddingHorizontal: SH(17),
  },
  Bottombutton: {
    position: 'absolute',
    bottom: SH(10),
    paddingHorizontal: SH(10),
    width: '100%'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  Addcoverphototextstyle: {
    color: Colors.black_text_color,
    fontSize: SF(18),
  },
  MainViewTicketScreen: {
    width: '100%',
    height: 'auto',
  }
});
