import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BusListScreenStyle } from '../../styles';
import { VectorIcon } from '../../components';
import { SF } from '../../utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const TopListFun = (props) => {
    const { onPress, item } = props;
    const { t } = useTranslation();
    const { Colors } = useTheme();
    const BusListScreenStyles = useMemo(() => BusListScreenStyle(Colors), [Colors]);

    return (
        <View style={BusListScreenStyles.FlightsCityBox}>
            <View style={BusListScreenStyles.BackArrowBoxWidthSet}>
                <TouchableOpacity onPress={() => onPress()}>
                    <VectorIcon icon="AntDesign" name="arrowleft" size={SF(20)} color={Colors.theme_background} />
                </TouchableOpacity>
            </View>
            <View style={BusListScreenStyles.CityMainBoxWrap}>
                <View style={BusListScreenStyles.CityMainBox}>
                    <Text style={BusListScreenStyles.CityText}>{t(item.Cityfrom)}
                        <VectorIcon icon="AntDesign" name="arrowleft" size={SF(15)} color={Colors.black_text_color} /> {t(item.Cityto)}</Text>
                    <Text style={BusListScreenStyles.RchSubheadTextStyle}>{item.CardType}</Text>
                </View>
            </View>
        </View>
    );
};

export default TopListFun;