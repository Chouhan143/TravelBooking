// useLogin.js
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN_ENDPOINT} from '../utils/BaseUrl';
import {RouteName} from '../routes';
import {useNavigation} from '@react-navigation/native';
import {loginSuccess} from '../redux/action';
import {useDispatch} from 'react-redux';
const useLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = async (mobile, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(LOGIN_ENDPOINT, {
        mobile,
        password,
      });
      console.log('login Response', response.data);
      const user_id = response.data.data.user_id.toString();
      console.log('user_id', user_id);
      const status = response.status;
      console.log(status);
      if (status == 200) {
        AsyncStorage.setItem('userId', user_id);
        navigation.navigate(RouteName.OTP_VERYFY_SCREEN);
      }
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.error('Response error', error.response.data);
        setError(error.response.data.message || 'Something went wrong.');
      } else if (error.request) {
        // Request was made but no response received
        console.error('Request error', error.request);
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        console.error('General error', error.message);
        setError('An error occurred. Please try again.');
      }

      setLoading(false);
    }
  };
  return {login, loading, error};
};
export default useLogin;
