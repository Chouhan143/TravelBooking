import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, SF, SW, SH } from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectedPassanger } from '../../redux/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FLIGHT_BOOKLLC } from '../../utils/BaseUrl';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';
import { Input } from '../../components';
import { setFlightBookingDetails } from '../../redux/action';
const FlightReviewDetails = ({ props }) => {
  const route = useRoute();
  const selectedPassengers = route.params;
  console.log('selectedPassengers', selectedPassengers);
  const { selectedItem, selectedItemContinue } = route.params || {};
  console.assert('selectedItem =====', selectedItem);
  console.assert('selectedItemContinue =====', selectedItemContinue);
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [mainPassenger, setMainPassenger] = useState({
    email: '',
    phoneNumber: '',
    name: ''
  });
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
  const back = () => {
    navigation.goBack();
  };
  const traveldetails = useSelector(state => state.commomReducer.fightTraveller);
  console.log('traveldetails', traveldetails);
  // const TravelData=traveldetails.map(passenger=>{

  // })
  const Passenger = traveldetails[0];
  console.log('traveldetails Email', traveldetails.Email);
  const { flightTraceIdDetails } = useSelector(state => state.commomReducer);
  const { SrdvType, TraceId } = flightTraceIdDetails;
  const SrdvIndex = flightTraceIdDetails.Results?.flat() ?? [];
  const SrdvIndexMap = SrdvIndex.flatMap(elem => elem?.FareDataMultiple ?? []);
  const SrdvIndexValue = SrdvIndexMap[0]?.SrdvIndex;
  const ResultIndexValue = SrdvIndexMap[0]?.ResultIndex;

  // tottal amount to pay get this redux state

  const fareQutesDataSelecter = useSelector(
    state => state.commomReducer.flightFareQutesData,
  );
  console.log('Fare Quotes data in review screen', fareQutesDataSelecter);
  const BaseFare = fareQutesDataSelecter.Fare.BaseFare;
  const Tax = fareQutesDataSelecter.Fare.Tax;
  const YQTax = fareQutesDataSelecter.Fare.YQTax;
  const IsLCC = fareQutesDataSelecter.IsLCC;
  console.log(`BaseFare ${BaseFare} Tax ${Tax}  YQTax ${YQTax}`);

  const tottalFare = fareQutesDataSelecter.Fare.PublishedFare;

  // base Fare
  const basefareQutes = useSelector(
    state => state.commomReducer.initialPublishedFare,
  );

  // get addons price
  const addons = tottalFare - basefareQutes;

  console.log(addons);

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


 const BookLLc = async () => {
  try {
    const payload = {
      SrdvType: SrdvType,
      SrdvIndex: SrdvIndexValue,
      TraceId: TraceId,
      ResultIndex: ResultIndexValue,
      Title: "Mr",
      FirstName: Passenger.firstName,
      LastName: Passenger.LastName,
      PaxType: 1,
      DateOfBirth:"2001-12-12",
      Gender: "1",
      PassportNo: "",
      PassportExpiry: "",
      PassportIssueDate: "",
      AddressLine1: Passenger.address,
      City: "Delhi",
      CountryCode: "IN",
      CountryName: "INDIA",
      ContactNo: Passenger.Mobile,
      Email: Passenger.Email,
      IsLeadPax: 1,
      BaseFare: BaseFare,
      Tax: Tax,
      YQTax: YQTax,
      TransactionFee: "0",
      AdditionalTxnFeeOfrd: "",
      AdditionalTxnFeePub: "",
      AirTransFee: "0"
    };
    
    console.log('book llc payload', JSON.stringify(payload));
    const res = await axios.post(FLIGHT_BOOKLLC, payload);
    const BookLLcResponse = res.data;
    console.log('BookLLcResponse', BookLLcResponse);
    dispatch(setFlightBookingDetails(BookLLcResponse));
    console.log('message',BookLLcResponse.message);
    const message=BookLLcResponse.message;
    if(message==='Booking saved successfully!'){
    Toast.show({
            type: 'success',
            text1: 'Booking Successfully',
    })
    navigation.navigate("ReviewFlightTicketStatus",mainPassenger.name);
    }
    else{
     Toast.show({
            type: 'error',
            text1: 'Booking Not Done',
    })
    }
  } catch (error) {
    console.log('bookllc error', error.response ? error.response.data : error.message);
  }
};

  // book hold api 

  const BookHold = async () => {
    try {
      const payload = {

        "EndUserIp": "1.1.1.1",
        "ClientId": "180112",
        "UserName": "Maneesh3",
        "Password": "Maneesh@36",
        SrdvType: SrdvType,
        SrdvIndex: SrdvIndexValue,
        TraceId: TraceId,
        ResultIndex: ResultIndexValue,
        "Passengers": [
          {
            "Title": "Mr",
            "FirstName":Passenger.firstName,
            "LastName":Passenger.LastName,
            "PaxType": 1,
            "DateOfBirth": "1997-03-12T00:00:00",
            "Gender": "1",
            "PassportNo": "abc123456",
            "PassportExpiry": "2031-03-12T00:00:00",
            "AddressLine1": Passenger.address,
            "City": "Noida",
            "CountryCode": "IN",
            "CountryName": "INDIA",
            "ContactNo":  Passenger.Mobile,
            "Email":Passenger.Email,
            "IsLeadPax": 1,
            "Fare": [
              {
                "Currency": "INR",
                "BaseFare": BaseFare,
                "Tax": Tax,
                "YQTax": YQTax,
                "OtherCharges": 0,
                "TransactionFee": "0",
                "AdditionalTxnFeeOfrd": 0,
                "AdditionalTxnFeePub": 0,
                "AirTransFee": "0"
              }
            ]
          }
        ]
      }
      const res = await axios.post('https://sajyatra.sajpe.in/admin/api/book-hold', payload);
      const BookHold = res.data;
      console.log('BookHold', BookHold);
      
    }
    catch (error) {
      console.log('error', error);
    }
  }
  
  const Booking_Holding= async (IsLCC) =>{
     if (IsLCC===true) {
           await(BookLLc()); 

        } else {
           await(BookHold());
        }

  };

  const handlePayment = async () => {
    try {
      const payload = {
        amount: tottalFare.toString(),
        user_id: "1"
      };
      const paymentIntentResponse = await axios.post('https://sajyatra.sajpe.in/admin/api/create-flight-payment', payload);
      console.log('payment create payload', payload);

      const { razorpay_key, payment_details } = paymentIntentResponse.data;
      console.log('payment_details', payment_details);
      console.log('razorpay_key', razorpay_key);

      const transaction_id = payment_details.id;
      const options = {
        key: razorpay_key,
        amount: parseInt(tottalFare) * 100,
        currency: 'INR',
        name: 'SRN INFO TECH ',
        transaction_id: transaction_id,
        description: 'Payment for Booking',
        image: 'https://yourcompany.com/logo.png',
        prefill: {
          email: mainPassenger.email,
          contact: mainPassenger.phoneNumber,
          name: mainPassenger.name
        },
        theme: {
          color: '#F37254'
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
          await Booking_Holding(IsLCC);
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

      const response = await axios.post('https://sajyatra.sajpe.in/admin/api/update-flight-payment', payload);
      console.log('Payment update payload', payload);
      console.log('update response:', response.data);

      if (response.data.success === 'Payment updated successfully.') {
        Toast.show({
          type: 'success',
          text1: 'Update Successfully',
          text2: 'Your payment status updated successfully'
        });
        console.log('Payment status updated successfully');
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
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={back}>
          <AntDesign name={'arrowleft'} size={25} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.heading}>Review Your Trip Details</Text>
      </View>

      {/* Fare Details  */}


      <ScrollView style={{ height: "92%" }}>
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
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.text2}>To make payment & confirm booking</Text>
          </View>
        </View>
        <View style={styles.tottalAmt}>
          <View style={styles.AmtFlex}>
            <Text style={styles.text}>Air Fare</Text>
            <Text style={styles.text}>
              ₹{basefareQutes.toLocaleString('en-IN')}
            </Text>
          </View>
          {/* <View style={styles.AmtFlex}>
          <Text style={styles.text}>Convenience Fee</Text>
          <Text style={styles.text}>1,047</Text>
        </View> */}
          <View style={styles.AmtFlex}>
            <Text style={styles.text}>Add-Ons</Text>
            <Text style={styles.text}>
              ₹{addons.toLocaleString('en-IN') || 0}
            </Text>
          </View>
          {/* <View style={[styles.AmtFlex, {paddingBottom: 10}]}>
          <Text style={styles.text}>Free Cancellation</Text>
          <Text style={styles.text}>1662</Text>
        </View> */}
          <View
            style={[
              styles.AmtFlex,
              {
                borderTopWidth: 0.5,
                borderTopColor: 'gray',
                paddingVertical: 10,
                paddingHorizontal: 10,
              },
            ]}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>
              Grand Total
            </Text>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>
              ₹{tottalFare.toLocaleString('en-IN')}
            </Text>
          </View>
        </View>

        {/* flight details  */}

        <View style={[styles.tottalAmt, {}]}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.text}>ONWARD</Text>
            <Text style={styles.text}>THU,13 Jun</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.text}>Indore</Text>
            <MaterialIcons name={'flight'} size={25} color="black" />
            <Text style={styles.text}>Guwahati</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.text}>09:20 Pm</Text>
            <FontAwesome6 name={'grip-lines'} size={25} color="black" />
            <Text style={styles.text}> 07:15 Am</Text>
          </View>
          <View>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginLeft: SW(7) }}>
              <MaterialIcons name={'flight-takeoff'} size={20} color="gray" />
              <Text style={styles.text1}> Air india AI-635</Text>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginLeft: SW(7) }}>
              <MaterialCommunityIcons
                name={'seat-outline'}
                size={20}
                color="gray"
              />
              <Text style={styles.text1}> economy classes . Flex</Text>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginLeft: SW(7) }}>
              <AntDesign name={'clockcircleo'} size={20} color="gray" />
              <Text style={styles.text1}> 27h 10m .1 stop at dehli</Text>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginLeft: SW(7) }}>
              <Ionicons name={'bag'} size={20} color="gray" />
              <Text style={styles.text1}>
                {' '}
                cabin baggage {BaggageItem} (1 piece){' '}
              </Text>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'row', marginLeft: SW(7) }}>
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
        <View
          style={{
            width: '100%',
            height: SH(300),
            marginTop: SH(10),
            borderRadius: 8,
            padding: SW(10),
            borderWidth: 0.5,
            borderColor: 'gray',
            paddingBottom: 0,

          }}>
          <Text
            style={{
              color: '#000',
              fontSize: SF(20),
              fontFamily: 'Poppins-Medium',

            }}>
            Contact Details
          </Text>
          <Text style={{
            color: '#000', fontSize: SF(12),
            fontFamily: 'Poppins-Regular',
          }}>We'll send your ticket here</Text>
          <View style={{ marginVertical: SH(10), marginLeft: -SW(7) }}>
            <Input style={{ color: 'black' }}
              value={mainPassenger.email}
              onChangeText={handleEmailChange}
              placeholder="Email"
              placeholderTextColor={'#000'}

            />
            <Input style={{ color: 'black' }}
              value={mainPassenger.phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="Phone Number"
              placeholderTextColor={'#000'}
              keyboardType="numeric"

            />
            <Input style={{ color: 'black' }}
              value={mainPassenger.name}
              onChangeText={handleNameChange}
              placeholder="Name"
              placeholderTextColor={'#000'}

            />
          </View>
        </View>

      </ScrollView>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{
          color: '#000',
          borderRadius: 10,

          padding: SW(10),
          textAlign: 'center',
          fontFamily: 'Poppins-Medium',
          paddingHorizontal: SW(10), alignItems: 'center'
        }}>View Passengers
          <AntDesign name={'downcircle'} size={20} color={'#000'} /> </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#23b6de',
            borderRadius: 10,
            marginRight: SW(3),

          }}
          onPress={handlePayment}>
          <Text
            style={{
              color: 'white',
              padding: SW(10),
              textAlign: 'center',
              fontFamily: 'Poppins-Bold',
              paddingHorizontal: SW(15),
            }}>
            Proceed To Pay ₹{tottalFare.toLocaleString('en-IN')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlightReviewDetails;

const styles = StyleSheet.create({
  container: {
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
