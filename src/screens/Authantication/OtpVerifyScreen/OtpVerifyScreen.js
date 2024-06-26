import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ToastAndroid,
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
import axios from 'axios';
import {RESEND_OTP} from '../../../utils/BaseUrl';

const OtpScreenset = props => {
  const {otpVeryfy, loading, error} = useOtpVeryfy();
  const {t} = useTranslation();
  const {Colors} = useTheme();
  const Otpstyles = useMemo(() => Otpstyle(Colors), [Colors]);
  const {navigation} = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [result, setResult] = useState(false);

  const isAuthenticated = useSelector(
    state => state.commomReducer.isAuthenticated,
  );

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.log('Error retrieving user ID from AsyncStorage:', error);
      }
    };
    getUserIdFromStorage();
  }, []);

  const handleOTPChange = useCallback(otpValue => {
    setOtp(otpValue);
  }, []);

  const handleVerify = async () => {
    try {
      await otpVeryfy(userId, otp);
      setResult(true);
      setAlertVisible(true);
      setAlertMessage(t('Login_Successfull'));
    } catch (error) {
      console.log('Error verifying OTP:', error.response);
      setAlertVisible(true);
      setAlertMessage(t('Resand_Otp_Text_Modal'));
    }
  };

  const resendOtpReq = async () => {
    let userId = await AsyncStorage.getItem('userId');
    try {
      const payload = {
        user_id: userId,
      };
      const res = await axios.post(RESEND_OTP, payload);
      const message = res.data.data.message;
      ToastAndroid.show(((message = message), (duration = 2)));
      console.log(res.data);
    } catch (error) {
      console.log('Error sending OTP', error.response);
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
                <TouchableOpacity onPress={resendOtpReq}>
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
          setAlertVisible(!alertVisible);
          if (result) {
            navigation.navigate(RouteName.SIDE_NAVIGATOR);
          } else {
            navigation.navigate(RouteName.OTP_VERYFY_SCREEN);
          }
        }}
        buttonminview={Otpstyles.buttonotp}
        iconVisible={true}
        buttonText={t('Ok')}
      />
    </View>
  );
};

export default OtpScreenset;
