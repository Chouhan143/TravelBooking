import { FlatList,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { Colors, SF, SH, SW } from '../../utils';
import { RouteName } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ReviewHotelTicketStatus = ({route}) => {
    const navigation=useNavigation();
    const HotelBookingData=useSelector(state=>state.commomReducer.hotelBook);
    const mainguest=route.params;
    console.log('passengername',mainguest);
   const bookingstatus=HotelBookingData.thirdPartyResponse.BookResult.HotelBookingStatus;
   const hotelname=HotelBookingData.hotelBooking.hotelname;
  
   const roomprice=HotelBookingData.hotelBooking.roomprice;
  
  return (
    <View style={styles.contanier}>
    <AppHeader headerTitle={'Hotel Ticket Status'}/>
    <View style={{marginBottom:SH(100)}}>
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(RouteName.HOTEL_TICKET_SCREEN,mainguest)}>
   
   
    <View style={styles.cardItem}>
    <Text style={styles.headingText}>Hotel Name</Text>
    <Text style={styles.contentText}>{hotelname}</Text>
    </View>
    <View style={styles.cardItem}>
    <Text style={styles.headingText}>Room Price</Text>
    <Text style={styles.contentText}> 
    <FontAwesome name={'rupee'} color="black" size={15}/>{roomprice}</Text>
    </View>
    <View style={styles.cardItem}>
    <Text style={styles.headingText}>Booking Status</Text>
    <Text style={[styles.contentText, { color:'green'}]}>{bookingstatus}</Text>
    </View>
    </TouchableOpacity>
    </View>
    <TouchableOpacity 
    style={{backgroundColor:Colors.theme_background,padding:SW(20),width:SW(375),
        borderRadius:5,position:'absolute',top:SH(745)}} onPress={() => navigation.navigate("Root")}>
    <Text style={{color:'white',textAlign:'center'}}>Go To Homepage</Text>
    </TouchableOpacity>
    </View>
  )
}

export default ReviewHotelTicketStatus

const styles = StyleSheet.create({
  contanier:{
    flex:1,
    padding:SW(20),margin:0,backgroundColor:'white',
    height:'100%'
  },
  card:{
    backgroundColor:'#f5f6f7',
   borderRadius:7,
    padding:SW(20),
    marginBottom:SH(15),

  },
  cardItem:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  } ,
  contentText:{
    fontFamily:'Poppins-Regular',
    fontSize:SF(13),
    color:'black'
  },
   headingText:{
    fontFamily:'Poppins-Bold',
    fontSize:SF(15),
    color:'black'
  }
})