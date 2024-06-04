import { StyleSheet } from 'react-native';
import {  Fonts, SF, SH, SW } from '../../utils';

export default SettingStyle = (Colors) => StyleSheet.create({
  MinFlexView: {
    width: '93%',
  },
  Togglrswitchflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  CellularDataText: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black_text_color,
  },
  TogglesWotchview: {
    borderBottomWidth: SH(0.3),
    borderBottomColor: Colors.light_gray_text_color,
    paddingBottom: SH(22),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DownlodToggleswitchText: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(16),
    width:'95%',
    textAlign:'left'
  },
  StandardRecommeDtext: {
    fontFamily: Fonts.Poppins_Medium,
    color:  Colors.black_text_color,
    fontSize: SF(16),
  },
  DownloadFasterText: {
    fontSize: SF(14.5),
    fontFamily: Fonts.Poppins_Medium,
    opacity: 0.5,
    paddingTop: '3%',
    color:  Colors.black_text_color,
  },
  ChekIconStyle: {
    color:  Colors.black_text_color,
  },
  offlinedoenloadstextset: {
    fontSize: SF(18),
    fontFamily: Fonts.Poppins_Medium,
    paddingTop: '8%',
    color:  Colors.black_text_color,
  },
  BodyTextWidth: {
    width: '80%',
  },
  KeyBordTopViewStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CellularDataText: {
    fontSize:SF(20),
    fontFamily:Fonts.Poppins_Medium,
    color:Colors.black_text_color,
},
RightiConMinview: {
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  width:'100%',
  marginTop:'5%',
  borderBottomWidth:SH(1),
  borderBottomColor:Colors.light_gray_text_color,
  paddingBottom:SH(17),
},
RightiConMinviewtwo: {
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  width:'100%',
  marginTop:'5%',
  paddingBottom:SH(17),
},
DownloadFasterText: {
  fontSize:SF(14.5),
  fontFamily:Fonts.Poppins_Medium,
  opacity:0.5,
  paddingTop:'3%',
  color:Colors.black_text_color,
},
BodyTextWidth: {
  width:'80%',    
},
WidthSwitch: {
  width:'5%',
  position:'relative',
  zIndex:979
}
});