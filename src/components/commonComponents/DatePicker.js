import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Style} from '../../styles';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';

function DatePicker({onDateSelect}) {
  const [dateselcet, setdateselcet] = useState('Select Date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDatePicked = date => {
    hideDateTimePicker(),
      setdateselcet(
        moment(date, 'YYYY-MM-DDTHH:mm:ss Z').local().format('DD-MM-YYYY'),
      );

    onDateSelect(
      moment(date, 'YYYY-MM-DDTHH:mm:ss Z').local().format('YYYY-MM-DD'),
    );
  };

  return (
    <View>
      <View style={Style.inputUnderLine}>
        <TouchableOpacity
          style={Style.dobView}
          onPress={() => showDateTimePicker()}>
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
export default DatePicker;
