import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors, SF, SH, SW} from '../../utils';
import {Tabs} from './FlightTopTabs';
import {Button, RBSheet, VectorIcon} from '../../components';
import {FlightsListScreenStyle} from '../../styles';
import {useTranslation} from 'react-i18next';
import FlightPassangerAdd from './FlightPassangerAdd';
import {useSelector, useDispatch} from 'react-redux';
import FormatedDate from '../../components/commonComponents/FormatedDate';

import {
  baggageAdded,
  baggageCabinAdded,
  clearSelectedPassengers,
  flightSelectedSeatReset,
  removePassengerItem,
  resetAddMealDescription,
  resetAddSeatAmount,
  resetBaggageState,
  resetFlightFareQuotesData,
} from '../../redux/action';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {RouteName} from '../../routes';
import {useNavigation} from '@react-navigation/native';
import {selectedPassanger} from '../../redux/action';
const FlightDetails = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const {t} = useTranslation();
  const [FlightDetails, setFlightDetails] = useState([]);
  const [cheboxSelect, setCheboxSelect] = useState(false);
  // const [adultSelectionCount, setAdultSelectionCount] = useState(0);
  // const [childSelectionCount, setChildSelectionCount] = useState(0);
  // const [infantSelectionCount, setInfantSelectionCount] = useState(0);
  const [isContinueDisabled, setIsContinueDisabled] = useState(false);

  // Add a state variable to store selected passenger data
  const [selectedPassengers, setSelectedPassengers] = useState([]);

  const dispatch = useDispatch();
  const {AdultCount, ChildCount, InfantCount} = useSelector(
    state => state.commomReducer.FlightSearchPayload,
  );

  const addlistPassanger = useSelector(
    state => state.commomReducer.fightTraveller,
  );

  // meal check

  const checkMeal = () => {
    setCheboxSelect(!cheboxSelect);
  };

  // fareQutes
  const fareQutesDataSelecter = useSelector(
    state => state.commomReducer.flightFareQutesData,
  );
  const tottalFare = fareQutesDataSelecter.Fare.PublishedFare;

  const fareQutesData = fareQutesDataSelecter.FareBreakdown;

  const Segments = fareQutesDataSelecter.Segments;
  const SegmentsFlatten = Segments.flat();

  const Baggage = SegmentsFlatten.map(i => i.Baggage);
  // console.log('Baggage', Baggage);
  const CabinBaggage = SegmentsFlatten.map(i => i.CabinBaggage);

  useEffect(() => {
    dispatch(baggageAdded(Baggage));
    dispatch(baggageCabinAdded(CabinBaggage));
  }, []);

  // before selected seat redux state are clear or reset
  useEffect(() => {
    dispatch(flightSelectedSeatReset());
    dispatch(resetAddMealDescription());
    dispatch(resetAddSeatAmount());
    dispatch(resetFlightFareQuotesData());
    dispatch(resetBaggageState());
  }, []);

  const origin = SegmentsFlatten[0]?.Origin?.CityName;
  const destination =
    SegmentsFlatten[SegmentsFlatten.length - 1]?.Destination?.CityName;

  const date = SegmentsFlatten[0]?.DepTime;

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

  // console.log('getFareIndivisual', getFareIndivisual);

  const filterPassengersByType = (passengers, type) => {
    return passengers.filter(passenger => passenger.passengerType === type);
  };

  const adultData = filterPassengersByType(addlistPassanger, 'Adult (12 yrs+)');
  const childData = filterPassengersByType(
    addlistPassanger,
    'Child (2-12 yrs)',
  );
  const infantData = filterPassengersByType(
    addlistPassanger,
    'Infant (0-2 yrs)',
  );

  const handleRemovePassenger = index => {
    dispatch(removePassengerItem(index));
  };

  const handleNavigation = () => {
    if (cheboxSelect) {
      navigation.navigate(RouteName.FLIGHT_MEALS, {
        selectedItem: selectedPassengers,
      });
    } else {
      navigation.navigate(RouteName.FLIGHT_REVIEW_DETAILS,selectedPassengers);
    }
  };

  const reduxPassengerSelect = useSelector(
    state => state.commomReducer.selectedPassengers,
  );

  const handleSelectionChange = (
    passengerData,
    index,
    isSelected,
    passengerType,
  ) => {
    //redux selected passenger  ka index  or  passengerData ka index  exist krta ha ya nhi uske basses par duplicate ko remove kr sakte hai ya redux me duplicate ko add hone se rok sakte hai

    if (isSelected) {
      setSelectedPassengers(prevSelectedPassengers => [
        ...prevSelectedPassengers,
        passengerData,
      ]);
      // dispatch(selectedPassanger(passengerData));
    } else {
      // Remove the deselected passenger data from the selectedPassengers array
      setSelectedPassengers(prevSelectedPassengers =>
        prevSelectedPassengers.filter(item => item !== passengerData),
      );
      // dispatch(selectedPassanger(passengerData));
    }
  };

  useEffect(() => {
    const totalSelected = selectedPassengers?.length;
    if (totalSelected === AdultCount + ChildCount + InfantCount) {
      setIsContinueDisabled(false);
    } else {
      setIsContinueDisabled(true);
    }
  }, [selectedPassengers]);

  return (
    <View style={styles.conatainer}>
      <View style={styles.topView}>
        <View>
          <View style={{marginTop: 10}}>
            <Image
              source={require('../../images/Indigo.png')}
              style={{
                width: SW(45),
                height: SH(45),
                borderRadius: 5,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        <View style={{paddingLeft: SW(20)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: SF(20),
                color: '#000',
                fontFamily: 'Poppins-Medium',
              }}>
              {origin}
            </Text>
            <Text
              style={{
                fontSize: SF(20),
                color: '#000',
                fontFamily: 'Poppins-Medium',
              }}>
              {' '}
              - {destination}
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: SF(15),
                  fontFamily: 'Poppins-Medium',
                  color: 'rgba(0,0,0,0.5)',
                }}>
                {/* {depdate} */}
              </Text>
              <FormatedDate
                dateString={date}
                style={{
                  fontSize: SF(15),
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                }}
              />
              <Entypo name={'dot-single'} size={20} />
              <Text
                style={{
                  fontSize: SF(15),
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                }}>
                2h25m
              </Text>
            </View>
          </View>

          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: SF(15),
                  fontFamily: 'Poppins-Regular',
                  color: 'rgba(0,0,0,0.5)',
                }}>
                {SegmentsFlatten[0].CabinClassName}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* second box  */}
      <View style={styles.box2}>
        <Tabs Bag={Baggage} CabinBag={CabinBaggage} />
      </View>

      <ScrollView style={styles.box3}>
        <View style={{}}>
          <Text
            style={{
              fontSize: SF(20),
              fontFamily: 'Poppins-Medium',
              color: 'rgba(0,0,0,1)',
            }}>
            Traveller Details
          </Text>

          {AdultCount >= 1 && (
            <FlightPassangerAdd
              passengerType="Adult (12 yrs+)"
              data={adultData}
              iconBackgroundColor={'green'}
              passengerCount={AdultCount} // Pass the AdultCount as a prop
              onRemovePassenger={handleRemovePassenger}
              onSelectionChange={handleSelectionChange}
            />
          )}

          {ChildCount >= 1 && (
            <FlightPassangerAdd
              passengerType="Child (2-12 yrs)"
              data={childData}
              iconBackgroundColor={'#0297bd'}
              passengerCount={ChildCount} // Pass the ChildCount as a prop
              onRemovePassenger={handleRemovePassenger}
              onSelectionChange={handleSelectionChange}
            />
          )}

          {InfantCount >= 1 && (
            <FlightPassangerAdd
              passengerType="Infant (0-2 yrs)"
              data={infantData}
              iconBackgroundColor={'red'}
              passengerCount={InfantCount} // Pass the InfantCount as a prop
              onRemovePassenger={handleRemovePassenger}
              onSelectionChange={handleSelectionChange}
            />
          )}
        </View>

        <View
          style={{
            marginVertical: 7,
            marginHorizontal: SH(10),
            borderWidth: 0.5,
            padding: 10,
            marginTop: SH(20),
            borderRadius: 5,
            borderColor: 'gray',
            flexDirection: 'row',
            marginBottom: SH(50),
          }}>
          <TouchableOpacity onPress={checkMeal}>
            <FontAwesome5
              name={cheboxSelect ? 'check-square' : 'square'}
              // name={'square'}
              size={25}
              color={cheboxSelect ? Colors.theme_background : '#ccc'}
              // color={'#ccc'}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: SF(15), color: 'black'}}>
            {' '}
            Add Seats,Meal,Baggage & more
          </Text>
        </View>
      </ScrollView>
      {/* bottom section  button */}
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: '10%',
          backgroundColor: '#fff',
          bottom: 0,
          padding: SW(10),
          justifyContent: 'center',
          marginTop: SH(20),
          backgroundColor: '#f0f0f0',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderColor: 'black',
          paddingBottom: SH(10),
          marginTop: SH(10),
          borderColor: 'gray',
          borderWidth: 1,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: '400',
                fontSize: SF(15),
              }}>
              Fare Breakup
            </Text>
            <Text style={{color: '#000', fontWeight: '700', fontSize: SF(20)}}>
              ₹ {tottalFare.toLocaleString()}
              <Entypo name={'chevron-down'} size={20} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: cheboxSelect ? '60%' : '40%',
              paddingHorizontal: 10,
              height: '100%',
              backgroundColor: isContinueDisabled
                ? '#ccc'
                : Colors.theme_background,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={handleNavigation}
            disabled={isContinueDisabled}>
            <Text style={{color: '#fff', fontWeight: '800', fontSize: SF(15)}}>
              {cheboxSelect ? 'Proceed to select Seat' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BottomSheet here */}
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
              <Text style={FlightsListScreenStyle.FareText}>
                {t('Fare_Text')}
              </Text>
              <Text style={FlightsListScreenStyle.BtnPrice}>
                <VectorIcon
                  icon="FontAwesome"
                  name="rupee"
                  color={'black'}
                  size={SF(18)}
                />
                ₹{' '}
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
                      : (RouteName.FLIGHT_REVIEW_DETAILS,
                        {
                          selectedItemContinue: selectedPassengers,
                        }),
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

export default FlightDetails;

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#fff',
    alignSelf: 'center',
    margin: 20,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box2: {
    width: '90%',
    height: '22%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  box3: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: SH(30),
    marginBottom: SH(5),
  },
});
