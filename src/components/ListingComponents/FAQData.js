import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { HelpScreenStyles } from '../../styles';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { VectorIcon } from '../../components';
import { SF } from "../../utils";

const FAQData = (props) => {
    const { t } = useTranslation();
    const { item } = props;
    const [show, setShow] = useState(null);
    const toggleHandler = (id) => {
        (id === show) ? setShow(null) : setShow(id)
    };
    const { Colors } = useTheme();
    const HelpScreenStyle = useMemo(() => HelpScreenStyles(Colors), [Colors]);
    return (
        <TouchableOpacity style={HelpScreenStyle.BgColorWhite} onPress={() => toggleHandler(item.id)}>
            <View>
                <View style={HelpScreenStyle.FlexRowArrowLeftThree}>
                    <View style={HelpScreenStyle.FlexRowCreditCard}>
                        <View style={HelpScreenStyle.TextWidth}>
                            <Text style={{
                                fontSize: SF(18),
                                fontFamily: 'Poppins_Medium',
                                fontWeight: '600',
                                color: Colors.black_text_color,fontSize:SF(15)
                            }}>{t(item.smalltext)}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => toggleHandler(item.id)}>
                            {show === item.id ? <VectorIcon icon="AntDesign" name='up' size={21} color={Colors.theme_background} /> : <VectorIcon icon="AntDesign" name='down' size={21} color={'black'} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {show === item.id && <View>
                <View style={HelpScreenStyle.ParegraPhViewStyle}>
                    <Text style={{
    fontSize: SF(17),fontFamily:'Poppins_Medium',color:Colors.theme_background,fontSize:SF(15)}}>{t(item.paymentparegraph)}</Text>
                </View>
            </View> }
        </TouchableOpacity>
    );
}
export default FAQData;