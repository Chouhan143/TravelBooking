import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, Input} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
import axios from 'axios';
import {BLOKING_SEAT} from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';

const ReviewBooking = () => {
  const navigation = useNavigation();
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  // bus details
  const busDetails = useSelector(state => state.commomReducer.detailsStore);

  const handlePassengerEmailChange = email => {
    setPassengerEmail(email);
  };

  const handlePassengerPhoneChange = phone => {
    setPassengerPhone(phone);
  };
  //   boarding points
  const selectedBoardingPoint = useSelector(
    state => state.commomReducer.selectedBoardingPoint,
  );

  console.log(selectedBoardingPoint);
  const date = new Date(selectedBoardingPoint.CityPointTime);
  const formatedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', // Two-digit hour (e.g., "14")
    minute: '2-digit', // Two-digit minute (e.g., "45")
  });

  //   droping point data

  const selectedDroppingPoint = useSelector(
    state => state.commomReducer.selectedDroppingPoint,
  );

  const DropingDate = new Date(selectedDroppingPoint.CityPointTime);
  const DformatedDate = DropingDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  const DformattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', // Two-digit hour (e.g., "14")
    minute: '2-digit', // Two-digit minute (e.g., "45")
  });

  // passenger details

  const pessengerData = useSelector(state => state.commomReducer.passengers);
  const pessengerItem = pessengerData[0];

  console.log('pessengerData', pessengerData);

  //   updateSelectedSeats
  const selectedSeatData = useSelector(
    state => state.commomReducer.selectedSeats,
  );

  const commaSepratedSeat = selectedSeatData.join(', ');
  console.log(selectedSeatData.join(', '));

  console.log('dds', commaSepratedSeat);

  const totalFare = useSelector(state => state.commomReducer.totalPrice);
  const traceId = useSelector(state => state.commomReducer.traceId);
  console.log(traceId);

  const passengersArray = pessengerData.map(passenger => ({
    name: passenger.passengerName,
    age: passenger.passengerAge,
    gender: passenger.gender,
    address: passenger.passengerAddress,
    last_name: passenger.passengerLName,
  }));

  console.log('passengersArray', passengersArray);

  // const blockSeat = async () => {
  //   // droppingpointid, 'boarding_point', 'title_name', 'name', 'price', 'email', 'phoneno', 'gender', 'trace_id',
  //   // 'seat_no', 'address', 'age', 'bus_name',

  //   try {
  //     const options = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     };

  //     const payload = {
  //       dropping_point: selectedBoardingPoint.CityPointLocation,
  //       boarding_point: selectedDroppingPoint.CityPointLocation,
  //       name: passengerName,
  //       last_name: passengerLName,
  //       price: totalFare,
  //       email: passengerEmail,
  //       phoneno: passengerPhone,
  //       gender: gender,
  //       trace_id: traceId,
  //       seat_no: 5,
  //       address: passengerAddress,
  //       age: passengerAge,
  //       bus_name: busDetails.travel_name,
  //     };
  //     console.log(payload);
  //     const res = await axios.post(BLOKING_SEAT, payload, options);
  //     console.log('res', res);
  //   } catch (error) {
  //     console.log(error.response.data.errors);
  //   }
  // };

  const blockSeat = async () => {
    try {
      const payload = {
        passengers: passengersArray,
        email: passengerEmail,
        phoneno: passengerPhone,
        price: totalFare,
        seat_no: commaSepratedSeat, // Assuming updateSelecSeats is an array of seat numbers
        trace_id: traceId,
        dropping_point: selectedDroppingPoint.CityPointLocation,
        boarding_point: selectedBoardingPoint.CityPointLocation,
        bus_name: busDetails.travel_name,
      };
      const res = await axios.post(BLOKING_SEAT, payload);
      const status = res.data.result.status;
      console.log('res', res.data.result.status);
      if (status === 200) {
        navigation.replace(RouteName.PAYMENT_SCREEN);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorArr = error.response.data.errors;
        const errorMessage = Object.values(errorArr).join('\n');
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
        console.log(errorArr);
      } else {
        console.log(error);
      }
    }
  };

  const paymentHandle = () => {
    blockSeat();
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <ScrollView style={{flex: 1, marginBottom: 100}}>
          <View
            style={{
              width: '100%',
              height: 'auto',
              marginTop: 20,
              borderRadius: 8,
              padding: 10,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}>
            {/* buse information section */}
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 10,
              }}>
              {busDetails.travel_name}
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
                  {selectedBoardingPoint.CityPointName}
                </Text>
                <Text style={{color: '#000', fontSize: 14, fontWeight: '400'}}>
                  {selectedBoardingPoint.CityPointLocation}
                </Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '300'}}>
                    {formatedDate},
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '300'}}>
                    {formattedTime}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
                  {selectedDroppingPoint.CityPointName}
                </Text>
                <Text style={{color: '#000', fontSize: 14, fontWeight: '400'}}>
                  {selectedDroppingPoint.CityPointLocation}
                </Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '300'}}>
                    {DformatedDate},
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '300'}}>
                    {DformattedTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 'auto',
              marginTop: 20,
              borderRadius: 8,
              padding: 10,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}>
            {/* buse information section */}
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 10,
              }}>
              Pessenger Details
            </Text>

            {/* flatlist data */}

            <View>
              <FlatList
                data={pessengerData}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 2,
                      }}>
                      <View>
                        <Text style={{color: '#000', fontSize: 16}}>
                          {item.passengerName}
                        </Text>
                      </View>
                      <View>
                        <Text style={{color: '#000', fontSize: 16}}>
                          {item.passengerAge}yr
                        </Text>
                        {/* <Text>{item.passengerAge}</Text> */}
                      </View>
                    </View>
                  );
                }}
                keyExtractor={item => item.index}
              />
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 'auto',
              marginTop: 20,
              borderRadius: 8,
              padding: 10,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 10,
              }}>
              Contact Details
            </Text>
            <Text>We'll send your ticket here</Text>
            <View style={{marginVertical: 10}}>
              <Input
                title="Email"
                placeholder="Enter email"
                onChangeText={handlePassengerEmailChange}
                value={passengerEmail}
                keyboardType="email-address"
              />
              <Input
                title="Phone No."
                placeholder="Enter phone number"
                onChangeText={handlePassengerPhoneChange}
                value={passengerPhone}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>
        </ScrollView>

        {/* Pay button */}
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 20,
            borderTopWidth: 0.8,
            borderTopColor: 'gray',
            paddingTop: 20,
          }}>
          <View style={{marginRight: 40}}>
            <Text style={{color: '#000', fontSize: 14, fontWeight: '300'}}>
              Total fare
            </Text>
            <Text style={{color: '#000', fontSize: 20, fontWeight: '800'}}>
              ₹{totalFare}
            </Text>
          </View>
          <View>
            <Button title={'Proceed To Pay'} onPress={paymentHandle} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReviewBooking;

const styles = StyleSheet.create({});
