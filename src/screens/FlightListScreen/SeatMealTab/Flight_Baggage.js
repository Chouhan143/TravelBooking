import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {SW, SF} from '../../../utils';
import {FLIGHT_SSR_MEAL} from '../../../utils/BaseUrl';
import {useSelector} from 'react-redux';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Baggage = () => {
  const [baggageData, setBaggageData] = useState([]);
  const [addedStatus, setAddedStatus] = useState({});

  const {flightTraceIdDetails} = useSelector(state => state.commomReducer);
  const {SrdvType, TraceId} = flightTraceIdDetails;

  const SrdvIndex = flightTraceIdDetails.Results?.flat() ?? [];
  const SrdvIndexMap = SrdvIndex.flatMap(elem => elem?.FareDataMultiple ?? []);
  const SrdvIndexValue = SrdvIndexMap[0]?.SrdvIndex;
  const ResultIndexValue = SrdvIndexMap[0]?.ResultIndex;

  // API request
  useEffect(() => {
    const baggageRequest = async () => {
      const payload = {
        SrdvType,
        SrdvIndex: SrdvIndexValue,
        TraceId: TraceId.toString(),
        ResultIndex: ResultIndexValue,
      };

      try {
        const res = await axios.post(FLIGHT_SSR_MEAL, payload);
        const result = res.data.Baggage;
        setBaggageData(result.flat() || []);
      } catch (error) {
        console.log('Baggage error:', error);
      }
    };

    baggageRequest();
  }, [SrdvType, SrdvIndexValue, TraceId, ResultIndexValue]);

  const toggleAddButton = index => {
    setAddedStatus(prevState => {
      const updatedStatus = {...prevState};
      updatedStatus[index] = !updatedStatus[index]; // Toggling the added status for the given index
      return updatedStatus; // Returning the updated added status object
    });
  };

  const renderItem = ({item, index}) => {
    const isAdded = !!addedStatus[index];

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Weight} kg</Text>
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
    <ScrollView style={styles.listContainer}>
      <FlatList
        data={baggageData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

export default Baggage;

const styles = StyleSheet.create({
  listContainer: {
    margin: SW(7), 
  },
  container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff', 
        elevation: 7,
        padding:SW(15),
        borderRadius:10,
        borderColor:'#c9cfd1',
        borderWidth:1,
        margin:SW(10),
        marginBottom:0
  },
  textContainer: {
    flex: 1,
    marginRight: SW(12),
  },
  name: {
    color: 'black',
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
});
