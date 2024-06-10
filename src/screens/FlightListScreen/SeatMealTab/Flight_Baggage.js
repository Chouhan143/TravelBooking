import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SH} from '../../../utils';
import {FLIGHT_SSR_MEAL} from '../../../utils/BaseUrl';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import axios from 'axios';

const Baggage = () => {
  const [baggageData, setBaggageData] = useState([]);

  const mealData = baggageData?.flat();

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

  // api request
  const baggageRequest = async () => {
    const payload = {
      SrdvType: SrdvType,
      SrdvIndex: SrdvIndexValue,
      TraceId: TraceId.toString(),
      ResultIndex: ResultIndexValue,
    };

    try {
      console.log('tray aaya');
      const res = await axios.post(FLIGHT_SSR_MEAL, payload);
      console.log('response baggage >>>>', res.data.Baggage);
      const result = res.data.Baggage;
      const baggageCollaction = result.flat();
      console.log('res:', baggageCollaction);
      setBaggageData(baggageCollaction || []);
    } catch (error) {
      console.log('meal error :', error);
    }
  };

  useEffect(() => {
    baggageRequest();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <Text>{item.Weight}</Text>
        <Text>{item.Price}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={baggageData}
        renderItem={renderItem}
        keyExtractor={Item => Item.id}
      />
    </View>
  );
};

export default Baggage;

const styles = StyleSheet.create({});
