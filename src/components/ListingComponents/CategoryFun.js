import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { HomeTabStyle } from '../../styles';
import { Colors,  SF } from "../../utils";
import { VectorIcon } from "../commonComponents";
import { useTranslation } from "react-i18next";

const CategoryFun = (props) => {
    const { item, onPress } = props;
    const { t } = useTranslation();

    return (
        <TouchableOpacity style={HomeTabStyle.FlexCenterViewTWO} onPress={() => onPress(item.id)}>
            <View style={HomeTabStyle.WidtSetNew}>
                <VectorIcon icon="MaterialIcons" name={item.iconname} size={SF(35)} style={HomeTabStyle.TopLisIcon} color={Colors.white_text_color} />
                <View style={HomeTabStyle.TetTwoView}>
                    <Text style={HomeTabStyle.TextSetFood}>{t(item.text)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CategoryFun;