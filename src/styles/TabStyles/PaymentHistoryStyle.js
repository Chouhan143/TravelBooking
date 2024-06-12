import { StyleSheet } from 'react-native';
import { SF, SH, SW } from '../../utils';

export default PaymentHistoryStyle = (Colors) => StyleSheet.create({
    AppointmentHeader: {
        height: SH(100),
        borderBottomLeftRadius: SH(20),
        borderBottomEndRadius: SH(20),
    },
    PaymentBoxwrap: {
        padding: SH(10),
        marginHorizontal: SH(12)
    },
    PaymentBoxPerent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.light_gray_text_color,
        shadowColor: Colors.gray_text_color,
        padding: SH(5),
        shadowOffset: {
            width: SW(0),
            height: Platform.OS === 'ios' ? 2 : 25,
        },
        shadowOpacity: 0.02,
        shadowRadius: Platform.OS === 'ios' ? 2 : 20,
        elevation: Platform.OS === 'ios' ? 1 : 2.5,
        borderBottomColor: Colors.light_gray_text_color,
        paddingVertical: SH(10),
        marginVertical: SH(8),
        borderRadius: SW(10)
    },
    PaymentAounttextpadright: {
        paddingRight: SH(3)
    },
    PaymentBox: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center'
    },
    AppointmentDrImage: {
        width: SW(60),
        height: SH(60),
        borderRadius: SH(100)
    },
    PayemntIcon: {
        fontSize: SF(45),
        borderRadius: SH(100),
        borderWidth: SW(1),
        borderColor: Colors.gray_text_color,
        padding: SH(5),
        color: Colors.gray_text_color
    },
    payemnttimebox: {
        paddingLeft: SH(10)
    },
    PayemnttranferheadText: {
        color: Colors.black_text_color,
        fontSize: SF(16),
    },
    PaymentTimeText: {
        color: Colors.black_text_color,
        fontSize: SF(12),
    },
    PaymentAounttext: {
        fontSize: SF(18),
        color: Colors.black_text_color,
        textAlign: 'right'
    },
    PaymentAountIcon: {
        fontSize: SF(18),
        color: Colors.gray_text_color,
    },
    PayemntStatus: {
        fontSize: SF(16),
        color: Colors.gray_text_color,
        textAlign: 'right'
    },
    PaymentIcon: {
        height: SH(30),
        width: SH(30),
    },
    MinStyleViewPhotograpgyTwo: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.white_text_color,
    },
    ContentContainerStyle: {
        width: '100%',
        height: 'auto',
    },

});