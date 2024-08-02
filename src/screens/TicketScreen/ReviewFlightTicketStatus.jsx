import { FlatList,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { Colors, SF, SH, SW } from '../../utils';
import { RouteName } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components';
import { useSelector } from 'react-redux';

const ReviewFlightTicketStatus = ({route}) => {
  const BookLLcStoredData=useSelector(state=>state.commomReducer.flightBook);
  const FlightSearchPayload=useSelector(state=>state.commomReducer.FlightSearchPayload);
  const PNR=BookLLcStoredData.original_response.Response.PNR;
  const Status=BookLLcStoredData.message;
  const origin = FlightSearchPayload.Segments[0].Origin;
  const destination = FligrhtSearchPayload.Segments[0].Destination;
   const mainPassenger=route.params;
    const navigation=useNavigation();
 
  return (
    <View style={styles.contanier}>
    <AppHeader headerTitle={'Flight Ticket Status'}/>
    <View style={{marginBottom:SH(100)}}>
    <TouchableOpacity style={styles.card} 
    onPress={()=>navigation.navigate(RouteName.FLIGHT_TICKET_SCREEN,mainPassenger)}>
    <View style={styles.cardItem}>
    <Text style={styles.contentText}>origin</Text>
    <Text style={styles.contentText}>{origin}</Text>
    </View>
    <View style={styles.cardItem}>
    <Text style={styles.contentText}>Destination</Text>
    <Text style={styles.contentText}>{destination}</Text>
    </View>
    <View style={styles.cardItem}>
    <Text style={styles.contentText}>Status</Text>
    {Status === "Booking saved successfully!" ? (
      <Text style={styles.confirmedText}>Confirmed</Text>
    ) : (
      <Text style={styles.pendingText}>Pending</Text>
    )}
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

export default ReviewFlightTicketStatus

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
  },
  confirmedText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: SF(15),
  },
  pendingText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: SF(15),
  },

})