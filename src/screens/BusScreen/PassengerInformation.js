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
import {SF, SH, SW} from '../../utils';
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
      !gender
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
              <Text>Mr.{item.passengerName}</Text>
              <Text>
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
          <Text style={{color: '#000', fontWeight: '700'}}>
            Selected Seats :
          </Text>
          <Text> {commaSepratedSeat}</Text>
        </View>
      </View>

      {/* seat status */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}>
        <View>
          <Text style={{color: '#000', fontWeight: '700', fontSize: 18}}>
            Passengers Details{' '}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color:
                checkedItemCount < selectedSeatData.length ? 'red' : 'green',
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
            <View style={{marginBottom: 30}}>
              <View style={styles.radioGroup}>
                <Text>Male</Text>
                <Radio
                  label="Male"
                  checked={gender === 'male'}
                  onPress={() => handleGenderChange('male')}
                />
                <Text>Female</Text>
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

              {/* <Input
                  title="Email"
                  placeholder="Enter email"
                  onChangeText={handlePassengerEmailChange}
                  value={passengerEmail}
                  keyboardType="email-address"
                /> */}

              {/* <Input
                  title="Phone No."
                  placeholder="Enter phone number"
                  onChangeText={handlePassengerPhoneChange}
                  value={passengerPhone}
                  keyboardType="phone-pad"
                /> */}

              <Input
                title="Address"
                placeholder="Enter address"
                onChangeText={handlePassengerAddressChange}
                value={passengerAddress}
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
                  height: '8%',
                  backgroundColor: 'green',
                  borderRadius: 10,
                }}
                onPress={handleAddPassenger}>
                <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>
                  Add Passengers
                </Text>
              </TouchableOpacity>
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
                <Text>Add new passenger</Text>
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
              onPress={() => {
                navigation.navigate(RouteName.REVIEW_BOOKING);
              }}
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

              {/* <Input
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
              /> */}

              <Input
                title="Address"
                placeholder="Enter address"
                onChangeText={handlePassengerAddressChange}
                value={passengerAddress}
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
  },
});
