// import React, {useState, useMemo} from 'react';
// import {View, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
// import {
//   Input,
//   Button,
//   CheckBox,
//   Spacing,
//   Countrycode,
//   VectorIcon,
// } from '../../../components';
// import {SH, SF,SW} from '../../../utils';
// import {RouteName} from '../../../routes';
// import {Login, Style} from '../../../styles';
// import {useTranslation} from 'react-i18next';
// import {useTheme} from '@react-navigation/native';
// import axios from 'axios';
// import {BASE_URL, REGISTER_ENDPOINT} from '../../../utils/BaseUrl';
// import Toast from 'react-native-toast-message';
// import {ActivityIndicator} from 'react-native';

// const Register = props => {
//   const {navigation} = props;
//   const {Colors} = useTheme();
//   const [error, setError] = useState('');
//   const Logins = useMemo(() => Login(Colors), [Colors]);
//   const stateArray = {
//     username: '',
//     emailId: '',
//     mobileNumber: '',
//     textInputPassword: '',
//     toggleCheckBox: false,
//   };
//   const stateErrorArray = {
//     username: '',
//     emailId: '',
//     mobileNumber: '',
//     textInputPassword: '',
//     toggleCheckBox: false,
//   };
//   const [state, setState] = useState(stateArray);
//   const [loading, setLoading] = useState(false);
//   console.log(state);
//   // const [stateError, setStateError] = useState(stateErrorArray);
//   const [passwordVisibility, setPasswordVisibility] = useState(true);
//   const {t} = useTranslation();
//   const onChangeText = (text, type) => {
//     if (text === 'TextInputPassword')
//       setPasswordVisibility(!passwordVisibility);
//   };
//   const [checked, setChecked] = React.useState(true);
//   const toggleCheckbox = () => setChecked(!checked);

//   const handleRegister = () => {
//     registerRequest();
//   };

//   // Register Api

//   const registerRequest = async () => {
//     try {
//       setLoading(true);

//       const payload = {
//         name: state.username,
//         email: state.emailId,
//         mobile: state.mobileNumber,
//         password: state.textInputPassword,
//         toggle_status: checked, // Include checkbox state in payload
//         // Add other fields as needed
//       };

//       const response = await axios.post(
//         'https://srninfotech.com/projects/travel-app/api/register',
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       const result = response.data.status;
//       if (result === 200) {
//         navigation.navigate(RouteName.LOGIN_SCREEN);
//         Toast.show({
//           type: 'success',
//           text1: response.data.message,
//           text1Style: {
//             color: 'green',
//             fontSize: 16,
//           },
//         });
//         setLoading(false);
//       }
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const errorMessages = error.response.data.errors;
//         let errorMessage = '';

//         Object.keys(errorMessages).forEach(key => {
//           errorMessage += `${errorMessages[key].join('. ')}\n`;
//         });

//         Toast.show({
//           type: 'error',
//           text1: errorMessage,
//           text1Style: {
//             color: 'red',
//             fontSize: 16,
//           },
//         });
//         setLoading(false);
//       } else {
//         console.log(error);
//         Toast.show({
//           type: 'error',
//           text1: 'An error occurred. Please try again later.',
//           text1Style: {
//             color: 'red',
//             fontSize: 16,
//           },
//         });
//       }
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={Logins.MinViewBgColor}>
//       <ScrollView contentContainerStyle={Style.ScrollViewStyle}>
//         <View style={Logins.Container}>
//           <View style={Style.MinViewContent}>
//             <View style={{paddingTop: SH(65),
//               flexDirection: 'row',
//               justifyContent: 'flex-start',
//               width: '100%',
//               paddingBottom: SH(20),
//               paddingLeft: SH(15)}}>
//               <Text style={Logins.RegisterText}>{t('Sign_Up_Text')}</Text>
//             </View>
//             <Input
//               title={t('Enter_Your_Name')}
//               placeholder={t('Enter_Your_Name')}
//               onChangeText={text => setState({...state, username: text})}
//               value={state.username}
//             />
//             <Spacing space={SH(10)} />
//             <View style={Style.FlexRowPassword}>
//               <View style={Style.InputViewWidth}>
//                 <View style={Style.CountryCodeIconCenter}>
//                   <Countrycode />
//                 </View>
//                 <Input
//                   title={t('Mobile_Number')}
//                   placeholder={t('Mobile_Number')}
//                   onChangeText={text =>
//                     setState({...state, mobileNumber: text})
//                   }
//                   value={state.mobileNumber}
//                   maxLength={10}
//                   inputType="numeric"
//                   placeholderTextColor={Colors.gray_text_color}
//                   inputStyle={Style.PaddingLeftCountryInput}
//                 />
//               </View>
//             </View>
//             <Spacing space={SH(10)} />
//             <Input
//               title={t('Enter_Your_Email')}
//               placeholder={t('Enter_Your_Email')}
//               onChangeText={text => setState({...state, emailId: text})}
//               value={state.emailId}
//               placeholderTextColor={Colors.gray_text_color}
//             />
//             <Spacing space={SH(10)} />
//             <View style={Style.FlexRowPassword}>
//               <View style={Style.InputViewWidth}>
//                 <Input
//                   title={t('Password_Text')}
//                   name="password"
//                   value={state.textInputPassword}
//                   placeholder={t('Password_Text')}
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   placeholderTextColor={Colors.gray_color}
//                   textContentType="newPassword"
//                   secureTextEntry={passwordVisibility}
//                   enablesReturnKeyAutomatically
//                   onChangeText={text =>
//                     setState({...state, textInputPassword: text})
//                   }
//                 />
//                 <TouchableOpacity
//                   style={Style.IconPostionAboluteTwo}
//                   onPress={() => {
//                     onChangeText('TextInputPassword');
//                   }}>
//                   <VectorIcon
//                     name={passwordVisibility ? 'eye-off' : 'eye'}
//                     size={SF(25)}
//                     color={Colors.gray_text_color}
//                     icon="Ionicons"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <Spacing space={SH(20)} />
//             <View style={Logins.FlexRowChekBox}>
//               <View style={{fontSize: SF(11),
//       fontFamily: 'Poppins_Medium',
//       color: Colors.black_text_color,
//       top: SH(-25),marginRight:-SW(8)}}>
//                 <CheckBox
//                   checked={checked}
//                   onPress={toggleCheckbox}
//                   iconType="material-community"
//                   checkedIcon="checkbox-marked"
//                   uncheckedIcon="checkbox-blank-outline"
//                   checkedColor={Colors.theme_background}
//                 />
//               </View>
//               <Text style={{ fontSize: SF(12),
//                 fontFamily:'Poppins_Medium',
//                 color: Colors.black_text_color,
//                 top: SH(-25),
//                 width: '100%',}}>
//                 {t('I_Agree_Text')}{' '}
//                 <Text style={Logins.borderbottomTwo}>
//                   <Text
//                     style={Logins.bluecolor}
//                     onPress={() =>
//                       Linking.openURL('https://myaccount.google.com/')
//                     }>
//                     {' '}
//                     {t('Terms_Of_Service')}{' '}
//                   </Text>
//                 </Text>
//                 {t('And_text')}{' '}
//                 <Text
//                   onPress={() =>
//                     Linking.openURL('https://myaccount.google.com/')
//                   }
//                   style={Logins.bluecolor}>
//                   {t('Privacy_Policy')}
//                 </Text>
//               </Text>
//             </View>
//             <Spacing space={SH(20)} />

//             {/* <Text style={{color: 'red'}}>{error}</Text> */}
//             <View>
//               {loading ? (
//                 <ActivityIndicator size={35} color={Colors.theme_background} />
//               ) : (
//                 <TouchableOpacity 
//                 style={{backgroundColor:Colors.theme_background,
//                   padding:SW(15),borderRadius:7,margin:SW(7),marginTop:-SH(40)
//                 }}
//                 onPress={handleRegister}>
//                     <Text style={{color:'white',textAlign:'center',
//                       fontFamily:'Poppins-Medium',fontSize:SF(17)}}>{t('Sign_Up_Button_Text')}</Text>
//                   </TouchableOpacity>
//               )}
//             </View>
//             <View style={Logins.TopSpace}>
//               <View >
//                 <Text style={Logins.MemberTextStyle}>
//                   {t('Already_Member')}
//                 </Text>
//                 <TouchableOpacity   style={{backgroundColor:Colors.theme_background,
//                   padding:SW(15),borderRadius:7,margin:SW(7),marginTop:SH(15)}}
//                   onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)}>
//                   <Text style={{color:'white',textAlign:'center',
//                       fontFamily:'Poppins-Medium',fontSize:SF(17)}}>{t('Login_Button_Text')}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };
// export default Register;
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, SH, SW, SF } from '../../../utils';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { RouteName } from '../../../routes';
import axios from 'axios';  // Ensure axios is imported
// import { useDispatch } from 'react-redux';
import { setmobileNumber, setOtp } from '../../../redux/action';
const RegisterScreen = () => {
  // const mobileNumber = useSelector(state => state.commomReducer.mobileNumber);
  const reduxOtp = useSelector(state => state.commomReducer.otp);  // Added state for otp
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(reduxOtp);
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [fullname,setFullName]=useState();
  const [referral,setReferral]=useState();
  const RegisterProcess = async () => {
    const payload = {
      mobile: mobile,
      otp: otp,
      email:email,
      name:fullname,
      referral: referral
    };
    try {
      const response = await axios.post('https://app.sajpe.in/api/v1/user/login', payload);
      const RegisterStatus = response.data;
      if(RegisterStatus.message==='Register successfully'){
        
      }
      console.log('Register Status', RegisterStatus);
      Toast.show({
        type: 'success',
        text1: 'Register Successfully'
      })
      navigation.navigate(RouteName.REGISTER_SCREEN);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Not Register yet',
        text2:'Complete your register'
      });
      console.log('error', error);
    }
  };
  const handleMobileChange = (text) => {
    setMobile(text);
    dispatch(setmobileNumber(text));
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Image source={require('../../../images/Register.png')} style={styles.image} />
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Poppins-Medium',
          fontSize: SF(18),
          alignSelf: 'flex-start',
          marginTop: SH(25),
        }}
      >
        Register Your Account
      </Text>
      <Image style={{ width: SW(90), height: SH(80) }} resizeMode="contain" source={images.Logo} />
    </View>
    <TextInput
      placeholder="Enter your mobile number"
      placeholderTextColor={'gray'}
      style={styles.input}
      value={mobile}
      onChangeText={handleMobileChange}
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
      placeholder="Enter your Referral Code"
      placeholderTextColor={'gray'}
      style={styles.input}
      value={referral}
      onChangeText={setReferral}
    />
    <TouchableOpacity style={styles.button} onPress={RegisterProcess}>
      <Text style={{ color: 'white', fontFamily: 'Poppins-Bold' }}>Register</Text>
    </TouchableOpacity>
  </View>
  </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  heading:{
    color: 'black',
              fontFamily: 'Poppins-Medium',
              fontSize: SF(18),
              alignSelf: 'flex-start',
              marginTop: SH(25),
  },
  button: {
    backgroundColor: Colors.theme_background,
    paddingHorizontal: SW(120),
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
    width: SW(400),
    height: SH(250),
    resizeMode: 'contain',
  },
});
