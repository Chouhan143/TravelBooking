import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
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
export default function HotelMoreDetails() {
  const [RoomData, setRoomData] = useState(null);
  const [reserve, setReserve] = useState(false);
  const [userRadio, setUserRadio] = useState(false);

  const handlerRemove = () => {
    setReserve(!reserve);
  };

  const handleRadio = value => {
    setUserRadio(value);
  };

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

  const RenderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.RoomTypeName}</Text>
        {item.DayRates.map((rate, index) => (
          <View key={index} style={styles.rateContainer}>
            <Text style={styles.rateText}>
              <FontAwesome name={'rupee'} color="black" />
              {rate.Amount}
            </Text>
            <Text style={styles.rateText}>{formatDate(rate.Date)}</Text>
          </View>
        ))}
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

            {reserve ? (
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
                onPress={handlerRemove}>
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
                onPress={handlerRemove}>
                <Text style={{color: 'white', fontFamily: 'Poppins-Bold'}}>
                  Reserve
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* counter functinality here  */}

          {reserve ? (
            <>
              <View
                style={{
                  flex: 1,
                  width: SW(170),
                  height: SH(40),
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
                  }}>
                  <FontAwesome6
                    name={'minus'}
                    size={15}
                    color={Colors.black_text_color}
                  />
                </TouchableOpacity>

                <TextInput
                  placeholder="1"
                  value="1 room"
                  placeholderTextColor={Colors.black_text_color}
                  textAlign="center"
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                  }}
                />

                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    borderLeftWidth: SW(1),
                    borderLeftColor: Colors.gray_color,
                  }}>
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
                    />
                    <FontAwesome5 name={'user-alt'} size={18} />
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
                    />
                    <FontAwesome5 name={'user-friends'} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </View>
    );
  };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={{textAlign:'center',
            paddingTop:SH(15),fontFamily:'Poppins-Bold',fontSize:SF(20),
            textTransform:'capitalize',color:Colors.theme_background}}>Select Room</Text>
            <FlatList
                data={RoomData}
                renderItem={RenderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText} onPress={()=>navigation.navigate(RouteName.HOTEL_GUEST_DETAILS)}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
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
    padding: SH(20),
  },
  continueButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  guestChoose: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SW(10),
    paddingHorizontal: SW(20),
    borderRadius: 4,
    flexDirection: 'row',
    gap: SW(5),
  },
});
