import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { HomeTabStyle } from '../../styles';

const ExclusiveOffersFun = (props) => {
    const { item, onPress } = props;

    return (
        <TouchableOpacity style={HomeTabStyle.MainViewOffers} onPress={() => onPress(item.id)}>
            <Image resizeMode="cover" style={HomeTabStyle.OffersImg} source={item.image} />
        </TouchableOpacity>
    );
};

export default ExclusiveOffersFun;