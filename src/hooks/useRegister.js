import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {REGISTER_ENDPOINT} from '../utils/BaseUrl';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const register = async (name, email, password, mobile, toggle_status) => {
    try {
      setLoading(true);
      const registerApi = await axios.post(REGISTER_ENDPOINT, {
        name,
        email,
        password,
        mobile,
        toggle_status,
      });
      console.log('register response', registerApi);
      setLoading(false); // Set loading to false after request completes
      return registerApi.data; // Return the response data
    } catch (error) {
      // setLoading(false); // Set loading to false in case of error
      // setError(error); // Set the error state
      //   error.response ? error.response.data : error.message
      console.log('Registration Error:', error); // Log the error for debugging
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  return {register, loading, error};
};

export default useRegister;
