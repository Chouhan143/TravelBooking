import { StyleSheet, Text, TextInput, TouchableOpacity, View ,Image, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { Colors, SH, SW, SF } from '../../../utils';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import images from '../../../index'
import { LOGIN_ENDPOINT } from '../../../utils/BaseUrl';
const LoginScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const LoginProcess = async () => {
    const payload = {
      mobile: mobile,
      otp: otp,
    };
    try {
      const response = await axios.post(LOGIN_ENDPOINT, payload);
      const LoginStatus = response.data;
      console.log('LoginStatus', LoginStatus);

      if (LoginStatus.status) {
        if (LoginStatus.message === 'Login successfully.') {
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
            text2: `Welcome ${LoginStatus.user.name || ''}`,
          });
         
          navigation.navigate("Root"); 
        } else {
          Toast.show({
            type: 'error',
            text1: LoginStatus.message || 'Login failed',
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: 'Please check your credentials and try again.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: error.response?.data?.message || 'Please try again',
      });
      console.log('error', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1,backgroundColor:'white'}}>
               <View style={{justifyContent:'center',alignItems:'center'}}>
               <Image source={require('../../../images/LoginNew.png')} style={styles.image} />
               <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <Text style={{ color: 'black',fontFamily:'Poppins-Medium',
       fontSize:SF(20),alignSelf:'flex-start',marginTop:SH(20)}}>
            Login Your Account</Text> 
               <Image
               style={{width: SW(100), height: SH(70)}}
               resizeMode="contain"
               source={images.Logo}
             />  
               
               </View>
     <TextInput
       placeholder='Enter your mobile number'
       placeholderTextColor={'gray'}
       style={styles.input}
       value={mobile}
       onChangeText={setMobile}
       keyboardType='numeric'
     />
     <TextInput
       placeholder='Enter your OTP'
       placeholderTextColor={'gray'}
       style={styles.input}
       value={otp}
       onChangeText={setOtp}
       keyboardType='numeric'
     />
     <TouchableOpacity style={styles.button} onPress={LoginProcess}>
       <Text style={{ color: 'white',fontFamily:'Poppins-Bold' }}>LOGIN</Text>
     </TouchableOpacity>    
               </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.theme_background,
    paddingHorizontal: SW(130),
    paddingVertical: SH(15),
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: SH(10),
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
    width:SW(500), height: SH(450), resizeMode: 'contain',
  },
});
