import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SW, SF, SH, Colors} from '../../../utils';
import {FLIGHT_SSR_MEAL} from '../../../utils/BaseUrl';
import {useSelector} from 'react-redux';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RouteName} from '../../../routes';
import {RBSheet, VectorIcon, Button} from '../../../components';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {FlightsListScreenStyle} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';
import {addBaggagePrice, removeBaggagePrice} from '../../../redux/action';
import {useDispatch} from 'react-redux';
const Baggage = ({route}) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const {selectedItem} = route.params;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [baggageData, setBaggageData] = useState([]);
  const [addedStatus, setAddedStatus] = useState({});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [baggageTooltip, setBaggageTooltip] = useState(false);
  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(null);
  const {flightTraceIdDetails} = useSelector(state => state.commomReducer);
  const {SrdvType, TraceId} = flightTraceIdDetails;

  const SrdvIndex = flightTraceIdDetails.Results?.flat() ?? [];
  const SrdvIndexMap = SrdvIndex.flatMap(elem => elem?.FareDataMultiple ?? []);
  const SrdvIndexValue = SrdvIndexMap[0]?.SrdvIndex;
  const ResultIndexValue = SrdvIndexMap[0]?.ResultIndex;

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

  // lenght of meals added count
  const totalMealCount = mealDescriptions.length;
  const modalToggle = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const baggageToggle = () => {
    setBaggageTooltip(!baggageTooltip);
  };

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

  // API request
  useEffect(() => {
    const baggageRequest = async () => {
      const payload = {
        SrdvType,
        SrdvIndex: SrdvIndexValue,
        TraceId: TraceId.toString(),
        ResultIndex: ResultIndexValue,
      };

      try {
        const res = await axios.post(FLIGHT_SSR_MEAL, payload);
        const result = res.data.Baggage;
        setBaggageData(result.flat() || []);
      } catch (error) {
        console.log('Baggage error:', error);
      }
    };

    baggageRequest();
  }, [SrdvType, SrdvIndexValue, TraceId, ResultIndexValue]);

  // const toggleAddButton = index => {
  //   setAddedStatus(prevState => {
  //     const updatedStatus = {...prevState};
  //     updatedStatus[index] = !updatedStatus[index]; // Toggling the added status for the given index
  //     return updatedStatus; // Returning the updated added status object
  //   });
  // };

  const togglePassengerSelection = index => {
    setSelectedPassengerIndex(index);
  };

  const toggleAddButton = (index, item) => {
    if (selectedPassengerIndex !== null) {
      const passengerBaggage = addedStatus[selectedPassengerIndex] || {};
      const baggageAlreadyAdded = Object.values(passengerBaggage).some(
        status => status,
      );

      if (!baggageAlreadyAdded || passengerBaggage[index]) {
        setAddedStatus(prevState => {
          const updatedStatus = {...prevState};
          passengerBaggage[index] = !passengerBaggage[index];
          updatedStatus[selectedPassengerIndex] = passengerBaggage;

          if (passengerBaggage[index]) {
            // If the meal is being added, include the description
            dispatch(addBaggagePrice(item.Price, item.Weight));
          } else {
            // If the meal is being removed, include the index of the meal to be removed
            dispatch(removeBaggagePrice(item.Price, index));
          }

          return updatedStatus;
        });
      } else {
        alert('Only one Baggage can be added per passenger.');
      }
    } else {
      alert('Please select a passenger first.');
    }
  };

  const renderItem = ({item, index}) => {
    // const isAdded = !!addedStatus[index];

    const isAdded =
      selectedPassengerIndex !== null &&
      addedStatus[selectedPassengerIndex]?.[index];

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Weight} kg</Text>
          <Text style={styles.name}>₹{item.Price}</Text>
        </View>
        <TouchableOpacity
          style={isAdded ? styles.addButton : styles.button}
          onPress={() => toggleAddButton(index, item)}>
          <View style={styles.buttonContent}>
            <MaterialIcons
              name={isAdded ? 'check' : 'add'}
              color={isAdded ? 'green' : 'black'}
              size={20}
            />
            <Text style={isAdded ? styles.addButtonText : styles.buttonText}>
              {isAdded ? 'Added' : 'Add'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.listContainer}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap',
          marginHorizontal: SW(20),
          paddingBottom: SH(15),
        }}>
        {selectedItem.map((item, index) => {
          const isSelectedPassenger = selectedPassengerIndex === index;
          const baggageForPassenger = addedStatus[index] || {};

          return (
            <TouchableOpacity
              style={{
                backgroundColor: isSelectedPassenger
                  ? '#cdeffa'
                  : Colors.light_gray_text_color,

                paddingHorizontal: 30,
                paddingVertical: 5,
                borderRadius: 5,
                gap: 10,
                borderWidth: 0.5,
                borderColor: isSelectedPassenger
                  ? '#00b7eb'
                  : Colors.gray_color,
              }}
              key={index}
              onPress={() => togglePassengerSelection(index)}>
              <Text
                key={item.id}
                style={{
                  color: isSelectedPassenger
                    ? '#00b7eb'
                    : Colors.gray_text_color,
                  fontSize: SF(18),
                  fontWeight: '600',
                }}>
                {item.firstName}
              </Text>
              {Object.values(baggageForPassenger).some(status => status) ? (
                <Text
                  style={{
                    color: '#000',
                    fontSize: SF(14),
                    fontWeight: '500',
                  }}>
                  Baggage added
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        data={baggageData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: SH(20)}}
      />

      <View
        style={{
          position: 'relative',
          bottom: 0,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderTopColor: 'gray',
          borderWidth: 0.5,
          padding: SW(10),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}>
          <Text
            style={{
              color: Colors.gray_text_color,
              fontSize: 14,
              fontFamily: 'Poppins-Bold',
            }}>
            Fare Breackup
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#000',
                fontSize: SF(16),
                fontFamily: 'Poppins-Regular',
              }}>
              ₹ {tottalFare.toLocaleString()}
            </Text>
            <Entypo name={'chevron-down'} size={20} color={'#000'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.theme_background,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate(RouteName.FLIGHT_REVIEW_DETAILS, {
              selectedItem: selectedItem,
            });
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '700',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <RBSheet height={SH(400)} refRBSheet={refRBSheet}>
        <View style={FlightsListScreenStyle.PayBottomShetBox}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{backgroundColor:'white'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={FlightsListScreenStyle.HeadingStyle}>
                  Fare Breakup
                </Text>
                <Text style={FlightsListScreenStyle.TravellerText}>
                  Base Fare
                </Text>
                <View style={FlightsListScreenStyle.padLeft10}></View>
              </View>
              <TouchableOpacity
                style={{paddingRight: 20}}
                onPress={() => {
                  refRBSheet.current.close();
                }}>
                <AntDesign name={'closecircle'} size={20} />
              </TouchableOpacity>
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
                <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
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
              <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                Taxes & Fees
              </Text>
              <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
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
              <Text style={{fontSize: SF(16), color: Colors.gray_text_color}}>
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
                  navigation.navigate(RouteName.FLIGHT_REVIEW_DETAILS, {
                    selectedItem: selectedItem,
                  })
                }
              />
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default Baggage;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: SH(10),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 7,
    padding: SW(15),
    borderRadius: 10,
    borderColor: '#c9cfd1',
    borderWidth: 1,
    margin: SW(10),
    marginBottom: 0,
  },
  textContainer: {
    flex: 1,
    marginRight: SW(12),
  },
  name: {
    color: 'black',
    fontSize: SW(13),
  },
  button: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: SW(10),
    paddingLeft: SW(30),
    paddingRight: SW(30),
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: SF(12),
  },
  addButtonText: {
    color: 'green',
    fontSize: SF(10),
  },
  addButton: {
    borderColor: 'green',
    borderWidth: 1,
    padding: SW(10),
    paddingLeft: SW(28),
    paddingRight: SW(28),
    borderRadius: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
