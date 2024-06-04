import React, { useState, useMemo } from "react";
import { TouchableOpacity, Text } from "react-native";
import { BookingTabStyle } from '../../styles';
import { useTheme } from '@react-navigation/native';

const AcListFun = (props) => {
    const { Title } = props;
    const [liked, setLiked] = useState(0);
    const { Colors } = useTheme();
    const BookingTabStyles = useMemo(() => BookingTabStyle(Colors), [Colors]);

    return (
        <TouchableOpacity onPress={() => { liked ? setLiked(0) : setLiked(1) }} style={liked === 0 ? BookingTabStyles.BookingACBoxActive : BookingTabStyles.BookingACBox}>
            <Text style={liked === 0 ? BookingTabStyles.BookingAcSelectText : BookingTabStyles.BookingAcUnSelectText}>{Title}</Text>
        </TouchableOpacity>
    );
};

export default AcListFun;