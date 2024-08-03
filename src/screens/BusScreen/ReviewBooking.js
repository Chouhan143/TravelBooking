import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
import axios from 'axios';
import {BOOKING_SEAT} from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';
import { SF, SH, SW } from '../../utils';
import RazorpayCheckout from 'react-native-razorpay';
import { SET_BOOKING_STATUS } from '../../redux/actiontypes';
import { setBookingStatus, storebuspaymentupdatedata } from '../../redux/action';
import { setMainPassenger } from '../../redux/action';
import { PaymentSuccessFully } from '../PaymentScreen';
const ReviewBooking = () => {
  const navigation = useNavigation();
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [mainPassenger, setMainPassenger] = useState({
    email: '',
    phoneNumber: '',
    name: ''
  });
  const [loading,setLoading]=useState('');
  const dispatch=useDispatch();
  // bus details
  const busDetails = useSelector(state => state.commomReducer.detailsStore);

  const TraceId = useSelector(state => state.commomReducer.traceId);
  const ResultIndex=useSelector(state=>state.commomReducer.ResultIndex);
  const transactionNum=useSelector(state=>state.commomReducer.busTransactionNum);
  const handleEmailChange = (email) => {
    setMainPassenger((prevState) => ({
      ...prevState,
      email
    }));
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setMainPassenger((prevState) => ({
      ...prevState,
      phoneNumber
    }));
  };

  const handleNameChange = (name) => {
    setMainPassenger((prevState) => ({
      ...prevState,
      name
    }));
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
  
  const passenger = pessengerData[0];
  console.log('pessengerData', pessengerData);
 
  //   updateSelectedSeats
  const selectedSeatData = useSelector(
    state => state.commomReducer.selectedSeats,
  );

  const commaSepratedSeat = selectedSeatData.join(', ');
  console.log(selectedSeatData.join(', '));

  console.log('dds', commaSepratedSeat);

  const totalFare = useSelector(state => state.commomReducer.totalPrice);
 const storedbuspaymentpaymentdata=useSelector(state=>state.commomReducer.busPaymentUpdateData);
 console.log('storedbuspaymentpaymentdata',storedbuspaymentpaymentdata);
  const passengersArray = pessengerData.map(passenger => ({
    name: passenger.passengerName,
    age: passenger.passengerAge,
    gender: passenger.gender,
    address: passenger.passengerAddress,
    last_name: passenger.passengerLName,
    email:passenger.passengerEmail,
    phone:passenger.passengerPhone
  }));
  
  const busSearchData=useSelector(state=>state.commomReducer.busData);
  const traceId=busSearchData.data.TraceId;
  const resultIndex=busSearchData.data.Result[0].ResultIndex;
  const HotelBookingData=useSelector(state=>state.commomReducer.hotelBook);
  console.log('HotelBookingData',HotelBookingData);
  const busBookingStatus=useSelector(state=>state.commomReducer.busBookingStatus);
  const LoginStatus = useSelector(state => state.commomReducer.logindata);
  console.log(' stored busBookingStatus',busBookingStatus);
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
                  "FirstName":passenger.passengerName,
                  "LastName":passenger.passengerLName,
                  "Email":passenger.passengerEmail,
                  "Phoneno":passenger.passengerPhone,
                  "Gender": passenger.gender,
                  "IdType": null,
                  "IdNumber": null,
                  "Address":passenger.passengerAddress,
                  "Age":passenger.passengerAge,
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
              },
             
          ]
      };
      const res = await axios.post(BOOKING_SEAT, payload);
      const Result=res.data;
      console.log('response',JSON.stringify(Result));
      dispatch(setBookingStatus(Result));
     
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
  
  
  const handlePayment = async () => {
  
    try {
       const LoginStatus = useSelector(state => state.commomReducer.logindata);
       console.log('Login data',LoginStatus);
       const userId=LoginStatus.data.id;
        const payload = {
            amount: totalFare.toString(),
            user_id:userId,
            trace_id:traceId
        };
        const paymentIntentResponse = await axios.post('https://sajyatra.sajpe.in/admin/api/create-bus-payment', payload);
        console.log('payment create payload', payload);
         console.log('payment data',paymentIntentResponse.data);
        const { razorpay_key, payment_details } = paymentIntentResponse.data;
        console.log('payment_details', payment_details);
        console.log('razorpay_key', razorpay_key);

        const transaction_id = payment_details.id;
        const options = {
            key: razorpay_key,
            amount: parseInt(totalFare) * 100,
            currency: 'INR',
            name: 'SRN INFO TECH ',
            transaction_id: transaction_id,
            description: 'Payment for Booking',
            image: 'https://yourcompany.com/logo.png',
            prefill: {
                email:mainPassenger.email,
                contact:mainPassenger.phoneNumber,
                name:mainPassenger.name
            },
            theme: {
                color: "#3399cc"
            }
        };

        RazorpayCheckout.open(options)
            .then(async (data) => {
                const paymentId = data.razorpay_payment_id;
                console.log(`Success: ${paymentId}`);
                Toast.show({
                  type: 'success',
                  text1: 'Payment Successful',
                  text2: `Payment ID: ${paymentId}`
              });

              await updateHotelPaymentStatus(paymentId, transaction_id);
             
              await BookSeat();
              navigation.navigate("ReviewBusTicketStatus",mainPassenger.name);
                
            })
            .catch((error) => {
                console.error(`Error: ${error.code} | ${error.description}`);
                Toast.show({
                    type: 'error',
                    text1: 'Payment Failed',
                    text2: `${error.description}`
                });
                setLoading(false);
            });
    } catch (error) {
        console.error('Payment initiation failed:', error);
        Toast.show({
            type: 'error',
            text1: 'Payment Error',
            text2: 'An error occurred while initiating the payment.'
        });
        setLoading(false);
    }
};


const updateHotelPaymentStatus = async (paymentId, transaction_id) => {
    try {
        const payload = {
            payment_id: paymentId,
            transaction_id: transaction_id,
        };
        console.log('Attempting to update payment status with payload:', payload);
        
        const response = await axios.post('https://sajyatra.sajpe.in/admin/api/update-bus-payment',payload);
        console.log('Payment update payload', payload);
        console.log('update response:', response.data);
        dispatch(storebuspaymentupdatedata(response.data));
        if (response.data.success === 'Payment updated successfully.') {
          setIsPaymentSuccessful(true);
          setShowComponent(true);
          setTimeout(() => {
              setShowComponent(false);
          },300000);
          navigation.navigate("ReviewBusTicketStatus",mainPassenger.name);
        } else {
            console.log('Payment status update failed');
        }
    } catch (error) {
        console.error('Failed to update payment status:', error);
        Toast.show({
            type: 'error',
            text1: 'Update Error',
            text2: 'Failed to update the payment status.'
        });
    } finally {
        setLoading(false); // Ensure loading state is turned off
    }
};

  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <ScrollView style={{flex: 1, marginBottom: 100}}>
        {isPaymentSuccessful && showComponent ? (
          <PaymentSuccessFully/>
      ) : (
          <Text>Processing Payment...</Text>
      )}
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
            <Input style={{color:'black'}}
            value={mainPassenger.email}
            onChangeText={handleEmailChange}
            placeholder="Email"
            placeholderTextColor={'#000'}
          />
          <Input style={{color:'black'}}
            value={mainPassenger.phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="Phone Number"
            placeholderTextColor={'#000'}
            keyboardType="numeric"
            
          />
          <Input style={{color:'black'}}
            value={mainPassenger.name}
            onChangeText={handleNameChange}
            placeholder="Name"
            placeholderTextColor={'#000'}
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
            <Button title={' Pay To Proceed '} onPress={handlePayment} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReviewBooking;

const styles = StyleSheet.create({});
