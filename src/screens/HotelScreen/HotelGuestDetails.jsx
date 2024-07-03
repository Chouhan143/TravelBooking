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
import he from 'he';
import axios from 'axios';
import { HOTEL_BOOK } from '../../utils/BaseUrl';
import { setBookingDetails } from '../../redux/action';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
export default function HotelGuestDetails() {
  const hotelDetails=useSelector(state=>state.commomReducer.hotelInfo);
  const hotelData = useSelector(state => state.commomReducer.hotelData);
  const count = useSelector(state => state.commomReducer.hotelRoomCounter);
  const RoomData = useSelector(state => state.commomReducer.hotelRoomDetails);
  const dispatch=useDispatch();
  // console.log('RoomData',RoomData);
  const BlockRoom=useSelector(state=>state.commomReducer.hotelBlock);
  console.log('Block Room Guest',BlockRoom);
  const navigation = useNavigation();
  const [more, setMore] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const [bookingStatus,SetBookingStatus]=useState(null);
  let moreHandler = () => {
    setMore(!more);
  };

  const BookingConfirmed = async () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const firstName = ""; 
    const lastName = ""; 
    const email = ""; 
    const country = ""; 
    const phoneNumber = ""; 
  
    if (!firstName || !lastName || !email || !country || !phoneNumber) {
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
  
    try {
      const payload = {
        ResultIndex: 9,
        HotelCode: "341089",
        HotelName: "The Manor",
        NoOfRooms: "1",
        HotelRoomsDetails: [
          {
            RoomId: 0,
            RoomIndex: 4,
            Price: {
              PublishedPrice: 15464.3,
            },
          },
        ],
        SrdvIndex: "65",
        SrdvType: "SingleTB",
        TraceId: "1",
      };
  
      const response = await axios.post(HOTEL_BOOK, payload);
      const BookingResult = response.data;
      dispatch(setBookingDetails(BookingResult));
      console.log('BookingResult', BookingResult);
  
      const { HotelBookingStatus } = BookingResult.BookResult;
      SetBookingStatus(HotelBookingStatus);
  
      if (HotelBookingStatus === 'Confirmed') {
        Toast.show({
          type: 'success',
          text1: 'Booking Confirmed',
          text2: 'Your booking has been confirmed!',
          textStyle: { color: 'green', fontSize: 12 },
        });
        navigation.navigate(RouteName.HOTEL_PAYMENT);
      } else {
        navigation.navigate(RouteName.HOTEL_GUEST_DETAILS);
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
          {/* number of neights update krna h */}
            <Text style={styles.normalText}>Total lenght of nights : 2</Text>
          </View>
        </View>
        {/* Selected rooms for adults */}
        <View style={[styles.hotelDetail, { borderTopWidth: 0 }]}>
          <Text style={styles.normalText}>You selected</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.normalText}>{count} rooms for {
              hotelData.NoOfRooms.map(item=>{
                return item.NoOfAdults
              })
            } adults</Text>
            <TouchableOpacity onPress={moreHandler}>
              <Entypo
                name={more ? 'chevron-down' : 'chevron-up'}
                size={20}
                color={Colors.gray_text_color}
              />
            </TouchableOpacity>
          </View>
          {/* update krna h */ }
          {more ? <Text style={styles.normalText}>1 * Deluxe Double Room</Text> : null}
        </View>
        <View style={[styles.hotelDetail, { borderTopWidth: 0 }]}>
          <Text style={styles.paymentText}>your payment summary</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.normalText}>original price</Text>
            <Text style={styles.normalText}>
              <FontAwesome name={'rupee'} color={'black'} size={15} />
              {RoomData.map((item)=>(
                  <Text>{Math.floor(item.Price.RoomPrice)}</Text>
              ))

              }
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

            <TextInput style={styles.input} onChangeText={setFirstName} />
            {showError && !firstName && <Text style={styles.errorText}>Please enter your first name.</Text>}
          </View>
          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>last name  </Text>
              <Entypo name={'star'} color='red' size={15} /></View>

            <TextInput style={styles.input} onChangeText={setLastName} />
            {showError && !lastName && <Text style={styles.errorText}>Please enter your last name .</Text>}
          </View>
          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>email address </Text>
              <Entypo name={'star'} color='red' size={15} />
            </View>

            <TextInput style={styles.input} onChangeText={setEmail} />
            {showError && !email && <Text style={styles.errorText}>Please enter your email .</Text>}
            <Text style={{ color: 'black' }}>confirmation email sent to this mail address </Text>
          </View>
          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>Country/Region </Text>
              <Entypo name={'star'} color='red' size={15} />
            </View>

            <TextInput style={styles.input} onChangeText={setCountry} />
            {showError && !country && <Text style={styles.errorText}>Please enter your country.</Text>}
          </View>

          <View style={{ marginVertical: SH(10) }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text style={styles.inputLabel}>Phone Number </Text>
              <Entypo name={'star'} color='red' size={15} />
            </View>

            <TextInput style={styles.input} onChangeText={setPhoneNumber} />
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
          <FontAwesome name={'rupee'} color={'white'} size={15} />4,480</Text>
        <Text onPress={BookingConfirmed} style={{
          color: Colors.theme_background, fontFamily: 'Poppins-Bold', textAlign: 'center',
          textTransform: 'capitalize', fontSize: SF(17), backgroundColor: '#c7e8f2',
          padding: SW(2), paddingHorizontal: SW(7), borderRadius: 5
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
