// import {
//   COLOR_PICKER_SET,
//   DATA_DETAILES_TYPE,
//   TICKET_DATA_TYPE,
//   TAB_ID_TYPE,
//   SET_LOADING,
//   LOGIN_SUCCESS,
//   LOGOUT,
//   SET_TRACE_ID,
//   UPDATE_TOTAL_PRICE,
//   ADD_PASSENGER,
//   REMOVE_PASSENGER,
//   SELECT_BOARDING_POINT,
//   SELECT_DROPPING_POINT,
//   STORE_FLIGHT_DATA,
//   CALENDAR_SHOW_DATE,
//   FLIGHT_SEARCH_PAYLOAD,
//   FLIGHT_FAREQUETES_RESPONSE,
//   FLIGHT_TRAVELER_DETAILS,
//   REMOVE_FLIGHT_PASSENGER_ITEM,
//   BAGGAGE_FLIGHT_DATA,
//   BAGGAGE_CABIN_FLIGHT_DATA,
//   FLIGHT_SELECT_SEAT,
//   SET_SELECTED_PASSENGERS,
//   CLEAR_SELECTED_PASSENGERS,
//   ADD_SEAT_AMOUNT,
//   REMOVE_SEAT_AMOUNT,
//   ADD_MEAL_PRICE,
//   REMOVE_MEAL_PRICE,
//   FLIGHT_SELECT_SEAT_RESET,
//   RESET_FLIGHT_FAREQUOTES_DATA,
//   RESET_ADD_SEAT_AMOUNT,
//   RESET_ADD_MEAL_DISCRIPTION,
//   ADD_BAGGAGE_PRICE,
//   REMOVE_BAGGAGE_PRICE,
//   SET_HOTEL_DATA,
//   RESET_BAGGAGE_STATE,
//   GEOLOCATION_POSITIONS,
//   SET_HOTEL_INFO,
//   SET_HOTEL_ROOM_DETAILS,
//   ROOM_COUNTERS,
//   ROOM_COUNTERS_DECREMENT,
//   ROOM_COUNTERS_INCREMENT,
//   SET_BLOCK_ROOM_DETAILS,
//   SET_BOOK_DETAILS,
//   SET_MOBILE_NUMBER,
//   SET_OTP
// } from '../actiontypes/CommonTypes';

// export const color_picker_set_action = data => dispatch => {
//   dispatch({type: COLOR_PICKER_SET, colorrdata: data});
// };

// export const get_data_action = data => dispatch => {
//   dispatch({type: DATA_DETAILES_TYPE, detailsStore: data});
// };

// export const tab_action = id => dispatch => {
//   dispatch({type: TAB_ID_TYPE, tabid: id});
// };

// export const ticket_type_action = data => dispatch => {
//   dispatch({type: TICKET_DATA_TYPE, TicketData: data});
// };

// export const mobileNumber =  token => {
//   return {
//     type: LOGIN_SUCCESS,
//     token: token,
//   };
// };

// export const loginSuccess = token => {
//   return {
//     type: LOGIN_SUCCESS,
//     token: token,
//   };
// };

// export const logout = () => {
//   return {
//     type: LOGOUT,
//   };
// };
// export const setTraceId = traceId => ({
//   type: SET_TRACE_ID,
//   traceId: traceId,
// });
// export const setmobileNumber = mobileNumber => ({
//   type: SET_MOBILE_NUMBER,
//   mobileNumber: mobileNumber,
// });

// export const setOtp= otp => ({
//   type: SET_OTP,
//   otp: otp,
// });

// export const updateSelectedSeats = selectedSeats => ({
//   type: 'UPDATE_SELECTED_SEATS',
//   payload: selectedSeats,
// });

// export const updateTotalPrice = totalPrice => ({
//   type: UPDATE_TOTAL_PRICE,
//   payload: totalPrice,
// });

// export const addPassenger = passenger => ({
//   type: ADD_PASSENGER,
//   payload: passenger,
// });

// export const removePassenger = index => ({
//   type: REMOVE_PASSENGER,
//   payload: {index},
// });

// export const selectBoardingPoint = point => ({
//   type: SELECT_BOARDING_POINT,
//   payload: point,
// });

// export const selectDroppingPoint = point => ({
//   type: SELECT_DROPPING_POINT,
//   payload: point,
// });

// export const storeFlightData = (flightTraceIdDetails, flightData) => ({
//   type: STORE_FLIGHT_DATA,
//   payload: {
//     flightTraceIdDetails,
//     flightData,
//   },
// });

// export const getCalenderData = getCalendar => ({
//   type: CALENDAR_SHOW_DATE,
//   payload: getCalendar,
// });

// export const flightSearchPayload = getPayload => ({
//   type: FLIGHT_SEARCH_PAYLOAD,
//   payload: getPayload,
// });

// export const flightFareQutesData = getData => ({
//   type: FLIGHT_FAREQUETES_RESPONSE,
//   payload: getData,
// });

// export const flightTravellerDetails = inputeData => ({
//   type: FLIGHT_TRAVELER_DETAILS,
//   payload: inputeData,
// });

// export const removePassengerItem = index => ({
//   type: REMOVE_FLIGHT_PASSENGER_ITEM,
//   payload: {index},
// });

// export const baggageAdded = value => ({
//   type: BAGGAGE_FLIGHT_DATA,
//   payload: value,
// });

// export const baggageCabinAdded = value => ({
//   type: BAGGAGE_CABIN_FLIGHT_DATA,
//   payload: value,
// });

// export const flightSelectSeat = seat => ({
//   type: FLIGHT_SELECT_SEAT,
//   payload: seat,
// });

// export const flightSelectedSeatReset = () => ({
//   type: FLIGHT_SELECT_SEAT_RESET,
// });

// export const resetAddSeatAmount = () => ({
//   type: RESET_ADD_SEAT_AMOUNT,
// });

// export const resetAddMealDescription = () => ({
//   type: RESET_ADD_MEAL_DISCRIPTION,
// });

// export const resetBaggageState = () => ({
//   type: RESET_BAGGAGE_STATE,
// });

// export const selectedPassanger = passengers => ({
//   type: SET_SELECTED_PASSENGERS,
//   payload: passengers,
// });

// // export const clearSelectedPassengers = () => ({
// //   type: CLEAR_SELECTED_PASSENGERS,
// // });

// export const resetFlightFareQuotesData = () => ({
//   type: RESET_FLIGHT_FAREQUOTES_DATA,
// });

// export const addSeatAmount = amount => ({
//   type: ADD_SEAT_AMOUNT,
//   payload: amount,
// });

// export const removeSeatAmount = (amount, index) => ({
//   type: REMOVE_SEAT_AMOUNT,
//   payload: {amount, index},
// });

// export const addMealPrice = (price, description) => ({
//   type: ADD_MEAL_PRICE,
//   payload: {
//     price,
//     description,
//   },
// });

// export const removeMealPrice = (price, index) => ({
//   type: REMOVE_MEAL_PRICE,
//   payload: {
//     price,
//     index,
//   },
// });

// export const addBaggagePrice = (price, Weight) => ({
//   type: ADD_BAGGAGE_PRICE,
//   payload: {price, Weight},
// });

// export const removeBaggagePrice = (price, index) => ({
//   type: REMOVE_BAGGAGE_PRICE,
//   payload: {price, index},
// });

// // hotel actions
// export const setHotelData = hotelData => ({
//   type: SET_HOTEL_DATA,
//   payload: hotelData,
// });

// export const setHotelInfo = hotelInfo => ({
//   type: SET_HOTEL_INFO,
//   payload: hotelInfo,
// });

// export const setHotelRoomDetails = hotelroomdetails => ({
//   type: SET_HOTEL_ROOM_DETAILS,
//   payload: hotelroomdetails,
// });

// export const setBlockRoomDetails=hotelBlock=>({
//     type:SET_BLOCK_ROOM_DETAILS,
//     payload:hotelBlock
//   });

//   export const setBookingDetails=hotelBook=>({
//     type:SET_BOOK_DETAILS,
//     payload:hotelBook
//   });

// export const getLocationLatLong = positions => ({
//   type: GEOLOCATION_POSITIONS,
//   payload: positions,
// });

// export const roomCounterIncrement = () => ({
//   type: ROOM_COUNTERS_INCREMENT,
// });

// export const roomCounterDecrement = () => ({
//   type: ROOM_COUNTERS_DECREMENT,
// });
import {
  COLOR_PICKER_SET,
  DATA_DETAILES_TYPE,
  TICKET_DATA_TYPE,
  TAB_ID_TYPE,
  SET_LOADING,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_TRACE_ID,
  UPDATE_TOTAL_PRICE,
  ADD_PASSENGER,
  REMOVE_PASSENGER,
  SELECT_BOARDING_POINT,
  SELECT_DROPPING_POINT,
  STORE_FLIGHT_DATA,
  CALENDAR_SHOW_DATE,
  FLIGHT_SEARCH_PAYLOAD,
  FLIGHT_FAREQUETES_RESPONSE,
  FLIGHT_TRAVELER_DETAILS,
  REMOVE_FLIGHT_PASSENGER_ITEM,
  BAGGAGE_FLIGHT_DATA,
  BAGGAGE_CABIN_FLIGHT_DATA,
  FLIGHT_SELECT_SEAT,
  SET_SELECTED_PASSENGERS,
  CLEAR_SELECTED_PASSENGERS,
  ADD_SEAT_AMOUNT,
  REMOVE_SEAT_AMOUNT,
  ADD_MEAL_PRICE,
  REMOVE_MEAL_PRICE,
  FLIGHT_SELECT_SEAT_RESET,
  RESET_FLIGHT_FAREQUOTES_DATA,
  RESET_ADD_SEAT_AMOUNT,
  RESET_ADD_MEAL_DISCRIPTION,
  ADD_BAGGAGE_PRICE,
  REMOVE_BAGGAGE_PRICE,
  SET_HOTEL_DATA,
  RESET_BAGGAGE_STATE,
  GEOLOCATION_POSITIONS,
  SET_HOTEL_INFO,
  SET_HOTEL_ROOM_DETAILS,
  ROOM_COUNTERS,
  ROOM_COUNTERS_DECREMENT,
  ROOM_COUNTERS_INCREMENT,
  SET_BLOCK_ROOM_DETAILS,
  SET_BOOK_DETAILS,
  SET_MOBILE_NUMBER,
  SET_OTP,
  SET_BUS_LIST
} from '../actiontypes/CommonTypes';

export const color_picker_set_action = data => dispatch => {
  dispatch({type: COLOR_PICKER_SET, colorrdata: data});
};

export const get_data_action = data => dispatch => {
  dispatch({type: DATA_DETAILES_TYPE, detailsStore: data});
};

export const tab_action = id => dispatch => {
  dispatch({type: TAB_ID_TYPE, tabid: id});
};

export const ticket_type_action = data => dispatch => {
  dispatch({type: TICKET_DATA_TYPE, TicketData: data});
};

export const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    token: token,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setMobileNumber = (mobileNumber) => ({
  type: SET_MOBILE_NUMBER,
  payload: mobileNumber,
});

export const setOtp = (otp) => ({
  type: SET_OTP,
  payload: otp,
});
export const setTraceId = traceId => ({
  type: SET_TRACE_ID,
  traceId: traceId,
});

export const updateSelectedSeats = selectedSeats => ({
  type: 'UPDATE_SELECTED_SEATS',
  payload: selectedSeats,
});

export const updateTotalPrice = totalPrice => ({
  type: UPDATE_TOTAL_PRICE,
  payload: totalPrice,
});

export const addPassenger = passenger => ({
  type: ADD_PASSENGER,
  payload: passenger,
});

export const removePassenger = index => ({
  type: REMOVE_PASSENGER,
  payload: {index},
});

export const selectBoardingPoint = point => ({
  type: SELECT_BOARDING_POINT,
  payload: point,
});

export const selectDroppingPoint = point => ({
  type: SELECT_DROPPING_POINT,
  payload: point,
});

export const storeFlightData = (flightTraceIdDetails, flightData) => ({
  type: STORE_FLIGHT_DATA,
  payload: {
    flightTraceIdDetails,
    flightData,
  },
});

export const getCalenderData = getCalendar => ({
  type: CALENDAR_SHOW_DATE,
  payload: getCalendar,
});

export const flightSearchPayload = getPayload => ({
  type: FLIGHT_SEARCH_PAYLOAD,
  payload: getPayload,
});

export const flightFareQutesData = getData => ({
  type: FLIGHT_FAREQUETES_RESPONSE,
  payload: getData,
});

export const flightTravellerDetails = inputeData => ({
  type: FLIGHT_TRAVELER_DETAILS,
  payload: inputeData,
});

export const removePassengerItem = index => ({
  type: REMOVE_FLIGHT_PASSENGER_ITEM,
  payload: {index},
});

export const baggageAdded = value => ({
  type: BAGGAGE_FLIGHT_DATA,
  payload: value,
});

export const baggageCabinAdded = value => ({
  type: BAGGAGE_CABIN_FLIGHT_DATA,
  payload: value,
});

export const flightSelectSeat = seat => ({
  type: FLIGHT_SELECT_SEAT,
  payload: seat,
});

export const flightSelectedSeatReset = () => ({
  type: FLIGHT_SELECT_SEAT_RESET,
});

export const resetAddSeatAmount = () => ({
  type: RESET_ADD_SEAT_AMOUNT,
});

export const resetAddMealDescription = () => ({
  type: RESET_ADD_MEAL_DISCRIPTION,
});

export const resetBaggageState = () => ({
  type: RESET_BAGGAGE_STATE,
});

export const selectedPassanger = passengers => ({
  type: SET_SELECTED_PASSENGERS,
  payload: passengers,
});

// export const clearSelectedPassengers = () => ({
//   type: CLEAR_SELECTED_PASSENGERS,
// });

export const resetFlightFareQuotesData = () => ({
  type: RESET_FLIGHT_FAREQUOTES_DATA,
});

export const addSeatAmount = amount => ({
  type: ADD_SEAT_AMOUNT,
  payload: amount,
});

export const removeSeatAmount = (amount, index) => ({
  type: REMOVE_SEAT_AMOUNT,
  payload: {amount, index},
});

export const addMealPrice = (price, description) => ({
  type: ADD_MEAL_PRICE,
  payload: {
    price,
    description,
  },
});

export const removeMealPrice = (price, index) => ({
  type: REMOVE_MEAL_PRICE,
  payload: {
    price,
    index,
  },
});

export const addBaggagePrice = (price, Weight) => ({
  type: ADD_BAGGAGE_PRICE,
  payload: {price, Weight},
});

export const removeBaggagePrice = (price, index) => ({
  type: REMOVE_BAGGAGE_PRICE,
  payload: {price, index},
});

// hotel actions
export const setHotelData = hotelData => ({
  type: SET_HOTEL_DATA,
  payload: hotelData,
});

export const setHotelInfo = hotelInfo => ({
  type: SET_HOTEL_INFO,
  payload: hotelInfo,
});

export const setHotelRoomDetails = hotelroomdetails => ({
  type: SET_HOTEL_ROOM_DETAILS,
  payload: hotelroomdetails,
});

export const setBlockRoomDetails=hotelBlock=>({
    type:SET_BLOCK_ROOM_DETAILS,
    payload:hotelBlock
  });

  export const setBookingDetails=hotelBook=>({
    type:SET_BOOK_DETAILS,
    payload:hotelBook
  });

export const getLocationLatLong = positions => ({
  type: GEOLOCATION_POSITIONS,
  payload: positions,
});

export const roomCounterIncrement = () => ({
  type: ROOM_COUNTERS_INCREMENT,
});

export const roomCounterDecrement = () => ({
  type: ROOM_COUNTERS_DECREMENT,
});

export const setBusList = busList => ({
  type:SET_BUS_LIST,
  payload: busList,
});