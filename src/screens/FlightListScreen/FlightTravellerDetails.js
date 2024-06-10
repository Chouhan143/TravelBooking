import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SF, SH, SW} from '../../utils';
import {TouchableOpacity, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
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

  const [Email, setEmail] = useState('');
  const [Mobile, setMobile] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleDateSelect = date => {
    setDob(date);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    validateFields();
  }, [selected, firstName, LastName, dob, passengerType]);

  const validateFields = () => {
    if (
      selected &&
      firstName.trim() &&
      LastName.trim() &&
      (passengerType !== 'Adult (12 yrs+)' ? dob : true)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleConfirm = () => {
    const payload = {
      passengerType,
      gender: selected,
      dob: passengerType !== 'Adult (12 yrs+)' ? dob : undefined,
      firstName,
      LastName,
      Email,
      Mobile,
    };
    console.log('payload', payload);
    dispatch(flightTravellerDetails(payload));
    navigation.navigate(RouteName.FLIGHT_DETAILS);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: '10%',
          backgroundColor: '#FFCC99',
          justifyContent: 'space-between',
          paddingHorizontal: SW(10),
          alignItems: 'center',
          paddingTop: SW(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: 10,
            paddingTop: SH(7),
            paddingHorizontal: 10,
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
            <Text style={{color: 'rgba(0,0,0,1)', fontSize: SF(15)}}>
              <Text style={{fontWeight: '700', color: '#000'}}>Important:</Text>
              {''} Enter name as mentioned on your passport or goverment
              approved IDs.
            </Text>
          </View>
        </View>
      </View>

      {/* inputeboxes here  */}
      <View>
        <Text
          style={{
            fontSize: SF(18),
            paddingVertical: SW(10),
            paddingHorizontal: SW(18),
            fontWeight: '700',
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
            <Text style={{fontSize: SF(16), fontWeight: '500'}}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelected('Female')}
            style={[styles.tab, selected === 'Female' && styles.selectedTab]}>
            <Text style={{fontSize: SF(16), fontWeight: '500'}}>Female</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: SW(5)}}>
          <TextInput
            style={styles.input}
            placeholder="First & Middle Name"
            value={firstName}
            placeholderTextColor={'#0099FF'}
            onChangeText={setFirstName}
          />
        </View>
        <View style={{marginTop: SW(10)}}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={LastName}
            placeholderTextColor={'#0099FF'}
            onChangeText={setLastName}
          />
        </View>

        {passengerType !== 'Adult (12 yrs+)' && (
          <View style={{marginTop: SW(10)}}>
            <View style={styles.input}>
              <DatePicker onDateSelect={handleDateSelect} />
            </View>
          </View>
        )}

        {/* <View>
          <Text style={styles.text}>Contact Information</Text>
        </View>
        <View>
          <Text style={styles.text1}>
            add your information so that you can also directly receive bokking
            details & other alerts.
          </Text>
        </View>
        <View style={{marginTop: SW(10)}}>
          <TextInput
            style={styles.input}
            placeholder="Email(Optional)"
            value={Email}
            placeholderTextColor={'#0099FF'}
            onChangeText={setEmail}
          />
        </View>
        <View style={{marginTop: SW(10)}}>
          <TextInput
            style={styles.input}
            placeholder="Mobile No(Optional)"
            value={Mobile}
            placeholderTextColor={'#0099FF'}
            onChangeText={setMobile}
          />
        </View> */}
        <TouchableOpacity
          style={[styles.ConfirmButton, !isValid && {backgroundColor: '#ccc'}]}
          onPress={handleConfirm}
          disabled={!isValid}>
          <Text style={styles.confirmTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlightTravellerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  tab: {
    borderWidth: SW(1),
    borderColor: 'grey',
    width: SW(170),
    paddingVertical: SW(10),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedTab: {
    backgroundColor: '#0099FF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0099FF',
    padding: SW(10),
    marginBottom: SW(10),
    fontSize: SF(18),
    width: SW(355),
    alignSelf: 'center',
    borderRadius: SW(5),
    fontWeight: '500',
  },
  ConfirmButton: {
    width: SW(355),
    borderRadius: SW(5),
    backgroundColor: '#0099FF',
    padding: SW(15),
    margin: SW(10),
    marginTop: SH(35),
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
