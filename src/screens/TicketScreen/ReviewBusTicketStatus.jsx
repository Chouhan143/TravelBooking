import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { Colors, SF, SW } from '../../utils';
import { RouteName } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '../../components';

const data =[
    {
        id:1,
        StartingPoint:'Indore',
        DestinationPoint:'Dewas',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Booked'
    },
    {
        id:2,
        StartingPoint:'Indore',
        DestinationPoint:'Dewas',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Cancelled'

    },
    {
        id:3,
        StartingPoint:'Indore',
        DestinationPoint:'Dewas',
        Date:'12/08/2024',
        Time:'12 AM ',
        BookingStatus:'Expired'

    }
]
const renderItem=({item})=>{
    return(
        <ScrollView style={styles.card} >
        <View style={styles.cardItem}>
        <Text styles={styles.contentText}>{item.StartingPoint}</Text>
        </View>
        </ScrollView>
    )
}
const ReviewBusTicketStatus = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.contanier}>
    <AppHeader headerTitle={'ReviewBusTicketStatus'}/>
    <View>
    <FlatList
     data={data}
     renderItem={renderItem}
     keyExtractor={item=>item.id}
    />
    </View>
    <TouchableOpacity style={{backgroundColor:Colors.theme_background,padding:SW(15),borderRadius:5}} onPress={() => navigation.navigate(RouteName.BUS_TICKET_SCREEN)}>
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
    backgroundColor:'light-gray',
    elevation:7
  },
  cardItem:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:SW(10)
  } ,
  contentText:{
    fontFamily:'Poppins-Regular',
    fontSize:SF(15),
    color:'black'
  }

})