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

const FlightTab = props => {
  const {t} = useTranslation();
  const {FsearchData, errors, loading} = useFlightSearch();
  const {calendarDataGet} = useFlightGetCalendar();
  const {onPress, tabTrip} = props;
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
  const [filteredFlightDataFrom, setFilteredFlightDataFrom] = useState([]);
  const [filteredFlightDataTo, setFilteredFlightDataTo] = useState([]);
  const [CityData, setCityData] = useState([]);
  const [isSourceCityFocused, setIsSourceCityFocused] = useState(false);
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
          value: airport.airport_id.toString(),
        }));
        setCityData(transformedData);
        console.log('Flight Data', res);
      } catch (error) {
        console.log('error >', error);
      }
    };
    flightCity();
  }, []);

  const handleFlightSearch = () => {
    const payload = {
      AdultCount: state.AdultCount,
      ChildCount: state.ChildCount,
      InfantCount: state.InfantCount,
      JourneyType: '1',
      Segments: [
        {
          Origin: sourceCity,
          Destination: destinationCity,
          FlightCabinClass: state.FloorNumber,
          PreferredDepartureTime: '2024-10-07T00:00:00',
          PreferredArrivalTime: '2024-10-07T00:00:00',
        },
      ],
    };
    console.log('payload >>>>>>', payload);
    FsearchData(payload);
    calendarDataGet(payload);
    dispatch(flightSearchPayload(payload));
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
  };

  const handleDestinationCity = query => {
    setDestinationCity(query);
  };

  const clearSearchFrom = () => {
    setSourceCity('');
  };

  const clearSearchTo = () => {
    setDestinationCity('');
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
                  } else {
                    setSourceCity(item.label);
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
                        fontWeight: '400',
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
          <Text style={BookingTabStyles.Departuredatext}>
            {t('Departure_Dates')}
          </Text>
          <DatePicker />
        </View>

        {tabTrip !== '1' ? (
          <View style={BookingTabStyles.Departuredateview}>
            <Text style={BookingTabStyles.Departuredatext}>
              {t('Return_Dates')}
            </Text>
            <DatePicker />
          </View>
        ) : (
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text style={BookingTabStyles.Departuredatext}>
              Save more on Roundtrip
            </Text>
            <TouchableOpacity onPress={() => tabTrip == '2'}>
              <Text
                style={{fontSize: SF(16), color: 'green', fontWeight: '800'}}>
                {' '}
                + Add Return
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Spacing space={SH(30)} />
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
          <ActivityIndicator size={40} color={Colors.useTheme} />
        ) : (
          <Button title={t('Search_Flights')} onPress={handleFlightSearch} />
        )}
      </View>
    </View>
  );
};

export default FlightTab;
