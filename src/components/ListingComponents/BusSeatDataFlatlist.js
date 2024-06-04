import React, {useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BusSeatScreenStyle} from '../../styles';
import {useTheme} from '@react-navigation/native';
import {LikeUnlike} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {updateSelectedSeats, updateTotalPrice} from '../../redux/action';
const BusSeatDataFlatlist = props => {
  const {Colors} = useTheme();
  const {item, index, type, handleSeatSelection} = props;

  // console.log('item data', item);

  const SeatPrice = item.Price.PublishedPrice;
  console.log(SeatPrice);

  const dispatch = useDispatch();
  const BusSeatScreenStyles = useMemo(
    () => BusSeatScreenStyle(Colors),
    [Colors],
  );
  const selectedSeatData = useSelector(
    state => state.commomReducer.selectedSeats,
  );

  const onSelectSeat = seatName => {
    const updatedSelectedSeats = selectedSeatData.includes(seatName)
      ? selectedSeatData.filter(seat => seat !== seatName) // Deselect if already selected
      : [...selectedSeatData, seatName]; // Select if not already selected
    dispatch(updateSelectedSeats(updatedSelectedSeats));
  };

  // pdate price accourding to seat selected

  useEffect(() => {
    // Calculate total price based on selected seats
    const totalPrice = SeatPrice * selectedSeatData.length;
    // Dispatch action to update total price in Redux store
    dispatch(updateTotalPrice(totalPrice));
  }, [selectedSeatData, SeatPrice, dispatch]);

  return (
    <View style={BusSeatScreenStyles.FlexRowSeatBox}>
      <View style={BusSeatScreenStyles.Width50}>
        <TouchableOpacity onPress={() => onSelectSeat(item.SeatName)}>
          <LikeUnlike
            text={item.SeatName}
            LikeColour={Colors.green}
            UnlikeColour={Colors.white_text_color}
            index={index}
            DefaultStyle={BusSeatScreenStyles.BusSeatBox}
            ViewStyle={BusSeatScreenStyles.BuscusionStyle}
            onSelectSeat={onSelectSeat}
            isSelected={selectedSeatData.includes(item.SeatName)}
          />
        </TouchableOpacity>
      </View>
      <View style={BusSeatScreenStyles.FlexRowSeatLeft}>
        <LikeUnlike
          text={item.SeatName}
          LikeColour={Colors.green}
          UnlikeColour={Colors.white_text_color}
          index={index}
          DefaultStyle={BusSeatScreenStyles.BusSeatBox}
          ViewStyle={BusSeatScreenStyles.BuscusionStyle}
          onSelectSeat={onSelectSeat}
        />
        <View style={BusSeatScreenStyles.LastListStyle}>
          <LikeUnlike
            text={item.slepSeatName}
            LikeColour={Colors.green}
            UnlikeColour={Colors.white_text_color}
            index={index}
            DefaultStyle={BusSeatScreenStyles.BusSeatBox}
            ViewStyle={BusSeatScreenStyles.BuscusionStyle}
            onSelectSeat={onSelectSeat}
          />
        </View>
      </View>
    </View>
  );
};
export default BusSeatDataFlatlist;
