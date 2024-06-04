// components/FormattedDate.js
import React from 'react';
import {Text} from 'react-native';

const FormatedDate = ({dateString, style}) => {
  const formatDate = date => {
    const dateTime = new Date(date);
    // Check if the date is valid
    if (isNaN(dateTime.getTime())) {
      throw new Error('Invalid date');
    }
    const options = {
      weekday: 'short', // Short weekday name (e.g., "Fri")
      day: '2-digit', // Two-digit day (e.g., "31")
      month: 'short', // Short month name (e.g., "May")
    };

    return new Intl.DateTimeFormat('en-US', options).format(dateTime);
  };

  return <Text style={style}>{formatDate(dateString)}</Text>;
};

export default FormatedDate;
