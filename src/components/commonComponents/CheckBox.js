import React from "react";
import { CheckBox } from 'react-native-elements';

function CheckBoxset(props) {
    const { checked, onPress, iconType, checkedIcon, uncheckedIcon, checkedColor } = props;
    return (
        <CheckBox
            checked={checked}
            onPress={onPress}
            iconType={iconType}
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            checkedColor={checkedColor}
        />
    );
};
export default CheckBoxset;