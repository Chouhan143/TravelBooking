import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateSelectedSeats} from '../../redux/action';

const LikeUnlke = props => {
  const {
    text,
    LikeColour,
    UnlikeColour,
    DefaultStyle,
    ViewStyle,
    index,
    onSelectSeat,
    isSelected,
  } = props;
  const [liked, setLiked] = useState([]);

  return (
    <TouchableOpacity
      onPress={() => {
        onSelectSeat(text);
      }}
      style={[
        DefaultStyle,
        {
          backgroundColor: isSelected ? props.LikeColour : props.UnlikeColour,
        },
      ]}>
      <Text>{text}</Text>
      <View style={ViewStyle}></View>
    </TouchableOpacity>
  );
};
export default LikeUnlke;
