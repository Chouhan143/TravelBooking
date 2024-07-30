
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import RoomItem from './roomItem';
import { RouteName } from '../../routes';
import { SH, Colors, SF } from '../../utils';
import { setHotelRoomDetails } from '../../redux/action';
import { HOTEL_ROOM_DETAILS } from '../../utils/BaseUrl';

const HotelMoreDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const RoomData = useSelector(state => state.commomReducer.hotelRoomDetails);

  const handleBook = (room) => {
    navigation.navigate(RouteName.HOTEL_GUEST_DETAILS, { room });
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const payload = {
          ResultIndex: '9',
          SrdvIndex: 'SrdvTB',
          SrdvType: 'SingleTB',
          HotelCode: '92G|DEL',
          TraceId: '1',
        };
        const res = await axios.post(HOTEL_ROOM_DETAILS, payload);
        const RoomDataArr = res.data.GetHotelRoomResult.HotelRoomsDetails;
        dispatch(setHotelRoomDetails(RoomDataArr));
        console.log('RoomData',JSON.stringify(RoomDataArr));
        setLoading(false); 
      } catch (error) {
        console.log('error', error);
        setLoading(false); 
      }
    };
    fetchRoomData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.theme_background} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Room</Text>
      <FlatList
        data={RoomData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <RoomItem room={item} onBook={handleBook} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    paddingTop: SH(15),
    fontFamily: 'Poppins-Bold',
    fontSize: SF(20),
    textTransform: 'capitalize',
    color: Colors.theme_background,
  },
});

export default HotelMoreDetails;


