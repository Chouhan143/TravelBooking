import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { BusSeatScreenStyle } from '../../styles';
import { useTheme } from '@react-navigation/native';
import { VectorIcon } from '../../components';
import { SF } from '../../utils';
import { useTranslation } from 'react-i18next';

const BusSeatDataFlatlist = (props) => {
    const { Colors } = useTheme();
    const { t } = useTranslation();
    const { item } = props;
    const BusSeatScreenStyles = useMemo(() => BusSeatScreenStyle(Colors), [Colors]);

    return (
        <View style={BusSeatScreenStyles.SeatAvlblBox}>
            <View style={BusSeatScreenStyles.SeatAvChildBox}>
                <VectorIcon icon="MaterialCommunityIcons" name={item.Seaticon} color={item.SeaticonColor} size={SF(22)} />
                <Text style={BusSeatScreenStyles.SeatAvChildBoxText}>{t(item.text)}</Text>
            </View>
        </View>
    )
};
export default BusSeatDataFlatlist;