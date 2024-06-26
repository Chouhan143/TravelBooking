import React, {useEffect, useMemo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BusSeatScreenStyle} from '../../styles';
import {useTheme} from '@react-navigation/native';
import {LikeUnlike} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {updateSelectedSeats, updateTotalPrice} from '../../redux/action';
import {SH, SW} from '../../utils';
const BusSeatDataFlatlist = props => {
  const {Colors} = useTheme();
  const {item, index} = props;

  const SeatPrice = item.Price.PublishedPrice;
  // console.log('SeatPrice', SeatPrice);
  const seatName = item.SeatName;
  // console.log('seatName', seatName);

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

  // Update price according to seat selected
  // useEffect(() => {
  //   // Ensure props.busSeats is defined and not empty before calculating totalPrice

  //   console.log('check');

  //   if (!props.busSeats || props.busSeats.length === 0) {
  //     return; // Exit early if busSeats is not defined or empty
  //   }

  //   // Calculate total price based on selected seats
  //   const totalPrice = selectedSeatData.reduce((total, seatName) => {
  //     const seat = props.busSeats.find(s => s.SeatName === seatName);
  //     console.log(seat, 'seat');
  //     return total + (seat ? seat.Price.PublishedPrice : 0);
  //   }, 0);

  //   console.log(totalPrice, 'totalPrice');

  //   // Dispatch action to update total price in Redux store
  //   dispatch(updateTotalPrice(totalPrice));
  // }, [selectedSeatData, props.busSeats, dispatch]);

  useEffect(() => {
    const totalPrice = SeatPrice * selectedSeatData.length;
    dispatch(updateTotalPrice(totalPrice));
  }, [selectedSeatData, SeatPrice, dispatch]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SH(10),
        marginRight: SW(220),
      }}>
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
            IsLadiesSeat={item.IsLadiesSeat}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusSeatDataFlatlist;
