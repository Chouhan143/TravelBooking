import React, {useState, useMemo, useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {BookingTabStyle} from '../../styles';
import {
  DropDown,
  RadioButton,
  Button,
  Spacing,
  PersonAddFun,
  DatePicker,
} from '../../components';
import {SF, SH} from '../../utils';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import useFlightSearch from '../../hooks/useFlightSearch';
import axios from 'axios';
import {getData} from '../../hooks/ApiHelper';
import {FLIGHT_CITY_LIST} from '../../utils/BaseUrl';
import useFlightGetCalendar from '../../hooks/useFlightGetCalendar';
import {useDispatch} from 'react-redux';
import {flightSearchPayload} from '../../redux/action';
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
  const [value, setValue] = useState(null);
  const [cityData, setCity] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  console.log('fromCity', fromCity);
  const [isFocus, setIsFocus] = useState(false);
  const [isFromFocus, setIsFromFocus] = useState(false); // State for 'From' dropdown focus
  const [isToFocus, setIsToFocus] = useState(false); // State for 'To' dropdown focus

  const RadioData = [
    {label: t('Economy'), value: '1'},
    {label: t('Premium_Economy'), value: '2'},
    {label: t('Business'), value: '3'},
  ];

  // city get api

  useEffect(() => {
    const flightCity = async () => {
      try {
        const res = await getData(FLIGHT_CITY_LIST);

        const transformedData = res.data.map(airport => ({
          label: airport.airport_city_name,
          value: airport.airport_id.toString(), // You can use airport_id as the value or any other unique identifier
        }));
        setCity(transformedData);
      } catch (error) {
        console.log('error >', error);
      }
    };
    flightCity();
  }, []);

  // search flight Data handle
  const handleFlightSearch = () => {
    const payload = {
      AdultCount: state.AdultCount,
      ChildCount: state.ChildCount,
      InfantCount: state.InfantCount,
      JourneyType: '1',
      Segments: [
        {
          Origin: fromCity,
          Destination: toCity,
          FlightCabinClass: state.FloorNumber,
          PreferredDepartureTime: '2024-06-06T00:00:00',
          PreferredArrivalTime: '2024-06-06T00:00:00',
        },
      ],
    };
    console.log('payload', payload);
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

  return (
    <View>
      <View>
        <View style={BookingTabStyles.FlightMainBox}>
          <View style={BookingTabStyles.WithFrom}>
            <Text style={BookingTabStyles.FromText}>{t('From')}</Text>
            <DropDown
              style={[
                BookingTabStyles.dropdown,
                isFromFocus && {borderColor: Colors.blue},
              ]}
              data={cityData || []}
              search
              maxHeight={SH(300)}
              labelField="label"
              valueField="value"
              searchPlaceholder={t('Search')}
              value={fromCity}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setFromCity(item.label);
                setIsFromFocus(false);
              }}
              dropdownStyle={BookingTabStyles.dropdownStyleTwo}
            />
          </View>
          <View style={BookingTabStyles.WithFrom}>
            <Text style={BookingTabStyles.ToText}>{t('TO_Text')}</Text>
            <DropDown
              style={[
                BookingTabStyles.dropdown,
                isToFocus && {borderColor: Colors.BlackText},
              ]}
              data={cityData || []}
              search
              maxHeight={SH(300)}
              labelField="label"
              valueField="value"
              searchPlaceholder={t('Search')}
              value={toCity}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setToCity(item.label);
                setIsToFocus(false);
              }}
              dropdownStyle={BookingTabStyles.dropdownStyleTwo}
            />
          </View>
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
              <Text
                style={{fontSize: SF(16), color: 'green', fontWeight: '800'}}>
                + Add Return
              </Text>
            </View>
          )}
        </View>
        <Spacing space={SH(30)} />
        <View style={BookingTabStyles.SelectPersonBox}>
          <PersonAddFun
            TitleIcon={'man'}
            Icon={'Ionicons'}
            Title={t('Adults')}
            Subtitle={t('12years')}
            onCounterChange={value => handleCounterChange('AdultCount', value)}
          />
          <PersonAddFun
            TitleIcon={'child'}
            Icon={'FontAwesome'}
            Title={t('Children')}
            Subtitle={t('212years')}
            onCounterChange={value => handleCounterChange('ChildCount', value)}
          />
          <PersonAddFun
            TitleIcon={'baby'}
            Icon={'FontAwesome5'}
            Title={t('Infants')}
            Subtitle={t('02years')}
            onCounterChange={value => handleCounterChange('InfantCount', value)}
          />
        </View>
        <Spacing space={SH(30)} />
        <View>
          {/* <RadioButton onChangeText={(text) => setState({ ...state, FloorNumber: text })}
                        value={state.FloorNumber} arrayData={RadioData} /> */}
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
    </View>
  );
};

export default FlightTab;
