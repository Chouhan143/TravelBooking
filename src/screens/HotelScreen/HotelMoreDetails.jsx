import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors, SH, SW, SF} from '../../utils';
import {RouteName} from '../../routes';
import {HOTEL_ROOM_DETAILS} from '../../utils/BaseUrl';
import ReadMoreText from '../../components/commonComponents/ReadMore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import {roomCounterIncrement, roomCounterDecrement} from '../../redux/action';

export default function HotelMoreDetails() {
  const dispatch = useDispatch();
  const [RoomData, setRoomData] = useState(null);
  const [reserve, setReserve] = useState(false);
  const [userRadio, setUserRadio] = useState(false);
  const [reserveIndexes, setReserveIndexes] = useState([]);
  const handleRadio = value => {
    setUserRadio(value);
  };

  const handleIncrement = () => {
    dispatch(roomCounterIncrement());
  };

  const handleDecrement = () => {
    dispatch(roomCounterDecrement());
  };
  const count = useSelector(state => state.commomReducer.hotelRoomCounter);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const payload = {
          ResultIndex: '9',
          SrdvIndex: 'SrdvTB',
          SrdvType: 'SingleTB',
          HotelCode: '92G|DEL',
          TraceId: '1',
        };
        const res = await axios.post(HOTEL_ROOM_DETAILS, payload);
        const RoomDataArr = res.data.GetHotelRoomResult.HotelRoomsDetails;
        setRoomData(RoomDataArr);
        console.log('Room Data', JSON.stringify(RoomDataArr));
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchRoomData();
  }, []);

  const navigation = useNavigation();

  const formatDate = dateString => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatHotelDetails = detailsString => {
    if (!detailsString) {
      return 'No details provided';
    }

    const [roomType, details] = detailsString.split('#^#');
    if (!roomType || !details) {
      return 'Invalid details format';
    }

    const [charges, ...cancellationPolicies] = details.split('|');
    if (!charges || cancellationPolicies.length === 0) {
      return 'Invalid cancellation policy format';
    }

    const formatDate = dateString => {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formattedPolicies = cancellationPolicies.map(policy => {
      const [amountText, dateRange] = policy.split(', If cancelled between ');
      if (!amountText || !dateRange) {
        return 'Invalid policy format';
      }
      const [startDate, endDate] = dateRange.split(' and ');
      if (!startDate || !endDate) {
        return 'Invalid date range format';
      }

      return `${amountText.trim()}, If cancelled between ${formatDate(
        startDate.trim(),
      )} and ${formatDate(endDate.trim())}`;
    });

    return `Room Type: ${roomType.replace(
      '\n',
      ' ',
    )}\nCharges: ${charges.trim()}\n\nCancellation Policies:\n${formattedPolicies.join(
      '\n',
    )}`;
  };

  const handleToggleReserve = index => {
    setReserveIndexes(prevState =>
      prevState.includes(index)
        ? prevState.filter(i => i !== index)
        : [...prevState, index],
    );
  };

  const RenderItem = ({item, index}) => {
    const dayRate = item.DayRates.map(day => Math.floor(day.Amount));
    const Date = item.DayRates.map(day => day.Date);
    const priceMulRooms = dayRate * count;

    const handlerRemove = index => {
      setSelectedIndex(index === selectedIndex ? null : index);
    };

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.RoomTypeName}</Text>
        <View style={styles.rateContainer}>
          <Text style={styles.rateText}>
            <FontAwesome name={'rupee'} color="black" />
            {dayRate}
          </Text>
          <Text style={styles.rateText}>{formatDate(Date)}</Text>
        </View>

        {item.Amenities.map((amenties, index) => (
          <View key={index} style={styles.rateContainer}>
            <Text style={styles.rateText}>{amenties}</Text>
          </View>
        ))}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.rateText}>
            {formatDate(item.LastCancellationDate)}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'gray',
              fontSize: SF(10),
            }}>
            (last data for Cancellation)
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: SH(5),
          }}>
          <Text style={styles.Text}>SmokingPreference </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'gray',
              fontSize: SF(10),
            }}>
            {item.SmokingPreference}
          </Text>
        </View>
        <View>
          <Text style={styles.Text}>CancellationPolicies</Text>
          <View>
            {item.CancellationPolicies.map((policy, index) => (
              <View
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#e1e7e8',
                  padding: SW(5),
                  borderRadius: 5,
                  marginBottom: SH(5),
                }}>
                <Text
                  style={{
                    fontSize: SF(12),
                    fontFamily: 'Poppins-Regular',
                    color: 'black',
                  }}>
                  {' '}
                  Charges
                  {policy.Charge}
                </Text>
                <Text style={styles.rateText}>
                  {' '}
                  From
                  {formatDate(policy.FromDate)}
                </Text>
                <Text style={styles.rateText}>
                  {' '}
                  To
                  {formatDate(policy.ToDate)}
                </Text>
              </View>
            ))}
          </View>
          <View style={{marginVertical: SH(5)}}>
            <Text style={styles.Text}>CancellationPolicy</Text>
            <ReadMoreText
              text={formatHotelDetails(item.CancellationPolicy)}
              textStyle={{
                fontFamily: 'Poppins-Regular',
                color: 'gray',
                fontSize: SF(10),
              }}
              readMoreStyle={{
                color: Colors.theme_background,
                fontFamily: 'Poppins-Bold',
                fontSize: SF(13),
                marginLeft: 0,
                marginTop: SH(5),
              }}
            />

            {reserveIndexes.includes(index) ? (
              <TouchableOpacity
                style={{
                  borderWidth: SH(1),
                  borderColor: Colors.theme_background,

                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '90%',
                  borderRadius: 10,
                  height: SH(40),
                  alignItems: 'center',
                  marginVertical: SH(15),
                  flexDirection: 'row',
                  gap: 10,
                }}
                onPress={() => handleToggleReserve(index)}>
                <FontAwesome6
                  name={'delete-left'}
                  size={18}
                  color={Colors.theme_background}
                />
                <Text
                  style={{
                    color: Colors.theme_background,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.theme_background,
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  width: '90%',
                  borderRadius: 10,
                  height: SH(40),
                  alignItems: 'center',
                  marginVertical: SH(15),
                }}
                onPress={() => handleToggleReserve(index)}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Bold'}}>
                  Reserve
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* counter functinality here  */}

          {reserveIndexes.includes(index) ? (
            <>
              <View
                style={{
                  flex: 1,
                  width: SW(170),
                  height: SH(42),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: SW(5),
                  flexDirection: 'row',
                  paddingHorizontal: SW(5),
                  borderWidth: SW(1),
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderRightWidth: SW(1),
                    borderRightColor: Colors.gray_color,
                  }}
                  onPress={handleDecrement}>
                  <FontAwesome6
                    name={'minus'}
                    size={15}
                    color={Colors.black_text_color}
                  />
                </TouchableOpacity>

                <TextInput
                  placeholder="1"
                  value={`${count} room`}
                  placeholderTextColor={Colors.black_text_color}
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: 'black',
                    fontSize: SF(12),
                    alignSelf: 'center',
                  }}
                />
                {/* <Text>{count}</Text> */}

                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderLeftWidth: SW(1),
                    borderLeftColor: Colors.gray_color,
                  }}
                  onPress={handleIncrement}>
                  <FontAwesome6
                    name={'plus'}
                    size={15}
                    color={Colors.black_text_color}
                  />
                </TouchableOpacity>
              </View>
              {/* choose no of guest  */}
              <View style={{paddingVertical: 10}}>
                <Text style={styles.Text}>Choose No of guest</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.guestChoose}
                    onPress={() => handleRadio('single')}>
                    <Fontisto
                      name={
                        userRadio === 'single'
                          ? 'radio-btn-active'
                          : 'radio-btn-passive'
                      }
                      size={18}
                      color={userRadio === 'single' ? 'blue' : 'gray'}
                    />
                    <FontAwesome5 name={'user-alt'} size={18} color={'#000'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.guestChoose, {marginLeft: SW(15)}]}
                    onPress={() => handleRadio('couple')}>
                    <Fontisto
                      name={
                        userRadio === 'couple'
                          ? 'radio-btn-active'
                          : 'radio-btn-passive'
                      }
                      size={18}
                      color={userRadio === 'couple' ? 'blue' : 'gray'}
                    />
                    <FontAwesome5
                      name={'user-friends'}
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'space-around', margin: SW(10)}}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View>
                      <Text style={styles.text}>{count} room </Text>
                      <Text style={styles.text}>selected </Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      {/* <Text
                        style={{
                          color: 'red',
                          textDecorationLine: 'line-through',
                          marginRight: SW(5),
                        }}>
                        <FontAwesome name={'rupee'} size={12} color={'red'} />
                        {priceMulRooms}
                      </Text> */}
                      <Text style={styles.text}>
                        <FontAwesome name={'rupee'} size={12} color={'#000'} />
                        {priceMulRooms}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.text}>include taxes and </Text>
                      <Text style={styles.text}>charges </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.text, {textAlign: 'center'}]}>
                      {' '}
                      (1 night , wed 26 jun 2024 - thur jun 2024){' '}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          textAlign: 'center',
          paddingTop: SH(15),
          fontFamily: 'Poppins-Bold',
          fontSize: SF(20),
          textTransform: 'capitalize',
          color: Colors.theme_background,
        }}>
        Select Room
      </Text>
      <FlatList
        data={RoomData}
        renderItem={RenderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate(RouteName.HOTEL_GUEST_DETAILS)}>
        <Text style={styles.continueButtonText}>Continue</Text>

        <Text style={styles.continueButtonText}> ₹4000</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: SH(50),
    margin: SW(15),
  },
  itemContainer: {
    backgroundColor: '#f2f5f5',
    padding: SW(10),
    marginBottom: SH(10),
    borderRadius: 8,
  },
  itemText: {
    color: 'black',
    fontSize: SF(15),
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SH(5),
  },
  rateText: {
    color: 'black',
    fontSize: SF(12),
    fontFamily: 'Poppins-Regular',
  },
  Text: {
    color: 'black',
    fontSize: SF(12),
    fontFamily: 'Poppins-Medium',
  },
  continueButton: {
    backgroundColor: Colors.theme_background,
    padding: SH(15),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: SF(17),
  },
  guestChoose: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SW(7),
    paddingHorizontal: SW(7),
    borderRadius: 4,
    flexDirection: 'row',
    gap: SW(5),
    margin: SW(5),
  },
  text: {
    color: '#000',
    fontSize: SF(12),
    fontFamily: 'Poppins-Regular',
  },
});
