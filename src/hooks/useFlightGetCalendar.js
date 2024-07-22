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
  const [errors, setErrors] = useState(null); 
  const [loading, setLoading] = useState(false);
  const calendarDataGet = async calendarPayload => {
    setLoading(true);
    setErrors(null);
    try {
      const res = await axios.post(FLIGHT_GET_CALENDAR, calendarPayload);
      console.log('date calender',JSON.stringify( res.data));
      if (res.status === 200) {
        dispatch(getCalenderData(res.data.Results));
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return {calendarDataGet, errors, loading};
};

export default useFlightGetCalendar;
