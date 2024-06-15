import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {Colors} from '../utils';

const Stack = createNativeStackNavigator();

import {RouteName, SideNavigator} from '../routes';

import {
  LoginScreen,
  RegisterScreen,
  OtpVeryfiveScreen,
  SplashScreen,
  RegistrationSuccessful,
  Swiperscreen,
  TranslationScreen,
  ForgotPassword,
  BusListScreen,
  BusSeatScreen,
  PaymentScreen,
  PaymentSuccessFully,
  CreditCardScreen,
  FlightListScreen,
  TicketScreen,
  BusSelectScreen,
  BoardingDroping,
  PassengerInformation,
} from '../screens';
import ReviewBooking from '../screens/BusScreen/ReviewBooking';
import FlightDetails from '../screens/FlightListScreen/FlightDetails';
import FlightTravellerDetails from '../screens/FlightListScreen/FlightTravellerDetails';
import FlightMeals from '../screens/FlightListScreen/FlightSegments';
import FlightSegments from '../screens/FlightListScreen/FlightSegments';
import FlightReviewDetails from '../screens/FlightListScreen/FlightReviewDetails';
import HotelListScreen from '../screens/HotelScreen/HotelListScreen';

const RootNavigator = props => {
  // const navigation = useNavigation();
  const {colorrdata} = useSelector(state => state.commomReducer) || {};

  const isAuthenticated = useSelector(
    state => state.commomReducer.isAuthenticated,
  );

  const token = useSelector(state => state.commomReducer.token);

  console.log('>>>', isAuthenticated);
  console.log('>>>', token);

  const MyTheme = {
    ...DefaultTheme,
    Colors: Colors,
  };
  const [colorValue, setColorValue] = useState(MyTheme);

  useEffect(() => {
    if (Colors.length != 0 && colorrdata != '') {
      Colors.theme_background = colorrdata;
      const MyThemeNew = {
        ...DefaultTheme,
        Colors: Colors,
      };
      setColorValue(MyThemeNew);
    }
  }, [colorrdata, Colors]);

  return (
    <NavigationContainer theme={colorValue}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name={RouteName.SIDE_NAVIGATOR}
              component={SideNavigator}
            />

            <Stack.Screen
              name={RouteName.BUS_LIST_SCREEN}
              component={BusListScreen}
            />
            <Stack.Screen
              name={RouteName.BUS_SEAT_SCREEN}
              component={BusSeatScreen}
              options={{
                headerShown: true,
                title: ' Select Seat',
              }}
            />

            <Stack.Screen
              name={RouteName.BUS_SELECT_SCREEN}
              component={BusSelectScreen}
            />
            <Stack.Screen
              name={RouteName.BORDING_DROPING_POINT}
              component={BoardingDroping}
              options={{
                headerShown: true,
                title: 'Select boarding & droping points',
              }}
            />

            <Stack.Screen
              name={RouteName.PASSANGER_INFORMATION}
              component={PassengerInformation}
              options={{
                headerShown: true,
                title: 'Passanger Information',
              }}
            />

            <Stack.Screen
              name={RouteName.REVIEW_BOOKING}
              component={ReviewBooking}
              options={{
                headerShown: true,
                title: 'Review Booking',
              }}
            />

            <Stack.Screen
              name={RouteName.PAYMENT_SCREEN}
              component={PaymentScreen}
            />
            <Stack.Screen
              name={RouteName.PAYMENT_SUCCESSFULLY}
              component={PaymentSuccessFully}
            />

            <Stack.Screen
              name={RouteName.FLIGHT_LIST_SCREEN}
              component={FlightListScreen}
            />

            <Stack.Screen
              name={RouteName.FLIGHT_DETAILS}
              component={FlightDetails}
              options={{
                headerShown: true,
                title: 'Flight Details',
              }}
            />
            <Stack.Screen
              name={RouteName.FLIGHT_TRAVELER_DETAILS}
              component={FlightTravellerDetails}
              options={{
                headerShown: true,
                title: 'Add Traveller',
              }}
            />
            <Stack.Screen
              name={RouteName.FLIGHT_MEALS}
              component={FlightSegments}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name={RouteName.FLIGHT_REVIEW_DETAILS}
              component={FlightReviewDetails}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name={RouteName.TICKET_SCREEN}
              component={TicketScreen}
            />
            <Stack.Screen
              name={RouteName.HOTEL_LIST_SCREEN}
              component={HotelListScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
            <Stack.Screen
              name={RouteName.LOGIN_SCREEN}
              component={LoginScreen}
            />
            <Stack.Screen
              name={RouteName.REGISTER_SCREEN}
              component={RegisterScreen}
            />
            <Stack.Screen
              name={RouteName.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
            <Stack.Screen
              name={RouteName.REGIATRAION_SUCCESSFULL}
              component={RegistrationSuccessful}
            />
            <Stack.Screen
              name={RouteName.OTP_VERYFY_SCREEN}
              component={OtpVeryfiveScreen}
            />
            <Stack.Screen
              name={RouteName.SWIPER_SCREEN}
              component={Swiperscreen}
            />
            <Stack.Screen
              name={RouteName.SELECT_LANGUAGE}
              component={TranslationScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
