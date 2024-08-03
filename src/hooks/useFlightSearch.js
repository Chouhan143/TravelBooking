import React, {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../routes';
import {storeFlightData} from '../redux/action';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Flight_SEARCH } from '../utils/BaseUrl';
const useFlightSearch = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errors, setErrors] = useState(null); // State to hold errors
  const [loading, setLoading] = useState(false);

  const FsearchData = async searchPayload => {
    setLoading(true);
    setErrors(null);

    try {
      const res = await axios.post(Flight_SEARCH, searchPayload);
      // console.log('search flight data ',JSON.stringify(res.data));
      if (res.status === 200) {
        dispatch(storeFlightData(res.data, res.data.Results));
        const test1 = res?.data?.Results?.flat();
        test1.map(result =>
          result.FareDataMultiple.map(item => {
            const {ResultIndex, SrdvIndex} = item;
            AsyncStorage.setItem('ResultIndex', ResultIndex);
            AsyncStorage.setItem('SrdvIndex', SrdvIndex);
          }),
        );
        navigation.navigate(RouteName.FLIGHT_LIST_SCREEN, {
          searchParams: searchPayload,
        });
      } else {
        // Handle case where required fields are not set
        Toast.show({
          type: 'error',
          text1:
            'Please select source city, destination city, and departure date.',
          text1Style: {color: '#000', fontSize: SF(12)},
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          setErrors(errorData.errors); // Set errors state with the received error messages
        }
        Toast.show({
          type: 'error',
          text1: errorData.message || 'An error occurred. Please try again.',
          text1Style: {color: '#000', fontSize: SF(12)},
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'An error occurred. Please try again.',
          text1Style: {color: '#000', fontSize: SF(12)},
        });
      }

      console.log(
        'Error:',
        error.response ? error.response.data : error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return {FsearchData, errors, loading};
};

export default useFlightSearch;
