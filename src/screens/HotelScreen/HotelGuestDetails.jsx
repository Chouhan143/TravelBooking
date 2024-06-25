import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, SF, SH, SW} from '../../utils';
import Entypo from 'react-native-vector-icons/Entypo';

export default function HotelGuestDetails() {
  const [more, setMore] = useState(false);

  let moreHandler = () => {
    setMore(!more);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gest}>
        <Text style={styles.gestText}>Guest Details</Text>
        <View style={styles.bottomLine} />
        <View style={styles.hotelDetail}>
          <View style={styles.star}>
            <Text style={styles.normalText}>Hotel</Text>
            <Text style={styles.normalText}>****</Text>
          </View>
          <View>
            <Text style={styles.hotelName}>Hotel Amrald</Text>
          </View>
          <View style={{paddingTop: SF(5)}}>
            <Text style={styles.hotelDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, quod.
            </Text>
          </View>
        </View>
      </View>
      {/* check in check out  */}
      <View style={styles.bottomLineCheckIn}>
        <View
          style={[
            styles.star,

            {justifyContent: 'space-between', paddingTop: SH(10)},
          ]}>
          <View>
            <Text style={styles.normalText}>Check-In</Text>
            <Text style={styles.normalText}>Tue 25 jun 2024</Text>
          </View>
          <View style={styles.verticleLine} />

          <View>
            <Text style={styles.normalText}>Check-out</Text>
            <Text style={styles.normalText}>Tue 27 jun 2024</Text>
          </View>
        </View>
        <View>
          <Text style={styles.normalText}>Total lenght of nights : 2</Text>
        </View>
      </View>
      {/* Selected rooms for adults */}
      <View style={[styles.hotelDetail, {borderTopWidth: 0}]}>
        <Text>You selected</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>3 rooms for 2 adults</Text>
          <TouchableOpacity onPress={moreHandler}>
            <Entypo
              name={more ? 'chevron-down' : 'chevron-up'}
              size={20}
              color={Colors.gray_text_color}
            />
          </TouchableOpacity>
        </View>
        {more ? <Text>1 * Deluxe Double Room</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: SW(20),
    paddingTop: SH(20),
  },
  gest: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestText: {
    color: Colors.black_text_color,
    fontFamily: 'Poppins-bold',
    fontStyle: 'normal',
    fontSize: SF(16),
    letterSpacing: 1,
  },
  bottomLine: {
    width: SW(30),
    height: SH(3),
    backgroundColor: Colors.theme_background,
    borderRadius: 5,
  },
  hotelDetail: {
    paddingVertical: SH(10),
    borderTopWidth: SW(1),
    borderBottomWidth: SW(1),
    borderTopColor: Colors.gray_color,
    borderBottomColor: Colors.gray_color,
    marginTop: SH(10),
    width: '100%',
  },
  star: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  normalText: {
    color: '#000',
    fontSize: SF(14),
  },
  hotelName: {
    color: '#000',
    fontWeight: '800',
    fontSize: SF(18),
  },
  hotelDescription: {
    color: Colors.gray_text_color,
    fontWeight: '400',
    fontSize: SF(14),
  },
  verticleLine: {
    width: SW(10),
    height: SH(1),
    backgroundColor: Colors.black_text_color,
  },
  bottomLineCheckIn: {
    borderBottomWidth: SW(1),
    paddingBottom: SH(20),
    borderBottomColor: Colors.gray_color,
    marginTop: SH(10),
    width: '100%',
  },
});
