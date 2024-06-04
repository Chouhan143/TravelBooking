import React from "react";
import { Switch } from 'react-native-elements';

function Switchs(props) {
    const { trackColor, onValueChange, thumbColor, value, } = props;
    return (
        <Switch
            trackColor={trackColor}
            thumbColor={thumbColor}
            onValueChange={onValueChange}
            value={value}
        />
    );
};
export default Switchs;