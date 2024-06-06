import {StyleSheet, Text, View} from 'react-native';
import {SH} from '../../../utils';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';

const Meal = () => {
  const [mealsData, setMealsData] = useState([]);

  const mealData = mealsData?.flat();

  console.log('mealsData', mealsData);

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
  const mealApiRequest = async () => {
    const payload = {
      SrdvType: SrdvType,
      SrdvIndex: SrdvIndexValue,
      TraceId: TraceId.toString(),
      ResultIndex: ResultIndexValue,
    };
    console.log('payload', payload);
    try {
      const res = await axios.post(FLIGHT_SSR_MEAL, payload);
      console.log('meal Res :', res.data);
      setMealsData(res.data.MealDynamic);
    } catch (error) {
      console.log('meal error :', error.response.data.errors);
    }
  };

  useEffect(() => {
    mealApiRequest();
  }, []);
  return <View></View>;
};

export default Meal;

const styles = StyleSheet.create({});
