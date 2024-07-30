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
import { addGuest, removeGuest} from '../../redux/action';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { format, differenceInDays, parseISO } from 'date-fns';
export default function HotelGuestDetails() {
    const route = useRoute();
  const { room } = route.params;
  const navigation=useNavigation();
  const hotelDetails=useSelector(state=>state.commomReducer.hotelInfo);
  const hotelData = useSelector(state => state.commomReducer.hotelData);
  const TotalHotelPrice=useSelector(state=>state.commomReducer.totalHotelPrice);
 
  const count = useSelector(state => state.commomReducer.hotelRoomCounter);
  const RoomData = useSelector(state => state.commomReducer.hotelRoomDetails);
  const dispatch=useDispatch();

  const BlockRoom=useSelector(state=>state.commomReducer.hotelBlock);
  const [more, setMore] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [MiddleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading,setLoading]=useState(null);
  const Guests = useSelector(state => state.commomReducer.guests);
  const GuestArray = Guests.map(guest => ({
    firstName: guest.firstName,
    MiddleName: guest.MiddleName,
    lastName: guest.lastName,
    email: guest.email,
    phoneNumber: guest.phoneNumber,
    age:guest.age,
  }));
  console.log('GuestArray',Guests);

  const addGuestToRedux = () => {
    const guest = {
      firstName,
      MiddleName,
      lastName,
      email,
      phoneNumber,
      age
    };

    // Dispatch action to add passenger to Redux store
    dispatch(addGuest(guest));

    // Clear form fields
    
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setAge('')
  };
  const handleAddGuest = () => {
    if (
      !firstName || !lastName || !email|| !phoneNumber
    ) {
      Toast.show({
        type: 'error',
        topOffset: 100,
        text1: 'Please fill in all required fields.',
        text1Style: {
          fontSize: 16,
        },
      });

      return;
    }
    addGuestToRedux();
    navigation.navigate(RouteName.HOTEL_TICKET_GUEST_SCREEN);
    // refRBSheet.current.close();
  };

  const GuestDatafetch = ({item, index}) => {
    const handleDeleteGuest = () => {
      // Dispatch action to remove passenger from Redux store
      dispatch(removeGuest(index));
    };
  }

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
          <Text style={styles.inputHeading}>enter your Guest Details </Text>
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

            <TextInput style={styles.input} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
            {showError && !phoneNumber && <Text style={styles.errorText}>Please enter phone number .</Text>}
          </View>

          <View style={{ marginVertical: SH(10) }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.inputLabel}>Age </Text>
            <Entypo name={'star'} color='red' size={15} />
          </View>

          <TextInput style={styles.input} onChangeText={setAge} />
          {showError && !age && <Text style={styles.errorText}>Please enter your age .</Text>}
          
        </View>

        </View>

      </ScrollView>
     {
  NoOfAdults > 1 ? (
    <TouchableOpacity style={{ backgroundColor: Colors.theme_background,padding: SW(12),alignItems: 'center' }}>
      <Text style={{ color: 'white', fontFamily: 'Poppins-Bold',fontSize:SF(15) }}>Add Another Guest Detail</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={{ backgroundColor: Colors.theme_background,padding: SW(12),alignItems: 'center' }}
    onPress={handleAddGuest}>
      <Text style={{ color: 'white', fontFamily: 'Poppins-Bold',fontSize:SF(15) }}>Continue</Text>
    </TouchableOpacity>
  )
}
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

