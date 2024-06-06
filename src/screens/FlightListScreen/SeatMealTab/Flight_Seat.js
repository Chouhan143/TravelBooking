import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SF, SH, SW} from '../../../utils';
import axios from 'axios';
import {FLIGHT_SEAT_MAP} from '../../../utils/BaseUrl';
import {useEffect} from 'react';

const Seat = () => {
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
  // console.log('SrdvIndexFlatten', SrdvIndexFlatten);
  const SrdvIndexMap = SrdvIndexFlatten.map(
    elem => elem?.FareDataMultiple ?? [],
  ).flat();
  const SrdvIndexLoop = SrdvIndexMap.map(el3 => el3.SrdvIndex);
  const SrdvIndexValue = SrdvIndexLoop[0];
  // console.log('SrdvIndexValue', SrdvIndexValue[0]);

  const ResultIndex = SrdvIndexMap.map(el3 => el3.ResultIndex);
  const ResultIndexValue = ResultIndex[0];

  const seatApiRequest = async () => {
    const payload = {
      SrdvType: SrdvType,
      SrdvIndex: SrdvIndexValue,
      TraceId: TraceId.toString(),
      ResultIndex: ResultIndexValue,
    };
    console.log('payload', payload);
    try {
      const res = await axios.post(FLIGHT_SEAT_MAP, payload);
      const seatData = res.data.Results;
      console.log('seat res:', seatData);

      // Iterate through each flight segment
      seatData.forEach(segment => {
        const {Seats} = segment;
        if (Seats) {
          console.log(
            `Seat data for flight segment from ${segment.FromCity} to ${segment.ToCity}:`,
          );
          // Iterate through each row in the Seats object
          Object.keys(Seats).forEach(row => {
            const rowData = row;
            console.log('row data ', rowData);
            console.log(`Row: ${row}`, Seats[row]);
            // console.log(`Row: ${row}`);
          });
        } else {
          console.log(
            `No seat data available for flight segment from ${segment.FromCity} to ${segment.ToCity}`,
          );
        }
      });
    } catch (error) {
      console.log('seat error:', error);
    }
  };

  useEffect(() => {
    seatApiRequest();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: SF(15), color: '#000', fontWeight: '500'}}>
          Select your preferred seat
        </Text>
      </View>
      {/*  */}
      <ScrollView style={styles.airoplan}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <View style={{flexDirection: 'row', gap: 50}}>
            <View>
              <Text>A</Text>
            </View>
            <View>
              <Text>B</Text>
            </View>
            <View>
              <Text>C</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 50}}>
            <View>
              <Text>D</Text>
            </View>
            <View>
              <Text>E</Text>
            </View>
            <View>
              <Text>F</Text>
            </View>
          </View>
        </View>
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
  airoplan: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    backgroundColor: 'lightgray',
    // padding: 20,
    borderTopLeftRadius: SH(200),
    borderTopRightRadius: SH(200),
  },
});
