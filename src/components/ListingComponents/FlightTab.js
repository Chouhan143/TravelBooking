import React, {useState, useMemo, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {BookingTabStyle} from '../../styles';
import {
  RadioButton,
  Button,
  Spacing,
  PersonAddFun,
  DatePicker,
  Lottie,
} from '../../components';
import {SF, SH, SW} from '../../utils';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import useFlightSearch from '../../hooks/useFlightSearch';
import {getData} from '../../hooks/ApiHelper';
import {FLIGHT_CITY_LIST} from '../../utils/BaseUrl';
import useFlightGetCalendar from '../../hooks/useFlightGetCalendar';
import {useDispatch} from 'react-redux';
import {flightSearchPayload} from '../../redux/action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FlightDatePicker from '../commonComponents/FlightDatePicker';

const FlightTab = props => {
  const {t} = useTranslation();
  const {FsearchData} = useFlightSearch();
  const {calendarDataGet} = useFlightGetCalendar();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const {onPress, tabTrip, setTabTrip} = props;
  const {Colors} = useTheme();
  const dispatch = useDispatch();
  const BookingTabStyles = useMemo(() => BookingTabStyle(Colors), [Colors]);

  const stateValue = {
    Economy: '',
    FloorNumber: '',
    AdultCount: 0,
    ChildCount: 0,
    InfantCount: 0,
  };

  const [state, setState] = useState(stateValue);
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [sourceCityCode, setSourceCityCode] = useState('');
  const [destinationCityCode, setDestinationCityCode] = useState('');
  const [filteredFlightDataFrom, setFilteredFlightDataFrom] = useState([]);
  const [filteredFlightDataTo, setFilteredFlightDataTo] = useState([]);
  const [CityData, setCityData] = useState([]);
  const [isSourceCityFocused, setIsSourceCityFocused] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [isDestinationCityFocused, setIsDestinationCityFocused] =
    useState(false);

  const RadioData = [
    {label: t('Economy'), value: '1'},
    {label: t('Premium_Economy'), value: '2'},
    {label: t('Business'), value: '3'},
  ];

  useEffect(() => {
    const flightCity = async () => {
      try {
        const res = await getData(FLIGHT_CITY_LIST);

        const transformedData = res.data.map(airport => ({
          label: airport.airport_city_name,
          cityCode: airport.airport_city_code,
          value: airport.airport_id.toString(),
        }));
        setCityData(transformedData);
      } catch (error) {
        console.log('error >', error);
      }
    };
    flightCity();
  }, []);

  const handleFlightSearch = () => {
    let segments = [
      {
        Origin: sourceCityCode,
        Destination: destinationCityCode,
        FlightCabinClass: state.FloorNumber,
        PreferredDepartureTime: `${departureDate}T00:00:00`,
        PreferredArrivalTime: `${departureDate}T01:00:00`,
      },
    ];
    if (tabTrip === '2') {
      segments.push({
        Origin: destinationCityCode,
        Destination: sourceCityCode,
        FlightCabinClass: state.FloorNumber,
        PreferredDepartureTime: `${returnDate}T00:00:00`,
        PreferredArrivalTime: `${returnDate}T01:00:00`,
      });
    }
    const searchPayload = {
      AdultCount: state.AdultCount,
      ChildCount: state.ChildCount,
      InfantCount: state.InfantCount,
      // JourneyType: tabTrip,
      // Segments: segments,
    //   "AdultCount": "1",
    // "ChildCount": "0",
    // "InfantCount": "0",
    "JourneyType": "1",
    
    Segments: [
        {
          //  Origin: sourceCityCode,
          // Destination: destinationCityCode, 
          "Origin": "DEL",
          "Destination": "BOM",
          FlightCabinClass: state.FloorNumber,
            PreferredDepartureTime: `${departureDate}T00:00:00`,
            PreferredArrivalTime: `${departureDate}T01:00:00`,
        }
    ]
    };
    FsearchData(searchPayload);
    console.log('search payload',searchPayload);
    dispatch(flightSearchPayload(searchPayload));

    // calender payload send in api request

    const calendarPayload = {
      AdultCount: state.AdultCount,
      ChildCount: state.ChildCount,
      InfantCount: state.InfantCount,
      JourneyType: tabTrip,
      Segments: [
        {
          Origin: sourceCityCode,
          Destination: destinationCityCode,  
          FlightCabinClass: state.FloorNumber,
          PreferredDepartureTime: `${departureDate}T00:00:00`,
          PreferredArrivalTime: `${departureDate}T01:00:00`,
        },
      ],
    };
    calendarDataGet(calendarPayload);
    console.log('calendarPayload', calendarPayload);
  };

  const handleCounterChange = (counterName, value) => {
    setState(prevState => ({
      ...prevState,
      [counterName]: value,
    }));
  };

  useEffect(() => {
    const filteredDataFrom = CityData.filter(item =>
      item.label.toLowerCase().includes(sourceCity.toLowerCase()),
    );
    setFilteredFlightDataFrom(filteredDataFrom);
  }, [sourceCity, CityData]);

  useEffect(() => {
    const filteredDataTo = CityData.filter(item =>
      item.label.toLowerCase().includes(destinationCity.toLowerCase()),
    );
    setFilteredFlightDataTo(filteredDataTo);
  }, [destinationCity, CityData]);

  const handleSourceCity = query => {
    setSourceCity(query);
    const city = CityData.find(
      item => item.label.toLowerCase() === query.toLowerCase(),
    );
    if (city) {
      setSourceCityCode(city.cityCode);
    } else {
      setSourceCityCode('');
    }
  };

  const handleDestinationCity = query => {
    setDestinationCity(query);
    const city = CityData.find(
      item => item.label.toLowerCase() === query.toLowerCase(),
    );
    if (city) {
      setDestinationCityCode(city.cityCode);
    } else {
      setDestinationCityCode('');
    }
  };

  const clearSearchFrom = () => {
    setSourceCity('');
    setSourceCityCode('');
  };

  const clearSearchTo = () => {
    setDestinationCity('');
    setDestinationCityCode('');
  };

  const addReturnFun = () => {
    setTabTrip(2);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={BookingTabStyles.FlightMainBox}>
        <View style={BookingTabStyles.WithFrom}>
          <Text style={BookingTabStyles.FromText}>{t('From')}</Text>
          <TextInput
            placeholder="Enter Your Source City"
            placeholderTextColor="gray"
            value={sourceCity}
            onChangeText={query => handleSourceCity(query)}
            onFocus={() => setIsSourceCityFocused(true)}
            onBlur={() => setIsSourceCityFocused(false)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderWidth: isSourceCityFocused ? 1 : 0.5,
              borderColor: isSourceCityFocused
                ? Colors.theme_background
                : 'gray',
              borderRadius: 10,
              color: Colors.theme_background,
            }}
          />
          {sourceCity ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: SW(15),
                top: SH(50),
              }}
              onPress={clearSearchFrom}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={BookingTabStyles.WithFrom}>
          <Text style={BookingTabStyles.ToText}>{t('TO_Text')}</Text>
          <TextInput
            placeholder="Enter Your Destination City"
            placeholderTextColor="gray"
            value={destinationCity}
            onChangeText={query => handleDestinationCity(query)}
            onFocus={() => setIsDestinationCityFocused(true)}
            onBlur={() => setIsDestinationCityFocused(false)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderColor: isDestinationCityFocused
                ? Colors.theme_background
                : 'gray',
              borderWidth: isDestinationCityFocused ? 1 : 0.5,
              borderRadius: 10,
              color: Colors.theme_background,
            }}
          />
          {destinationCity ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: SW(15),
                top: SH(65),
              }}
              onPress={clearSearchTo}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {sourceCity !== '' || destinationCity !== '' ? (
          <View style={{marginVertical: SH(10), marginTop: SH(15)}}>
            <Text
              style={{
                fontSize: SF(16),
                fontWeight: '700',
                color: '#000',
              }}>
              Search Results
            </Text>
          </View>
        ) : null}
        {sourceCity !== '' || destinationCity !== '' ? (
          <FlatList
            data={
              destinationCity !== ''
                ? filteredFlightDataTo.slice(0, 5)
                : filteredFlightDataFrom.slice(0, 5)
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  if (destinationCity !== '') {
                    setDestinationCity(item.label);
                    setDestinationCityCode(item.cityCode);
                  } else {
                    setSourceCity(item.label);
                    setSourceCityCode(item.cityCode);
                  }
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="office-building-marker"
                    size={22}
                  />
                  <View
                    style={{
                      flex: 1,
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'gray',
                      marginHorizontal: 10,
                      marginVertical: 5,
                      paddingBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: SF(16),
                        fontFamily: 'Poppins-Regular',
                        color: '#000',
                      }}>
                      {item.label}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text>No results found</Text>}
          />
        ) : null}
      </View>
      <View style={BookingTabStyles.FlewRows}>
        <View style={BookingTabStyles.Departuredateview}>
          <Text
            style={{
              fontFamily: 'Poppins_Medium',
              fontSize: SF(15),
              marginTop: SH(15),
              color: Colors.theme_background,
              marginBottom: SH(10),
            }}>
            {t('Departure_Dates')}
          </Text>
          {/* <DatePicker /> */}
          <FlightDatePicker
            onDateSelectflight={date => setDepartureDate(date)}
          />
        </View>

        {tabTrip !== '1' ? (
          <View style={BookingTabStyles.Departuredateview}>
            <Text
              style={{
                fontFamily: 'Poppins_Medium',
                fontSize: SF(15),
                marginTop: SH(15),
                color: Colors.theme_background,
                marginBottom: SH(10),
              }}>
              {t('Return_Dates')}
            </Text>
            {/* <DatePicker /> */}
            <FlightDatePicker
              onDateSelectflight={date => setReturnDate(date)}
            />
          </View>
        ) : (
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={BookingTabStyles.Departuredatext}>
              Save more on Roundtrip
            </Text>
            <TouchableOpacity onPress={addReturnFun}>
              <Text
                style={{fontSize: SF(16), color: 'green', fontWeight: '800'}}>
                {' '}
                + Add Return
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Spacing space={SH(20)} />
      <View style={BookingTabStyles.SelectPersonBox}>
        <PersonAddFun
          TitleIcon="man"
          Icon="Ionicons"
          Title={t('Adults')}
          Subtitle={t('12years')}
          onCounterChange={value => handleCounterChange('AdultCount', value)}
        />
        <PersonAddFun
          TitleIcon="child"
          Icon="FontAwesome"
          Title={t('Children')}
          Subtitle={t('212years')}
          onCounterChange={value => handleCounterChange('ChildCount', value)}
        />
        <PersonAddFun
          TitleIcon="baby"
          Icon="FontAwesome5"
          Title={t('Infants')}
          Subtitle={t('02years')}
          onCounterChange={value => handleCounterChange('InfantCount', value)}
        />
      </View>
      <Spacing space={SH(30)} />
      <View>
        <RadioButton
          arrayData={RadioData}
          onChangeText={text => setState({...state, FloorNumber: text})}
          value={state.FloorNumber}
        />
        {loading ? (
          <Lottie
            source={require('../../images/LottieAnimation/isLoader.json')}
            Lottiewidthstyle={{
              width: '32%',
              height: '80%',
              paddingTop: SH(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <Button title={t('Search_Flights')} onPress={handleFlightSearch} />
        )}
      </View>
    </View>
  );
};

export default FlightTab;
