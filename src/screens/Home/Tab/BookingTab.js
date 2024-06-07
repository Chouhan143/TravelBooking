import React, {useEffect, useState, useMemo} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {BookingTabStyle} from '../../../styles';
import {Lottie, FlightTab, TrainTab, BusTab} from '../../../components';
import images from '../../../index';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {tab_action} from '../../../redux/action/CommonAction';
import {useTheme} from '@react-navigation/native';
import {RouteName} from '../../../routes';
import HotelTab from '../../../components/ListingComponents/HotelTab';

const BookingTab = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  const {tabid} = useSelector(state => state.DataReducer) || {};
  const [tabTrip, SetTripShow] = useState(2);
  const dispatch = useDispatch();
  const [tabShow, SettabShow] = useState();
  const {Colors} = useTheme();
  const BookingTabStyles = useMemo(() => BookingTabStyle(Colors), [Colors]);

  useEffect(() => {
    if (tabid) {
      SettabShow(tabid);
    } else {
      SettabShow('2');
    }
  }, [tabid]);

  const SetSelectcolor = tabid => {
    SettabShow(tabid);
    dispatch(tab_action(tabid));
  };

  return (
    <View style={BookingTabStyles.bgcolorset}>
      <View style={BookingTabStyles.minflexview}>
        <View style={BookingTabStyles.TabBoxTwo}>
          <TouchableOpacity
            onPress={() => SetSelectcolor('1')}
            style={
              tabShow == '1'
                ? BookingTabStyles.TabsettextActiveBoxTwo
                : BookingTabStyles.TabsettextBoxTwo
            }>
            <Lottie
              Lottiewidthstyle={BookingTabStyles.longimageOne}
              source={images.Bus_icon}
            />
            <Text
              onPress={() => SetSelectcolor('1')}
              style={
                tabShow == '1'
                  ? BookingTabStyles.TabsettextActiveTwo
                  : BookingTabStyles.TabsettextTwo
              }>
              {t('Bus')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SetSelectcolor('2')}
            style={
              tabShow == '2'
                ? BookingTabStyles.TabsettextActiveBoxTwo
                : BookingTabStyles.TabsettextBoxTwo
            }>
            <Lottie
              Lottiewidthstyle={BookingTabStyles.longimageOne}
              source={images.Flight_icon}
            />
            <Text
              onPress={() => SetSelectcolor('2')}
              style={
                tabShow == '2'
                  ? BookingTabStyles.TabsettextActiveTwo
                  : BookingTabStyles.TabsettextTwo
              }>
              {t('Flights')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => SetSelectcolor('3')}
            style={
              tabShow == '3'
                ? BookingTabStyles.TabsettextActiveBoxTwo
                : BookingTabStyles.TabsettextBoxTwo
            }>
            <Lottie
              Lottiewidthstyle={BookingTabStyles.longimageOne}
              source={require('../../../images/LottieAnimation/hotel.json')}
            />
            <Text
              onPress={() => SetSelectcolor('3')}
              style={
                tabShow == '3'
                  ? BookingTabStyles.TabsettextActiveTwo
                  : BookingTabStyles.TabsettextTwo
              }>
              {t('Hotel')}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={BookingTabStyles.contentContainerStyle}>
          <View>
            <View style={BookingTabStyles.FlightMinHeightStyle}>
              <View style={BookingTabStyles.MinHeightStyleChild}>
                {tabShow == '1' || tabShow == '3' ? null : (
                  <View style={BookingTabStyles.FlightTabBoxTwo}>
                    <TouchableOpacity
                      onPress={() => SetTripShow('1')}
                      style={
                        tabTrip == '1'
                          ? BookingTabStyles.FlightTabsettextActiveBoxTwo
                          : BookingTabStyles.FlightTabsettextBoxTwo
                      }>
                      <Text
                        onPress={() => SetTripShow('1')}
                        style={
                          tabTrip == '1'
                            ? BookingTabStyles.FlightTabsettextActiveTwo
                            : BookingTabStyles.FlightTabsettextTwo
                        }>
                        {t('One_Way')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => SetTripShow('2')}
                      style={
                        tabTrip == '2'
                          ? BookingTabStyles.FlightTabsettextActiveBoxTwo
                          : BookingTabStyles.FlightTabsettextBoxTwo
                      }>
                      <Text
                        onPress={() => SetTripShow('2')}
                        style={
                          tabTrip == '2'
                            ? BookingTabStyles.FlightTabsettextActiveTwo
                            : BookingTabStyles.FlightTabsettextTwo
                        }>
                        {t('Round_Trip')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View>
                  {tabShow == '1' ? (
                    <BusTab
                      onPress={() =>
                        navigation.navigate(RouteName.BUS_SEAT_SCREEN)
                      }
                    />
                  ) : tabShow == '2' ? (
                    <FlightTab
                      onPress={() =>
                        navigation.navigate(RouteName.FLIGHT_LIST_SCREEN)
                      }
                      tabTrip={tabTrip}
                    />
                  ) : (
                    tabShow == '3' && (
                      <HotelTab
                      // onPress={() =>
                      //   navigation.navigate(RouteName.TRAIN_LIST_SCREEN)
                      // }
                      />
                    )
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BookingTab;
