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
