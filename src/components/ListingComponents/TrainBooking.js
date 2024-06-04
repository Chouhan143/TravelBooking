import React from "react";
import { Text, View,TouchableOpacity,} from "react-native";
import { TrainListingStyle } from '../../styles';
import { VectorIcon } from "../../components";
import { SF, Colors } from "../../utils";
import { useTranslation } from 'react-i18next';

const TrainBooking = (props) => {
    const { t } = useTranslation();
    const { onPress,item } = props;
    return (
        <View style={TrainListingStyle.FlightsCityBox}>
            <View style={TrainListingStyle.BackArrowBoxWidthSet}>
                <TouchableOpacity onPress={() => onPress()}>
                    <VectorIcon icon="AntDesign" name="arrowleft" size={SF(20)} color={Colors.theme_background} />
                </TouchableOpacity>
            </View>
            <View style={TrainListingStyle.CityMainBoxWrap}>
                <View style={TrainListingStyle.CityMainBox}>
                    <Text style={TrainListingStyle.CityText}>{t(item.Cityfrom)}  <VectorIcon icon="AntDesign" name="arrowright" size={SF(15)} color={Colors.theme_background} /> {t(item.Cityto)}</Text>
                    <Text style={TrainListingStyle.RchSubheadTextStyle}>{t(item.CardType)}</Text>
                </View>
            </View>
        </View>
    )
};
export default TrainBooking;