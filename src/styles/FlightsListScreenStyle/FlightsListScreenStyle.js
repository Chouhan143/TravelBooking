
import { StyleSheet } from 'react-native';
import { SF, SH, SW, Colors } from '../../utils';

export default StyleSheet.create({

    MonthBox: {
        backgroundColor: Colors.gray_text_color,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: SW(0.5),
        borderLeftColor: Colors.gray_text_color,
        borderRightWidth: SW(0.5),
        borderRightColor: Colors.gray_text_color
    },
    MonthName: {
        color: Colors.white_text_color,
        fontSize: SF(14),
        transform: [{ rotate: '270deg' }]
    },
    TabBoxMain: {
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: SW(0.5),
        borderTopColor: Colors.gray_text_color,
        borderBottomWidth: SW(0.5),
        borderBottomColor: Colors.gray_text_color
    },
    TabBoxTwo: {
        flexDirection: 'row',
        width: '100%',
    },
    TabsettextActiveBoxTwo: {
        paddingVertical: SH(5),
        paddingHorizontal: SH(10),
        textAlign: 'center',
        minWidth: SW(80),
        borderBottomWidth: SW(2),
        borderBottomColor: Colors.theme_background
    },
    TabsettextBoxTwo: {
        paddingVertical: SH(5),
        paddingHorizontal: SH(10),
        textAlign: 'center',
        minWidth: SW(80),
    },
    TabsettextActiveTwo: {
        color: Colors.black_text_color,
        textTransform: 'uppercase',
        fontSize: SF(14),
        textAlign: 'center',
        paddingVertical: SH(3),
        paddingHorizontal: SH(10),
    },
    TabsettextTwo: {
        color: Colors.black_text_color,
        textTransform: 'uppercase',
        fontSize: SF(14),
        textAlign: 'center',
        paddingVertical: SH(3),
        paddingHorizontal: SH(10),
    },

    TabsettextActiveTwoWeek: {
        color: Colors.black_text_color,
        textTransform: 'uppercase',
        fontSize: SF(11),
        textAlign: 'center',
        paddingVertical: SH(1),
        paddingHorizontal: SH(7),
    },
    TabsettextTwoWeek: {
        color: Colors.black_text_color,
        textTransform: 'uppercase',
        fontSize: SF(11),
        textAlign: 'center',
        paddingVertical: SH(1),
        paddingHorizontal: SH(7),
    },
    FilterboxStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        borderRadius: SW(20),
        paddingHorizontal: SH(10),
        paddingVertical: SH(5),
        marginHorizontal: SH(10),
        marginVertical: SH(10)
    },
    FilterMainBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    FilterTextboxStyle: {
        color: Colors.black_text_color,
        fontSize: SF(16),
        marginLeft: SH(5),
        marginRight: SH(5)
    },
    TabIconActive: {
        fontSize: SF(14),
        color: Colors.black_text_color
    },
    TabIconInActive: {
        fontSize: SF(14),
        color: Colors.gray_text_color,
    },
    OpratorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        borderBottomWidth: SW(0.5),
        paddingVertical: SH(15),
        borderRadius: SW(15),
        marginHorizontal: SH(20),
        marginVertical: SH(12),
        position: 'relative'
    },
    OpratorPriceBox: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    OpratorPriceText: {
        fontSize: SF(20),
        color: Colors.black_text_color,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    OpratorPlaneBox: {
        width: '55%',
        paddingLeft: SH(20)
    },
    PlanemainTextBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    FligtText: {
        fontSize: SF(12),
        color: Colors.gray_text_color,
        textAlign: 'center'
    },
    PlanemainValidityText: {
        fontSize: SF(14),
        color: Colors.gray_text_color
    },
    PlanemainValidityTextTwo: {
        fontSize: SF(18),
        color: Colors.black_text_color,
        paddingBottom: SH(5)
    },
    OpratorPlaneRightArrowBox: {
        paddingRight: SH(10)
    },
    PlanemainMoreTextText: {
        fontSize: SF(14),
        color: Colors.gray_text_color,
        paddingTop: SH(5)
    },
    CityText: {
        color: Colors.black_text_color,
        fontSize: SF(20),
    },
    CityMainBoxWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },
    CityMainBox: {
        width: '80%',
        paddingLeft: SH(20)
    },
    FlightsCityBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: Colors.gray_text_color,
        borderBottomWidth: SW(0.5),
        paddingVertical: SH(15),
        paddingLeft: SH(10)
    },
    FlighgtBoxImg: {
        width: '20%',
        maxWidth: SW(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
    OffreboxOne: {
        position: 'absolute',
        top: SH(-11),
        left: SW(10),
        backgroundColor: Colors.white_text_color,
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        borderRadius: SW(3),
        paddingHorizontal: SH(5),
        paddingVertical: SH(3)
    },
    TicketboxOne: {
        position: 'absolute',
        top: SH(-11),
        right: SW(10),
        backgroundColor: Colors.white_text_color,
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        borderRadius: SW(3),
        paddingHorizontal: SH(5),
        paddingVertical: SH(3)
    },
    OffreboxOneText: {
        color: Colors.green,
        fontSize: SF(12),
    },
    TicketboxOneText: {
        color: Colors.orange,
        fontSize: SF(12),
    },
    Mr20: {
        paddingTop: SH(10)
    },
    PayBottomShetBox: {
        position: 'relative',
        zIndex: 111,
        height: '100%'
    },
    PayBottomShetBoxChild: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SH(20),
        paddingVertical: SH(10),
        backgroundColor:'#f0f0f0',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderColor:'black',
        paddingBottom:SH(20),
        borderColor:'gray',
        borderWidth:1
    },
    FareText: {
        color:'black',
        fontSize: SF(13),
        fontFamily:'Poppins-Regular'
    },
    BtnPrice: {
        color: 'black',
        fontSize: SF(22),
        paddingTop: SH(5),
        fontFamily:'Poppins-Medium'
    },
    ShoWBoxFlighgtBoxImg: {
        width: '15%',
        maxWidth: SW(80),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ShoWBoOpratorPlaneBox: {
        width: '85%',
        paddingLeft: SH(20)
    },
    ShoWBoxPlanemainTextBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: SH(10)
    },
    widthFirst33: {
        width: '35%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    widthSecond33: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    widthThird33: {
        width: '35%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    widthFirst50: {
        width: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    widthThird50: {
        width: '50%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    DepText: {
        color: Colors.black_text_color,
        fontSize: SF(14),
    },
    ShoWBoxPlanemainTextBoxTwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingRight: SH(10)
    },
    ShoWBoxFlighgtBoxImgTwo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        maxWidth: SW(80),
    },
    OpratorBoxTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        borderBottomWidth: SW(0.5),
        paddingVertical: SH(15),
        borderRadius: SW(15),
        marginHorizontal: SH(20),
        marginVertical: SH(12),
        position: 'relative',
        paddingLeft: SH(7)
    },
    HeadingStyle: {
        color: Colors.black_text_color,
        fontSize: SF(22),
        paddingHorizontal: SH(20),
        paddingTop: SH(10)
    },
    TravellerText: {
        fontSize: SF(14),
        color: Colors.gray_text_color,
        paddingHorizontal: SH(20),
    },
    maintagtext: {
        fontSize: SF(14),
        color: Colors.black_text_color,
    },
    maintagtextrow: {
        fontSize: SF(18),
        color: Colors.black_text_color,
    },
    lighttextStyle: {
        fontSize: SF(14),
        color: Colors.gray_text_color,
        paddingBottom: SH(8)
    },
    DarktextStyle: {
        fontSize: SF(16),
        color: Colors.black_text_color,
    },
    ComonBoxStyle: {
        paddingVertical: SH(10),
        paddingLeft: SH(10),
    },
    TopBoxStyle: {
        paddingVertical: SH(10),
        borderBottomWidth: SW(1),
        borderBottomColor: Colors.gray_text_color,
        paddingLeft: SH(10),
        paddingTop: SH(25)
    },
    upgradeBoxStyle: {
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        width: SW(160),
        borderRadius: SW(10),
        marginTop: SH(15),
        marginHorizontal: SH(10),
        position: 'relative',
    },
    padBtn: {
        paddingBottom: SH(20)
    },
    padLeft10: {
        paddingLeft: SH(10)
    },
    FlexRowRadiobtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TagBGColor: {
        backgroundColor: Colors.yellow,
        position: 'absolute',
        top: SH(-11),
        left: SW(10),
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        borderRadius: SW(3),
        paddingHorizontal: SH(5),
        paddingVertical: SH(3)
    },
    OffreboxOneTextTow: {
        color: Colors.black_text_color,
        fontSize: SF(12),
    },
    FlexColum: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    OpratorImg: {
        width: SW(40),
        height: SH(40),
        borderRadius: SW(100)
    },
    BackArrowBoxWidthSet: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    RchSubheadTextStyle: {
        color: Colors.theme_background,
        fontSize: SF(15),
        lineHeight: 16,
        paddingTop: SH(5),
    },
    minstyleviewphotograpgyTow: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.white_text_color,
    },
    contentContainerStyle: {
        width: '100%',
        height: 'auto',
    },
    minflexview: {
        width: '100%',
        height: '100%',
    },
    minviewsigninscreen: {
        width: '100%',
        height: '100%',
        marginHorizontal: '0%',
    },
    contentContainerStyle: {
        width: '100%',
        height: 'auto',
    },
    contentContainerStyle: {
        width: '100%',
        height: 'auto',
    },
    contentContainerStyle: {
        width: '100%',
        height: 'auto',
    },
    contentContainerStyle: {
        width: '100%',
        height: 'auto',
    },

});
