import React, { useEffect, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BusSeatScreenStyle } from '../../styles';
import { useTheme } from '@react-navigation/native';
import { LikeUnlike } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedSeats, updateTotalPrice } from '../../redux/action';

const BusSeatDataFlatlist = props => {
  const { Colors } = useTheme();
  const { item, index } = props;

  const SeatPrice = item.Price.PublishedPrice;

  const dispatch = useDispatch();
  const BusSeatScreenStyles = useMemo(
    () => BusSeatScreenStyle(Colors),
    [Colors]
  );
  const selectedSeatData = useSelector(
    state => state.commomReducer.selectedSeats
  );

  const onSelectSeat = seatName => {
    const updatedSelectedSeats = selectedSeatData.includes(seatName)
      ? selectedSeatData.filter(seat => seat !== seatName) // Deselect if already selected
      : [...selectedSeatData, seatName]; // Select if not already selected
    dispatch(updateSelectedSeats(updatedSelectedSeats));
  };

  // Update price according to seat selected
  useEffect(() => {
    // Ensure props.busSeats is defined and not empty before calculating totalPrice
    if (!props.busSeats || props.busSeats.length === 0) {
      return; // Exit early if busSeats is not defined or empty
    }

    // Calculate total price based on selected seats
    const totalPrice = selectedSeatData.reduce((total, seatName) => {
      const seat = props.busSeats.find(s => s.SeatName === seatName);
      return total + (seat ? seat.Price.PublishedPrice : 0);
    }, 0);

    // Dispatch action to update total price in Redux store
    dispatch(updateTotalPrice(totalPrice));
  }, [selectedSeatData, props.busSeats, dispatch]);

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
            seatPrice={`₹${SeatPrice}`} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusSeatDataFlatlist;
