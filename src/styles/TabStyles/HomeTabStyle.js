
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SF, SH, SW, Fonts, Colors } from '../../utils';

export default  HomeTabStyle = (Colors) => StyleSheet.create({
    OffersText: {
        fontSize: SF(18),
        fontWeight: '600',
        textAlign: 'left',
        color: Colors.black_text_color,
        fontFamily:Fonts.Poppins_Medium
    },
    MainViewOffers: {
        backgroundColor: Colors.light_gray_text_color
    },
    OffersImg: {
        height: SH(150),
        width: SW(220),
        borderRadius: SW(15),
        resizeMode:'contain',
        backgroundColor:'white',
        marginRight:SW(7)
    },
    FlexCenterViewTWO: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SH(6),
        marginHorizontal: SH(16),
        borderRadius: SW(7),
        borderWidth: SW(0.5),
        borderColor: Colors.theme_background,
        backgroundColor:Colors.theme_background,
    },
    WidtSetNew: {
        width: SW(50),
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SH(20)
    },
    LottieImageStyle: {
        hight: SH(70),
        width: SW(75),
    },
    TetTwoView: {
        width: '85%'
    },
    TextSetFood: {
        fontSize: SF(10),
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: SH(2),
        color: Colors.white_text_color
    },
    TextSetFoodtwwo: {
        fontSize: SF(14),
        textAlign: 'center',
        paddingTop: SH(2),
    },
    BorderView: {
        borderBottomColor: Colors.gray_text_color,
        borderBottomWidth: SH(0.5),
        height: SH(1),
        width: '100%'
    },
    MainViewHomeTab: {
        paddingHorizontal: '3%'
    },
    BorderWidth: {
        borderWidth: SH(1),
        width: '100%',
        borderColor: Colors.theme_background,
        height: SH(50),
        borderRadius: SH(10),
    },
    ExclusiveImgWrap: {
        height: SH(100),
        width: SW(200),
        marginRight: 12,
        position: 'relative',
        borderRadius: 7
    },
    ExclusiveImg: {
        height: SH(100),
        width: SW(200),
        borderRadius: 7,
        resizeMode:'contain'
    },
    OffreView: {
        position: 'absolute',
        bottom: SH(10),
        left: SH(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    KnowMoreIcon: {
        paddingLeft: SW(6)
    },
    KnowMoreText: {
        fontSize: SF(18),
        color: Colors.theme_background
    },
    InputUnderLine: {
        backgroundColor: Colors.white_text_color,
        color: Colors.black_text_color,
        width: '100%',
        height: SH(48),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: SH(10),
        fontFamily: Fonts.Poppins_Medium,
        paddingHorizontal: SH(15),
        shadowOffset: {
            width: SW(0),
            height: Platform.OS === 'ios' ? 0 : 25,
        },
        shadowOpacity: 0.58,
        shadowRadius: Platform.OS === 'ios' ? 0 : 25,
        elevation: Platform.OS === 'ios' ? 0 : 0,
    },
    Marginright: {
        paddingRight: SH(6),
    },
    InputTextStyle: {
        fontSize: SF(16),
        fontFamily: Fonts.Poppins_Medium,
        width: '100%',
        backgroundColor: 'transparent',
        shadowOffset: {
            width: SW(0),
            height: Platform.OS === 'ios' ? 0 : 0,
        },
        shadowOpacity: 0.58,
        shadowRadius: Platform.OS === 'ios' ? 0 : 0,
        elevation: Platform.OS === 'ios' ? 0 : 0,
    },

});