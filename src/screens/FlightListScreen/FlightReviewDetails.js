import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, SF, SW, SH} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectedPassanger} from '../../redux/action';
import {useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
const FlightReviewDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };
  // passenger name

  const selectedPassenger = useSelector(
    state => state.commomReducer.selectedPassengers,
  );
  const passengerNames = selectedPassenger.map(
    passenger => `${passenger?.firstName} ${passenger?.LastName}`,
  );

  console.log('selectedPassenger', passengerNames);
  // baggages
  const BaggageItem = useSelector(
    state => state.commomReducer.flightBaggageData,
  );

  const BaggageCabinItem = useSelector(
    state => state.commomReducer.flightBaggageCabinData,
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={back}>
          <AntDesign name={'arrowleft'} size={25} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.heading}>Review Your Trip Details</Text>
      </View>

      {/* Fare Details  */}

      <View style={styles.fareBox}>
        <View>
          <Text
            style={{
              color: Colors.orange,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: SF(12),
            }}>
            <MaterialCommunityIcons
              name={'timer'}
              size={15}
              color={Colors.orange}
            />
            05m17s Left
          </Text>
        </View>
        <View style={{paddingLeft: 5}}>
          <Text style={styles.text2}>To make payment & confirm booking</Text>
        </View>
      </View>

      {/* grand total box  */}

      <View style={styles.tottalAmt}>
        <View style={styles.AmtFlex}>
          <Text style={styles.text}>Air Fare</Text>
          <Text style={styles.text}>33,426</Text>
        </View>
        <View style={styles.AmtFlex}>
          <Text style={styles.text}>Convenience Fee</Text>
          <Text style={styles.text}>1,047</Text>
        </View>
        <View style={styles.AmtFlex}>
          <Text style={styles.text}>Add-Ons</Text>
          <Text style={styles.text}>400</Text>
        </View>
        <View style={[styles.AmtFlex, {paddingBottom: 10}]}>
          <Text style={styles.text}>Free Cancellation</Text>
          <Text style={styles.text}>1662</Text>
        </View>
        <View
          style={[
            styles.AmtFlex,
            {borderTopWidth: 0.5, borderTopColor: 'gray', paddingVertical: 10},
          ]}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
            Grand Total
          </Text>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
            30,550
          </Text>
        </View>
      </View>

      {/* flight details  */}

      <View style={[styles.tottalAmt, {}]}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.text}>ONWARD</Text>
          <Text style={styles.text}>THU,13 Jun</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.text}>Indore</Text>
          <MaterialIcons name={'flight'} size={25} color="black" />
          <Text style={styles.text}>Guwahati</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={styles.text}>09:20 Pm</Text>
          <FontAwesome6 name={'grip-lines'} size={25} color="black" />
          <Text style={styles.text}> 07:15 Am</Text>
        </View>
        <View>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: SW(7)}}>
            <MaterialIcons name={'flight-takeoff'} size={20} color="gray" />
            <Text style={styles.text1}> Air india AI-635</Text>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: SW(7)}}>
            <MaterialCommunityIcons
              name={'seat-outline'}
              size={20}
              color="gray"
            />
            <Text style={styles.text1}> economy classes . Flex</Text>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: SW(7)}}>
            <AntDesign name={'clockcircleo'} size={20} color="gray" />
            <Text style={styles.text1}> 27h 10m .1 stop at dehli</Text>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: SW(7)}}>
            <Ionicons name={'bag'} size={20} color="gray" />
            <Text style={styles.text1}>
              {' '}
              cabin baggage {BaggageItem} (1 piece){' '}
            </Text>
          </View>
          <View
            style={{display: 'flex', flexDirection: 'row', marginLeft: SW(7)}}>
            <Ionicons name={'bag'} size={20} color="gray" />
            <Text style={styles.text1}>
              check-in baggage {BaggageCabinItem} as per airline policy
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#dfe6e5',
            paddingLeft: SW(7),
            marginTop: SH(10),
          }}>
          {passengerNames.map((name, index) => (
            <Text style={styles.text1} key={index}>{`Mr.${name}`}</Text>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#23b6de',
          margin: SH(35),
          borderRadius: 10,
          marginLeft: SW(6),
          marginRight: SW(3),
        }}>
        <Text
          style={{
            color: 'white',
            padding: SW(15),
            textAlign: 'center',
            fontFamily: 'Poppins-Bold',
          }}>
          Proceed To Pay 75,142
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlightReviewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: SW(15),
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: SF(16),
    color: '#000',
    paddingLeft: SW(15),
  },
  fareBox: {
    width: '100%',
    height: 'auto',
    backgroundColor: Colors.light_yellow,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  tottalAmt: {
    width: '100%',
    height: 'auto',
    borderWidth: 0.5,
    borderColor: Colors.gray_text_color,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  AmtFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    marginRight: SW(10),
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    marginLeft: SW(7),
  },
  text1: {
    color: 'gray',
    marginRight: SW(10),
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
  },
  text2: {
    fontSize: SF(12),
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});
