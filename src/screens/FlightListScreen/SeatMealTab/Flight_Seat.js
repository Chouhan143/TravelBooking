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
import {Colors, SF, SH,SW} from '../../../utils';
import {FLIGHT_SEAT_MAP} from '../../../utils/BaseUrl';
import {useNavigation} from '@react-navigation/native';
import {
  addSeatAmount,
  flightSelectSeat,
  removeSeatAmount,
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
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [seatData, setSeatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const BaggageItem = useSelector(
    state => state.commomReducer.flightBaggageData,
  );
  const BaggageCabinItem = useSelector(
    state => state.commomReducer.flightBaggageCabinData,
  );
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

  const seatApiRequest = async () => {
    const payload = {
      SrdvType: SrdvType,
      SrdvIndex: SrdvIndexValue,
      TraceId: TraceId.toString(),
      ResultIndex: ResultIndexValue,
    };

    try {
      setLoading(true);
      const res = await axios.post(FLIGHT_SEAT_MAP, payload);
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

  const selectedPassenger = useSelector(
    state => state.commomReducer.selectedPassengers,
  );
  // console.log('selectedPassenger', selectedPassenger);

  const passengerNames = selectedPassenger.map(
    passenger => `${passenger?.firstName} ${passenger?.LastName}`,
  );

  // const handleSeatSelect = seat => {
  //   console.log('handleSeatSelect', !seat.IsBooked);
  //   if (!seat.IsBooked) {
  //     dispatch(flightSelectSeat(seat));
  //     dispatch(addSeatAmount(seat.Amount));
  //   }
  // };

  const handleSeatSelect = seat => {
    if (!seat.IsBooked) {
      const isSelected = flightSeatSelectData.some(
        selectedSeat => selectedSeat.SeatNumber === seat.SeatNumber,
      );
      if (isSelected) {
        // Deselect seat
        dispatch(flightSelectSeat(seat, false)); // Assuming flightSelectSeat handles deselection when second parameter is false
        dispatch(removeSeatAmount(seat.Amount));
      } else {
        // Select seat
        dispatch(flightSelectSeat(seat, true)); // Assuming flightSelectSeat handles selection when second parameter is true
        dispatch(addSeatAmount(seat.Amount));
      }
    }
  };

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
              onPress={() => handleSeatSelect(seat)}
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
           textTransform:'uppercase',
           textAlign:'center',
           color:Colors.theme_background
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
          <View style={{flexDirection: 'row', gap: 10, flexWrap: 'wrap'}}>
            {selectedItem.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.gray_color,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 5,
                    gap: 10,
                    borderWidth: 0.5,
                    borderColor: Colors.wageningen_green,
                  }}
                  key={index}>
                  <Text
                    key={item.id}
                    style={{
                      color: Colors.gray_text_color,
                      fontSize: SF(18),
                      fontWeight: '600',
                    }}>
                    {item.firstName}
                  </Text>
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
                resizeMode:'contain'
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
          backgroundColor:'#f0f0f0',
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          borderColor:'black',
          paddingBottom:SH(10),
          marginTop:SH(10),
          borderColor:'gray',
          borderWidth:1,
          display:'flex',
          flexDirection:'row'
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
              fontFamily:'Poppins-Bold'
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
    backgroundColor:'#e1f3f7',
    borderTopLeftRadius: SH(200),
    borderTopRightRadius: SH(200),
    paddingBottom: SH(5),
    padding:SW(10)
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
