// components/FormattedTime.js
import React from 'react';
import {Text} from 'react-native';

const FormatrdTime = ({dateString, style}) => {
  const formatTime = date => {
    const dateTime = new Date(date);

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return <Text style={style}>{formatTime(dateString)}</Text>;
};

export default FormatrdTime;
