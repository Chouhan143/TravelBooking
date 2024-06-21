import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Style} from '../../styles';
import moment from 'moment';

function FlightDatePicker({onDateSelectflight, initialDate}) {
  const [dateselcet, setdateselcet] = useState(
    initialDate
      ? moment(initialDate, 'YYYY-MM-DD').format('DD-MM-YYYY')
      : 'Select Date',
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDatePicked = date => {
    hideDateTimePicker();
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const formattedDateForAPI = moment(date).format('YYYY-MM-DD');
    setdateselcet(formattedDate);
    onDateSelectflight(formattedDateForAPI);
  };

  return (
    <View>
      <View style={Style.inputUnderLine}>
        <TouchableOpacity style={Style.dobView} onPress={showDateTimePicker}>
          <Text style={Style.datetextstyles}>{dateselcet}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
    </View>
  );
}

export default FlightDatePicker;
