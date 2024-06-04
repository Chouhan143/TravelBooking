import React from 'react';
import {Text, View, Image} from 'react-native';
import {FlightsListScreenStyle} from '../../styles';
import {useTranslation} from 'react-i18next';

const FlightShowFinal = props => {
  const {onPress, item} = props;
  console.log('items >>>', item);

  //  Dipart Time formated here
  const DipartTime = new Date(item.DepTime);
  const UpdatedDipartTime = DipartTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const dipartDate = DipartTime.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });

  // Arrival Time

  const ArrivalTime = new Date(item.ArrTime);
  const UpdatedArivalTime = ArrivalTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const arrivalDate = ArrivalTime.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });

  const convertDuration = totalMinutes => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formattedDuration = convertDuration(item.Duration);

  const {t} = useTranslation();
  return (
    <View style={FlightsListScreenStyle.OpratorBoxTwo}>
      <View style={FlightsListScreenStyle.ShoWBoxFlighgtBoxImgTwo}>
        {/* <Image
          source={item.Fligtimg}
          style={FlightsListScreenStyle.OpratorImg}
          resizeMode="contain"
        /> */}
        <Text style={FlightsListScreenStyle.FligtText}>
          {t(item.Airline.AirlineName)}
        </Text>
        <Text style={FlightsListScreenStyle.FligtText}>
          {t(item.Airline.FlightNumber)}
        </Text>
      </View>
      <View style={FlightsListScreenStyle.ShoWBoOpratorPlaneBox}>
        <View style={FlightsListScreenStyle.ShoWBoxPlanemainTextBox}>
          <View style={FlightsListScreenStyle.widthFirst33}>
            <Text style={FlightsListScreenStyle.PlanemainValidityText}>
              {t(item.Origin.CityName)}
            </Text>
            <Text style={FlightsListScreenStyle.PlanemainValidityTextTwo}>
              {UpdatedDipartTime}
            </Text>
          </View>
          <View style={FlightsListScreenStyle.widthSecond33}>
            <Text style={FlightsListScreenStyle.PlanemainValidityText}>
              {`- ${formattedDuration} -`}
            </Text>
          </View>
          <View style={FlightsListScreenStyle.widthThird33}>
            <Text style={FlightsListScreenStyle.PlanemainValidityText}>
              {t(item.Destination.CityName)}
            </Text>
            <Text style={FlightsListScreenStyle.PlanemainValidityTextTwo}>
              {UpdatedArivalTime}
            </Text>
          </View>
        </View>
        <View style={FlightsListScreenStyle.ShoWBoxPlanemainTextBoxTwo}>
          <View style={FlightsListScreenStyle.widthFirst50}>
            <Text style={FlightsListScreenStyle.PlanemainValidityText}>
              {dipartDate}
            </Text>
            <Text style={FlightsListScreenStyle.DepText}>
              {t(item.Destination.AirportName)}
            </Text>
          </View>
          <View style={FlightsListScreenStyle.widthThird50}>
            <Text style={FlightsListScreenStyle.PlanemainValidityText}>
              {arrivalDate}
            </Text>
            <Text style={FlightsListScreenStyle.DepText}>
              {t(item.Origin.AirportName)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FlightShowFinal;
