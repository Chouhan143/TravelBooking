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

const Baggage = ({route}) => {
  const refRBSheet = useRef();
  const {selectedItem} = route.params;
  console.log('baggage >>>>>>', selectedItem);
  const {t} = useTranslation();
  const [baggageData, setBaggageData] = useState([]);
  const [addedStatus, setAddedStatus] = useState({});

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

  const toggleAddButton = index => {
    setAddedStatus(prevState => {
      const updatedStatus = {...prevState};
      updatedStatus[index] = !updatedStatus[index]; // Toggling the added status for the given index
      return updatedStatus; // Returning the updated added status object
    });
  };

  const renderItem = ({item, index}) => {
    const isAdded = !!addedStatus[index];

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.Weight} kg</Text>
          <Text style={styles.name}>₹{item.Price}</Text>
        </View>
        <TouchableOpacity
          style={isAdded ? styles.addButton : styles.button}
          onPress={() => toggleAddButton(index)}>
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
    <ScrollView style={styles.listContainer}>
      <FlatList
        data={baggageData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={{
          position: 'relative',
          bottom: 0,
          justifyContent: 'space-between',
          flexDirection: 'row',
          borderTopColor: 'gray',
          borderTopWidth: 0.5,
          paddingTop: 15,
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
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.theme_background,
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate(RouteName.FLIGHT_REVIEW_DETAILS);
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
    </ScrollView>
  );
};

export default Baggage;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin: SW(20),
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
