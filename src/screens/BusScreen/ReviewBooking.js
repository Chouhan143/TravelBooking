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
import {BOOKING_SEAT} from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';
import { SF, SH, SW } from '../../utils';

const ReviewBooking = () => {
  const navigation = useNavigation();
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  // bus details
  const busDetails = useSelector(state => state.commomReducer.detailsStore);

  const TraceId = useSelector(state => state.commomReducer.traceId);
  const ResultIndex=useSelector(state=>state.commomReducer.ResultIndex);
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
    hour: '2-digit', // Two-digit hour (e.g.,14")
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
 
  const passengersArray = pessengerData.map(passenger => ({
    name: passenger.passengerName,
    age: passenger.passengerAge,
    gender: passenger.gender,
    address: passenger.passengerAddress,
    last_name: passenger.passengerLName,
  }));

  console.log('passengersArray', passengersArray);
  
  const BookSeat = async () => {
    try {
      const payload = {
        "ResultIndex": "1",
        "TraceId": "1",
        "BoardingPointId": 1,
        "DroppingPointId": 1,
        "RefID": "1",
        "Passenger": [
          {
            "LeadPassenger": true,
            "PassengerId": 0,
            "Title": "Mr",
            "FirstName": "Tanish",
            "LastName": "Singh",
            "Email": "amit@srdvtechnologies.com",
            "Phoneno": "9643737502",
            "Gender": "1",
            "IdType": null,
            "IdNumber": null,
            "Address": "Modinagar",
            "Age": "22",
            "Seat": {
              "ColumnNo": "001",
              "Height": 1,
              "IsLadiesSeat": false,
              "IsMalesSeat": false,
              "IsUpper": false,
              "RowNo": "000",
              "SeatFare": 400,
              "SeatIndex": 2,
              "SeatName": "2",
              "SeatStatus": true,
              "SeatType": 1,
              "Width": 1,
              "Price": {
                "CurrencyCode": "INR",
                "BasePrice": 400,
                "Tax": 0,
                "OtherCharges": 0,
                "Discount": 0,
                "PublishedPrice": 300,
                "PublishedPriceRoundedOff": 400,
                "OfferedPrice": 380,
                "OfferedPriceRoundedOff": 380,
                "AgentCommission": 20,
                "AgentMarkUp": 0,
                "TDS": 8,
                "GST": {
                  "CGSTAmount": 0,
                  "CGSTRate": 0,
                  "CessAmount": 0,
                  "CessRate": 0,
                  "IGSTAmount": 0,
                  "IGSTRate": 18,
                  "SGSTAmount": 0,
                  "SGSTRate": 0,
                  "TaxableAmount": 0
                }
              }
            }
          },
          {
            "LeadPassenger": false,
            "PassengerId": 0,
            "Title": "Mr",
            "FirstName": "ramesh",
            "LastName": "Tomar",
            "Email": "ramesh@srdvtechnologies.com",
            "Phoneno": "1234567890",
            "Gender": "1",
            "IdType": null,
            "IdNumber": null,
            "Address": "Modinagar",
            "Age": "28",
            "Seat": {
              "ColumnNo": "002",
              "Height": 1,
              "IsLadiesSeat": false,
              "IsMalesSeat": false,
              "IsUpper": false,
              "RowNo": "000",
              "SeatFare": 400,
              "SeatIndex": 3,
              "SeatName": "3",
              "SeatStatus": true,
              "SeatType": 1,
              "Width": 1,
              "Price": {
                "CurrencyCode": "INR",
                "BasePrice": 400,
                "Tax": 0,
                "OtherCharges": 0,
                "Discount": 0,
                "PublishedPrice": 400,
                "PublishedPriceRoundedOff": 400,
                "OfferedPrice": 380,
                "OfferedPriceRoundedOff": 380,
                "AgentCommission": 20,
                "AgentMarkUp": 0,
                "TDS": 8,
                "GST": {
                  "CGSTAmount": 0,
                  "CGSTRate": 0,
                  "CessAmount": 0,
                  "CessRate": 0,
                  "IGSTAmount": 0,
                  "IGSTRate": 18,
                  "SGSTAmount": 0,
                  "SGSTRate": 0,
                  "TaxableAmount": 0
                }
              }
            }
          }
        ]
      };
      const res = await axios.post(BOOKING_SEAT, payload);
      const Result=res.data;
      console.log('response',JSON.stringify(Result));
      const BusBookingStatus =Result.result.data.Result.BusBookingStatus;
      console.log('status.BusBookingStatus',BusBookingStatus);
      if (BusBookingStatus ===  "Confirmed") {
        Toast.show({
          type: 'success',
          text1: 'Seat is Booked ',
          text2: 'This seat is booked  successfully please pay now !',
          textStyle: { color: 'green', fontSize: 12 },
        });
        navigation.replace(RouteName.HOTEL_PAYMENT);
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
  
  const BookingStatus = () => {
    BookSeat();
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
               fontFamily:'Poppins-Medium',
                marginBottom: 10,
              }}>
              {busDetails.TravelName}
            </Text>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between',
                paddingHorizontal:SW(5)}}>
              <View style={{marginRight:SW(10)}}>
                <Text style={{color: '#000', fontSize: 18,fontFamily:'Poppins-Regular'}}>
                  {selectedBoardingPoint.CityPointName}
                </Text>
                <Text style={{color: '#000', fontSize: 12,fontFamily:'Poppins-Regular',flexWrap:'wrap'}}>
                  {selectedBoardingPoint.CityPointLocation}
                </Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text
                    style={{color: '#000', fontSize: 12, fontFamily:'Poppins-Regular'}}>
                    {formatedDate},
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 12,fontFamily:'Poppins-Regular'}}>
                    {formattedTime}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{color: '#000', fontSize: 18, fontFamily:'Poppins-Regular'}}>
                  {selectedDroppingPoint.CityPointName}
                </Text>
                <Text style={{color: '#000', fontSize: 14,fontFamily:'Poppins-Regular'}}>
                  {selectedDroppingPoint.CityPointLocation}
                </Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text
                    style={{color: '#000', fontSize: 12, fontFamily:'Poppins-Regular'}}>
                    {DformatedDate},
                  </Text>
                  <Text
                    style={{color: '#000', fontSize: 12, fontFamily:'Poppins-Regular'}}>
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
               fontFamily:'Poppins-Medium',
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
                            marginHorizontal:SW(10),

                      }}>
                      <View>
                        <Text style={{color: '#000', fontSize: 16,fontFamily:'Poppins-Regular'}}>
                          {item.passengerName}
                        </Text>
                      </View>
                      <View>
                        <Text style={{color: '#000', fontSize: 16,fontFamily:'Poppins-Regular'}}>
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
              marginTop: SH(20),
              borderRadius: 8,
              padding: SW(10),
              borderWidth: 0.5,
              borderColor: 'gray',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: SF(20),
                fontFamily:'Poppins-Medium',
                
              }}>
              Contact Details
            </Text>
            <Text style={{color: '#000',fontSize: SF(12),
                fontFamily:'Poppins-Regular',}}>We'll send your ticket here</Text>
            <View style={{marginVertical:SH(10),marginLeft:-SW(7)}}>
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
            <Button title={' Pay To Proceed '} onPress={BookingStatus} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReviewBooking;

const styles = StyleSheet.create({});
