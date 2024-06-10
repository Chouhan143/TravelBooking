import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {Colors, SF, SH} from '../../../utils';
import {FLIGHT_SEAT_MAP} from '../../../utils/BaseUrl';
import {flightSelectSeat} from '../../../redux/action';
import Entypo from 'react-native-vector-icons/Entypo';

const Seat = () => {
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const BaggageItem = useSelector(
    state => state.commomReducer.flightBaggageData,
  );
  const BaggageCabinItem = useSelector(
    state => state.commomReducer.flightBaggageCabinData,
  );
  const {flightSeatSelectData} = useSelector(state => state.commomReducer);

  const {flightTraceIdDetails} = useSelector(state => state.commomReducer);
  const {SrdvType, TraceId} = flightTraceIdDetails;

  let SrdvIndex = flightTraceIdDetails.Results;
  let SrdvIndexFlatten = SrdvIndex?.flat() ?? [];
  const SrdvIndexMap = SrdvIndexFlatten.map(
    elem => elem?.FareDataMultiple ?? [],
  ).flat();
  const SrdvIndexLoop = SrdvIndexMap.map(el3 => el3.SrdvIndex);
  const SrdvIndexValue = SrdvIndexLoop[0];
  const ResultIndex = SrdvIndexMap.map(el3 => el3.ResultIndex);
  const ResultIndexValue = ResultIndex[0];

  const seatApiRequest = async () => {
    const payload = {
      SrdvType: SrdvType,
      SrdvIndex: SrdvIndexValue,
      TraceId: TraceId.toString(),
      ResultIndex: ResultIndexValue,
    };

    try {
      setLoading(true);
      const res = await axios.post(FLIGHT_SEAT_MAP, payload);
      const seatData = res.data.Results || [];
      setSeatData(seatData);
      console.log('seat res:', seatData);
      setLoading(false);
    } catch (error) {
      console.log('seat error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    seatApiRequest();
  }, []);

  const handleSeatSelect = seat => {
    console.log('handleSeatSelect', !seat.IsBooked);
    if (!seat.IsBooked) {
      dispatch(flightSelectSeat(seat));
    }
  };

  const renderSeats = seats => {
    if (!seats) return null;
    return Object.keys(seats).map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {Object.keys(seats[row] || {}).map((col, colIndex) => {
          const seat = seats[row][col];
          const isSelected = flightSeatSelectData.some(
            selectedSeat => selectedSeat.SeatNumber === seat.SeatNumber,
          );

          return (
            <TouchableOpacity
              key={colIndex}
              style={[
                styles.seat,
                seat.IsBooked && {backgroundColor: 'darkgray'},
                isSelected && {backgroundColor: '#006633'},
              ]}
              onPress={() => handleSeatSelect(seat)}
              disabled={seat.IsBooked}>
              <Image
                source={
                  seat.IsBooked
                    ? require('../../../images/bookedSeat.png')
                    : require('../../../images/seat.png')
                }
                style={{
                  width: 50,
                  height: 50,
                  tintColor: isSelected ? '#fff' : '#000',
                }}
              />

              <Text
                style={{
                  color: isSelected ? '#fff' : '#000',
                  fontWeight: '700',
                }}>
                {seat.SeatNumber}
              </Text>
              <Text
                style={{
                  color: isSelected ? '#fff' : 'rgba(0,0,0,0.5)',
                  fontWeight: '500',
                }}>
                {seat.Amount}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: SF(18),
            color: '#000',
            fontWeight: '500',
            fontFamily: 'Poppins-Medium',
            fontWeight: '700',
          }}>
          Select your preferred seat
        </Text>
      </View>

      {loading ? (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.airplane}>
            <Image
              source={require('../../../images/Deck.webp')}
              style={{
                width: '100%',
                height: SH(250),
                borderTopLeftRadius: SH(200),
                borderTopRightRadius: SH(200),
              }}
            />

            {seatData.map((segment, index) => (
              <View key={index} style={styles.segment}>
                {renderSeats(segment.Seats)}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      {/* bootom buttons  */}
      <View
        style={{
          position: 'relative',
          bottom: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderTopColor: 'gray',
          // borderTopWidth: 0.5,
          paddingTop: 20,
        }}>
        <View>
          <Text
            style={{
              color: Colors.gray_text_color,
              fontSize: 14,
              fontWeight: '500',
            }}>
            Fare Breackup
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
              ₹ 35000
            </Text>
            <Entypo name={'chevron-down'} size={20} color={'#000'} />
          </View>
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.theme_background,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '700',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Seat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: SH(15),
    paddingHorizontal: 10,
  },
  airplane: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    backgroundColor: 'lightgray',
    borderTopLeftRadius: SH(200),
    borderTopRightRadius: SH(200),
    paddingBottom: SH(5),
  },
  segment: {
    flex: 1,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  seat: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
