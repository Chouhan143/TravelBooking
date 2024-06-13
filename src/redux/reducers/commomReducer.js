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
  CLEAR_SELECTED_PASSENGERS,
  ADD_SEAT_AMOUNT,
  REMOVE_SEAT_AMOUNT,
  ADD_MEAL_PRICE,
} from '../actiontypes/CommonTypes';

const initialState = {
  colorrdata: [],
  detailsStore: [],
  TicketData: [],
  Detailedata: [],
  tabid: '',
  isAuthenticated: false,
  token: null,
  traceId: null,
  selectedSeats: [],
  totalPrice: null,
  passengers: [],
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
        isAuthenticated: true,
        token: action.token,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };

    case SET_TRACE_ID:
      return {
        ...state,
        traceId: action.traceId,
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
        flightFareQutesData: action.payload,
      };

    case FLIGHT_TRAVELER_DETAILS:
      return {
        ...state,
        fightTraveller: [...state.fightTraveller, action.payload],
      };

    // case REMOVE_FLIGHT_PASSENGER_ITEM:
    //   const {id, passengerType} = action.payload;

    //   return {
    //     ...state,
    //     fightTraveller: state.fightTraveller.filter(
    //       item => item.id !== id || item.passengerType !== passengerType,
    //     ),
    //   };

    // case REMOVE_FLIGHT_PASSENGER_ITEM:
    //   const {index1} = action.payload;
    //   return {
    //     ...state,
    //     fightTraveller: state.fightTraveller.filter((_, idx) => idx !== index1),
    //   };

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

    // case SET_SELECTED_PASSENGERS:
    //   // Check if the passenger ID already exists in the state
    //   const passengerExists = state.selectedPassengers.some(
    //     passenger => passenger.id === action.payload.id,
    //   );
    //   if (passengerExists) {
    //     // If the passenger ID already exists, remove it (deselect)
    //     return {
    //       ...state,
    //       selectedPassengers: state.selectedPassengers.filter(
    //         passenger => passenger.id !== action.payload.id,
    //       ),
    //     };
    //   } else {
    //     // If the passenger ID doesn't exist, add it (select)
    //     return {
    //       ...state,
    //       selectedPassengers: [...state.selectedPassengers, action.payload],
    //     };
    //   }

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
      };

    case REMOVE_SEAT_AMOUNT:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          Fare: {
            ...state.flightFareQutesData.Fare,
            PublishedFare:
              state.flightFareQutesData.Fare.PublishedFare - action.payload,
          },
        },
      };

    case ADD_MEAL_PRICE:
      return {
        ...state,
        flightFareQutesData: {
          ...state.flightFareQutesData,
          FareBreakdown: [
            ...state.flightFareQutesData.FareBreakdown,
            action.payload,
          ],
        },
      };

    // case REMOVE_MEAL_PRICE:
    //   const { index } = action.payload;
    //   return {
    //     ...state,
    //     flightFareQutesData: {
    //       ...state.flightFareQutesData,
    //       FareBreakdown: state.flightFareQutesData.FareBreakdown.filter(
    //         (_, idx) => idx !== index
    //       ),
    //     },
    //   };

    default: {
      return state;
    }
  }
}
