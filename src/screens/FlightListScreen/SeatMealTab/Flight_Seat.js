import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {SF, SH} from '../../../utils';
import {FLIGHT_SEAT_MAP} from '../../../utils/BaseUrl';

const Seat = () => {
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const BaggageItem = useSelector(
    state => state.commomReducer.flightBaggageData,
  );
  const BaggageCabinItem = useSelector(
    state => state.commomReducer.flightBaggageCabinData,
  );

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
      const seatData = res.data.Results;
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

  const renderSeats = seats => {
    return Object.keys(seats).map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {/* <Text style={styles.rowLabel}>{row}</Text> */}
        {Object.keys(seats[row]).map((col, colIndex) => {
          const seat = seats[row][col];
          return (
            <View key={colIndex} style={styles.seat}>
              <Text>{seat.SeatNumber}</Text>
              <Text>{seat.Amount}</Text>
              {/* <Text>{seat.IsBooked ? 'Booked' : 'Available'}</Text> */}
            </View>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: SF(15), color: '#000', fontWeight: '500'}}>
          Select your preferred seat
        </Text>
      </View>
      <ScrollView style={styles.airplane}>
        <View style={{}}>
          <Image
            source={require('../../../images/Deck.webp')}
            style={{
              width: '100%',
              height: SH(250),
              borderTopLeftRadius: SH(200),
              borderTopRightRadius: SH(200),
            }}
          />
        </View>

        {loading ? (
          <View
            style={{
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={50} color={'gray'} />
          </View>
        ) : (
          seatData.map((segment, index) => (
            <View key={index} style={styles.segment}>
              <Text style={styles.segmentLabel}>
                {segment.FromCity} to {segment.ToCity}
              </Text>
              {renderSeats(segment.Seats)}
            </View>
          ))
        )}
      </ScrollView>
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
  },
  segment: {
    flex: 1,
    marginVertical: 20,
  },
  segmentLabel: {
    fontSize: SF(16),
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowLabel: {
    fontSize: SF(14),
    fontWeight: 'bold',
    width: 50,
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
