import { StyleSheet } from 'react-native';
import { SF, SH, Fonts, SW, Colors } from '../../utils';

export default StyleSheet.create({
    TrainTopShowavlBox: {
        paddingHorizontal: SH(10),
        paddingVertical: SH(5),
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SH(3)
    },
    TrainTopShowavlColorBox: {
        position: 'absolute',
        left: SW(0),
        top: SH(0),
        bottom: SH(0),
        backgroundColor: Colors.light_orange,
        minHeight: '100%',
        width: '30%'
    },
    TrainTopShowavlColorBoxTwo: {
        position: 'absolute',
        left: SW(0),
        top: SH(0),
        bottom: SH(0),
        backgroundColor: Colors.light_green,
        minHeight: '100%',
        width: '30%'
    },
    TrainTopShowavlColorBoxThree: {
        position: 'absolute',
        left: SW(0),
        top: SH(0),
        bottom: SH(0),
        backgroundColor: Colors.pink,
        minHeight: '100%',
        width: '30%'
    },
    TrainTopShowavlText: {
        color: Colors.gray_text_color,
        fontSize: SF(12),
        position: 'relative',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FlexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SH(20),
        paddingVertical: SH(8),
        borderWidth: SW(0.5),
        borderColor: Colors.gray_text_color,
        marginHorizontal: SH(10),
        marginTop: SH(10)
    },
    spacebtn: {
        justifyContent: 'center'
    },
    FleFlexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SH(20),
        paddingVertical: SH(8),
        backgroundColor: Colors.pink,
        marginHorizontal: SH(20),
        marginTop: SH(10)
    },
    EyeIcon: {
        paddingRight: SH(5)
    },
    trainNumberBox: {
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        minWidth: SH(40),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SH(5),
        paddingVertical: SH(6),
        borderRadius: SW(3),
        marginRight: SH(15)
    },
    trainNumber: {
        color: Colors.black_text_color,
        fontSize: SF(14),
    },
    TrainInfoBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TrainNameText: {
        color: Colors.black_text_color,
        fontSize: SF(16),
    },
    IconRightset: {
        fontSize: SF(18),
        paddingLeft: SH(20)
    },
    FromTimetext: {
        color: Colors.black_text_color,
        fontSize: SF(16),
    },
    FromDeparNameText: {
        color: Colors.black_text_color,
        fontSize: SF(14),
    },
    RightAlin: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    TrainTimeJopurney: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SH(15)
    },
    SeatAvlbtText: {
        color: Colors.black_text_color,
        fontSize: SF(17),
    },
    TrainMode: {
        color: Colors.black_text_color,
        fontSize: SF(12),
        paddingBottom: SH(5)
    },
    TrainModeAmount: {
        color: Colors.black_text_color,
        fontSize: SF(12),
        paddingBottom: SH(5)
    },
    AvialablilityTickit: {
        color: Colors.green,
        fontSize: SF(12),
        textTransform: 'uppercase'
    },
    TrainModeBoxWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: SH(15)
    },
    TrainModeBox: {
        paddingHorizontal: SH(8),
        paddingVertical: SH(5),
        borderRadius: SW(5),
        backgroundColor: Colors.light_orange,
        maxWidth: SW(130),
        marginRight: SH(10),
        position: 'relative',
        paddingTop: SH(10)
    },
    TrainModeBoxTwo: {
        paddingHorizontal: SH(8),
        paddingVertical: SH(5),
        borderRadius: SW(5),
        backgroundColor: Colors.light_green,
        maxWidth: SW(130),
        marginRight: SH(10),
        position: 'relative',
        paddingTop: SH(10)
    },

    AvialablilityTickitTwo: {
        color: Colors.gray_text_color,
        fontSize: SF(12),
        textTransform: 'uppercase'
    },
    TrainTatkalText: {
        color: Colors.white_text_color,
        fontSize: SF(8),
    },
    TrainTatkalBox: {
        backgroundColor: Colors.gray_text_color,
        borderRadius: SW(3),
        position: 'absolute',
        left: SH(0),
        top: SH(-5),
        zIndex: 1,
        paddingHorizontal: SH(10),
        paddingVertical: SH(3)
    },
    Trainminago: {
        color: Colors.gray_text_color,
        fontSize: SF(10),
        paddingVertical: SH(10)
    },
    TraiBoxWraper: {
        backgroundColor: Colors.white_text_color,
        shadowColor: Colors.shadow_color,
        shadowOffset: {
            width: SW(0),
            height: Platform.OS === 'ios' ? 2 : 5,
            minHeight: '100%',
        },
        shadowOpacity: 1,
        shadowRadius: Platform.OS === 'ios' ? 2 : 10,
        elevation: Platform.OS === 'ios' ? 1 : 6,
        overflow: 'hidden',
        borderRadius: SW(7),
        padding: SH(10),
        marginBottom: SH(10),
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
    },
    LinkBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: SH(8)
    },
    textStyleligth: {
        color: Colors.gray_text_color,
        fontSize: SF(16),
        paddingBottom: SH(10)
    },
    textDelhi: {
        color: Colors.black_text_color,
        fontSize: SF(15),
    },
    textDelhiBox: {
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        borderRadius: SW(3),
        paddingHorizontal: SH(8),
        paddingVertical: SH(4),
        marginBottom: SH(10)
    },
    textDelhiBoxWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: SH(20)
    },
    Arrow: {
        marginHorizontal: SH(10)
    },
    TrainFinalBox: {
        padding: SH(20)
    },
    TrainFinalBtn: {
        borderRadius: SW(7)
    },
    TrainFinalBtnText: {
        fontSize: SF(20)
    },
    contentContainerStyle: {
        padding: SH(10)
    },
    FlightsCityBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: Colors.gray_text_color,
        borderBottomWidth: SW(1),
        paddingVertical: SH(15),
        paddingLeft: SH(10),
    },
    BackArrowBoxWidthSet: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
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
    CityText: {
        fontFamily: Fonts.Metropolis_SemiBold,
        color: Colors.black_text_color,
        fontSize: SF(20),
    },
    RchSubheadTextStyle: {
        fontFamily: Fonts.Metropolis_Regular,
        color: Colors.black_text_color,
        fontSize: SF(15),
        lineHeight: SH(16),
        paddingTop: SH(5)
    },
    busComonStyle: {
        fontFamily: Fonts.Metropolis_Regular,
        color: Colors.gray_text_color,
        fontSize: SF(14),
        paddingTop: SH(8)
    },
    LinkBoxtext: {
        fontFamily: Fonts.Metropolis_Medium,
        fontSize: SF(12),
        paddingHorizontal: SH(10),
        color: Colors.blue_color
    },
    minstyleviewphotograpgyTow: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.white_text_color,
        paddingHorizontal: SW(6)
    },
    contentContainerStyle: {
        width: '100%',
        height: 'auto',
    },
    minflexview: {
        width: '100%',
        height: '100%',
    },
});