import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FLIGHT_SSR_MEAL} from '../../utils/BaseUrl';
import {useSelector} from 'react-redux';
import {Tabs} from './FlightTopTabs';
import {FlightSeatMealsBaggage} from './SeatMealTab/FlightSeatMealsBaggage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
const FlightSegments = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  const skip = () => {
    navigation.navigate(RouteName.FLIGHT_REVIEW_DETAILS);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          paddingVertical: 15,
        }}>
        <TouchableOpacity onPress={handleBack}>
          <AntDesign name={'arrowleft'} size={20} color={'#000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={skip}>
          <Text style={{color: '#000'}}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlightSeatMealsBaggage />
      </View>
    </View>
  );
};

export default FlightSegments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
