import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
import FlightSeatMealsBaggage from './SeatMealTab/FlightSeatMealsBaggage';
import {useRoute} from '@react-navigation/native';
const FlightSegments = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedItem} = route.params;
  const handleBack = () => {
    navigation.goBack();
  };

  const skip = () => {
    navigation.navigate(RouteName.FLIGHT_REVIEW_DETAILS, {
      selectedItem: selectedItem,
    });
  };

  // Replace with actual selectedItem

  return (
    <View style={{flex: 1}}>
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
      <FlightSeatMealsBaggage selectedItem={selectedItem} />
    </View>
  );
};

export default FlightSegments;
