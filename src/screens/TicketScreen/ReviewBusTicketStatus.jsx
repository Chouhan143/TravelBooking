import { FlatList,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { Colors, SF, SH, SW } from '../../utils';
import { RouteName } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components';
import { useSelector } from 'react-redux';
const ReviewBusTicketStatus = ({item,route}) => {
  const passengername=route.params;
  console.log('passengername',passengername);
  const Data=useSelector(state=>state.commomReducer.busPayload);
  const busBookingStatus=useSelector(state=>state.commomReducer.busBookingStatus);
  console.log('bus stored Booking Stored ',JSON.stringify(busBookingStatus));
  const BookingStatus=busBookingStatus.result.data.Result.BusBookingStatus;
    const navigation=useNavigation();
  //   const renderItem=({item})=>{
  
  //     return(
  //         <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(RouteName.BUS_TICKET_SCREEN)}>
  //         <View style={styles.cardItem}>
  //        <View>
  //        <Text style={styles.contentText}>Starting Point</Text>
  //        <Text style={styles.contentText}>DestinationPoint</Text>
  //        </View>
  //        <View >
  //        <Text style={styles.contentText}>{Data.source_city}</Text>
  //        <Text style={styles.contentText}>{Data.destination_city}</Text>
  //        </View>
  //         </View>
  //         <View style={styles.cardItem}>
  //         <Text style={styles.contentText}>Booking Date</Text>
  //         <Text style={styles.contentText}>{Data.depart_date}</Text>
  //         </View>
  //         <View style={styles.cardItem}>
  //         <Text style={styles.contentText}>Booking Status</Text>
  //         <Text style={[styles.contentText, { color: item.Color }]}>{BookingStatus}</Text>
  //         </View>
  //         </TouchableOpacity>
  //     )
  // }
  return (
    <View style={styles.contanier}>
    <AppHeader headerTitle={'Bus Ticket Status'}/>
    <View style={{marginBottom:SH(100)}}>
    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(RouteName.BUS_TICKET_SCREEN,passengername)}>
    <View style={styles.cardItem}>
   <View>
   <Text style={styles.contentText}>Starting Point</Text>
   <Text style={styles.contentText}>DestinationPoint</Text>
   </View>
   <View >
   <Text style={styles.contentText}>{Data.source_city}</Text>
   <Text style={styles.contentText}>{Data.destination_city}</Text>
   </View>
    </View>
    <View style={styles.cardItem}>
    <Text style={styles.contentText}>Booking Date</Text>
    <Text style={styles.contentText}>{Data.depart_date}</Text>
    </View>
    <View style={styles.cardItem}>
    <Text style={styles.contentText}>Booking Status</Text>
    <Text style={[styles.contentText, { color: 'green'}]}>{BookingStatus}</Text>
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

export default ReviewBusTicketStatus

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
    fontSize:SF(15),
    color:'black'
  }

})