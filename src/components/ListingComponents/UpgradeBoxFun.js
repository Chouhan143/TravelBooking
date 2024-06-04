import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FlightsListScreenStyle } from '../../styles';
import { RadioButton } from 'react-native-paper';
import { Colors, SF, } from "../../utils";
import { VectorIcon, } from '../../components';

const UpgradeBoxFun = (props) => {
    const { item, value, status, onPress } = props;

    return (
        <TouchableOpacity style={FlightsListScreenStyle.upgradeBoxStyle} onPress={() => onPress()}>
            <View style={FlightsListScreenStyle.TopBoxStyle}>
                <Text style={FlightsListScreenStyle.maintagtext}>{item.maintag}</Text>
                <View style={FlightsListScreenStyle.FlexRowRadiobtn}>
                    <View>
                        <RadioButton
                            value={value}
                            status={status}
                            onPress={() => onPress()}
                            uncheckedColor={Colors.black_text_color}
                            color={Colors.theme_background}
                        />
                    </View><VectorIcon icon="Entypo" name="plus" color={Colors.black_text_color} size={SF(16)} /><Text style={FlightsListScreenStyle.maintagtextrow}><VectorIcon icon="FontAwesome" name="rupee" color={Colors.black_text_color} size={SF(16)} />{item.Pricetag}</Text>
                </View>
            </View>
            <View style={FlightsListScreenStyle.FlexColum}>
                <View style={FlightsListScreenStyle.ComonBoxStyle}>
                    <Text style={FlightsListScreenStyle.lighttextStyle}>{item.seathead}</Text>
                    <Text style={FlightsListScreenStyle.DarktextStyle}>{item.seattext}</Text>
                </View>
                <View style={FlightsListScreenStyle.ComonBoxStyle}>
                    <Text style={FlightsListScreenStyle.lighttextStyle}>{item.mealhead}</Text>
                    <Text style={FlightsListScreenStyle.DarktextStyle}>{item.Mealtext}</Text>
                </View>
                <View style={FlightsListScreenStyle.ComonBoxStyle}>
                    <Text style={FlightsListScreenStyle.lighttextStyle}>{item.ChangeFeeHead}</Text>
                    <Text style={FlightsListScreenStyle.DarktextStyle}>{item.ChangeFeeText}</Text>
                </View>
                <View style={FlightsListScreenStyle.ComonBoxStyle}>
                    <Text style={FlightsListScreenStyle.lighttextStyle}>{item.CancellationFeeHead}</Text>
                    <Text style={FlightsListScreenStyle.DarktextStyle}>{item.CancellationFeeText}</Text>
                </View>
                <View style={FlightsListScreenStyle.ComonBoxStyle}>
                    <Text style={FlightsListScreenStyle.lighttextStyle}>{item.CheckInBagHead}</Text>
                    <Text style={FlightsListScreenStyle.DarktextStyle}>{item.CheckInBagText}</Text>
                </View>
                <View style={FlightsListScreenStyle.ComonBoxStyle}>
                    <Text style={FlightsListScreenStyle.lighttextStyle}>{item.HandBagHead}</Text>
                    <Text style={FlightsListScreenStyle.DarktextStyle}>{item.HandBagText}</Text>
                </View>
            </View>
            <View style={[FlightsListScreenStyle.OffreboxOne, FlightsListScreenStyle.TagBGColor]}>
                <Text style={FlightsListScreenStyle.OffreboxOneTextTow}>{item.tagname}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default UpgradeBoxFun;