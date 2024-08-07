import React, {useMemo} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Colors, SF, SH, SW} from '../../utils';
import {RouteName} from '../../routes';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
const TicketScreen = props => {
  // const {navigation} = props;
  const navigation=useNavigation();
  const {t} = useTranslation();

  return (
    <View
      style={{flex:1,backgroundColor:'white'}}>
      <View style={{display:'flex',flexDirection:'row',marginLeft:SH(20),marginVertical:SH(15)}}>
          <Entypo name={'menu'} color={Colors.theme_background} size={35} onPress={()=>navigation.navigate("Root")}/>
          <Text style={{color:Colors.theme_background,fontSize:SF(25)}}>Tickets</Text>
          </View>
      <View style={{flex:1,backgroundColor:'white'}}>
        <View style={{margin:SW(8),display:'flex',flexDirection:'row'}}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(RouteName.REVIEW_BUS_TICKET_SCREEN)}>
        <Text style={styles.buttonText}>Bus Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(RouteName.REVIEW_FLIGHT_TICKET_SCREEN)}>
        <Text style={styles.buttonText}>Flight Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(RouteName.REVIEW_HOTEL_TICKET_SCREEN)}>
        <Text style={styles.buttonText}>Hotel Ticket</Text>
        </TouchableOpacity>
        
        </View>
       
        <View>
        <Image source={require('../../images/TicketBook.png')} 
        style={{width:SW(375),height:SH(460),resizeMode:'cover'}}/>
        </View>
        <Text style={{color:'#000',margin:SW(12),textAlign:'center',
          textTransform:'capitalize',fontSize:SF(12),fontFamily:'Poppins-Regular',
          backgroundColor:'#f5f6f7',padding:SW(20),
          borderColor:'#000',borderWidth:1,borderRadius:10,marginTop:0
        }}>
        Your payment was successful. You can now download your ticket or cancel 
        your booking on the next screen.</Text>

      </View>
    </View>
  );
};
export default TicketScreen;

const styles=StyleSheet.create(
  {
    buttonText:{
        color:'white',
        fontFamily:'Poppins-Medium',
        textTransform:'uppercase',
        fontSize:SF(15),
        textAlign:'center'
  },
  button:{
    backgroundColor:Colors.theme_background,
    paddingVertical:SH(20),
    paddingHorizontal:SW(15),
   
  },
  Buttombutton:{
    backgroundColor:Colors.theme_background,
    paddingVertical:SH(20),
    paddingHorizontal:SW(14),
    marginBottom:SH(10),
    borderRadius:10
  }
  }
)

