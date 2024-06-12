import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BusSelectScreen = ({route}) => {
  const navigation = useNavigation();
  const {busData, destinationCity, sourceCity} = route.params;

  const renderItem = ({item}) => {
    console.log(item.Price);
    // Extracting time from the departure_time string
    const departureTime = new Date(item.departure_time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const arivalTime = new Date(item.arrival_time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const depTime = new Date(item.departure_time).getTime();
    const arrTime = new Date(item.arrival_time).getTime();
    const durationMs = arrTime - depTime;

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    const handleItemPress = () => {
      navigation.navigate(RouteName.BUS_SEAT_SCREEN, {
        traceId: item.trace_id,
        indexResult: item.result_index,
      });
    };

    return (
      <TouchableOpacity style={styles.item} onPress={handleItemPress}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.busName}> {departureTime}</Text>
            <Text style={styles.busInfo}> {arivalTime}</Text>
          </View>
          <Text style={styles.price}>Rs.{item.price}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text style={styles.busInfo}>
            {hours}h {minutes}m
          </Text>
          <Text style={styles.busInfo}>{item.available_seats} Seats</Text>
        </View>

        <View style={{paddingTop: 10}}>
          <Text style={styles.busName}>{item.travel_name}</Text>
          <Text style={styles.busInfo}> {item.bus_type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff',paddingTop:SH(10)}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'arrowleft'} size={20}/>
        </TouchableOpacity>

        <Text style={{fontSize: 16, color: '#000'}}>
          {sourceCity} to {destinationCity}
        </Text>
      </View>

      <FlatList
        data={busData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default BusSelectScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    // justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  item: {
    padding: 20,
    borderWidth: 0.5,
    borderBottomColor: '#ccc',
    width: '95%',
    height: 'auto',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'gray',
    backgroundColor: '#fff',
  },
  busName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 16,
    marginTop: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  busInfo: {
    color: '#555',
  },
});
