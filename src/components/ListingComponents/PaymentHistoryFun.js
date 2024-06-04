import React, { useMemo } from "react";
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { PaymentHistoryStyle } from '../../styles';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const PaymentHistoryFun = (props) => {
    const { index, item, onPress } = props;
    const { t } = useTranslation();
    const { Colors } = useTheme();
    const PaymentHistoryStyles = useMemo(() => PaymentHistoryStyle(Colors), [Colors]);

    return (
        <TouchableOpacity style={PaymentHistoryStyles.PaymentBoxPerent} onPress={() => onPress()}>
            <View style={PaymentHistoryStyles.PaymentBox}>
                <View>
                    <Image source={item.image} style={PaymentHistoryStyles.PaymentIcon} resizeMode='contain' />
                </View>
                <View style={PaymentHistoryStyles.payemnttimebox}>
                    <Text style={PaymentHistoryStyles.PayemnttranferheadText}>{t(item.paymenttype)}</Text>
                    <Text style={PaymentHistoryStyles.PaymentTimeText}>{item.Time}</Text>
                </View>
            </View>
            <View style={PaymentHistoryStyles.PaymentAounttextpadright}>
                <Text style={PaymentHistoryStyles.PaymentAounttext}>{item.Price}</Text>
                <Text style={[PaymentHistoryStyles.PayemntStatus, { color: item.Colour }]}>{t(item.Result)}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default PaymentHistoryFun;