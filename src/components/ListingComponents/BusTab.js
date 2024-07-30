import React, {useState, useMemo, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {DropDown, Button, Spacing, DatePicker} from '../../components';
import {Colors, Fonts, SF, SH, SW} from '../../utils';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import {BookingTabStyle} from '../../styles';
import axios from 'axios';
import {BUS_LIST, BUS_SEARCH} from '../../utils/BaseUrl';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
import {setResultIndex, setTraceId,setBusData, setSearchBusData, setResultData, setSearchBusPayload} from '../../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Lottie } from '../../components';
const BusTab = props => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [sourceCity, setsourceCity] = useState('');
  const [destinationCity, setdestinationCity] = useState('');
  const [filteredBusDataFrom, setFilteredBusDataFrom] = useState([]);
  const [filteredBusDataTo, setFilteredBusDataTo] = useState([]);
  const [busData, setBusData] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [departDate, setDepartDate] = useState(null); // Assuming depart_date is a date
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const {Colors} = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const BookingTabStyles = useMemo(() => BookingTabStyle(Colors), [Colors]);
  
  const [isSourceCityFocused, setIsSourceCityFocused] = useState(false);
  const [isDestinationCityFocused, setIsDestinationCityFocused] =useState(false);
  const [hideFlatListFrom, setHideFlatListFrom] = useState(false);
  const [hideFlatListTo, setHideFlatListTo] = useState(false);
  useEffect(() => {
    // Function to calculate current date and the next five dates
    const calculateDates = () => {
      const currentDate = new Date();
      const nextDates = [];
      for (let i = 0; i < 6; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        nextDates.push(date);
      }
      return nextDates;
    };

    // Set the dates state with the calculated dates
    setDates(calculateDates());
  }, []);

  const busDataFetch = async () => {
    try {
      const res = await axios.get(BUS_LIST);
      const busListArr = res.data.data;

      setBusData(Array.isArray(busListArr) ? busListArr : []);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    busDataFetch();
  }, []);

  const handleDateSelect = date => {
    // Convert the selected date string to a Date object
    const selectedDate = new Date(date);

    // Get the year, month, and date components
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(selectedDate.getDate()).padStart(2, '0');

    // Concatenate the components to form the desired date format
    const formattedDate = `${year}-${month}-${day}`;

    // Set the departDate state with the formatted date
    setDepartDate(formattedDate);

    // Ab yahan par API request bhej sakte ho, ya kuch aur actions perform kar sakte ho
  };
  // calendershow

  const showMoreCalender = () => {
    setShowCalender(!showCalender);
  };
  const Data=useSelector(state=>state.commomReducer.busPayload);
  console.log('Data',Data);
  // bus search api
  const handleSearch = async () => {
    try {
      setLoading(true);
      // Make sure sourceCity, destinationCity, and departDate are set before making the API call
      if (sourceCity && destinationCity && departDate) {
        const payload = {
          source_city: sourceCity,
          destination_city: destinationCity,
          depart_date: departDate,
        };
        console.log('payload', payload);
        const res = await axios.post(BUS_SEARCH, payload);
        dispatch(setSearchBusPayload(payload));
        // console.log('bus search data ',res.data);
        const SearchBusData=res.data;
        dispatch(setSearchBusData(SearchBusData));
        // Check if response status is successful
        if (res.status === 200) {
          const ResultData= res.data.data.Result;
          dispatch(setResultData(ResultData));
          navigation.navigate(RouteName.BUS_LIST_SCREEN, {
            sourceCity: sourceCity,
            destinationCity: destinationCity,
            departDate: departDate,
          });
        } else {
          console.error(
            'Error searching buses: Unexpected response status',
            res.status,
          );
        }
      } else {
        // Handle case where required fields are not set
        Toast.show({
          type: 'error',
          text1:
            'Please select source city, destination city, and departure date.',
          text1Style: {color: '#000', fontSize: 12},
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        text1Style: {color: '#000', fontSize: 12},
      });
      console.error('Error searching buses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filteredDataFrom = busData.filter(item =>
      item.busodma_destination_name
        .toLowerCase()
        .includes(sourceCity.toLowerCase()),
    );
    setFilteredBusDataFrom(filteredDataFrom);
  }, [sourceCity, busData]);

  useEffect(() => {
    const filteredDataTo = busData.filter(item =>
      item.busodma_destination_name
        .toLowerCase()
        .includes(destinationCity.toLowerCase()),
    );
    setFilteredBusDataTo(filteredDataTo);
  }, [destinationCity, busData]);

  const handlesourceCity = query => {
    setsourceCity(query);
    
  };

  const handledestinationCity = query => {
    setdestinationCity(query);
    
  };

  const clearSearchFrom = () => {
    setsourceCity('');
  };

  const clearSearchTo = () => {
    setdestinationCity('');
  };
  const handleSelectCity = (cityName, isFrom) => {
    if (isFrom) {
      setsourceCity(cityName);
      setHideFlatListFrom(true);
    } else {
      setdestinationCity(cityName);
      setHideFlatListTo(true);
    }
  };
  return (
    <View>
      <View>
        <View style={BookingTabStyles.FlightMainBox}>
        <View style={BookingTabStyles.WithFrom}>
        <Text style={BookingTabStyles.FromText}>From</Text>
        <TextInput
          placeholder="Starting Point"
          placeholderTextColor={'gray'}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
          value={sourceCity}
          onChangeText={query => handlesourceCity(query)}
          onFocus={() => {
            setIsSourceCityFocused(true);
            setHideFlatListFrom(false); // Show suggestions when focused
          }}
          onBlur={() => setIsSourceCityFocused(false)}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: isSourceCityFocused ? 1 : 0.5,
            borderColor: isSourceCityFocused ? Colors.theme_background : 'gray',
            borderRadius: 10,
            color: Colors.theme_background,
          }}
        />
        {!hideFlatListFrom && sourceCity !== '' &&  (
          <FlatList
            data={filteredBusDataFrom.slice(0, 5)}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => handleSelectCity(item.busodma_destination_name, true)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'gray',
                      marginHorizontal: 10,
                      marginVertical: 5,
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>
                      {item.busodma_destination_name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text>No results found</Text>}
          />
        )}
        {sourceCity && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 50,
            }}
            onPress={clearSearchFrom}
          >
            <MaterialCommunityIcons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* Destination City Input */}
      <View style={BookingTabStyles.WithFrom}>
        <Text style={BookingTabStyles.ToText}>To</Text>
        <TextInput
          placeholder="Destination"
          placeholderTextColor={'gray'}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
          value={destinationCity}
          onChangeText={query => handledestinationCity(query)}
          onFocus={() => {
            setIsDestinationCityFocused(true);
            setHideFlatListTo(false); // Show suggestions when focused
          }}
          onBlur={() => setIsDestinationCityFocused(false)}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: isDestinationCityFocused ? 1 : 0.5,
            borderColor: isDestinationCityFocused ? Colors.theme_background : 'gray',
            borderRadius: 10,
            color: Colors.theme_background,
          }}
        />
        {!hideFlatListTo && destinationCity !== '' && (
          <FlatList
            data={filteredBusDataTo.slice(0, 5)}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => handleSelectCity(item.busodma_destination_name, false)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'gray',
                      marginHorizontal: 10,
                      marginVertical: 5,
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#000' }}>
                      {item.busodma_destination_name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text>No results found</Text>}
          />
        )}
        {destinationCity && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 15,
              top: 65,
            }}
            onPress={clearSearchTo}
          >
            <MaterialCommunityIcons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
        </View>
        <Spacing space={SH(10)} />
        <View style={BookingTabStyles.FlewRows}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: SF(16),
                  fontWeight: '700',
                  color: '#000',
                  paddingTop: SH(20),
                  paddingBottom: SH(20),
                }}>
                Departure Date
              </Text>
            </View>
            <TouchableOpacity
              onPress={showMoreCalender}
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: SH(20),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: SF(14),
                  // paddingTop: SH(20),
                  color: Colors.theme_background,
                }}>
                Show More Dates
              </Text>
              <AntDesign
                name={'doubleright'}
                color={Colors.theme_background}
                size={15}
                style={{marginLeft: SW(7), marginTop: SH(3)}}
              />
            </TouchableOpacity>

            {/* <DatePicker onDateSelect={handleDateSelect} /> */}
          </View>
        </View>
        {/* boxes dates */}
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={dates}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              const formatDate = date => {
                const dayNames = [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ];
                const day = date.getDate();
                const dayName = dayNames[date.getDay()];
                return `${day} ${
                  day === new Date().getDate()
                    ? 'Today'
                    : dayName.charAt(0).toUpperCase() +
                      dayName.toLocaleLowerCase().slice(1, 3)
                }`;
              };

              // const isSelected = selectedDate === item;
              const isSelected =
                selectedDate.toDateString() === item.toDateString();
              const formattedDate = formatDate(item).split(' ');
              return (
                <TouchableOpacity
                  style={[
                    {
                      width: 60,
                      height: 60,
                      backgroundColor: 'lightgray',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 5,
                      borderRadius: 8,
                    },
                    isSelected && {backgroundColor: Colors.theme_background},
                  ]}
                  onPress={() => {
                    setSelectedDate(item);
                    console.log(item);
                    handleDateSelect(item); // Set the selected date as departDate
                  }}>
                  <Text
                    style={{
                      color: isSelected ? '#fff' : '#000',
                      textAlign: 'center',
                    }}>
                    <Text style={{fontSize: 13, fontFamily: 'Poppins-Bold'}}>
                      {formattedDate[0]}
                    </Text>
                    {'\n'}
                    <Text>{formattedDate[1]}</Text>
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {showCalender ? (
          <View>
            <Calendar
              onDayPress={day => handleDateSelect(day.dateString)}
              markedDates={{
                [departDate]: {selected: true, disableTouchEvent: true},
              }}
              minDate={new Date()}
              // maxDate={new Date().getTime() + 4 * 24 * 60 * 60 * 1000} // 4 days from current date
              hideArrows={false}
              hideExtraDays={true}
              disableMonthChange={false}
              firstDay={1}
              hideDayNames={false}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
            />
          </View>
        ) : null}

        <Spacing space={SH(80)} />
        {loading ? (
          <Lottie
          source={require('../../images/LottieAnimation/isLoader.json')}
          Lottiewidthstyle={{
            width: '32%',
            height: '80%',
            paddingTop: SH(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        ) : (
          <Button title={t('Search_Buses')} onPress={handleSearch} />
          // <Button title={t('Search_Buses')} onPress={SelectBus} />
        )}
      </View>
      <Spacing space={SH(20)} />
    </View>
  );
};
export default BusTab;
const styles = StyleSheet.create({
  dateBox: {
    width: 60,
    height: 60,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
  },
  selectedDateBox: {
    backgroundColor: Colors.theme_background,
  },
});
