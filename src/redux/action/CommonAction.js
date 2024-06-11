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
