// import React, {useState, useMemo} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import {
//   Button,
//   Container,
//   Input,
//   Spacing,
//   VectorIcon,
// } from '../../../components';
// import {RouteName} from '../../../routes';
// import {Style, Login} from '../../../styles';
// import {SH, SF, SW} from '../../../utils';
// import {useTheme} from '@react-navigation/native';
// import images from '../../../index';
// import {useTranslation} from 'react-i18next';
// import useLogin from '../../../hooks/useLogin';
// import {loginSuccess} from '../../../redux/action';

// const LoginScreen = props => {
//   const {login, error, loading, isLoggedIn} = useLogin();
//   const {Colors} = useTheme();
//   const Logins = useMemo(() => Login(Colors), [Colors]);
//   const {navigation} = props;
//   const [mobileNumber, setMobileNumber] = useState('7869839871');
//   const [passwordVisibility, setpasswordVisibility] = useState(true);
//   const [TextInputPassword, setTextInputPassword] = useState('12345678');

//   const handleLogin = () => {
//     login(mobileNumber, TextInputPassword);
//   };

//   const onChangeText = text => {
//     if (text === 'TextInputPassword')
//       setpasswordVisibility(!passwordVisibility);
//   };
//   const {t} = useTranslation();

//   const OnRegisterPress = () => {
//     navigation.navigate(RouteName.REGISTER_SCREEN);
//   };

//   return (
//     <Container>
//       <View style={{flex: 1, backgroundColor: 'white', marginTop: SH(60)}}>
//         <ScrollView
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={Style.ScrollViewStyles}>
//           <View style={{margin: SW(10)}}>
//             <View>
//               <View style={{alignItems: 'center'}}>
//                 <Image
//                   style={{width: SW(200), height: SH(150)}}
//                   resizeMode="contain"
//                   source={images.Logo}
//                 />
//               </View>
//               <Text style={Logins.LoginText}>{t('Login_Text')}</Text>
//               <Spacing space={SH(20)} />
//               <View style={Logins.InputSpaceView}>
//                 <Input
//                   title={t('Mobile_Number')}
//                   placeholder={t('Mobile_Number')}
//                   onChangeText={value => setMobileNumber(value)}
//                   value={mobileNumber}
//                   inputType="numeric"
//                   maxLength={10}
//                   placeholderTextColor={Colors.gray_text_color}
//                 />
//               </View>
//               <Spacing space={SH(20)} />
//               <View style={Style.FlexRowPassword}>
//                 <View style={Style.InputViewWidth}>
//                   <Input
//                     name="password"
//                     title={t('Password_Text')}
//                     value={TextInputPassword}
//                     placeholder={t('Password_Text')}
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     placeholderTextColor={Colors.gray_text_color}
//                     textContentType="newPassword"
//                     secureTextEntry={passwordVisibility}
//                     enablesReturnKeyAutomatically
//                     onChangeText={text => setTextInputPassword(text)}
//                   />
//                   <TouchableOpacity
//                     style={Style.IconPostionAboluteTwo}
//                     onPress={() => {
//                       onChangeText('TextInputPassword');
//                     }}>
//                     <VectorIcon
//                       name={passwordVisibility ? 'eye-off' : 'eye'}
//                       size={SF(25)}
//                       color={Colors.gray_text_color}
//                       icon="Ionicons"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <Spacing space={SH(10)} />
//               <TouchableOpacity
//                 onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD)}>
//                 <Text
//                   style={{
//                     margin: SW(10),
//                     color: 'black',
//                     fontFamily: 'Poppins-Bold',
//                     textAlign: 'center',
//                   }}>
//                   {t('Forgot_Password')}
//                 </Text>
//               </TouchableOpacity>
//               <View>
//                 {loading ? (
//                   <ActivityIndicator
//                     size="large"
//                     color={Colors.theme_background}
//                   /> // Display ActivityIndicator while loading
//                 ) : (
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: Colors.theme_background,
//                       padding: SW(15),
//                       borderRadius: 7,
//                       marginTop: SH(10),
//                       margin: SW(7),
//                     }}
//                     onPress={() => handleLogin()}>
//                     <Text
//                       style={{
//                         color: 'white',
//                         textAlign: 'center',
//                         fontFamily: 'Poppins-Medium',
//                         fontSize: SF(17),
//                       }}>
//                       {t('Login_Button_Text')}
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//               <View>
//                 <Text
//                   style={{
//                     color: 'black',
//                     textAlign: 'center',
//                     marginTop: SH(5),
//                   }}>
//                   {t('Dont_Have_Account')}{' '}
//                 </Text>
//                 <TouchableOpacity
//                   style={{
//                     backgroundColor: Colors.theme_background,
//                     padding: SW(15),
//                     borderRadius: 7,
//                     margin: SW(7),
//                     marginTop: SH(15),
//                   }}
//                   onPress={() => OnRegisterPress()}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       textAlign: 'center',
//                       fontFamily: 'Poppins-Medium',
//                       fontSize: SF(17),
//                     }}>
//                     {t('Register_Text')}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{marginHorizontal: 10}}>
//                 <Text style={{color: 'red'}}>{error}</Text>
//               </View>

//               <Spacing space={SH(40)} />
//               <Spacing space={SH(10)} />
//             </View>
//           </View>
//         </ScrollView>
//       </View>
//     </Container>
//   );
// };
// export default LoginScreen;

import { StyleSheet, Text, TextInput, TouchableOpacity, View ,Image, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Colors, SH, SW, SF } from '../../../utils';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import axios from 'axios';
import images from '../../../index'
const LoginScreen = () => {
  const mobileNumber = useSelector(state => state.commomReducer.mobileNumber);
  const reduxOtp = useSelector(state => state.commomReducer.otp);
  const [otp, setOtp] = useState(reduxOtp);
  const navigation = useNavigation();

  const LoginProcess = async () => {
    const payload = {
      mobile: mobileNumber,
      otp: otp,
    };
    try {
      const response = await axios.post('https://app.sajpe.in/api/v1/user/login', payload);
      const LoginStatus = response.data;
      console.log('LoginStatus', LoginStatus);

      if (LoginStatus.status) {
        if (LoginStatus.message === 'Login successfully.') {
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
            text2: `Welcome ${LoginStatus.user.name || ''}`,
          });
         
          navigation.navigate(RouteName.HOME_SCREEN_TAB_ALL); 
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
               <Image source={require('../../../images/Login.png')} style={styles.image} />
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
       value={mobileNumber}
       editable={false}
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
       <Text style={{ color: 'white',fontFamily:'Poppins-Bold' }}>Login</Text>
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
    width:SW(500), height: SH(450), resizeMode: 'contain',
  },
});
