import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome, you can replace it with your preferred icon library
import {Colors, SF, SH, SW} from '../../utils';
import Radio from '../../components/commonComponents/Radio';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Button, Input, RBSheet} from '../../components';
import {useSelector} from 'react-redux';
import {addPassenger, removePassenger} from '../../redux/action';
import {useDispatch} from 'react-redux';
import {FlightsListScreenStyle} from '../../styles';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {BLOKING_SEAT} from '../../utils/BaseUrl';
const PassengerInformation = ({route}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const {selectedItem} = route.params;
  const [gender, setGender] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [passengerLName, setPassengerLName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerAddress, setPassengerAddress] = useState('');
  const [passengerAge, setPassengerAge] = useState('');
  const [showPassengerDetails, setShowPassengerDetails] = useState(false);

  // const [checkedItemCount, setCheckedItemCount] = useState([]);
  // const [radioChecked, setRadioChecked] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null); // State to store the selected seat
  const handleGenderChange = selectedGender => {
    setGender(selectedGender);
  };

  const selectedSeatData = useSelector(
    state => state.commomReducer.selectedSeats,
  );

  const commaSepratedSeat = selectedSeatData.join(', ');
  console.log(selectedSeatData.join(', '));

  const pessengerData = useSelector(state => state.commomReducer.passengers);
  const [radioChecked, setRadioChecked] = useState(
    Array(pessengerData.length).fill(false),
  );
  
  const passengersArray = pessengerData.map(passenger => ({
    name: passenger.passengerName,
    age: passenger.passengerAge,
    gender: passenger.gender,
    address: passenger.passengerAddress,
    last_name: passenger.passengerLName,
    email:passenger.passengerEmail,
    phone:passenger.passengerPhone
  }));
  
  console.log('passengersArray', passengersArray);

  const busSearchData=useSelector(state=>state.commomReducer.busData);
  const passenger = pessengerData[0];
    console.log('passengers',passenger);
  const traceId=busSearchData.data.TraceId;
  const resultIndex=busSearchData.data.Result[0].ResultIndex;
  const blockSeat = async () => {
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
      const res = await axios.post(BLOKING_SEAT, payload);
      const status = res.data.result.status;
      console.log('res', res.data.result.status);
      if (status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Seat is Blocked ',
          text2: 'This seat is blocked for some time !',
          textStyle: { color: 'green', fontSize: 12 },
        });
        navigation.replace(RouteName.REVIEW_BOOKING);
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
  
  const BlockingSeat = () => {
    blockSeat();
    navigation.navigate(RouteName.REVIEW_BOOKING)
  };
  console.log('radioChecked', radioChecked);

  const handleRadioPress = index => {
    const updatedCheckedArray = [...radioChecked];
    // Create a copy of the current checked array
    updatedCheckedArray[index] = !updatedCheckedArray[index]; // Toggle the checked state at the clicked index
    setRadioChecked(updatedCheckedArray); // Update the state to reflect checked radio buttons
  };

  const checkedItemCount = radioChecked.filter(item => item === true).length;

  const handlePassengerNameChange = name => {
    setPassengerName(name);
  };

  const handlePassengerLNameChange = name => {
    setPassengerLName(name);
  };

  const togglePassengerDetails = () => {
    setShowPassengerDetails(!showPassengerDetails);
  };

  const handlePassengerEmailChange = email => {
    setPassengerEmail(email);
  };

  const handlePassengerPhoneChange = phone => {
    setPassengerPhone(phone);
  };

  const handlePassengerAddressChange = address => {
    setPassengerAddress(address);
  };

  const handlePassengerAgeChange = age => {
    setPassengerAge(age);
  };

  // const handleRadioPress = () => {
  //   setRadioChecked(!radioChecked);
  // };

  const addPassengerToRedux = () => {
    const passenger = {
      gender,
      passengerName,
      passengerLName,
      passengerEmail,
      passengerPhone,
      passengerAddress,
      passengerAge,
    };

    // Dispatch action to add passenger to Redux store
    dispatch(addPassenger(passenger));

    // Clear form fields
    setGender(null);
    setPassengerName('');
    setPassengerLName('');
    setPassengerEmail('');
    setPassengerPhone('');
    setPassengerAddress('');
    setPassengerAge('');
  };

  const handleAddPassenger = () => {
    if (
      !passengerName ||
      !passengerLName ||
      !passengerAddress ||
      !passengerAge ||
      !gender||
      !passengerEmail||
      !passengerPhone
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
    addPassengerToRedux();
    refRBSheet.current.close();
  };

  const pesenderDatafetch = ({item, index}) => {
    const handleDeletePassenger = () => {
      // Dispatch action to remove passenger from Redux store
      dispatch(removePassenger(index));
    };

    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: 'auto',
          // backgroundColor: 'gray',
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: 'gray',
          shadowColor: '#000',
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Radio
              checked={radioChecked[index]} // Check if this radio button should be checked
              onPress={() => handleRadioPress(index)}
            />

            <View>
              <Text style={styles.text}>Mr.{item.passengerName}</Text>
              <Text style={styles.text}>
                {item.gender} . {item.passengerAge}yr
              </Text>
            </View>
          </View>
          {/* Right Side  */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              paddingRight: 18,
            }}>
            <Feather name={'edit'} size={20} />
            <TouchableOpacity onPress={handleDeletePassenger}>
              <AntDesign name={'delete'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{marginVertical: SH(5)}}>
        <Text style={styles.pHeading}>Add Passengers</Text>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Text style={{color: '#000',fontFamily:'Poppins-Regular',fontSize:SF(15)}}>
            Selected Seats :
          </Text>
          <Text style={{fontFamily:'Poppins-Regular',color:'black'}}> {commaSepratedSeat}</Text>
        </View>
      </View>

      {/* seat status */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        <View>
          <Text style={{color: '#000',fontFamily:'Poppins-Bold', fontSize: 18}}>
            Passengers Details{' '}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color:
                checkedItemCount < selectedSeatData.length ? 'red' : 'green',
                fontFamily:'Poppins-Medium'
            }}>
            {checkedItemCount}/{selectedSeatData.length} Seat Selected
          </Text>
        </View>
      </View>

      {/* pessenger data gt from redux  */}
      <View>
        <FlatList
          data={pessengerData}
          renderItem={pesenderDatafetch}
          keyExtractor={Item => Item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {pessengerData.length === 0 ? (
        <View style={[styles.passenger, {height: '80%'}]}>
          <TouchableOpacity
            style={styles.passengerHeader}
            onPress={togglePassengerDetails}>
            <Text style={styles.pHeading}>Add Passenger</Text>
            {/* <Icon
              name={showPassengerDetails ? 'angle-up' : 'angle-down'}
              size={20}
              color="#000"
            /> */}
          </TouchableOpacity>
          {/* {showPassengerDetails && ( */}
          <ScrollView>
            <View style={{marginBottom: 30,width:SW(320),marginLeft:-SW(10)}}>
              <View style={styles.radioGroup}>
                <Text style={styles.text}>Male</Text>
                <Radio
                  label="Male"
                  checked={gender === 'male'}
                  onPress={() => handleGenderChange('male')}
                />
                <Text style={styles.text}>Female</Text>
                <Radio
                  label="Female"
                  checked={gender === 'female'}
                  onPress={() => handleGenderChange('female')}
                />
              </View>

             <View >
             <Input
             title="First Name "
             placeholder="Enter name"
             onChangeText={handlePassengerNameChange}
             value={passengerName}
             
           />

           <Input
             title="Last Name "
             placeholder="Enter Last name"
             onChangeText={handlePassengerLNameChange}
             value={passengerLName}
           />

           <Input
             title="Address"
             placeholder="Enter address"
             onChangeText={handlePassengerAddressChange}
             value={passengerAddress}
           />
           <Input
           title="email"
           placeholder="Enter email address"
           onChangeText={handlePassengerEmailChange}
           value={passengerEmail}
         />
         <Input
         title="phone number"
         placeholder="Enter Contact number"
         onChangeText={handlePassengerPhoneChange}
         value={passengerPhone}
         keyboardType="numeric"
       />
           <Input
             title="Age"
             placeholder="Enter age"
             onChangeText={handlePassengerAgeChange}
             value={passengerAge}
             keyboardType="numeric"
           />

           <TouchableOpacity
             style={{
               justifyContent: 'center',
               alignItems: 'center',
               alignSelf: 'center',
               width: '95%',
               height: '10%',
               backgroundColor:Colors.theme_background,
               borderRadius: 10,
             }}
             onPress={handleAddPassenger}>
             <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>
               Add Passengers
             </Text>
           </TouchableOpacity>
             </View>
              {/* Add other input fields as needed */}
            </View>
          </ScrollView>
          {/* )} */}
        </View>
      ) : (
        <>
          {selectedSeatData.length > pessengerData.length ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 70,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                width: '100%',
                height: '7%',
                // backgroundColor: 'green',
                borderRadius: 5,
                justifyContent: 'space-between',
                paddingHorizontal: 6,
                borderColor: 'gray',
                borderWidth: 0.5,
              }}
              onPress={() => refRBSheet.current.open()}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  alignItems: 'center',
                }}>
                <Feather name={'user-plus'} size={20} />
                <Text style={{color:'black'}}>Add new passenger</Text>
              </View>
              <View>
                <Feather name={'chevron-right'} size={20} />
              </View>
            </TouchableOpacity>
          ) : null}
          {console.log('ddd', selectedSeatData.length <= pessengerData.length)}

          {selectedSeatData.length <= pessengerData.length ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
                height: '7%',
                borderRadius: 5,
                backgroundColor:
                  checkedItemCount === selectedSeatData.length
                    ? 'green'
                    : 'gray',
              }}
              onPress={BlockingSeat}
              disabled={checkedItemCount !== selectedSeatData.length}>
              <Text style={{color: '#fff', fontFamily: '700', fontSize: 18}}>
                Continue
              </Text>
            </TouchableOpacity>
          ) : null}
        </>
      )}
      {/* bottom sheet  */}

      <RBSheet height={SH(500)} refRBSheet={refRBSheet}>
        <View style={FlightsListScreenStyle.PayBottomShetBox}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={FlightsListScreenStyle.contentContainerStyle}>
            <View style={{marginBottom: 30}}>
              <View style={[styles.radioGroup, {marginLeft: 18}]}>
                <Text style={{color: '#000'}}>Male</Text>
                <Radio
                  label="Male"
                  checked={gender === 'male'}
                  onPress={() => handleGenderChange('male')}
                />
                <Text style={{color: '#000'}}>Female</Text>
                <Radio
                  label="Female"
                  checked={gender === 'female'}
                  onPress={() => handleGenderChange('female')}
                />
              </View>

              <Input
                title="First Name "
                placeholder="Enter name"
                onChangeText={handlePassengerNameChange}
                value={passengerName}
              />

              <Input
                title="Last Name "
                placeholder="Enter Last name"
                onChangeText={handlePassengerLNameChange}
                value={passengerLName}
              />

              <Input
                title="Address"
                placeholder="Enter address"
                onChangeText={handlePassengerAddressChange}
                value={passengerAddress}
              />
              <Input
           title="email"
           placeholder="Enter email address"
           onChangeText={handlePassengerEmailChange}
           value={passengerEmail}
         />
         <Input
         title="phone number"
         placeholder="Enter Contact number"
         onChangeText={handlePassengerPhoneChange}
         value={passengerPhone}
         keyboardType="numeric"
       />
              <Input
                title="Age"
                placeholder="Enter age"
                onChangeText={handlePassengerAgeChange}
                value={passengerAge}
                keyboardType="numeric"
              />
            </View>
          </ScrollView>
          <View style={FlightsListScreenStyle.PayBottomShetBoxChild}>
            <View></View>
            <View>
              <Button title={'Add Passenger'} onPress={handleAddPassenger} />
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default PassengerInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SW(20),
    backgroundColor: '#fff',
  },
  pHeading: {
    fontSize: SF(20),
    color: '#000',
    fontFamily:'Poppins-Regular'
  },
  sHeading: {
    fontSize: SF(15),
    color: '#000',
    marginTop: 5,
    
  },
  passenger: {
    width: '100%',
    height: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  passengerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:SW(15)
  },
  text:{
  fontSize: SF(15),
    color: '#000',
    fontFamily:'Poppins-Regular'
  }
});
