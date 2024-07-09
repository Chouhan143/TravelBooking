import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors, SH, SW, SF } from '../../../utils';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import axios from 'axios';

const RegisterScreen = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [referral, setReferral] = useState('');
  const navigation = useNavigation();

  const validateFields = () => {
    if (!mobile || !otp || !email || !fullname) {
      return 'All fields except Referral Code are required';
    }
    return null;
  };

  const RegisterProcess = async () => {
    const error = validateFields();
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: error,
      });
      return;
    }

    const payload = {
      mobile,
      otp,
      email,
      name: fullname,
      referral: referral || '', // Referral is optional
    };

    try {
      const response = await axios.post('https://app.sajpe.in/api/v1/user/login', payload);
      const RegisterStatus = response.data;
      console.log('Register Status', RegisterStatus);

      if (RegisterStatus.message === 'Register successfully') {
        Toast.show({
          type: 'success',
          text1: 'Register Successfully'
        });
        navigation.navigate(RouteName.LOGIN_SCREEN);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: RegisterStatus.message || 'An error occurred',
        });
      }
    } catch (error) {
      console.error('Error during registration', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while registering. Please try again.',
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../images/Register.png')} style={styles.image} />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>Register Your Account</Text>
          <Image style={{ width: SW(90), height: SH(80) }} resizeMode="contain" source={require('../../../images/Logo.png')} />
        </View>
        <TextInput
          placeholder="Enter your mobile number"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={mobile}
          keyboardType="numeric"
          onChangeText={setMobile}
        />
        <TextInput
          placeholder="Enter your OTP"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter your Name"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={fullname}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Enter your Referral Code (Optional)"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={referral}
          onChangeText={setReferral}
        />
        <TouchableOpacity style={styles.button} onPress={RegisterProcess}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.theme_background,
    paddingHorizontal: SW(120),
    paddingVertical: SH(15),
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: SH(10),
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    margin: SH(10),
    textAlign: 'left',
    color: 'black',
    width: SW(300),
    padding: SH(10),
  },
  image: {
    width: SW(400),
    height: SH(250),
    resizeMode: 'contain',
  },
  title: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: SF(18),
    alignSelf: 'flex-start',
    marginTop: SH(25),
  },
});

export default RegisterScreen;

