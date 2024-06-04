import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { BookingTabStyle } from '../../styles';

const DateSelectFun = (props) => {
    const { day, date } = props;
    const [liked, setLiked] = useState(0);

    return (
        <TouchableOpacity onPress={() => { liked ? setLiked(0) : setLiked(1) }} style={liked === 0 ? BookingTabStyle.BookingDateBoxTwo : BookingTabStyle.BookingDateBox}>
            <Text style={BookingTabStyle.BookingDateText}>{date}</Text>
            <Text style={BookingTabStyle.BookingDateTextTwo}>{day}</Text>
        </TouchableOpacity>
    );
};

export default DateSelectFun;