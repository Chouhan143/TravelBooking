import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SF, SH, SW} from '../../../utils';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {FLIGHT_SSR_MEAL} from '../../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Meal = () => {
  const [mealsData, setMealsData] = useState([]);
  const [Added, setAdded] = useState({});
  const toggleAddButton = id => {
    setAdded(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const mealData = mealsData?.flat();

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
    console.log('payload aaya', payload);
    try {
      console.log('tray aaya');
      const res = await axios.post(FLIGHT_SSR_MEAL, payload);
      const result = res.data.MealDynamic;
      const mealDataCollection = result.flat();
      console.log('res:', mealDataCollection);
      setMealsData(mealDataCollection || []);
    } catch (error) {
      console.log('meal error :', error);
    }
  };

  useEffect(() => {
    mealApiRequest();
  }, []);

  const renderItem = ({item}) => {
    const isAdded = !!Added[item.id];
    return (
      <View style={styles.mainContanier}>
        <Image style={styles.image} source={item.image} />
        <View>
          <Text style={styles.name}>{item.Description}</Text>
          <Text style={styles.name}>₹{item.Price}</Text>
        </View>
        <TouchableOpacity
          style={isAdded ? styles.AddButton : styles.button}
          onPress={() => toggleAddButton(item.id)}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <MaterialIcons
              name={isAdded ? 'check' : 'add'}
              color={isAdded ? 'green' : 'black'}
              size={20}
            />
            <Text style={isAdded ? styles.AddButtonText : styles.buttonText}>
              {isAdded ? 'Added' : 'Add'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.contanier}>
      <FlatList
        data={mealsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Meal;

const styles = StyleSheet.create({
  contanier: {
    margin: SW(10),
    marginTop: SH(30),
  },
  mainContanier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SH(20),
  },
  name: {
    color: 'black',
    marginRight: SW(10),
  },
  image: {
    width: SW(70),
    height: SH(50),
    resizeMode: 'contain',
  },
  button: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: SW(10),
    paddingLeft: SW(30),
    paddingRight: SW(30),
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: SF(12),
  },
  AddButtonText: {
    color: 'green',
    fontSize: SF(10),
  },
  AddButton: {
    borderColor: 'green',
    borderWidth: 1,
    padding: SW(10),
    paddingLeft: SW(28),
    paddingRight: SW(28),
    borderRadius: 20,
  },
});
