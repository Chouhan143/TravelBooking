import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors, SH, SW, SF } from '../../../utils';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import axios from 'axios';
import { REGISTER_ENDPOINT } from '../../../utils/BaseUrl';

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
        const response = await axios.post(REGISTER_ENDPOINT, payload);
        const RegisterStatus = response.data;
        // console.log('LoginStatus', LoginStatus);
  
        if (RegisterStatus.status) {
          if (RegisterStatus.message === 'Login successfully.') {
            // Toast.show({
            //   type: 'success',
            //   text1: 'Register Successfully',
            //   text2: `Welcome ${RegisterStatus.user.name || ''}`,
            // });
           
            navigation.navigate(RouteName.LOGIN_SCREEN); 
          } else {
            Toast.show({
              type: 'error',
              // text1: RegisterStatus.message || 'Login failed',
            });
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Register failed',
            text2: 'Please check your credentials and try again.',
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Register failed',
          text2: error.response?.data?.message || 'Please try again',
        });
        console.log('error', error);
      }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../../../images/RegisterNew.png')} style={styles.image} />
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
           keyboardType="email-address"
        />
        <TextInput
          placeholder="Enter your Name"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={fullname}
          onChangeText={setFullName}
           keyboardType="name-phone-pad"
        />
        <TextInput
          placeholder="Enter your Referral Code (Optional)"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={referral}
          onChangeText={setReferral}
        />
        <TouchableOpacity style={styles.button} onPress={RegisterProcess}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.theme_background,
    paddingHorizontal: SW(120),
    paddingVertical: SH(10),
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: SH(10),
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  input: {
   borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 10, 
    margin: SH(10),
    textAlign: 'left',
    color: 'black',
    width: SW(300),
    padding: SH(10)
  },
  image: {
    width: SW(600),
    height: SH(300),
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

