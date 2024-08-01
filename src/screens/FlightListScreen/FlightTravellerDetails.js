import {StyleSheet, Text, View,Button, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors, SF, SH, SW} from '../../utils';
import {TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {flightTravellerDetails} from '../../redux/action';
import {DatePicker} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
const FlightTravellerDetails = ({route}) => {
  const navigation = useNavigation();
  const {passengerType} = route.params;

  console.log('passengerType', passengerType);

  const [selected, setSelected] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const defaultDate = new Date(); 
  const handleDateSelect = date => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    let isValidDate = true;

    if (passengerType === 'Child (2-12 yrs)') {
      const childDateLimit = new Date('2012-06-22');
      if (selectedDate <= childDateLimit || selectedDate > currentDate) {
        setError('Child date of birth must be after 22 June 2012.');
        isValidDate = false;
      }
    } else if (passengerType === 'Infant (0-2 yrs)') {
      const infantDateLimit = new Date('2022-06-12');
      if (selectedDate <= infantDateLimit || selectedDate > currentDate) {
        setError('Infant date of birth must be after 12 June 2022.');
        isValidDate = false;
      }
    }

    if (isValidDate) {
      setDob(date);
      setError('');
    } else {
      setDob('');
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    validateFields();
  }, [selected, firstName, LastName, dob,Email,Mobile,address, passengerType]);

  const validateFields = () => {
    if (
      selected &&
      firstName.trim() &&
      LastName.trim() &&
      Email.trim() &&
      Mobile.trim() &&
      address.trim() &&
      (passengerType !== 'Adult (12 yrs+)' ? dob : true)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  
  // const GuestArray = Guests.map(guest => ({
  //   firstName: guest.firstName,
  //   MiddleName: guest.MiddleName,
  //   lastName: guest.lastName,
  //   email: guest.email,
  //   phoneNumber: guest.phoneNumber,
  //   age:guest.age,
  // }));
  const handleConfirm = () => {
    const payload = {
      passengerType,
      gender: selected,
      firstName,
      LastName,
      Email,
      Mobile,
      address,
      dob,
      ...(passengerType !== 'Adult (12 yrs+)' && {dob}),
    };
    console.log('payload', payload);
    dispatch(flightTravellerDetails(payload));
    navigation.navigate(RouteName.FLIGHT_DETAILS);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 10,
          margin: SW(10),
          backgroundColor: '#ffd9bd',
          padding: SW(5),
          paddingVertical: SH(10),
          borderRadius: 10,
        }}>
        <View
          style={{
            width: SW(40),
            height: SH(40),
            backgroundColor: '#FF9900',
            borderRadius: SW(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name={'notification-important'}
            size={30}
            color={'#fff'}
          />
        </View>
        <View>
          <Text
            style={{
              color: 'rgba(0,0,0,1)',
              fontSize: SF(10),
              fontFamily: 'Poppins-Regular',
              marginRight: SW(10),
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins-Bold',
                fontSize: SF(13),
              }}>
              Important:
            </Text>
            Enter name as mentioned on your passport or goverment approved IDs.
          </Text>
        </View>
      </View>

      {/* inputeboxes here  */}
      <View>
        <Text
          style={{
            fontSize: SF(18),
            paddingVertical: SW(10),
            paddingHorizontal: SW(18),
            fontFamily: 'Poppins-Medium',
            color: 'black',
          }}>
          Gender
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingVertical: SW(14),
            width: SW,
          }}>
          <TouchableOpacity
            onPress={() => setSelected('Male')}
            style={[styles.tab, selected === 'Male' && styles.selectedTab]}>
            <Text
              style={[
                styles.tabText,
                selected === 'Male' && styles.selectedTabText,
              ]}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected('Female')}
            style={[styles.tab, selected === 'Female' && styles.selectedTab]}>
            <Text
              style={[
                styles.tabText,
                selected === 'Female' && styles.selectedTabText,
              ]}>
              Female
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: SW(5)}}>
          <TextInput
            style={styles.input}
            placeholder="First & Middle Name"
            value={firstName}
            placeholderTextColor={'black'}
            onChangeText={setFirstName}
          />
        </View>
        <View style={{marginTop: SW(10)}}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={LastName}
            placeholderTextColor={'black'}
            onChangeText={setLastName}
          />
        </View>
        <View style={{marginTop: SW(5)}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={Email}
          placeholderTextColor={'black'}
          onChangeText={setEmail}
        />
      </View>
      <View style={{marginTop: SW(5)}}>
      <TextInput
        style={styles.input}
        placeholder="Phone No"
        value={Mobile}
        placeholderTextColor={'black'}
        onChangeText={setMobile}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        placeholderTextColor={'black'}
        onChangeText={setAddress}
        
      />
    </View>
   <View style={{display:'flex',flexDirection:'row',alignItems:'center',alignContent:'center',
     borderWidth: 1,
    borderColor: 'gray',
    padding: SW(10),
    marginBottom: SW(10),
    fontSize: SF(18),
    width: SW(355),
    alignSelf: 'center',
    borderRadius: SW(5),
    fontWeight: '500',
    color: 'black',
   }}>
   <Text style={{ color: 'black',fontFamily: 'Poppins-Bold',
                fontSize: SF(17),marginRight:SW(10) }}>
   Date of Birth
 </Text>
     <DatePicker
       modal
       open={open}
       date={date || defaultDate} 
       mode="date"
       onConfirm={(selectedDate) => {
         setOpen(false);
         setDate(selectedDate); 
       }}
       onCancel={() => {
         setOpen(false);
       }}
     />
     
   </View>

        {passengerType !== 'Adult (12 yrs+)' && (
          <View style={{marginTop: SW(10)}}>
            <View style={styles.input}>
              <DatePicker onDateSelect={handleDateSelect} />
            </View>
          </View>
        )}

        <View style={{paddingHorizontal: 20}}>
          <Text style={{color: 'red'}}>{error}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.ConfirmButton,
            !isValid && {backgroundColor: Colors.gray_color},
          ]}
          onPress={handleConfirm}
          disabled={!isValid}>
          <Text style={styles.confirmTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FlightTravellerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tab: {
    borderWidth: SW(1),
    borderColor: 'gray',
    width: SW(170),
    paddingVertical: SW(10),
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: SW(5),
  },
  selectedTab: {
    backgroundColor: '#0099FF',
  },
  selectedTabText: {
    color: 'white',
    fontSize: SF(15),
  },
  tabText: {
    fontSize: SF(16),
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: SW(10),
    marginBottom: SW(10),
    fontSize: SF(18),
    width: SW(355),
    alignSelf: 'center',
    borderRadius: SW(5),
    fontWeight: '500',
    color: 'black',
  },
  ConfirmButton: {
    width: SW(355),
    borderRadius: SW(5),
    backgroundColor: '#0099FF',
    padding: SW(15),
    margin: SW(10),
    marginTop: SH(25),
  },
  confirmTxt: {
    fontSize: SF(16),
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: SF(15),
  },
  text: {
    margin: SW(10),
    marginBottom: SH(5),
    marginTop: SH(30),
    color: 'gray',
    textTransform: 'capitalize',
    fontSize: SF(13),
  },
  text1: {
    margin: SW(10),
    marginBottom: 0,
    textTransform: 'capitalize',
    color: 'green',
    fontSize: SF(13),
  },
});
