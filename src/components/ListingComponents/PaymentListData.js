import React, { useState, useMemo } from "react";
import { Text, View, Image, TouchableOpacity, } from "react-native";
import { PaymentStyle } from '../../styles';
import { SF } from "../../utils";
import { VectorIcon } from "../../components";
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';

const PaymentListData = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    const { Colors } = useTheme();
    const PaymentStyles = useMemo(() => PaymentStyle(Colors), [Colors]);
    const [show, setShow] = useState(null);
    const toggleHandler = (id) => {
        (id === show) ? setShow(null) : setShow(id)
    };
    return (
        <TouchableOpacity onPress={() => toggleHandler(item.id)}>
            <View>
                <View style={PaymentStyles.SetFlexRowArrowLeftThree}>
                    <View style={PaymentStyles.FlexRowCreditCard}>
                        <View style={PaymentStyles.IconSetBorderWidth}>
                            <Image source={item.image} resizeMode='center' style={PaymentStyles.SetbgImage} />
                        </View>
                        <View style={PaymentStyles.SetTextWidth}>
                            <Text style={PaymentStyles.CreditCardText}>{t(item.smalltext)}</Text>
                            <Text style={PaymentStyles.YouNeedsText}>{t(item.paymentparegraph)}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleHandler(item.id)}>
                            {show === item.id ? <VectorIcon icon="AntDesign" name='up' size={SF(21)} /> : <VectorIcon icon="AntDesign" name='down' size={SF(21)} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {show === item.id && <View>
                <View style={PaymentStyles.SetParegraphViewStyle}>
                    <Text style={PaymentStyles.ParegraphTextStyleset}>{t("Super_is_India")}</Text>
                </View>
            </View> }
        </TouchableOpacity>
    );
}
export default PaymentListData;