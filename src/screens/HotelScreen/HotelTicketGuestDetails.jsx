import { ScrollView, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native'
import React, { useState,useCallback } from 'react';
// import { useFocusEffect } from '@react-navigation/native';
import { SH, SF, SW, Colors } from '../../utils';
import { Button, Input } from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HOTEL_BOOK } from '../../utils/BaseUrl';
import RazorpayCheckout from 'react-native-razorpay';
import { setBookingDetails } from '../../redux/action';
import { useNavigation } from '@react-navigation/native';
const HotelTicketGuestDetails = () => {
    const [loading, setLoading] = useState('');
    const navigation=useNavigation();
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const TotalHotelPrice = useSelector(state => state.commomReducer.totalHotelPrice);
    const [mainPassenger, setMainPassenger] = useState({
        emailId: '',
        phoneNo: '',
        name: ''
    });
    const mainguest=mainPassenger.name;
    const handleEmailChange = (emailId) => {
        setMainPassenger((prevState) => ({
            ...prevState,
            emailId
        }));
    };

    const handlePhoneNumberChange = (phoneNo) => {
        setMainPassenger((prevState) => ({
            ...prevState,
            phoneNo
        }));
    };

    const handleNameChange = (name) => {
        setMainPassenger((prevState) => ({
            ...prevState,
            name
        }));
    };
    const Guests = useSelector(state => state.commomReducer.guests);
    const GuestArray = Guests.map(guest => ({
        firstName: guest.firstName,
        MiddleName: guest.MiddleName,
        lastName: guest.lastName,
        email: guest.email,
        phoneNumber: guest.phoneNumber,
        age: guest.age,
    }));
    console.log('GuestArray', Guests);
    const guest = Guests[0];
   
    const handlePayment = async () => {

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
                    email: mainPassenger.emailId,
                    contact: mainPassenger.phoneNo,
                    name: mainPassenger.name
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
                    navigation.navigate("ReviewHotelTicketStatus",mainguest)
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
    const BookingConfirmed = async () => {
        try {
            const payload = {"ResultIndex": "9",
    
                "HotelCode": "92G|DEL",
                "HotelName":
                                "The Manor", "GuestNationality": "IN", "NoOfRooms": "1",
                            "ClientReferenceNo": 0, "IsVoucherBooking": true,
                            "HotelRoomsDetails": [{
                                "ChildCount": 0, "RequireAllPaxDetails": false,
                                "RoomId": 0, "RoomStatus": 0, "RoomIndex": 4,
                                "RoomTypeCode": "211504640|4|1",
                                "RoomTypeName": "Deluxe Room", "RatePlanCode": "230104963", "RatePlan": 13,
                                "InfoSource": "FixedCombination", "SequenceNo": "EA~~341089~4",
                                "DayRates": [{ "Amount": 12325, "Date": "2019-09-28T00:00:00" }],
                                "SupplierPrice": null,
                                "Price": {
                                    "CurrencyCode": "INR", "RoomPrice": 12325, "Tax": 3113.3,
                                    "ExtraGuestCharge": 0, "ChildCharge": 0, "OtherCharges": 26,
                                    "Discount": 2175, "PublishedPrice": 15464.3,
                                    "PublishedPriceRoundedOff": 15464, "OfferedPrice": 15464.3,
                                    "OfferedPriceRoundedOff": 15464, "AgentCommission": 0,
                                    "AgentMarkUp": 0, "ServiceTax": 4.68, "TDS": 0, "ServiceCharge": 0,
                                    "TotalGSTAmount": 4.68, "GST": {
                                        "CGSTAmount": 0, "CGSTRate": 0,
                                        "CessAmount": 0, "CessRate": 0, "IGSTAmount": 4.68, "IGSTRate": 18,
                                        "SGSTAmount": 0, "SGSTRate": 0, "TaxableAmount": 26
                                    }
                                },
                                "HotelPassenger": [
                                {
                                    "Title": "Mstr", "FirstName":guest.firstName, "MiddleName":guest.MiddleName, "LastName":guest.lastName,
                                    "Phoneno":guest.phoneNumber, "Email":guest.email, "PaxType": "2", "LeadPassenger": false,
                                    "Age":guest.age, "PassportNo": null, "PassportIssueDate": null,
                                    "PassportExpDate": null, "PAN": "XXXXXXXXXX"
                                }],
                                "RoomPromotion": "Member’s exclusive price", "Amenities": ["Breakfast Buffet"],
                                "SmokingPreference": "0", "BedTypes": [{
                                    "BedTypeCode": "13",
                                    "BedTypeDescription": "1 double bed"
                                }], "HotelSupplements": [],
                                "LastCancellationDate": "2019-09-17T00:00:00",
                                "CancellationPolicies": [{
                                    "Charge": 100, "ChargeType": 2,
                                    "Currency": "INR", "FromDate": "2019-09-18T00:00:00",
                                    "ToDate": "2019-09-26T23:59:59"
                                },
                                {
                                    "Charge": 100, "ChargeType": 2, "Currency": "INR", "FromDate": "2019-09-27T00:00:00",
                                    "ToDate": "2019-09-29T23:59:59"
                                }, {
                                    "Charge": 100, "ChargeType": 2, "Currency": "INR",
                                    "FromDate": "2019-09-28T00:00:00", "ToDate": "2019-09-29T00:00:00"
                                }],
                                "CancellationPolicy": "Deluxe Room#^#100.00% of total amount will be charged, If cancelled between 18-Sep-2019 00:00:00 and 26-Sep-2019 23:59:59.|100.00% of total amount will be charged, If cancelled between 27-Sep-2019 00:00:00 and 29-Sep-2019 23:59:59.|100.00% of total amount will be charged, If cancelled between 28-Sep-2019 00:00:00 and 29-Sep-2019 00:00:00.|#!#",
                                "Inclusion": ["Breakfast Buffet"], "BedTypeCode": "13", "Supplements": null
                            }],
                            "ArrivalTime": "2019-09-28T00:00:00", "IsPackageFare": true, "SrdvType": "SingleTB", "SrdvIndex":
                                "SrdvTB", "TraceId": "1", "EndUserIp": "1.1.1.1", "ClientId": "XXXX", "UserName": "XXXX",
                            "Password": "XXXX"}

                ;


            setShowError(false);
            const response = await axios.post(HOTEL_BOOK, payload);
            const BookingResult = response.data;
            dispatch(setBookingDetails(BookingResult));
            console.log('BookingResult', BookingResult);
            const bookingstatus=BookingResult.thirdPartyResponse.BookResult.HotelBookingStatus;
            console.log('bookingstatus',bookingstatus);
            
            if (bookingstatus=== 'Confirmed') {
                Toast.show({
                    type: 'success',
                    text1: 'Booking Confirmed',
                    text2: 'Your booking has been confirmed!',
                    textStyle: { color: 'green', fontSize: 12 },
                });
            } else {

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
    const GuestDatafetch = ({ item, index }) => {
      
        return (
          <TouchableOpacity
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: 'gray',
              shadowColor: '#000',
              marginBottom: 10,
              padding:SW(10)
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <Text style={[styles.text, { flex: 1, textAlign: 'left' }]}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={[styles.text, { textAlign: 'right' }]}>
                {item.age}yr
              </Text>
            </View>
            
              </View>
              {/* Right Side */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  paddingRight: 18,
                }}>
               
              </View>
            </View>
          </TouchableOpacity>
        );
      };
    return (
        <View style={{display:'flex',flexDirection:'column',justifyContent:'space-between',flex:1}}>
       <View>
       <View style={{margin:SW(15)}}>
       <Text
               style={{
                   color: '#000',
                   fontSize: SF(20),
                   fontFamily: 'Poppins-Medium',

               }}>
               Total Guests &  Details
           </Text>
           <View>
     <FlatList
       data={Guests}
       renderItem={GuestDatafetch}
       keyExtractor={Item => Item.id}
       showsHorizontalScrollIndicator={false}
     />
   </View>
       </View>
       <View
           style={{
               width: '92%',
               height: 'auto',
               borderRadius: 8,
               padding: SW(10),
               borderWidth: 0.5,
               borderColor: 'gray',
               margin: SW(15)
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
                   value={mainPassenger.emailId}
                   onChangeText={handleEmailChange}
                   placeholder="Email"
                   placeholderTextColor={'#000'}
               />
               <Input style={{ color: 'black' }}
                   value={mainPassenger.phoneNo}
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
       </View>
        <View
        style={{
            backgroundColor: Colors.theme_background, padding: SW(15),
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
             alignItems: 'center',borderTopLeftRadius:SW(15),borderTopRightRadius:SW(15)
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
    )
}

export default HotelTicketGuestDetails

const styles = StyleSheet.create({
    text:{
        fontSize: SF(15),
          color: '#000',
          fontFamily:'Poppins-Regular',
          marginHorizontal:SW(10)
        },
        
})