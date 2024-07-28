import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Colors, SF, SH, SW } from '../../utils';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../routes';
import { useSelector } from 'react-redux';
import ReadMoreText from '../../components/commonComponents/ReadMore';
import { useRoute } from '@react-navigation/native'
import he from 'he';
import axios from 'axios';
import { HOTEL_BOOK } from '../../utils/BaseUrl';
import { setBookingDetails } from '../../redux/action';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';
import { format, differenceInDays, parseISO } from 'date-fns';
export default function HotelGuestDetails() {
    const route = useRoute();
  const { room } = route.params;
  const navigation=useNavigation();
  const hotelDetails=useSelector(state=>state.commomReducer.hotelInfo);
  const hotelData = useSelector(state => state.commomReducer.hotelData);
  const TotalHotelPrice=useSelector(state=>state.commomReducer.totalHotelPrice);
  console.log('hotelData',hotelData);
  const count = useSelector(state => state.commomReducer.hotelRoomCounter);
  const RoomData = useSelector(state => state.commomReducer.hotelRoomDetails);
  const dispatch=useDispatch();
   console.log('RoomData',JSON.stringify(RoomData));
  const BlockRoom=useSelector(state=>state.commomReducer.hotelBlock);
  const [more, setMore] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [MiddleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading,setLoading]=useState(null);
  let moreHandler = () => {
    setMore(!more);
  };
  const checkInDate = parseISO(hotelData.CheckInDate);
  const checkOutDate = parseISO(hotelData.CheckOutDate);
  const formattedCheckInDate = format(checkInDate, 'MMM dd, yyyy');
  const formattedCheckOutDate = format(checkOutDate, 'MMM dd, yyyy');
const NoOfAdults=hotelData.NoOfRooms.map(item=>item.NoOfAdults);
  // Calculate the number of days between the dates
  const numberOfNights = differenceInDays(checkOutDate, checkInDate);
  const BookingConfirmed = async () => {
    try {
      const payload = {
        "ResultIndex": "65","HotelCode": "341089","HotelName": "The Manor",
        "GuestNationality": "IN","NoOfRooms": "1","ClientReferenceNo": 0,
        "IsVoucherBooking": true,"HotelRoomsDetails": [{"ChildCount": 0,"RequireAllPaxDetails": false,
          "RoomId": 0,"RoomStatus": 0,"RoomIndex": 4,"RoomTypeCode": "211504640|4|1",
          "RoomTypeName": "Deluxe Room","RatePlanCode": "230104963","RatePlan": 13,
          "InfoSource": "FixedCombination","SequenceNo": "EA~~341089~4",
          "DayRates": [{"Amount": 12325,"Date": "2019-09-28T00:00:00"}],
          "SupplierPrice": null,
          "Price": {
            "CurrencyCode": "INR","RoomPrice": 12325,
            "Tax": 3113.3,"ExtraGuestCharge": 0,"ChildCharge": 0,
            "OtherCharges": 26,"Discount": 2175,"PublishedPrice": 15464.3,
            "PublishedPriceRoundedOff": 15464,"OfferedPrice": 15464.3,
            "OfferedPriceRoundedOff": 15464,"AgentCommission": 0,
            "AgentMarkUp": 0,"ServiceTax": 4.68,"TDS": 0,"ServiceCharge": 0,
            "TotalGSTAmount": 4.68,"GST": {"CGSTAmount": 0,"CGSTRate": 0,
              "CessAmount": 0,"CessRate": 0,"IGSTAmount": 4.68,"IGSTRate": 18,
              "SGSTAmount": 0,"SGSTRate": 0,"TaxableAmount": 26}},
              "HotelPassenger": [{"Title": "Mr","FirstName":firstName,
                "MiddleName":MiddleName,"LastName":lastName,"Phoneno":phoneNumber,
                "Email":email,"PaxType": "1","LeadPassenger": true,
                "PassportNo": null,"PassportIssueDate": null,"PassportExpDate": null,
                "PAN": "XXXXXXXXXX"},{"Title": "Mstr","FirstName": "FirstName",
                  "MiddleName": null,"LastName": "LastName","Phoneno": "9999999999",
                  "Email": "test@email.com","PaxType": "2","LeadPassenger": false,"Age": "8",
                  "PassportNo": null,"PassportIssueDate": null,"PassportExpDate": null,"PAN": "XXXXXXXXXX"}],
                  "RoomPromotion": "Member’s exclusive price","Amenities": ["Breakfast Buffet"],
                  "SmokingPreference": "0","BedTypes": [{"BedTypeCode": "13",
                    "BedTypeDescription": "1 double bed"}],"HotelSupplements": [],
                    "LastCancellationDate": "2019-09-17T00:00:00",
                    "CancellationPolicies": [{"Charge": 100,"ChargeType": 2,"Currency": "INR",
                      "FromDate": "2019-09-18T00:00:00","ToDate": "2019-09-26T23:59:59"},
                      {"Charge": 100,"ChargeType": 2,"Currency": "INR","FromDate": "2019-09-27T00:00:00",
                        "ToDate": "2019-09-29T23:59:59"},{"Charge": 100,"ChargeType": 2,"Currency": "INR",
                          "FromDate": "2019-09-28T00:00:00","ToDate": "2019-09-29T00:00:00"}],
                          "CancellationPolicy": "Deluxe Room#^#100.00% of total amount will be charged, If cancelled between 18-Sep-2019 00:00:00 and 26-Sep-2019 23:59:59.|100.00% of total amount will be charged, If cancelled between 27-Sep-2019 00:00:00 and 29-Sep-2019 23:59:59.|100.00% of total amount will be charged, If cancelled between 28-Sep-2019 00:00:00 and 29-Sep-2019 00:00:00.|#!#",
                          "Inclusion": ["Breakfast Buffet"],"BedTypeCode": "13","Supplements": null}],
                          "ArrivalTime": "2019-09-28T00:00:00",
        "IsPackageFare": true,"SrdvType": "SingleTB","SrdvIndex": "SrdvTB",
        "TraceId": "731","EndUserIp": "1.1.1.1","ClientId": "XXXX","UserName": "XXXX",
        "Password": "XXXX"
      };
  
      if (!firstName || !lastName || !email  || !phoneNumber) {
        setShowError(true);
        Toast.show({
          type: 'error',
          text1: 'Missing Information',
          text2: 'Please fill out all required fields.',
          textStyle: { color: 'red', fontSize: 12 },
        });
        return; // Return early if fields are missing
      }
  
      setShowError(false);
      const response = await axios.post(HOTEL_BOOK, payload);
const BookingResult = response.data;
dispatch(setBookingDetails(BookingResult));
console.log('BookingResult', BookingResult);


if (BookingResult.message === 'Booking successful') {
  Toast.show({
    type: 'success',
    text1: 'Booking Confirmed',
    text2: 'Your booking has been confirmed!',
    textStyle: { color: 'green', fontSize: 12 },
  });
} else {r
  
  Toast.show({
    type: 'error',
    text1: 'Booking Not Confirmed',
    text2: 'Your booking could not be confirmed.',
    textStyle: { color: 'red', fontSize: 12 },
  });
}
    } catch (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred during booking.',
        textStyle: { color: 'red', fontSize: 12 },
      });
    }
  };
  const handlePayment = async () => {
    if (!firstName || !lastName || !email || !phoneNumber) {
        setShowError(true);
        Toast.show({
            type: 'error',
            text1: 'Missing Information',
            text2: 'Please fill out all required fields only middle name is optional .',
            textStyle: { color: 'red', fontSize: 12 },
        });
        return;
    }

    setShowError(false);
    setLoading(true);

    try {
        const payload = {
            amount: TotalHotelPrice.toString(),
            user_id: "1"
        };
        const paymentIntentResponse = await axios.post('https://sajyatra.sajpe.in/admin/api/create-payment', payload);
        console.log('payment create payload', payload);

        const { razorpay_key, payment_details } = paymentIntentResponse.data;
        console.log('payment_details', payment_details);
        console.log('razorpay_key', razorpay_key);

        const transaction_id = payment_details.id;
        const options = {
            key: razorpay_key,
            amount: parseInt(TotalHotelPrice) * 100,
            currency: 'INR',
            name: 'SRN INFO TECH ',
            transaction_id: transaction_id,
            description: 'Payment for Booking',
            image: 'https://yourcompany.com/logo.png',
            prefill: {
                email: email,
                contact: phoneNumber,
                name: `${firstName} ${MiddleName} ${lastName}`
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
                await BookingConfirmed();
                navigation.navigate("ReviewHotelTicketStatus");
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
        
        const response = await axios.post('https://sajyatra.sajpe.in/admin/api/update-payment', payload);
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

  const cleanUpDescription = (description) => {
    if (!description) return '';

    let cleanedDescription = he.decode(description); // Decode HTML entities
    cleanedDescription = cleanedDescription.replace(/<\/?(ul|li|b|i|strong|em|span)\b[^>]*>/gi, ''); // Remove specific tags
    cleanedDescription = cleanedDescription.replace(/<br\s*\/?>|<p\s*\/?>|<\/p>/gi, '\n'); // Replace tags with newlines
    cleanedDescription = cleanedDescription.replace(/\\|\|/g, ''); // Remove slashes and pipes
    cleanedDescription = cleanedDescription.replace(/\s{2,}/g, ' '); // Replace multiple spaces
    cleanedDescription = cleanedDescription.replace(/\n{2,}/g, '\n'); // Replace multiple newlines
    cleanedDescription = cleanedDescription.replace(/\/\/+|\\|\|/g, '');
    cleanedDescription = cleanedDescription.trim(); // Trim leading/trailing whitespace
    cleanedDescription = cleanedDescription.replace(/"/g, ''); // Remove single quotes
    return cleanedDescription;
  };
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <View style={styles.container}>
      <View style={styles.gest}>
        <Text style={styles.gestText}>Guest Details</Text>
        <View style={styles.bottomLine} /></View>
      {/* check in check out  */}
      <ScrollView style={{ height: '100%', paddingHorizontal: SW(20) }} showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hotelDetail}>
          <View>
            <Text style={styles.hotelName}>{hotelDetails.HotelName}</Text>
          </View>
          <View style={{ paddingTop: SF(5) }}>
          <Text style={styles.hotelName}>HotelNorms</Text>
          <ReadMoreText
            text={cleanUpDescription(BlockRoom?.BlockRoomResult?.HotelNorms || '')}
            textStyle={{ color: 'black', fontSize: SF(13) }}
            readMoreStyle={{
              color: Colors.theme_background,
              fontFamily: 'Poppins-Bold',
              fontSize: SF(13),
              marginLeft: 0,
              marginTop: SH(5),
            }}
          />
        </View>
        <View style={{ paddingTop: SF(5) }}>
        <Text style={styles.hotelName}>HotelPolicyDetail</Text>
        <ReadMoreText
          text={cleanUpDescription(BlockRoom?.BlockRoomResult?.HotelPolicyDetail || '')}
          textStyle={{ color: 'black', fontSize: SF(13) }}
          readMoreStyle={{
            color: Colors.theme_background,
            fontFamily: 'Poppins-Bold',
            fontSize: SF(13),
            marginLeft: 0,
            marginTop: SH(5),
          }}
        />
      </View>
        </View>
        <View style={styles.bottomLineCheckIn}>
          <View
            style={[
              styles.star,

              { justifyContent: 'space-between', paddingTop: SH(10),marginHorizontal:SW(5) },
            ]}>
            <View>
              <Text style={styles.normalText}>Check-In</Text>
              <Text style={styles.normalText}>{formatDate(hotelData.CheckInDate)}</Text>
            </View>
            <View style={styles.verticleLine} />

            <View >
              <Text style={styles.normalText}>Check-out</Text>
              <Text style={styles.normalText}>{formatDate(hotelData.CheckOutDate)}</Text>
            </View>
          </View>
          <View>
         
            <Text style={styles.normalText}>Total length of nights : {numberOfNights}</Text>
          </View>
        </View>
        {/* Selected rooms for adults */}
        <View style={[styles.hotelDetail, { borderTopWidth: 0 }]}>
          <Text style={styles.normalText}>You selected</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between',display:'flex' }}>
           <Text style={styles.normalText}>{count} rooms for {NoOfAdults} adults</Text>
            <TouchableOpacity onPress={moreHandler}>
              <Entypo
                name={more ? 'chevron-down' : 'chevron-up'}
                size={20}
                color={Colors.gray_text_color}
              />
            </TouchableOpacity>
          </View>
          {/* update krna h */ }
          {more ? <Text style={styles.normalText}>{room.RoomTypeName}</Text> : null}
        </View>
        <View style={[styles.hotelDetail, { borderTopWidth: 0 }]}>
          <Text style={styles.paymentText}>your payment summary</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.normalText}>original price</Text>
            <Text style={styles.normalText}>
              <FontAwesome name={'rupee'} color={'black'} size={15} />
             
                  <Text>{Math.floor(room.Price.RoomPrice)}</Text>
              </Text>
          </View>
        </View>
       <View style={styles.DetailsContanier}>
          <Text style={styles.inputHeading}>enter your details </Text>
          <View style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1e7e8',
            paddingVertical: SH(10), borderRadius: 7
          }}>
            <Feather name={'info'} color='black' size={15} />
            <Text style={{ color: 'black' }}>almost done ! just fill in the </Text>
            <Entypo name={'star'} color='red' size={15} />
            <Text style={{ color: 'black' }}>required info </Text>
          </View>

          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>first name </Text>
              <Entypo name={'star'} color='red' size={15} /></View>

            <TextInput style={styles.input} onChangeText={setFirstName} keyboardType="name-phone-pad"
             />
            {showError && !firstName && <Text style={styles.errorText}>Please enter your first name.</Text>}
          </View>
          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>Middle name </Text>
              <Entypo name={'star'} color='red' size={15} /></View>

            <TextInput style={styles.input} onChangeText={setMiddleName} keyboardType="name-phone-pad"/>
           
          </View>
          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>last name  </Text>
              <Entypo name={'star'} color='red' size={15} /></View>

            <TextInput style={styles.input} onChangeText={setLastName} keyboardType="name-phone-pad"/>
            {showError && !lastName && <Text style={styles.errorText}>Please enter your last name .</Text>}
          </View>
          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>email address </Text>
              <Entypo name={'star'} color='red' size={15} />
            </View>

            <TextInput style={styles.input} onChangeText={setEmail} keyboardType="email-address"/>
            {showError && !email && <Text style={styles.errorText}>Please enter your email .</Text>}
            <Text style={{ color: 'black' }}>confirmation email sent to this mail address </Text>
          </View>
        
          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>Phone Number </Text>
              <Entypo name={'star'} color='red' size={15} />
            </View>

            <TextInput style={styles.input} onChangeText={setPhoneNumber} keyboardType="numeric" />
            {showError && !phoneNumber && <Text style={styles.errorText}>Please enter phone number .</Text>}
          </View>

        </View>

      </ScrollView>
      <View
        style={{
          backgroundColor: Colors.theme_background, padding: SW(12),
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}
       >
        <Text style={{
          color: 'white', fontFamily: 'Poppins-Bold', textAlign: 'center',
          textTransform: 'capitalize', fontSize: SF(15)
        }}>
       <FontAwesome name={'rupee'} color={'white'} size={15} />{TotalHotelPrice}</Text>
        <Text onPress={handlePayment} style={{
  color: Colors.theme_background, fontFamily: 'Poppins-Bold', textAlign: 'center',
  textTransform: 'capitalize', fontSize: SF(17), backgroundColor: '#c7e8f2',
  padding: SW(2), paddingHorizontal: SW(7), borderRadius: 5,
}}>proceed to pay</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    // paddingHorizontal: SW(20),
    paddingTop: SH(20),
  },
  gest: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestText: {
    color: Colors.black_text_color,
    fontFamily: 'Poppins-bold',
    fontStyle: 'normal',
    fontSize: SF(16),
    letterSpacing: 1,
  },
  bottomLine: {
    width: SW(30),
    height: SH(3),
    backgroundColor: Colors.theme_background,
    borderRadius: 5,
    marginTop: SH(10)
  },
  hotelDetail: {
    paddingVertical: SH(10),
    borderTopWidth: SW(1),
    borderBottomWidth: SW(1),
    borderTopColor: Colors.gray_color,
    borderBottomColor: Colors.gray_color,
    marginTop: SH(10),
    width: '100%',
  },
  star: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  normalText: {
    color: '#000',
    fontSize: SF(14),
    fontFamily: 'Poppins-Regular',
  },
  hotelName: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: SF(18),
  },
  
  verticleLine: {
    width: SW(10),
    height: SH(1),
    backgroundColor: Colors.black_text_color,
  },
  bottomLineCheckIn: {
    borderBottomWidth: SW(1),
    paddingBottom: SH(20),
    borderBottomColor: Colors.gray_color,
    marginTop: SH(10),
    width: '100%',
  },
  paymentText: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    textTransform: 'capitalize',
    fontSize: SF(15)
  },
  DetailsContanier: {
    paddingVertical: SH(10),
    marginTop: SH(10),
    width: '100%',
  },
  input: {
    padding: SW(10),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'black'
  },
  inputHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: SF(18),
    color: 'black',
    textTransform: 'capitalize'
  },
  inputLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: SF(15),
    color: 'black',
    textTransform: 'capitalize'
  },
  errorText: {
    color: 'red',
    fontSize: SF(12),
    fontFamily: 'NunitoSans-Regular',
    marginTop: SH(7),
    textTransform: 'capitalize'
  },
});

