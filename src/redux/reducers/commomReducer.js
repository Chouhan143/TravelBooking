import {
  COLOR_PICKER_SET,
  DATA_DETAILES_TYPE,
  TICKET_DATA_TYPE,
  DATA_DETAILES,
  TAB_ID_TYPE,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_TRACE_ID,
  UPDATE_SELECTED_SEATS,
  UPDATE_TOTAL_PRICE,
  ADD_PASSENGER,
  REMOVE_PASSENGER,
  SELECT_BOARDING_POINT,
  SELECT_DROPPING_POINT,
  STORE_FLIGHT_DATA,
  CALENDAR_SHOW_DATE,
  FLIGHT_PASSENGER_ADD,
  FLIGHT_SEARCH_PAYLOAD,
  FLIGHT_FAREQUETES_RESPONSE,
  FLIGHT_TRAVELER_DETAILS,
  REMOVE_FLIGHT_PASSENGER_ITEM,
  BAGGAGE_FLIGHT_DATA,
  BAGGAGE_CABIN_FLIGHT_DATA,
  FLIGHT_SELECT_SEAT,
  SET_SELECTED_PASSENGERS,
  ADD_SEAT_AMOUNT,
  REMOVE_SEAT_AMOUNT,
  ADD_MEAL_PRICE,
  FLIGHT_SELECT_SEAT_RESET,
  RESET_FLIGHT_FAREQUOTES_DATA,
  REMOVE_MEAL_PRICE,
  RESET_ADD_SEAT_AMOUNT,
  RESET_ADD_MEAL_AMOUNT,
  RESET_ADD_MEAL_DISCRIPTION,
  ADD_BAGGAGE_PRICE,
  REMOVE_BAGGAGE_PRICE,
  RESET_BAGGAGE_STATE,
  SET_HOTEL_DATA,
  GEOLOCATION_POSITIONS,
  SET_HOTEL_INFO,
  SET_HOTEL_ROOM_DETAILS,
  ROOM_COUNTERS,
  ROOM_COUNTERS_INCREMENT,
  ROOM_COUNTERS_DECREMENT,
  SET_HOTEL_RESULT,
  SET_BLOCK_ROOM_DETAILS,
  SET_BOOK_DETAILS,
  SET_MOBILE_NUMBER,
  SET_OTP,
  SET_BUS_LIST,
  SET_TOTAL_HOTEL_PRICE,
  SET_BUS_DATA,
  SET_RESULT_DATA,
  SET_BUS_PAYLOAD,
  SET_BOOKING_STATUS,
  SET_MAIN_PASSENGER,
  ADD_GUEST,
  REMOVE_GUEST,
  CLEAR_GUESTS,
  FLIGHT_BOOKING_DATA,
  BUS_TRANSACTION_NUMBER,
  BUS_UPDATE_DATA
} from '../actiontypes/CommonTypes';

const initialState = {
  colorrdata: [],
  detailsStore: [],
  TicketData: [],
  Detailedata: [],
  tabid: '',
  isAuthenticated: false,
  token: null,
  logindata:{},
  selectedSeats: [],
  totalPrice: null,
  passengers: [],
  guests:[],
  selectedGuest: [],
  selectedBoardingPoint: null,
  selectedDroppingPoint: null,
  flightTraceIdDetails: {},
  flightData: [],
  getCalenderData: [],
  FPassenger: [],
  FlightSearchPayload: [],
  flightFareQutesData: [],
  fightTraveller: [],
  flightBaggageData: [],
  flightBaggageCabinData: [],
  flightSeatSelectData: [],
  selectedPassengers: [],
  flightFareQutesData: {
    Fare: {
      PublishedFare: 0,
    },
  },
  mealDescriptions: [],
  selectedSeatPriceTotal: [],
  initialPublishedFare: 0,
  selectedBaggage: [],
  hotelData: [],
  busPaymentUpdateData:{},
  positionLatLong: [],
  hotelInfo: [],
  hotelRoomDetails: [],
  hotelRoomCounter: 1,
  hotelBlock:{},
  hotelBook:{},
  flightBook:{},
  mobileNumber: '',
  otp: '',
  busList:{},
  busData:[],
  ResultData:{},
  busPayload:{},
  busTransactionNum:'',
  busBookingStatus:{},
  mainPassenger: {
    email: '',
    phoneNumber: '',
    name: '',
  },
};

export default function commomReducer(state = initialState, action) {
  switch (action.type) {
    case COLOR_PICKER_SET:
      return {
        ...state,
        colorrdata: action.colorrdata,
      };
    case DATA_DETAILES_TYPE:
      return {
        ...state,
        detailsStore: action.detailsStore,
      };
      case SET_MAIN_PASSENGER:
      return {
        ...state,
        mainPassenger: action.mainPassenger,
      };
    case TICKET_DATA_TYPE:
      return {
        ...state,
        TicketData: action.TicketData,
      };
    case DATA_DETAILES:
      return {
        ...state,
        Detailedata: action.data,
      };

    case TAB_ID_TYPE:
      return {
        ...state,
        tabid: action.tabid,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        logindata: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
      case SET_MOBILE_NUMBER:
        return {
          ...state,
          mobileNumber: action.payload,
        };
      case SET_OTP:
        return {
          ...state,
          otp: action.payload,
        };
    // case SET_TRACE_ID:
    //   return {
    //     ...state,
    //     traceId: action.traceId,
    //   };
      case SET_RESULT_DATA:
      return {
        ...state,
        ResultData: action.ResultData,
      };
    case UPDATE_SELECTED_SEATS:
      return {
        ...state,
        selectedSeats: action.payload,
      };
    case UPDATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };
      case SET_TOTAL_HOTEL_PRICE:
        return {
          ...state,
          totalHotelPrice: action.payload,
        };
    case ADD_PASSENGER:
      return {
        ...state,
        passengers: [...state.passengers, action.payload],
      };

    case REMOVE_PASSENGER:
      const {index} = action.payload;
      return {
        ...state,
        passengers: state.passengers.filter((passenger, idx) => idx !== index),
      };
      case ADD_GUEST:
      return {
        ...state,
        guests: [...state.guests, action.payload],
      };
    case CLEAR_GUESTS:
      return {
        ...state,
        guests: [],
      };
     

      case REMOVE_GUEST: {
        const { index } = action.payload; // Match the name used in the action creator
        return {
          ...state,
          guests: state.guests.filter((guest, idx) => idx !== index),
        };
      }
      
    case SELECT_BOARDING_POINT:
      return {
        ...state,
        selectedBoardingPoint: action.payload,
      };
    case SELECT_DROPPING_POINT:
      return {
        ...state,
        selectedDroppingPoint: action.payload,
      };

    case STORE_FLIGHT_DATA:
      return {
        ...state,
        flightTraceIdDetails: action.payload.flightTraceIdDetails,
        flightData: action.payload.flightData,
        // storeFlightData: action.payload,
      };

    case CALENDAR_SHOW_DATE:
      return {
        ...state,
        getCalenderData: action.payload,
      };

    case FLIGHT_SEARCH_PAYLOAD:
      return {
        ...state,
        FlightSearchPayload: action.payload,
      };

    case FLIGHT_FAREQUETES_RESPONSE:
      return {
        ...state,
        flightFareQutesData: {
          ...action.payload,
          // Store the initial fare value when the response is received
          Fare: {
            ...action.payload.Fare,
            PublishedFare: action.payload.Fare.PublishedFare,
          },
        },
        initialPublishedFare: action.payload.Fare.PublishedFare, // Set initial fare
      };

    case RESET_FLIGHT_FAREQUOTES_DATA:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare: state.initialPublishedFare, // Reset to initial fare
          },
        },
        selectedSeatPriceTotal: [], // Optionally reset selected seat prices
      };

    case FLIGHT_TRAVELER_DETAILS:
      return {
        ...state,
        fightTraveller: [...state.fightTraveller, action.payload],
      };

    case REMOVE_FLIGHT_PASSENGER_ITEM:
      return {
        ...state,
        fightTraveller: state.fightTraveller.filter(
          (_, idx) => idx !== action.payload.index,
        ),
      };

    case BAGGAGE_FLIGHT_DATA:
      return {
        ...state,
        flightBaggageData: action.payload,
      };
    case BAGGAGE_CABIN_FLIGHT_DATA:
      return {
        ...state,
        flightBaggageCabinData: action.payload,
      };

    case FLIGHT_SELECT_SEAT_RESET:
      return {
        ...state,
        flightSeatSelectData: [],
      };

    case RESET_ADD_SEAT_AMOUNT:
      return {
        ...state,
        selectedSeatPriceTotal: [],
      };

    case RESET_ADD_MEAL_DISCRIPTION:
      return {
        ...state,
        mealDescriptions: [],
      };
    case RESET_BAGGAGE_STATE:
      return {
        ...state,
        selectedBaggage: [],
      };

    case FLIGHT_SELECT_SEAT:
      const seat = action.payload;
      const isSeatSelected = state.flightSeatSelectData.some(
        selectedSeat => selectedSeat.SeatNumber === seat.SeatNumber,
      );
      return {
        ...state,
        flightSeatSelectData: isSeatSelected
          ? state.flightSeatSelectData.filter(
              selectedSeat => selectedSeat.SeatNumber !== seat.SeatNumber,
            )
          : [...state.flightSeatSelectData, seat],
      };

    case SET_SELECTED_PASSENGERS:
      return {
        ...state,
        selectedPassengers: [...state.selectedPassengers, action.payload],
      };
     
  
    case ADD_SEAT_AMOUNT:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare:
              state.flightFareQutesData.Fare.PublishedFare + action.payload,
          },
        },
        selectedSeatPriceTotal: [
          ...state.selectedSeatPriceTotal,
          {
            selectedSeatPriceSum: action.payload,
          },
        ],
      };

    case REMOVE_SEAT_AMOUNT:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare:
              state.flightFareQutesData.Fare.PublishedFare -
              action.payload.amount,
          },
        },
        selectedSeatPriceTotal: state.selectedSeatPriceTotal.filter(
          (seat, idx) => idx !== action.payload.index,
        ),
      };

    case ADD_MEAL_PRICE:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare:
              state.flightFareQutesData.Fare.PublishedFare +
              action.payload.price,
          },
        },
        mealDescriptions: [
          ...state.mealDescriptions,
          {
            description: action.payload.description,
            price: action.payload.price,
          },
        ],
      };

    case REMOVE_MEAL_PRICE:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare:
              state.flightFareQutesData.Fare.PublishedFare -
              action.payload.price,
          },
        },
        mealDescriptions: state.mealDescriptions.filter(
          (meal, idx) => idx !== action.payload.index,
        ),
      };
    case ADD_BAGGAGE_PRICE:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare:
              state.flightFareQutesData.Fare.PublishedFare +
              action.payload.price,
          },
        },
        selectedBaggage: [
          ...state.selectedBaggage,
          {
            selectedBaggageWeight: action.payload.Weight,
            selectedBaggagePrice: action.payload.price,
          },
        ],
      };

    case REMOVE_BAGGAGE_PRICE:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare:
              state.flightFareQutesData.Fare.PublishedFare -
              action.payload.price,
          },
        },
        selectedBaggage: state.selectedBaggage.filter(
          (baggage, idx) => idx !== action.payload.index,
        ),
      };

    //  hotel reducers
    case SET_HOTEL_DATA:
      return {
        ...state,
        hotelData: action.payload,
      };
      case SET_BUS_DATA:
        return {
          ...state,
          busData: action.payload,
        };
  
    case SET_HOTEL_INFO:
      return {
        ...state,
        hotelInfo: action.payload,
      };
      case SET_BOOK_DETAILS:
        return {
          ...state,
          hotelBook: action.payload,
        };
        case FLIGHT_BOOKING_DATA:
          return {
            ...state,
            flightBook: action.payload,
          };
        
    case SET_HOTEL_ROOM_DETAILS:
      return {
        ...state,
        hotelRoomDetails: action.payload,
      };

      case SET_BLOCK_ROOM_DETAILS:
      return {
        ...state,
        hotelBlock: action.payload,
      };
    

    case GEOLOCATION_POSITIONS:
      return {
        ...state,
        positionLatLong: action.payload,
      };

    case ROOM_COUNTERS_INCREMENT:
      return {
        ...state,
        hotelRoomCounter: state.hotelRoomCounter + 1,
      };

    case ROOM_COUNTERS_DECREMENT:
      return {
        ...state,
        hotelRoomCounter: Math.max(state.hotelRoomCounter - 1, 1), // Ensure counter doesn't go below 0
      };

      // bus list data 

      case SET_BUS_LIST:
        return {
          ...state,
          busList: action.payload,
        };
          case SET_BOOKING_STATUS:
            return {
              ...state,
              busBookingStatus: action.payload,
            };
            case BUS_TRANSACTION_NUMBER:
            return {
              ...state,
              busTransactionNum: action.payload,
            };
        case SET_BUS_PAYLOAD:
          return {
            ...state,
            busPayload: action.busPayload,
          };
          case BUS_UPDATE_DATA:
            return {
              ...state,
              busPaymentUpdateData: action.payload,
            };
    default: {
      return state;
    }
  }
}