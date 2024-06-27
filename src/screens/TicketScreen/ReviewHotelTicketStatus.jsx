import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { Colors, SW } from '../../utils';
import { RouteName } from '../../routes';
import { useNavigation } from '@react-navigation/native';
const ReviewHotelTicketStatus = () => {
    const navigation=useNavigation();
  return (
    <View style={{flex:1,justifyContent:'center',margin:SW(10)}}>
     <TouchableOpacity style={{backgroundColor:Colors.theme_background,padding:SW(5)}} onPress={() => navigation.navigate(RouteName.HOTEL_TICKET_SCREEN)}>
     <Text style={{color:'white',textAlign:'center'}}>ReviewBusTicketStatus</Text>
     </TouchableOpacity>
    </View>
  )
}

export default ReviewHotelTicketStatus

const styles = StyleSheet.create({

})