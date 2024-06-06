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
      console.log(user_id);
      const status = response.status;
      console.log(status);
      if (status == 200) {
        AsyncStorage.setItem('userId', user_id);
        navigation.navigate(RouteName.OTP_VERYFY_SCREEN);
      }
      setLoading(false);
    } catch (error) {
      const errorCatch = error.response.data.message;
      // const errorCatch = error.response;

      setError(errorCatch);
      setLoading(false);
    }
  };
  return {login, loading, error};
};
export default useLogin;
