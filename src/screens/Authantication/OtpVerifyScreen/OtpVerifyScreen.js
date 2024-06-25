import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Otpstyle} from '../../../styles';
import RouteName from '../../../routes/RouteName';
import {Button, ConfirmationAlert, OTPInput} from '../../../components';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import useOtpVeryfy from '../../../hooks/useOtpVeryfy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {SH, SW, SF} from '../../../utils';
const OtpScreenset = props => {
  const {otpVeryfy, loading, error} = useOtpVeryfy();
  const {t} = useTranslation();
  const {Colors} = useTheme();
  const Otpstyles = useMemo(() => Otpstyle(Colors), [Colors]);
  const {navigation} = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [userId, setUserId] = useState(''); // State to hold the user ID
  const [otp, setOtp] = useState(''); // State to hold the OTP
  const [result, setResult] = useState(false);
  const [okbutton, Setokbutton] = useState('');

  const isAuthenticated = useSelector(
    state => state.commomReducer.isAuthenticated,
  );

  var alertdata = {
    logout: t('Resand_Otp_Text_Modal'),
    loginSuccess: t('Login_Successfull'),
  };
  // const onoknutton = () => {
  //   if (okbutton === false) okbutton;
  //   if (okbutton === true) navigation.navigate(RouteName.SIDE_NAVIGATOR);
  // };

  const onoknutton = () => {
    if (result) {
      setAlertVisible(true);
      setAlertMessage(t('Login_Successfull'));
      navigation.navigate(RouteName.SIDE_NAVIGATOR); // Navigate to side navigator upon successful verification
    } else {
      setAlertVisible(true);
      setAlertMessage(t('Resand_Otp_Text_Modal'));
    }
  };

  useEffect(() => {
    // Function to retrieve user ID from AsyncStorage
    const getUserIdFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.log('Error retrieving user ID from AsyncStorage:', error);
        // Handle error
      }
    };
    getUserIdFromStorage();
  }, []);

  // get token >>>>>>>>>>>

  // useEffect(() => {
  //   const get_Token = async () => {
  //     if (isAuthenticated) {
  //       const storedToken = await AsyncStorage.getItem('token'); // Retrieve token
  //       if (storedToken) {
  //         dispatch(loginSuccess(storedToken)); // Set authentication state
  //       }
  //     }
  //   };
  //   get_Token();
  // }, []);

  const handleOTPChange = useCallback(otpValue => {
    setOtp(otpValue);
  }, []);

  const handleVerify = async () => {
    try {
      // Call the otpVeryfy function from the custom hook
      await otpVeryfy(userId, otp);
      setResult(true);
    } catch (error) {
      console.log('Error verifying OTP:', error.response);
      // Handle error
    }
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingTop: SH(100),
        flex: 1,
        backgroundColor: Colors.white_text_color,
      }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Otpstyles.ScrollViewStyle}>
        <KeyboardAvoidingView enabled>
          <View
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                margin: SW(30),
                marginTop: SH(40),
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../images/otp.jpg')}
                style={{width: SW(130), height: SH(130), marginBottom: SH(25)}}
              />
              <Text style={Otpstyles.EnterSixDigitText}>
                {t('Enter_Six_Digit_OTP')}
              </Text>
              <Text
                style={{
                  color: Colors.gray_text_color,
                  fontFamily: 'Poppins_Medium',
                  fontSize: SF(15),
                  margin: SW(10),
                  marginTop: -SH(10),
                  textAlign: 'center',
                }}>
                {t('Enter_The_Otp_Title')}
              </Text>
              <OTPInput
                style={Otpstyles.OtpViewStyles}
                pinCount={6}
                autoFocusOnLoad={false}
                codeInputFieldStyle={Otpstyles.CodeInputStyles}
                codeInputHighlightStyle={Otpstyles.CodeInputStyles}
                onCodeChanged={handleOTPChange}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.gray_text_color,
                    fontFamily: 'Poppins_Medium',
                    fontSize: SF(15),
                    margin: SW(10),
                    marginTop: -SH(10),
                    textAlign: 'center',
                  }}>
                  {t('Didnt_Receive_Otp')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setAlertVisible(true);
                    setAlertMessage(alertdata.logout);
                    Setokbutton(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins_Medium',
                      fontWeight: '700',
                      marginTop: -SH(20),
                      color: Colors.theme_background,
                    }}>
                    {t('Resend')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginBottom: 20}}>
                <Text style={{color: 'red'}}>{error || null} </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.theme_background,
                  margin: SW(20),
                  marginTop: -SH(20),
                  padding: SW(10),
                  borderRadius: 10,
                }}
                // onPress={() => {
                //   setAlertVisible(true);
                //   setAlertMessage(alertdata.loginSuccess);
                //   Setokbutton(true);
                //   handleVerify();
                // }}
                onPress={handleVerify}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                    fontSize: SF(15),
                  }}>
                  {t('Verify_Text')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ConfirmationAlert
        message={alertMessage}
        modalVisible={alertVisible}
        setModalVisible={setAlertVisible}
        onPress={() => {
          setAlertVisible(!alertVisible), onoknutton();
        }}
        buttonminview={Otpstyles.buttonotp}
        iconVisible={true}
        buttonText={t('Ok')}
      />
    </View>
  );
};
export default OtpScreenset;
