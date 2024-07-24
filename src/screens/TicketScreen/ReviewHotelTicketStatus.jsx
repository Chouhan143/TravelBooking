import { FlatList,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { Colors, SF, SH, SW } from '../../utils';
import { RouteName } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components';
const data =[
    {
        id:1,
        Name:'abc Hotel',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Booked',
        Color: Colors.green
    },
    {
        id:2,
        Name:'xyz Hotel',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Cancelled',
        Color: Colors.red_color
    },
    {
        id:3,
        Name:'abc Hotel',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Booked',
        Color: Colors.green

    },
    {
        id:4,
        Name:'xyc Hotel',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Expired',
        Color: Colors.gray_text_color

    },
    {
        id:5,
        Name:'abc Hotel',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Cancelled',
        Color: Colors.red_color

    },
    {
        id:6,
        Name:'xyz Hotel',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Expired',
        Color: Colors.gray_text_color

    }
]

const ReviewHotelTicketStatus = () => {
    const navigation=useNavigation();
    const renderItem=({item})=>{
  
      return(
          <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate(RouteName.HOTEL_TICKET_SCREEN)}>
          <View styles={styles.cardItem}>
          <Text style={styles.contentText}>{item.Name}</Text>
          </View>
          <View style={styles.cardItem}>
          <Text style={styles.contentText}>{item.Date}</Text>
          <Text style={styles.contentText}>{item.Time}</Text>
          </View>
          <View style={styles.cardItem}>
          <Text style={styles.contentText}>Booking Status</Text>
          <Text style={[styles.contentText, { color: item.Color }]}>{item.BookingStatus}</Text>
          </View>
          </TouchableOpacity>
      )
  }
  return (
    <View style={styles.contanier}>
    <AppHeader headerTitle={'Hotel Ticket Status'}/>
    <View style={{marginBottom:SH(100)}}>
    <FlatList
     data={data}
     renderItem={renderItem}
     keyExtractor={item => item.id.toString()}
    />
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
    fontSize:SF(15),
    color:'black'
  }

})