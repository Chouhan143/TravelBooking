// useLogin.js
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OTP_VERYFY_ENDPOINT} from '../utils/BaseUrl';
import {RouteName} from '../routes';
import {useNavigation} from '@react-navigation/native';
import {ConfirmationAlert} from '../components';
import {loginSuccess} from '../redux/action';
import {useDispatch} from 'react-redux';
const useOtpVeryfy = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const otpVeryfy = async (user_id, otp) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(OTP_VERYFY_ENDPOINT, {
        user_id,
        otp,
      });
      console.log('response token ', response.data.token);
      const result = response.data.status;
      const token = response.data.token;
      console.log('token aaya', token);

      AsyncStorage.setItem('token', token);
      dispatch(loginSuccess(token)); // Set authentication state

      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return {otpVeryfy, loading, error};
};
export default useOtpVeryfy;
