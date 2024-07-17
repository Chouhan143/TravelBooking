import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {Colors, SF, SH, SW} from '../../../utils';
import {FLIGHT_SEAT_MAP} from '../../../utils/BaseUrl';
import {useNavigation} from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';
import {
  addSeatAmount,
  flightSelectSeat,
  flightSelectedSeatReset,
  removeSeatAmount,
  resetFlightFareQuotesData,
} from '../../../redux/action';
import Entypo from 'react-native-vector-icons/Entypo';
import {RBSheet, VectorIcon, Button} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {FlightsListScreenStyle} from '../../../styles';
// import {FlatList} from 'react-native-gesture-handler';
import {RouteName} from '../../../routes';

const Seat = ({route}) => {
  const {selectedItem} = route.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [baggageTooltip, setBaggageTooltip] = useState(false);
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState(0); // state for passenger selecting
  const [selectedSeatsNumber, setSelectedSeatsNumber] = useState([]); // statet for seat number selecting

  const {flightSeatSelectData} = useSelector(state => state.commomReducer);
  const {flightTraceIdDetails} = useSelector(state => state.commomReducer);

  const {SrdvType, TraceId} = flightTraceIdDetails;

  let SrdvIndex = flightTraceIdDetails.Results;
  let SrdvIndexFlatten = SrdvIndex?.flat() ?? [];
  const SrdvIndexMap = SrdvIndexFlatten.map(
    elem => elem?.FareDataMultiple ?? [],
  ).flat();
  const SrdvIndexLoop = SrdvIndexMap.map(el3 => el3.SrdvIndex);
  const SrdvIndexValue = SrdvIndexLoop[0];
  const ResultIndex = SrdvIndexMap.map(el3 => el3.ResultIndex);
  const ResultIndexValue = ResultIndex[0];
  //  Api call here
  const seatApiRequest = async () => {
    const payload = {
      SrdvType: SrdvType,
      SrdvIndex: SrdvIndexValue,
      TraceId: TraceId.toString(),
      ResultIndex: ResultIndexValue,
    };
     console.log('search map payload',payload);
    try {
      setLoading(true);
      const res = await axios.post(FLIGHT_SEAT_MAP, payload);
      console.log('FLIGHT_SEAT_MAP',res.data);
      const seatData = res.data.Results || [];
      setSeatData(seatData);
      // console.log('seat res:', seatData);
      setLoading(false);
    } catch (error) {
      console.log('seat error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    seatApiRequest();
  }, []);

  // fareQutes
  const fareQutesDataSelecter = useSelector(
    state => state.commomReducer.flightFareQutesData,
  );
  const tottalFare = fareQutesDataSelecter.Fare.PublishedFare;
  const fareQutesData = fareQutesDataSelecter.FareBreakdown;

  const getPassengerTypeLabel = (passengerType, passengerCount, baseFare) => {
    let typeLabel = '';
    switch (passengerType) {
      case 1:
        typeLabel = 'Adult (12 yrs+)';
        break;
      case 2:
        typeLabel = 'Child (2-12 yrs)';
        break;
      case 3:
        typeLabel = 'Infant (0-2 yrs)';
        break;
      default:
        typeLabel = 'Unknown';
    }
    return `${typeLabel} = (${passengerCount} * ₹${baseFare.toLocaleString()})`;
  };

  // const handleSeatSelect = (passengerIndex, seat) => {
  //   if (!seat.IsBooked) {
  //     const isSelected = flightSeatSelectData.some(
  //       selectedSeat => selectedSeat.SeatNumber === seat.SeatNumber,
  //     );
  //     if (isSelected) {
  //       // Deselect seat
  //       dispatch(flightSelectSeat(seat, false)); // Assuming flightSelectSeat handles deselection when second parameter is false
  //       dispatch(removeSeatAmount(seat.Amount));

  //       // Remove seat from selectedSeats array
  //       setSelectedSeatsNumber(prevSeats =>
  //         prevSeats.filter(item => !(item.passengerIndex === passengerIndex)),
  //       );
  //     } else {
  //       // Select seat
  //       dispatch(flightSelectSeat(seat, true)); // Assuming flightSelectSeat handles selection when second parameter is true
  //       dispatch(addSeatAmount(seat.Amount));
  //       // Update selectedSeats array with selected seat for passenger
  //       setSelectedSeatsNumber(prevSeats => [
  //         ...prevSeats.filter(
  //           item => !(item.passengerIndex === passengerIndex),
  //         ),
  //         {passengerIndex, seatNumber: seat.SeatNumber},
  //       ]);
  //     }
  //   }
  // };

  //selected seat price segment destructure

  const priceSelection = useSelector(
    state => state.commomReducer.selectedSeatPriceTotal,
  );

  const priceCal = priceSelection.map(price => price.selectedSeatPriceSum);

  const selectedSetPriceSum = priceCal.reduce(
    (acc, currentValue) => acc + currentValue,
    0,
  );

  const seatCountSelected = priceSelection.length;

  // meal sagment destructure
  const mealDescriptions = useSelector(
    state => state.commomReducer.mealDescriptions,
  );

  // sum calulate the number of meals price
  const multipalMealPrice = mealDescriptions.map(meal => meal.price);
  const mealSumPrice = multipalMealPrice.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  // Baggage selection segment

  const selectedBaggge = useSelector(
    state => state.commomReducer.selectedBaggage,
  );

  const totalBaggage = selectedBaggge.length;
  const multipalBaggage = selectedBaggge.map(meal => meal.selectedBaggagePrice);

  const baggageSumPrice = multipalBaggage.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  // lenght of meals added count
  const totalMealCount = mealDescriptions.length;
  const modalToggle = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const baggageToggle = () => {
    setBaggageTooltip(!baggageTooltip);
  };

  const handleSeatSelect = (passengerIndex, seat, colIndex) => {
    // Check if the seat is already booked
    if (!seat.IsBooked) {
      const isSelected = flightSeatSelectData.some(
        selectedSeat => selectedSeat.SeatNumber === seat.SeatNumber,
      );

      if (isSelected) {
        // Deselect the seat
        dispatch(flightSelectSeat(seat, false));
        dispatch(removeSeatAmount(seat.Amount, colIndex));

        // Remove seat from selectedSeats array
        setSelectedSeatsNumber(prevSeats =>
          prevSeats.filter(item => !(item.passengerIndex === passengerIndex)),
        );
      } else {
        // Check if the number of selected seats is less than the number of passengers
        const seatSelectionCondition =
          flightSeatSelectData.length < selectedItem.length;

        if (seatSelectionCondition) {
          // Select the seat
          dispatch(flightSelectSeat(seat, true));
          dispatch(addSeatAmount(seat.Amount));

          // Update selectedSeats array with selected seat for passenger
          setSelectedSeatsNumber(prevSeats => [
            ...prevSeats.filter(
              item => !(item.passengerIndex === passengerIndex),
            ),
            {passengerIndex, seatNumber: seat.SeatNumber},
          ]);
        } else {
          // Optionally, you can show a message or alert to the user indicating that they can't select more seats than the number of passengers
          alert('You cannot select more seats than the number of passengers.');
        }
      }
    } else {
      alert('Please select a passenger first.');
    }
  };

  const togglePassengerSelection = index => {
    setSelectedPassengers(index);
  };

  const getSelectedSeatNumber = passengerIndex => {
    const selectedSeat = selectedSeatsNumber.find(
      seat => seat.passengerIndex === passengerIndex,
    );
    return selectedSeat ? selectedSeat.seatNumber : null;
  };

  // before seleted seat amount add this state inital state or reset

  const renderSeats = seats => {
    if (!seats) return null;
    return Object.keys(seats).map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {Object.keys(seats[row] || {}).map((col, colIndex) => {
          const seat = seats[row][col];
          const isSelected = flightSeatSelectData.some(
            selectedSeat => selectedSeat.SeatNumber === seat.SeatNumber,
          );

          return (
            <TouchableOpacity
              key={colIndex}
              style={[
                styles.seat,
                seat.IsBooked && {backgroundColor: '#cdeffa'},
                isSelected && {backgroundColor: '#006633'},
              ]}
              onPress={() =>
                handleSeatSelect(selectedPassengers, seat, colIndex)
              }
              disabled={seat.IsBooked}>
              <Image
                source={
                  seat.IsBooked
                    ? require('../../../images/bookedSeat.png')
                    : require('../../../images/seat.png')
                }
                style={{
                  width: 50,
                  height: 50,
                  tintColor: isSelected ? '#fff' : '#000',
                }}
              />

              <Text
                style={{
                  color: isSelected ? '#fff' : '#000',
                  fontWeight: '700',
                }}>
                {seat.SeatNumber}
              </Text>
              <Text
                style={{
                  color: isSelected ? '#fff' : 'rgba(0,0,0,0.5)',
                  fontWeight: '500',
                }}>
                {seat.Amount}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: SF(18),
            color: '#000',
            fontWeight: '500',
            fontFamily: 'Poppins-Medium',
            fontWeight: '700',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: Colors.theme_background,
          }}>
          Select your preferred seat
        </Text>
      </View>

      {loading ? (
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
              marginHorizontal: SW(20),
            }}>
            {selectedItem.map((item, index) => {
              const isSelectedPassanger = selectedPassengers === index;
              const selectedSeatNumber = getSelectedSeatNumber(index);
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: isSelectedPassanger
                      ? '#cdeffa'
                      : Colors.light_gray_text_color,

                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,

                    borderWidth: 0.5,
                    borderColor: isSelectedPassanger
                      ? '#00b7eb'
                      : Colors.gray_color,
                  }}
                  key={index}
                  onPress={() => togglePassengerSelection(index)}>
                  <Text
                    key={item.id}
                    style={{
                      color: isSelectedPassanger
                        ? '#00b7eb'
                        : Colors.gray_text_color,
                      fontSize: SF(16),
                      fontWeight: '600',
                    }}>
                    Mr. {item.firstName}
                  </Text>
                  {selectedSeatNumber && (
                    <Text
                      style={{
                        color: '#000',
                        fontSize: SF(14),
                        fontWeight: '500',
                      }}>
                      Seat: {selectedSeatNumber}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.airplane}>
            <Image
              source={require('../../../images/Deck.webp')}
              style={{
                width: '100%',
                height: SH(250),
                borderTopLeftRadius: SH(200),
                borderTopRightRadius: SH(200),
                resizeMode: 'contain',
              }}
            />

            {seatData.map((segment, index) => (
              <View key={index} style={styles.segment}>
                {renderSeats(segment.Seats)}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      {/* bootom buttons  */}
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '10%',
          backgroundColor: '#fff',
          bottom: 0,
          padding: SW(10),
          justifyContent: 'space-between',
          marginTop: SH(20),
          backgroundColor: '#f0f0f0',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor: 'black',
          paddingBottom: SH(10),
          marginTop: SH(10),
          borderColor: 'gray',
          borderWidth: 1,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}>
          <Text
            style={{
              color: Colors.gray_text_color,
              fontSize: 14,
              fontWeight: '500',
            }}>
            Fare Breackup
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
              ₹ {tottalFare.toLocaleString()}
            </Text>
            <Entypo name={'chevron-down'} size={20} color={'#000'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: Colors.theme_background,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate('Meal', {selectedItem: selectedItem});
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              fontFamily: 'Poppins-Bold',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <RBSheet height={SH(400)} refRBSheet={refRBSheet}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            paddingRight: SW(10),
            position: 'absolute',
            zIndex: 999,
            top: 10,
          }}
          onPress={() => {
            refRBSheet.current.close();
          }}>
          <AntDesign name={'closecircle'} size={25} color="black" />
        </TouchableOpacity>
        <View style={FlightsListScreenStyle.PayBottomShetBox}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={FlightsListScreenStyle.contentContainerStyle}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{paddingLeft: SW(20), paddingTop: SH(10)}}>
                <Text
                  style={{
                    fontSize: SF(18),
                    color: '#000',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Fare Breakup
                </Text>
                <Text
                  style={{
                    fontSize: SF(16),
                    color: '#000',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Base Fare
                </Text>
                <View style={FlightsListScreenStyle.padLeft10}></View>
              </View>
            </View>
            {fareQutesData.map((fareData, index) => (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}
                key={index}>
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  {getPassengerTypeLabel(
                    fareData.PassengerType,
                    fareData.PassengerCount,
                    fareData.BaseFare,
                  )}
                </Text>
                <Text style={{color: 'black', fontFamily: 'Poppins-Medium'}}>
                  {' '}
                  ₹{fareData.BaseFare.toLocaleString()}
                </Text>
              </View>
            ))}

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: SF(16),
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                Taxes & Fees
              </Text>
              <Text
                style={{
                  fontSize: SF(16),
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                }}>
                ₹{fareQutesDataSelecter.Fare.Tax.toLocaleString()}
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 2}}>
              <Text
                style={{
                  fontSize: SF(16),
                  color: '#000',
                  fontFamily: 'Poppins-Regular',
                }}>
                Other Services
              </Text>
            </View>

            {priceSelection.length > 0 && (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: SF(15),
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Seats*{seatCountSelected}
                </Text>

                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                  ₹{selectedSetPriceSum}
                </Text>
              </View>
            )}

            {mealDescriptions?.length > 0 && (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 22,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: SW(10),
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: SF(15),
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Meals*{totalMealCount}
                  </Text>
                  <Tooltip
                    isVisible={tooltipVisible}
                    content={
                      <View style={{flex: 1, paddingVertical: 10}}>
                        {mealDescriptions.map((item, index) => {
                          return (
                            <View>
                              <Text key={index} style={{color: 'black'}}>
                                {item.description}
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'Poppins-Regular',
                                }}>
                                ₹{item.price}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    }
                    placement="top"
                    onClose={() => setTooltipVisible(false)}>
                    <TouchableOpacity onPress={modalToggle}>
                      <AntDesign
                        name={'exclamationcircleo'}
                        size={15}
                        color={'black'}
                      />
                    </TouchableOpacity>
                  </Tooltip>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: SF(15),
                  }}>
                  ₹{mealSumPrice}
                </Text>
              </View>
            )}

            {selectedBaggge?.length > 0 && (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 22,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: SW(10),
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: SF(15),
                      fontFamily: 'Poppins-Regular',
                    }}>
                    Baggage*{totalBaggage}
                  </Text>
                  <Tooltip
                    isVisible={baggageTooltip}
                    content={
                      <View style={{flex: 1, paddingVertical: 10}}>
                        {selectedBaggge.map((item, index) => {
                          return (
                            <View>
                              <Text key={index} style={{color: 'black'}}>
                                {item.selectedBaggageWeight}
                              </Text>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'Poppins-Regular',
                                }}>
                                ₹{item.selectedBaggagePrice}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    }
                    placement="right"
                    onClose={() => setBaggageTooltip(false)}>
                    <TouchableOpacity onPress={baggageToggle}>
                      <AntDesign
                        name={'exclamationcircleo'}
                        size={15}
                        color={'black'}
                      />
                    </TouchableOpacity>
                  </Tooltip>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: SF(15),
                  }}>
                  ₹{baggageSumPrice}
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={FlightsListScreenStyle.PayBottomShetBoxChild}>
            <View>
              <Text
                style={{
                  fontSize: SF(16),
                  color: 'black',
                  fontFamily: 'Poppins-Regular',
                  fontSize: SF(15),
                }}>
                {t('Fare_Text')}
              </Text>
              <Text
                style={[FlightsListScreenStyle.BtnPrice, {fontWeight: '700'}]}>
                <VectorIcon
                  icon="FontAwesome"
                  name="rupee"
                  color={Colors.black_text_color}
                  size={SF(18)}
                />
                {fareQutesDataSelecter.Fare.PublishedFare.toLocaleString(
                  'en-IN',
                )}
              </Text>
            </View>

            <View>
              <Button
                title={t('Proceed_Text')}
                onPress={() =>
                  navigation.navigate(
                    cheboxSelect
                      ? RouteName.FLIGHT_MEALS
                      : RouteName.FLIGHT_REVIEW_DETAILS,
                  )
                }
              />
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default Seat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: SH(15),
  },
  airplane: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    backgroundColor: '#e1f3f7',
    borderTopLeftRadius: SH(200),
    borderTopRightRadius: SH(200),
    paddingBottom: SH(5),
    padding: SW(10),
  },
  segment: {
    flex: 1,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  seat: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#d3eaf0',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
