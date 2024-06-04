import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {FlightsListScreenStyle} from '../../styles';
import {SF} from '../../utils';
import {VectorIcon} from '../../components';
import {useTranslation} from 'react-i18next';

const RechargedataFunction = props => {
  const {onPress, item} = props;
  const {t} = useTranslation();

  //  Dipart Time formated here
  const DipartTime = new Date(item.DepTime);
  const UpdatedDipartTime = DipartTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Arrival Time

  const ArrivalTime = new Date(item.ArrTime);
  const UpdatedArivalTime = ArrivalTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Duration convertion

  const convertDuration = totalMinutes => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formattedDuration = convertDuration(item.Duration);

  return (
    <TouchableOpacity
      style={FlightsListScreenStyle.OpratorBox}
      onPress={() => onPress()}>
      <View style={FlightsListScreenStyle.FlighgtBoxImg}>
        <Image
          // source={item.Fligtimg}
          source={require('../../images/AirIndiaLogo.png')}
          style={FlightsListScreenStyle.OpratorImg}
          resizeMode="contain"
        />

        <Text style={FlightsListScreenStyle.FligtText}>
          {t(item.Airline.AirlineName)}
        </Text>
      </View>
      <View style={FlightsListScreenStyle.OpratorPlaneBox}>
        <View style={FlightsListScreenStyle.PlanemainTextBox}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text style={FlightsListScreenStyle.PlanemainValidityTextTwo}>
              {UpdatedDipartTime}
            </Text>
            <VectorIcon icon="FontAwesome" name="minus" size={SF(16)} />
            <Text style={FlightsListScreenStyle.PlanemainValidityTextTwo}>
              {UpdatedArivalTime}
            </Text>
          </View>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={FlightsListScreenStyle.PlanemainValidityText}>
            Duration {formattedDuration}
          </Text>
        </View>
      </View>
      <View style={FlightsListScreenStyle.OpratorPriceBox}>
        <Text style={FlightsListScreenStyle.OpratorPriceText}>
          <VectorIcon icon="FontAwesome" name="rupee" size={SF(14)} />
          {parseInt(item.OfferPrice)}
        </Text>
        <Text
          style={[
            FlightsListScreenStyle.OpratorPriceText,
            {textDecorationLine: 'line-through', fontSize: 16, color: 'gray'},
          ]}>
          <VectorIcon icon="FontAwesome" name="rupee" size={SF(14)} />
          {parseInt(item.FlightFare)}
        </Text>
      </View>
      <View style={FlightsListScreenStyle.OffreboxOne}>
        <Text style={FlightsListScreenStyle.OffreboxOneText}>
          {/* {t(item.Offer)} */}
          Flat 10% off
        </Text>
      </View>
      <View style={FlightsListScreenStyle.TicketboxOne}>
        <Text style={FlightsListScreenStyle.TicketboxOneText}>
          {/* {t(item.SeatAvail)} */}
          {item.SeatAvail !== 'not set' ? (
            <Text> {item.SeatAvail} seats left </Text>
          ) : (
            <Text> {t(item.SeatAvail)} </Text>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default RechargedataFunction;
