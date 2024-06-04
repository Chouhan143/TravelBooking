import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { BusSeatScreenStyle } from '../../styles';
import { SF} from "../../utils";
import { useTheme } from '@react-navigation/native';
import {VectorIcon} from '../../components';

const MobileSelect = (props) => {
    const { onPress,item } = props;

    const { Colors } = useTheme();
    const BusSeatScreenStyles = useMemo(() => BusSeatScreenStyle(Colors), [Colors]);

    return (
        <View style={BusSeatScreenStyles.FlightsCityBox}>
        <View style={BusSeatScreenStyles.BackArrowBoxWidthSet}>
            <TouchableOpacity onPress={() => onPress()}>
                <VectorIcon icon="AntDesign" name="arrowleft" size={SF(20)} color={Colors.black_text_color} />
            </TouchableOpacity>
        </View>
        <View style={BusSeatScreenStyles.CityMainBoxWrap}>
            <View style={BusSeatScreenStyles.CityMainBox}>
            </View>
        </View>
    </View>
    )
};
export default MobileSelect;