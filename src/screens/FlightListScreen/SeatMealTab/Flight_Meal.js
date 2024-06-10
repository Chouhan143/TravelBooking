import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SF, SH, SW } from '../../../utils';
import { useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { FLIGHT_SSR_MEAL } from '../../../utils/BaseUrl';

const Meal = () => {
  const [mealsData, setMealsData] = useState([]);
  const [addedStatus, setAddedStatus] = useState({});

  const { flightTraceIdDetails } = useSelector(state => state.commomReducer);
  const { SrdvType, TraceId } = flightTraceIdDetails;

  const SrdvIndex = flightTraceIdDetails.Results?.flat() ?? [];
  const SrdvIndexMap = SrdvIndex.flatMap(elem => elem?.FareDataMultiple ?? []);
  const SrdvIndexValue = SrdvIndexMap[0]?.SrdvIndex;
  const ResultIndexValue = SrdvIndexMap[0]?.ResultIndex;

  // API request
  useEffect(() => {
    const mealApiRequest = async () => {
      const payload = {
        SrdvType,
        SrdvIndex: SrdvIndexValue,
        TraceId: TraceId.toString(),
        ResultIndex: ResultIndexValue,
      };
      try {
        const res = await axios.post(FLIGHT_SSR_MEAL, payload);
        const result = res.data.MealDynamic;
        const mealDataCollection = result.flat();
        setMealsData(mealDataCollection || []);
      } catch (error) {
        console.log('meal error :', error);
      }
    };

    mealApiRequest();
  }, [SrdvType, SrdvIndexValue, TraceId, ResultIndexValue]);

  const toggleAddButton = index => {
    setAddedStatus(prevState => {
      const updatedStatus = { ...prevState };
      updatedStatus[index] = !updatedStatus[index]; 
      return updatedStatus; 
    });
  };

  const renderItem = ({ item, index }) => {
    const isAdded = !!addedStatus[index];

    return (
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Description}</Text>
          <Text style={styles.name}>₹{item.Price}</Text>
        </View>
        <TouchableOpacity
          style={isAdded ? styles.addButton : styles.button}
          onPress={() => toggleAddButton(index)}>
          <View style={styles.buttonContent}>
            <MaterialIcons
              name={isAdded ? 'check' : 'add'}
              color={isAdded ? 'green' : 'black'}
              size={20}
            />
            <Text style={isAdded ? styles.addButtonText : styles.buttonText}>
              {isAdded ? 'Added' : 'Add'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mealsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Meal;

const styles = StyleSheet.create({
  container: {
    margin: SW(20),
    marginTop: SH(30),
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignItems: 'center',
    marginBottom: SH(20),
  },
  textContainer: {
    flex: 1,
    marginRight: SW(12),
  },
  name: {
    color: 'black',
    fontSize: SW(13),
    fontSize: SW(13),
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
  addButtonText: {
    color: 'green',
    fontSize: SF(10),
  },
  addButton: {
    borderColor: 'green',
    borderWidth: 1,
    padding: SW(10),
    paddingLeft: SW(28),
    paddingRight: SW(28),
    borderRadius: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
