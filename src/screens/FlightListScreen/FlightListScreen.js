import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { FlightsListScreenStyle } from '../../styles';
import { RouteName } from '../../routes';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react-native';
import {
  Button,
  RBSheet,
  RechargedataFunction,
  FlightMobileSelect,
  VectorIcon,
} from '../../components';
import { Colors, SF, SH, SW } from '../../utils';
import { useTranslation } from 'react-i18next';
import images from '../../index';
import { ScrollView } from 'react-native-virtualized-view';
import useFlightSearch from '../../hooks/useFlightSearch';
import { FLIGHT_FARE_QUOTE, FLIGHT_BOOKLLC } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { flightFareQutesData, selectedPassanger } from '../../redux/action';
import FormatedDate from '../../components/commonComponents/FormatedDate';
import FormatrdTime from '../../components/commonComponents/FormatrdTime';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FlightListScreen = props => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [checked, setChecked] = useState('first');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [resultIndexAsync, setResultIndexAsync] = useState(null);
  const { FsearchData, loading } = useFlightSearch();
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [flightBotomData, setFlightBottomData] = useState([]);

  const { searchParams } = route.params; // Get searchParams from navigation
  // coming store data from redux

  const FareQuoteData = useSelector(state => state.commomReducer.flightFareQutesData);
  console.log('Stored FareQuoteData', FareQuoteData);
  const BaseFare = FareQuoteData.Fare.BaseFare;
  const Tax = FareQuoteData.Fare.Tax;
  const YQTax = FareQuoteData.Fare.YQTax;
  console.log(`BaseFare ${BaseFare} Tax ${Tax}  YQTax ${YQTax}`);

  const { Detailedata } = useSelector(state => state.commomReducer) || {
    Detailedata,
  };

  const { flightTraceIdDetails, flightData, getCalenderData } = useSelector(
    state => state.commomReducer,
  );

  const { SrdvType, TraceId } = flightTraceIdDetails;

  let SrdvIndex = flightTraceIdDetails.Results;
  let SrdvIndexFlatten = SrdvIndex?.flat() ?? [];
  // console.log('SrdvIndexFlatten', SrdvIndexFlatten);
  const SrdvIndexMap = SrdvIndexFlatten.map(
    elem => elem?.FareDataMultiple ?? [],
  ).flat();
  const SrdvIndexLoop = SrdvIndexMap.map(el3 => el3.SrdvIndex);
  const SrdvIndexValue = SrdvIndexLoop[0];

  // console.log('SrdvIndexValue', SrdvIndexValue[0]);

  const ResultIndex = SrdvIndexMap.map(el3 => el3.ResultIndex);
  const ResultIndexValue = ResultIndex[0];

  // Sagmented Data is here
  const flattenedData = flightData?.flat() ?? []; // Flatten the nested array
  const segment = flattenedData.map(el => {
    const segmentItems = el?.Segments ?? [];
    return segmentItems.flat();
  });
  const segmentUpdate = segment.flat();

  // FareDataMultiple Data is here  formatted
  const FareData = flattenedData.map(fare => {
    const FareDataDetails = fare?.FareDataMultiple ?? [];
    return FareDataDetails.flat();
  });

  // console.log('FareData', FareData);

  const finalFareData = FareData.flat();

  const fareSagments = finalFareData.map(offer => {
    return {
      FlightFare: offer?.Fare?.PublishedFare ?? 0,
      OfferPrice: offer?.Fare?.OfferedFare ?? 0,
    }; // yaha se Published fare and Offer fare niklega
  });

  // No of seats left
  const SeatFlatten = FareData.flat();
  const LeftSeat = SeatFlatten.map(fare => {
    const SeatLeft = fare?.FareSegments ?? [];
    return SeatLeft;
  });

  const SeatFlaten2 = LeftSeat.flat();
  const NoOfSeatAvailable = SeatFlaten2.map(Avail => {
    return { SeatAvail: Avail?.NoOfSeatAvailable ?? 0 };
  });

  // final flatlist data combined here
  const combinedData = segmentUpdate.map((segment, index) => ({
    ...segment,
    ...fareSagments[index],
    ...NoOfSeatAvailable[index],
  }));

  // const headingDate = flightTraceIdDetails.

  const MobileSelectData = [
    {
      id: 1,
      img: images.HomeViIcon,
      Cityfrom: flightTraceIdDetails.Destination,
      Cityto: flightTraceIdDetails.Origin,
    },
  ];

  const handleDateSearch = async (date, index) => {
    const dateObject = new Date(date);
    // Set the time to midnight (00:00:00)
    dateObject.setHours(0);
    dateObject.setMinutes(0);
    dateObject.setSeconds(0);

    // Format the Date object to the desired format: YYYY-MM-DDTHH:mm:ss
    const formattedDate = `${dateObject.getFullYear()}-${(
      dateObject.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${dateObject
        .getDate()
        .toString()
        .padStart(2, '0')}T${dateObject
          .getHours()
          .toString()
          .padStart(2, '0')}:${dateObject
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${dateObject
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;

    console.log(formattedDate);

    const newPayload = {
      ...searchParams,
      Segments: searchParams.Segments.map(segment => ({
        ...segment,
        PreferredDepartureTime: formattedDate,
        PreferredArrivalTime: formattedDate,
      })),
    };

    setSelectedItemIndex(index);
    await FsearchData(newPayload);
  };

  useEffect(() => {
    if (selectedItemData) {
      refRBSheet.current.open();
    }
  }, [selectedItemData]);

  // FareQuete api here

  const getFareQuteData = async () => {
    try {
      const payload = {
        SrdvType: SrdvType,
        SrdvIndex: SrdvIndexValue,
        TraceId: TraceId,
        ResultIndex: ResultIndexValue,
      };
      console.log('fare quote payload', payload)
      const res = await axios.post(FLIGHT_FARE_QUOTE, payload);
      console.log('FLIGHT_FARE_QUOTE', res.data);
     
      dispatch(flightFareQutesData(res.data.Results));

      setFlightBottomData(res.data.Results);

      // console.log('res fare qute', res.data.Results);
    } catch (error) {
      console.log('error fare qute', error.response);
    }
  };

  useEffect(() => {
    getFareQuteData();
   
  }, []);

  // console.log('flightBotomData', flightBotomData);

  const Segments = flightBotomData?.Segments ?? [];

  const isOneWay = flightBotomData.SingleSlotBooking;

  const SegmentsFlatten = Segments.flat();

  // console.log('SegmentsFlatten', SegmentsFlatten);

  //  Departure date
  const date = SegmentsFlatten[0]?.DepTime;

  // Flight where to where
  const origin = SegmentsFlatten[0]?.Origin?.CityName;
  const destination =
    SegmentsFlatten[SegmentsFlatten.length - 1]?.Destination?.CityName;

  // ground time

  const calculateDuration = duration => {
    const hour = Math.floor(duration / 60);
    const minute = Math.floor(duration % 60);
    return `${hour}h${minute}m`;
  };

  const prepareData = segments => {
    return segments.map((item, index) => {
      const groundTime = item.GroundTime;
      const finalGroundDuration = calculateDuration(groundTime);
      return {
        ...item,
        groundDuration: finalGroundDuration,
      };
    });
  };

  const preparedData = prepareData(SegmentsFlatten);

  // console.log('preparedData', preparedData);

  const renderSeparator = ({ leadingItem }) => {
    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text>Change of plane. Ground time: {leadingItem.groundDuration}</Text>
      </View>
    );
  };

  return (
    <View style={[FlightsListScreenStyle.minstyleviewphotograpgyTow]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white_text_color}
      />
      <View>
        <View>
          <FlatList
            data={MobileSelectData}
            renderItem={({ item, index }) => (
              <FlightMobileSelect
                item={item}
                index={index}
                onPress={() => navigation.navigate("Root")}
              />
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={FlightsListScreenStyle.TabBoxMain}>
          <View
            style={{
              backgroundColor: Colors.theme_background,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderLeftWidth: SW(0.5),
              borderLeftColor: Colors.gray_text_color,
              borderRightWidth: SW(0.5),
              borderRightColor: Colors.gray_text_color,
              padding: SW(8),
            }}>
            <Text
              style={{
                color: Colors.white_text_color,
                fontSize: SF(14),
                fontFamily: 'Poppins-Bold',
                paddingVertical: SH(12),
                transform: [{ rotate: '270deg' }],
              }}>
              {t('Date')}
            </Text>
          </View>

          <View>
            <FlatList
              data={getCalenderData}
              horizontal
              renderItem={({ item, index }) => {
                const formatedDate = new Date(item.DepartureDate);
                const monthlyDate = formatedDate.toDateString();
                return (
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() =>
                        handleDateSearch(item.DepartureDate, index)
                      }
                      style={[
                        FlightsListScreenStyle.TabsettextBoxTwo,
                        index === selectedItemIndex && {
                          borderBottomWidth: 2,
                          borderBottomColor: Colors.theme_background,
                        },
                      ]}>
                      <Text
                        style={{
                          color: 'black',
                          marginTop: SH(7),
                        }}>
                        {monthlyDate}
                      </Text>
                      <Text
                        style={
                          // FlightsListScreenStyle.TabsettextActiveTwo
                          {
                            color: Colors.black_text_color,
                            textTransform: 'uppercase',
                            fontSize: SF(14),
                            textAlign: 'center',
                            fontFamily: 'Poppins-Bold',
                          }
                        }>
                        <VectorIcon
                          icon="FontAwesome"
                          name="rupee"
                          style={
                            // ? FlightsListScreenStyle.TabIconActive
                            {
                              fontSize: SF(14),
                              color: 'black',
                            }
                          }
                        />
                        {item.BaseFare}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.index}
            />
          </View>
        </View>
        <View style={FlightsListScreenStyle.FilterMainBox}>
          <TouchableOpacity style={styles.FilterboxStyle}>
            <VectorIcon
              icon="AntDesign"
              name="filter"
              color={Colors.theme_background}
              size={SF(18)}
            />
            <Text
              style={{
                color: Colors.theme_background,
                fontSize: SF(16),
                marginLeft: SH(5),
                marginRight: SH(5),
              }}>
              {t('Fliter_Text')}
            </Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={FlightsListScreenStyle.FilterMainBox}>
              <TouchableOpacity style={styles.FilterboxStyle}>
                <Text
                  style={{
                    color: Colors.theme_background,
                    fontSize: SF(16),
                    marginLeft: SH(5),
                    marginRight: SH(5),
                  }}>
                  {t('Sort_Cheapets')}
                </Text>
                <VectorIcon
                  icon="AntDesign"
                  name="down"
                  color={Colors.theme_background}
                  size={SF(14)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.FilterboxStyle}>
                <Text
                  style={{
                    color: Colors.theme_background,
                    fontSize: SF(16),
                    marginLeft: SH(5),
                    marginRight: SH(5),
                  }}>
                  {t('Non_Stop')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.FilterboxStyle}>
                <Text
                  style={{
                    color: Colors.theme_background,
                    fontSize: SF(16),
                    marginLeft: SH(5),
                    marginRight: SH(5),
                  }}>
                  {t('Timings_Text')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.FilterboxStyle}>
                <Text
                  style={{
                    color: Colors.theme_background,
                    fontSize: SF(16),
                    marginLeft: SH(5),
                    marginRight: SH(5),
                  }}>
                  {t('Duration_Text')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Lottie
            source={require('../../images/LottieAnimation/Loader.json')}
            autoPlay
            style={{
              width: SW(100),
              height: SH(100),
              alignSelf: 'center',

              // flex: 1,
              justifyContent: 'center',
            }}
          />
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={FlightsListScreenStyle.contentContainerStyle}>
          <View style={FlightsListScreenStyle.minflexview}>
            <View style={FlightsListScreenStyle.minviewsigninscreen}>
              <View>
                <View style={FlightsListScreenStyle.Mr20}>
                  <FlatList
                    data={combinedData}
                    renderItem={({ item, index }) => {
                      const handleBottom = () => {
                        setSelectedItemData(item); // State update
                      };
                      return (
                        <RechargedataFunction
                          item={item}
                          index={index}
                          onPress={handleBottom}
                        />
                      );
                    }}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                  />
                  <RBSheet height={SH(700)} refRBSheet={refRBSheet}>
                    <View style={FlightsListScreenStyle.PayBottomShetBox}>
                      <ScrollView
                        keyboardShouldPersistTaps="handled"
                        style={FlightsListScreenStyle.contentContainerStyle}>
                        <View style={FlightsListScreenStyle.padBtn}>
                          {selectedItemData && (
                            <>
                              
                              <View
                                style={{
                                  width: '95%',
                                  height: 'auto',
                                  borderWidth: 1,
                                  borderColor: 'rgba(0,0,0,0.5)',
                                  padding: 5,
                                  borderRadius: 5,
                                  alignSelf: 'center',
                                  borderRadius: 10,
                                  marginTop: SH(10),
                                  marginBottom: SH(10),
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginLeft: SW(10),
                                  }}>
                                  <Text style={styles.textboldHeading}>
                                    Departing Flight
                                  </Text>
                                  <Entypo
                                    name={'dot-single'}
                                    size={20}
                                    color={'#000'}
                                  />
                                  <FormatedDate
                                    dateString={date}
                                    style={styles.textboldHeading}
                                  />
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    gap: 5,
                                    marginLeft: SW(10),
                                  }}>
                                  <Text style={styles.textboldHeading}>
                                    {origin}
                                  </Text>
                                  <MaterialCommunityIcons
                                    name={'ray-start-arrow'}
                                    size={20}
                                  />
                                  <Text style={styles.textboldHeading}>
                                    {destination}
                                  </Text>
                                </View>
                              </View>
                              <FlatList
                                data={SegmentsFlatten}
                                renderItem={({ item, index }) => {
                                  const departureTime = item.DepTime;
                                  const arrivalTime = item.ArrTime;

                                  const isLastItem =
                                    index === SegmentsFlatten.length - 1;
                                  // duration calculate
                                  const duration = item.Duration;
                                  const hour = Math.floor(duration / 60);
                                  const minute = Math.floor(duration % 60);
                                  const finalDuration = `${hour}h${minute}m`;
                                  // ground time calculation
                                  const groundTime = item.GroundTime;
                                  const groundHour = Math.floor(
                                    groundTime / 60,
                                  );
                                  const groundMinute = Math.floor(
                                    groundTime % 60,
                                  );
                                  const finalgroundDuration = `${groundHour}h${groundMinute}m`;

                                  console.log(finalgroundDuration);

                                  return (
                                    <View
                                      style={{
                                        flex: 1,
                                        marginHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '95%',
                                        height: 'auto',
                                        borderWidth: 1,
                                        borderColor: 'rgba(0,0,0,0.5)',
                                        padding: 15,
                                        borderRadius: 20,
                                      }}>
                                      <View>
                                        <View
                                          style={{
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            flexDirection: 'row',
                                          }}>
                                          <Image
                                            source={require('../../images/flight.png')}
                                            style={{ width: 15, height: 15 }}
                                            resizeMode="contain"
                                          />
                                          <Text style={styles.textbold}>
                                            {item.Airline.AirlineName}
                                          </Text>
                                          <Entypo
                                            name={'dot-single'}
                                            size={20}
                                            color={'#000'}
                                          />
                                          <Text style={styles.textbold}>
                                            {item.Airline.AirlineCode}
                                          </Text>
                                          <Entypo
                                            name={'dot-single'}
                                            size={20}
                                            color={'#000'}
                                          />
                                          <Text style={styles.textbold}>
                                            {item.Airline.FlightNumber}
                                          </Text>
                                        </View>
                                        {/* section two  */}
                                        <View style={{ flexDirection: 'row' }}>
                                          <View>
                                            <Image
                                              source={
                                                isLastItem
                                                  ? require('../../images/circle.png')
                                                  : require('../../images/arrow.png')
                                              }
                                              style={{ width: 25, height: 100 }}
                                              resizeMode="contain"
                                            />
                                          </View>
                                          <View style={{ paddingLeft: 10 }}>
                                            <FormatrdTime
                                              dateString={departureTime}
                                              style={styles.textbold}
                                            />
                                            <View
                                              style={{ flexDirection: 'row' }}>
                                              <Text style={styles.textSemibold}>
                                                {item.Origin.CityName}
                                              </Text>
                                              <Entypo
                                                name={'dot-single'}
                                                size={20}
                                                color={'#000'}
                                              />

                                              <Text style={styles.textSemibold}>
                                                {item.Origin.AirportName}
                                              </Text>
                                            </View>

                                            {/* Duration */}
                                            <Text
                                              style={[
                                                styles.textSemibold,
                                                { marginVertical: 3 },
                                              ]}>
                                              Duration {finalDuration}
                                            </Text>
                                            <FormatrdTime
                                              dateString={arrivalTime}
                                              style={styles.textbold}
                                            />
                                            <View
                                              style={{ flexDirection: 'row' }}>
                                              <Text style={styles.textSemibold}>
                                                {item.Destination.CityName}
                                              </Text>
                                              <Entypo
                                                name={'dot-single'}
                                                size={20}
                                                color={'#000'}
                                              />
                                              <Text style={styles.textSemibold}>
                                                {item.Destination.AirportName}
                                              </Text>
                                            </View>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  );
                                }}
                                ItemSeparatorComponent={renderSeparator}
                              />

                            </>
                          )}
                        </View>
                      </ScrollView>
                      <View
                        style={FlightsListScreenStyle.PayBottomShetBoxChild}>
                        <View>
                          <Text style={FlightsListScreenStyle.FareText}>
                            {t('Fare_Text')}
                          </Text>
                          <Text style={FlightsListScreenStyle.BtnPrice}>
                            <VectorIcon
                              icon="FontAwesome"
                              name="rupee"
                              color={Colors.black_text_color}
                              size={SF(18)}
                            />
                            {flightBotomData?.Fare?.PublishedFare.toLocaleString(
                              'en-IN',
                            )}
                          </Text>
                        </View>
                        <View>
                          <Button
                            title={t('Proceed_Text')}
                            onPress={() =>
                              navigation.navigate(RouteName.FLIGHT_DETAILS)
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </RBSheet>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default FlightListScreen;

const styles = StyleSheet.create({
  textboldHeading: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,1)',
  },
  textbold: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.7)',
  },
  textSemibold: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(0,0,0,0.4)',
  },
  FilterboxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: SW(1),
    borderColor: Colors.theme_background,
    borderRadius: SW(20),
    paddingHorizontal: SH(10),
    paddingVertical: SH(5),
    marginHorizontal: SH(10),
    marginVertical: SH(10),
  },
});
