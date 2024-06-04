import React, {useState} from 'react';
import axios from 'axios';
import {FLIGHT_GET_CALENDAR} from '../utils/BaseUrl';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../routes';
import {getCalenderData} from '../redux/action';
import {useDispatch} from 'react-redux';
const useFlightGetCalendar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [errors, setErrors] = useState(null); // State to hold errors
  const [loading, setLoading] = useState(false);
  const calendarDataGet = async payload => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await axios.post(FLIGHT_GET_CALENDAR, payload);
      //   console.log('date calender', res);
      if (res.status === 200) {
        dispatch(getCalenderData(res.data.Results));
        // navigation.navigate(RouteName.FLIGHT_LIST_SCREEN);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return {calendarDataGet, errors, loading};
};

export default useFlightGetCalendar;
