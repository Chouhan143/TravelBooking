import React, {useState, useEffect, useRef} from 'react';

import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {FLIGHT_SSR_MEAL} from '../../../utils/BaseUrl';

import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {Colors, SF, SH, SW} from '../../../utils';

import Entypo from 'react-native-vector-icons/Entypo';
import {RBSheet, VectorIcon, Button} from '../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {FlightsListScreenStyle} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {addMealPrice, removeMealPrice} from '../../../redux/action';

const Meal = ({route}) => {
  const {t} = useTranslation();
  // const route = useRoute();
  const dispatch = useDispatch();
  const {selectedItem} = route.params;
  console.log('item >>>>', selectedItem);
  const navigation = useNavigation();
  const [mealsData, setMealsData] = useState([]);
  const [selectedPassanger, setSelectedPassengers] = useState([]);
  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(null);
  const [addedStatus, setAddedStatus] = useState({});
  const refRBSheet = useRef();
  const {flightTraceIdDetails} = useSelector(state => state.commomReducer);
  const {SrdvType, TraceId} = flightTraceIdDetails;
  const SrdvIndex = flightTraceIdDetails.Results?.flat() ?? [];
  const SrdvIndexMap = SrdvIndex.flatMap(elem => elem?.FareDataMultiple ?? []);
  const SrdvIndexValue = SrdvIndexMap[0]?.SrdvIndex;
  const ResultIndexValue = SrdvIndexMap[0]?.ResultIndex;

  // fareQutes
  const fareQutesDataSelecter = useSelector(
    state => state.commomReducer.flightFareQutesData,
  );

  const tottalFare = fareQutesDataSelecter.Fare.PublishedFare;
  const fareQutesData = fareQutesDataSelecter.FareBreakdown;

  // const togglePassengerSelection = index => {
  //   setSelectedPassengers(index);
  // };

  const togglePassengerSelection = index => {
    setSelectedPassengerIndex(index);
  };

  const mealDescriptions = useSelector(
    state => state.commomReducer.mealDescriptions,
  );
  console.log('mealDescriptions', mealDescriptions);

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

  // API request
  useEffect(() => {
    const mealApiRequest = async () => {
      const payload = {
        SrdvType,
        SrdvIndex: SrdvIndexValue,
        TraceId: TraceId.toString(),
        ResultIndex: ResultIndexValue,
      };
      try {
        const res = await axios.post(FLIGHT_SSR_MEAL, payload);
        const result = res.data.MealDynamic;
        const mealDataCollection = result.flat();
        setMealsData(mealDataCollection || []);
      } catch (error) {
        console.log('meal error :', error);
      }
    };

    mealApiRequest();
  }, [SrdvType, SrdvIndexValue, TraceId, ResultIndexValue]);

  // const toggleAddButton = index => {
  //   setAddedStatus(prevState => {
  //     const updatedStatus = {...prevState};
  //     updatedStatus[index] = !updatedStatus[index];
  //     return updatedStatus;
  //   });
  // };

  const toggleAddButton = (index, item) => {
    if (selectedPassengerIndex !== null) {
      const passengerMeals = addedStatus[selectedPassengerIndex] || {};
      const mealAlreadyAdded = Object.values(passengerMeals).some(
        status => status,
      );

      if (!mealAlreadyAdded || passengerMeals[index]) {
        setAddedStatus(prevState => {
          const updatedStatus = {...prevState};
          passengerMeals[index] = !passengerMeals[index];
          updatedStatus[selectedPassengerIndex] = passengerMeals;

          if (passengerMeals[index]) {
            // If the meal is being added, include the description
            dispatch(addMealPrice(item.Price, item.Description));
          } else {
            // If the meal is being removed, include the index of the meal to be removed
            dispatch(removeMealPrice(item.Price, index));
          }

          return updatedStatus;
        });
      } else {
        alert('Only one meal can be added per passenger.');
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
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Description}</Text>
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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap',
          marginHorizontal: SW(20),
        }}>
        {selectedItem.map((item, index) => {
          // const isSelectedPassanger = selectedPassanger === index;
          // const selectedSeatNumber = getSelectedSeatNumber(index);

          const isSelectedPassenger = selectedPassengerIndex === index;
          const mealsForPassenger = addedStatus[index] || {};

          return (
            <TouchableOpacity
              style={{
                backgroundColor: isSelectedPassenger
                  ? '#cdeffa'
                  : Colors.light_gray_text_color,

                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,

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
                  fontSize: SF(16),
                  fontWeight: '600',
                }}>
                Mr. {item.firstName}
              </Text>
              {Object.values(mealsForPassenger).some(status => status) && (
                <Text
                  style={{
                    color: '#000',
                    fontSize: SF(14),
                    fontWeight: '500',
                  }}>
                  Meal added
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={mealsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '10%',
          bottom: 0,
          padding: SW(15),
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
          justifyContent: 'space-between',
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
            padding: SW(10),
            backgroundColor: Colors.theme_background,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate('Baggage');
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

      <RBSheet height={SH(280)} refRBSheet={refRBSheet}>
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
                <Text>
                  {getPassengerTypeLabel(
                    fareData.PassengerType,
                    fareData.PassengerCount,
                    fareData.BaseFare,
                  )}
                </Text>
                <Text style={{}}> ₹{fareData.BaseFare.toLocaleString()}</Text>
              </View>
            ))}
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 20,
              }}>
              <Text>Taxes & Fees</Text>
              <Text>₹{fareQutesDataSelecter.Fare.Tax.toLocaleString()}</Text>
            </View>
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

export default Meal;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: SH(30),
    backgroundColor: 'rgba(255,255,255,1)',
  },
  mainContainer: {
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
