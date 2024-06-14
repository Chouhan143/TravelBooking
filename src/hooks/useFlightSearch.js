import React, {useState} from 'react';
import axios from 'axios';
import {Flight_SEARCH} from '../utils/BaseUrl';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../routes';
import {storeFlightData} from '../redux/action';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useFlightSearch = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errors, setErrors] = useState(null); // State to hold errors
  const [loading, setLoading] = useState(false);
  const FsearchData = async payload => {
    setLoading(true);
    setErrors(null);

    try {
      const res = await axios.post(Flight_SEARCH, payload);
      console.log('API Response:', res.data);
      if (res.status === 200) {
        // dispatch(storeFlightData(res.data.Results));
        dispatch(storeFlightData(res.data, res.data.Results));
        const test1 = res?.data?.Results?.flat();
        // console.log('test1', test1);
        test1.map(result =>
          result.FareDataMultiple.map(item => {
            const {ResultIndex, SrdvIndex} = item;
            AsyncStorage.setItem('ResultIndex', ResultIndex);
            AsyncStorage.setItem('SrdvIndex', SrdvIndex);
          }),
        );
        // console.log('API Response:', res.data.Results.flat());
        navigation.navigate(RouteName.FLIGHT_LIST_SCREEN, {
          searchParams: payload,
        });
      }
    } catch (error) {
      console.log('errorData', error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;

        if (errorData) {
          setErrors(errorData); // Set errors state with the received error messages
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return {FsearchData, errors, loading};
};

export default useFlightSearch;
