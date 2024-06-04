import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BusListScreenStyle} from '../../styles';
import {Colors, SF} from '../../utils';
import {VectorIcon} from '../commonComponents';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const BusListFun = props => {
  const {index, item, onPress} = props;
  const {t} = useTranslation();
  const BusListScreenStyles = useMemo(
    () => BusListScreenStyle(Colors),
    [Colors],
  );

  const departureTime = new Date(item.departure_time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const arivalTime = new Date(item.arrival_time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const depTime = new Date(item.departure_time).getTime();
  const arrTime = new Date(item.arrival_time).getTime();
  const durationMs = arrTime - depTime;

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <TouchableOpacity
      style={BusListScreenStyles.BusBoxWraper}
      onPress={onPress}>
      <View style={BusListScreenStyles.BusdataTopBox}>
        <View>
          <Text
            style={[
              BusListScreenStyles.TravelCompanyText,
              {color: '#000', fontWeight: '700'},
            ]}>
            {t(item.travel_name)}
          </Text>
          <Text style={BusListScreenStyles.AcNonAcText}>
            {t(item.bus_type)}
          </Text>
        </View>
        <View style={BusListScreenStyles.TextrightSet}>
          <Text
            style={[
              BusListScreenStyles.MainPriceText,
              {color: '#000', fontWeight: '700'},
            ]}>
            ₹ {item.price}
          </Text>
          {/* <Text style={BusListScreenStyles.DiscountAmountText}>
            ₹ {item.DiscountAmount}
          </Text> */}
          <Text style={BusListScreenStyles.PercentaText}>
            <VectorIcon
              icon="MaterialCommunityIcons"
              name="brightness-percent"
              style={BusListScreenStyles.Percentaticon}
            />{' '}
            {t(item.Off)}
          </Text>
        </View>
      </View>
      <View
        style={[
          BusListScreenStyles.BusdataTopBox,
          {
            alignItems: 'center',
            borderTopWidth: 0.8,
            borderTopColor: 'rgba(0,0,0,0.5)',
            borderStyle: 'dotted',
            marginTop: 10,
          },
        ]}>
        <View>
          <Text style={BusListScreenStyles.BusComonStyle}>
            {t(item.available_seats)} Seats Left
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={[
              BusListScreenStyles.BusComonStyle,
              {color: '#000', fontWeight: '700'},
            ]}>
            {departureTime}
          </Text>

          <Fontisto
            name={'arrow-right-l'}
            size={20}
            color={'rgba(0,0,0,0.2)'}
            style={{
              marginHorizontal: 10,
              alignSelf: 'flex-end',
            }}
          />

          <Text
            style={[
              BusListScreenStyles.BusComonStyle,
              {
                marginHorizontal: 5,
                alignSelf: 'center',
                fontWeight: '700',
                color: '#000',
              },
            ]}>
            {arivalTime}
          </Text>
          <Text style={BusListScreenStyles.BusComonStyle}>({hours}h)</Text>
        </View>
      </View>
      {/* <View style={BusListScreenStyles.LinkBox}>
        <View style={BusListScreenStyles.RatingBox}>
          <Text style={BusListScreenStyles.RatingText}>{item.rating}</Text>
        </View>
        <Text style={BusListScreenStyles.LinkBoxtext}>
          {t(item.ratingCount)}
        </Text>
        <Text style={BusListScreenStyles.LinkBoxtext}>
          {t(item.BordandDep)}
        </Text>
        <Text style={BusListScreenStyles.LinkBoxtext}>
          {t(item.cancelpolicy)}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};
export default BusListFun;
