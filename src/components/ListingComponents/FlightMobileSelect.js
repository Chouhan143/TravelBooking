import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {FlightsListScreenStyle} from '../../styles';
import {Colors, SF} from '../../utils';
import {VectorIcon} from '../../components';
import {useTranslation} from 'react-i18next';

const FlightMobileSelect = props => {
  const {onPress, item} = props;
  // console.log('item', item);
  const {t} = useTranslation();
  return (
    <View style={FlightsListScreenStyle.FlightsCityBox}>
      <View style={FlightsListScreenStyle.BackArrowBoxWidthSet}>
        <TouchableOpacity onPress={() => onPress()}>
          <VectorIcon
            icon="AntDesign"
            name="arrowleft"
            size={SF(20)}
            color={Colors.black_text_color}
          />
        </TouchableOpacity>
      </View>
      <View style={FlightsListScreenStyle.CityMainBoxWrap}>
        <View style={FlightsListScreenStyle.CityMainBox}>
          <Text style={FlightsListScreenStyle.CityText}>
            {t(item.Cityfrom)}{' '}
            <VectorIcon
              icon="AntDesign"
              name="arrowright"
              size={SF(15)}
              color={Colors.black_text_color}
            />{' '}
            {t(item.Cityto)}
          </Text>
          <Text style={FlightsListScreenStyle.RchSubheadTextStyle}>
            {t(item.CardType)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FlightMobileSelect;
