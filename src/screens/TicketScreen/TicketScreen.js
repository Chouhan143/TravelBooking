import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {TicketScreenStyle} from '../../styles';
import {AppHeader} from '../../components';
import {Colors, SF, SH, SW} from '../../utils';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';

const TicketScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <AppHeader
        headerTitle={t('Download_Ticket')}
        Iconname={true}
        onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(RouteName.REVIEW_BUS_TICKET_SCREEN)}>
          <Text style={styles.buttonText}>Bus Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(RouteName.REVIEW_FLIGHT_TICKET_SCREEN)}>
          <Text style={styles.buttonText}>Flight Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(RouteName.REVIEW_HOTEL_TICKET_SCREEN)}>
          <Text style={styles.buttonText}>Hotel Ticket</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={require('../../images/TicketBook.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.infoText}>
        Your payment was successful. You can now download your ticket or cancel
        your booking on the next screen.
      </Text>
    </View>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: SH(20),
  },
  buttonContainer: {
    margin: SW(8),
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.theme_background,
    paddingVertical: SH(20),
    paddingHorizontal: SW(15),
    marginHorizontal: SW(5),
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textTransform: 'uppercase',
    fontSize: SF(15),
    textAlign: 'center',
  },
  image: {
    width: SW(375),
    height: SH(460),
    resizeMode: 'cover',
  },
  infoText: {
    color: '#000',
    margin: SW(12),
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: SF(12),
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#f5f6f7',
    padding: SW(20),
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
  },
});
