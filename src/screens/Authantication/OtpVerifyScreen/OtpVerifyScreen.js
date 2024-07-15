import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Colors, SF, SH, SW } from '../../../utils';
import { RouteName } from '../../../routes';
import { useNavigation } from '@react-navigation/native';
import { getDeviceId } from 'react-native-device-info';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { setOtp } from '../../../redux/action';
import { useDispatch } from 'react-redux';
import { setMobileNumber } from '../../../redux/action';
import { OTP_VERYFY_ENDPOINT } from '../../../utils/BaseUrl';
const OtpVerifyScreen = () => {
  const [otp, Setotp] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const dispatch = useDispatch();
  const mobileNumber = useSelector(state => state.commomReducer.mobileNumber);
  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await getDeviceId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, []);

  const OtpVerify = async () => {
    const payload = {
      device_id: deviceId,
      mobile: mobile,
    };
    try {
      const response = await axios.post(OTP_VERYFY_ENDPOINT, payload);
      const result = response.data;
      Setotp(result.otp);
      dispatch(setOtp(result.otp));
      console.log(result);
     if (result.user_registered === true) {
        Toast.show({
          type: 'success',
          text1: 'Successfully Registered',
        });
        navigation.navigate(RouteName.LOGIN_SCREEN);
      } else {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent, Please Register',
        });
        navigation.navigate(RouteName.REGISTER_SCREEN);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error sending OTP',
        text2: error.response?.data?.message || 'Please try again',
      });
      console.log('error', error);
    }
  };

  const handleMobileChange = (text) => {
    setMobile(text);
    dispatch(setMobileNumber(text));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center' }}>
      <Image source={require('../../../images/Otp.png')} style={styles.image} />
        <Text style={styles.heading}>Enter Your Mobile Number</Text>
        <TextInput
          placeholder='Mobile Number '
          placeholderTextColor={'gray'}
          style={styles.input}
          value={mobileNumber}
          onChangeText={handleMobileChange}
        />
        <TouchableOpacity onPress={OtpVerify}>
          <Text style={styles.button}>Send OTP</Text>
        </TouchableOpacity>
        <Text style={styles.BottomText}>
          If you are a new user, you need to register your mobile number for
          verification. Once your registration is successful, you will be able to log in using the OTP sent to your registered mobile number.
        </Text>
      </View>
    </ScrollView>
  );
};

export default OtpVerifyScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%', height: SH(400), resizeMode: 'contain', marginTop: SH(20),
  },
  heading: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: SF(18),
    paddingRight: SW(75),
  },
  button: {
    color: 'white',
    backgroundColor: Colors.theme_background,
    paddingHorizontal: SW(120),
    paddingVertical: SH(15),
    borderRadius: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    margin: SH(10),
    textAlign: 'left',
    color: 'black',
    paddingRight: SW(190),
    paddingLeft:SW(15)
  },
  BottomText: {
    color: 'black',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: SF(10),
    marginTop: SW(135),
    marginVertical: SH(10),
    marginHorizontal:SW(5),
    backgroundColor: 'white',
    padding: SW(20),
    borderRadius: 10,
    borderColor: '#f2a26f',
    borderWidth: 1,
    textTransform: 'capitalize',
    elevation:10
  },
});
