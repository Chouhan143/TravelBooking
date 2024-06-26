import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateSelectedSeats} from '../../redux/action';
import {SW, SH} from '../../utils';

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
    seatPrice,
    IsLadiesSeat,
  } = props;
  const [liked, setLiked] = useState([]);

  // console.log("text",text)

  return (
    <TouchableOpacity
      onPress={() => {
        onSelectSeat(text);
      }}
      style={[
        DefaultStyle,
        {
          backgroundColor: isSelected
            ? IsLadiesSeat
              ? 'pink'
              : props.LikeColour
            : props.UnlikeColour,

          alignItems: 'center',
          justifyContent: 'space-evenly',
        },
      ]}>
      <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
        {text}
      </Text>
      <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
        {seatPrice}
      </Text>
      <View style={ViewStyle}></View>
    </TouchableOpacity>
  );
};
export default LikeUnlke;
