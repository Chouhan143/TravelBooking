const BASE_URL = 'https://sajyatra.sajpe.in/admin/api';
const Auth_Base_Url='https://app.sajpe.in/api/v1/user';


const LOGIN_ENDPOINT = `${Auth_Base_Url}/login`;
const REGISTER_ENDPOINT = `${Auth_Base_Url}/login`;
const OTP_VERYFY_ENDPOINT = `${Auth_Base_Url}/send_otp`;

// const RESEND_OTP = `${BASE_URL}/resend-otp`;
const BUS_LIST = `${BASE_URL}/bus_list`;
const UPDATE_NUMBER = `${BASE_URL}/update_number`;
const BUS_SEARCH = `${BASE_URL}/searchBus`;
const BUS_ADDSEAT_LAYOUT = `${BASE_URL}/AddseatLayout`;
const ADD_BOARDING_DROPING = `${BASE_URL}/addboarding`;
const BLOKING_SEAT = `${BASE_URL}/seat-block`;
const OFFERS_DATA = `${BASE_URL}/offer`;
// Flight Module api url here
const FLIGHT_CITY_LIST = `${BASE_URL}/flight-list`;
const Flight_SEARCH = `${BASE_URL}/flight-search`;
const FLIGHT_GET_CALENDAR = `${BASE_URL}/get-calender`;
const FLIGHT_FARE_QUOTE = `${BASE_URL}/farequote`;
const FLIGHT_SSR_MEAL = `${BASE_URL}/ssr`;
const FLIGHT_SEAT_MAP = `${BASE_URL}/seatmap`;
const FLIGHT_BOOKLLC = `${BASE_URL}/bookllc`;
const HOTEL_SEARCH = `${BASE_URL}/search-hotel`;
const HOTEL_INFO = `${BASE_URL}/hotel-info`;
const HOTEL_ROOM_DETAILS = `${BASE_URL}/hotel-room`;
const HOTEL_BLOCK=`${BASE_URL}/hotel-block`;
const HOTEL_BOOK=`${BASE_URL}/hotel-book`;
const BOOKING_SEAT=`${BASE_URL}/seat-book`
export {
  BASE_URL,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  OTP_VERYFY_ENDPOINT,
  BUS_LIST,
  UPDATE_NUMBER,
  BUS_SEARCH,
  BUS_ADDSEAT_LAYOUT,
  ADD_BOARDING_DROPING,
  BLOKING_SEAT,
  OFFERS_DATA,
  FLIGHT_CITY_LIST,
  Flight_SEARCH,
  FLIGHT_GET_CALENDAR,
  FLIGHT_FARE_QUOTE,
  FLIGHT_SSR_MEAL,
  FLIGHT_SEAT_MAP,
  FLIGHT_BOOKLLC,
  HOTEL_SEARCH,
  HOTEL_INFO,
  HOTEL_BLOCK,
  HOTEL_ROOM_DETAILS,
  // RESEND_OTP,
  HOTEL_BOOK,
  BOOKING_SEAT
};
