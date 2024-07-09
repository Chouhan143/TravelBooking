import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BusListScreenStyle} from '../../styles';
import {Colors,SH,SF,SW} from '../../utils';
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

  const departureTime = new Date(item.DepartureTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const arrivalTime = new Date(item.ArrivalTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const depTime = new Date(item.DepartureTime).getTime();
  const arrTime = new Date(item.ArrivalTime).getTime();
  const durationMs = arrTime - depTime;

  // Convert milliseconds to hours and minutes
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <TouchableOpacity
      style={{
      backgroundColor: Colors.white_text_color,
      borderColor:Colors.theme_background,borderWidth:1,
      borderRadius: SW(10),
      padding: SH(20),
      marginBottom: SH(10),
      }}
      onPress={onPress}>
      <View style={BusListScreenStyles.BusdataTopBox}>
        <View>
          <Text
            style={[
              BusListScreenStyles.TravelCompanyText,
              {color: '#000', fontFamily:'Poppins-Medium',textTransform:'capitalize'},
            ]}>
            {t(item.TravelName)}
          </Text>
          <Text style={{color: Colors.gray_text_color,
      fontSize: SF(12), paddingTop: SH(7),fontFamily:'Poppins-Regular',
      textTransform:'capitalize'}}>
            {t(item.BusType)}
          </Text>
        </View>
        <View style={BusListScreenStyles.TextrightSet}>
          <Text
            style={[
              BusListScreenStyles.MainPriceText,
              {color: '#000', fontFamily:'Poppins-Medium'},
            ]}>
            ₹ {item.Price.BasePrice}
          </Text>
          {/* <Text style={BusListScreenStyles.DiscountAmountText}>
            ₹ {item.DiscountAmount}
          </Text> */}
          <Text style={{ color: Colors.green,fontSize: SF(10),
            paddingTop: SH(3),fontFamily:'Poppins-Regular'}}>
            <VectorIcon
              icon="MaterialCommunityIcons"
              name="brightness-percent"
              style={BusListScreenStyles.Percentaticon}
            />{' '}
            {item.Price.OfferedPrice}
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
          <Text style={{color: '#000',fontSize: SF(14),paddingTop: SH(8),fontFamily:'Poppins-Medium'}}>
            {item.AvailableSeats} Seats Left
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={[
              BusListScreenStyles.BusComonStyle,
              {color: '#000', fontFamily:'Poppins-Medium'},
            ]}>
            {departureTime }
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
                fontFamily:'Poppins-Medium',
                color: '#000',
              },
            ]}>
           {arrivalTime}
          </Text>
          <Text style={BusListScreenStyles.BusComonStyle}>({hours}h)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BusListFun;
