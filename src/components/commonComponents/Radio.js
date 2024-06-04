import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

function Radio(props) {
  const {checked, onPress, iconType, checkedIcon, uncheckedIcon, checkedColor} =
    props;

  return (
    <CheckBox
      checked={checked}
      onPress={onPress}
      checkedIcon={checkedIcon}
      uncheckedIcon={uncheckedIcon}
      checkedColor={checkedColor}
    />
  );
}

export default Radio;
