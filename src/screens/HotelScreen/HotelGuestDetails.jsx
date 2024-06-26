import {StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors, SF, SH, SW} from '../../utils';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
export default function HotelGuestDetails() {
  const [more, setMore] = useState(false);

  let moreHandler = () => {
    setMore(!more);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gest}>
        <Text style={styles.gestText}>Guest Details</Text>
        <View style={styles.bottomLine} /></View>
      {/* check in check out  */}
      <ScrollView style={{height:'70%'}}>
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
        <Text style={styles.normalText}>You selected</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.normalText}>3 rooms for 2 adults</Text>
          <TouchableOpacity onPress={moreHandler}>
            <Entypo
              name={more ? 'chevron-down' : 'chevron-up'}
              size={20}
              color={Colors.gray_text_color}
            />
          </TouchableOpacity>
        </View>
        {more ? <Text style={styles.normalText}>1 * Deluxe Double Room</Text> : null}
      </View>
<View style={[styles.hotelDetail,{borderTopWidth: 0}]}>
<Text style={styles.paymentText}>your payment summary</Text>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<Text style={styles.normalText}>original price</Text>
<Text style={styles.normalText}>4,480</Text>
</View>
</View>
<View style={styles.DetailsContanier}>
<Text style={styles.inputHeading}>enter your details </Text>
<View style={{display:'flex',flexDirection:'row',
  justifyContent:'center',alignItems:'center',backgroundColor:'#e1e7e8',
  paddingVertical:SH(10),borderRadius:7}}>
<Feather name={'info'} color='black' size={15}/>
<Text style={{color:'black'}}>almost done ! just fill in the </Text>
<Entypo name={'star'} color='red' size={15}/>
<Text style={{color:'black'}}>required info </Text>
</View>
<View style={{marginVertical:SH(10)}}>
<View style={{display:'flex',flexDirection:'row'}}>
<Text style={styles.inputLabel}>first name </Text>
<Entypo name={'star'} color='red' size={15}/></View>

<TextInput style={styles.input}/>

</View>
<View style={{marginVertical:SH(10)}}>
<View style={{display:'flex',flexDirection:'row'}}>
<Text style={styles.inputLabel}>last name  </Text>
<Entypo name={'star'} color='red' size={15}/></View>

<TextInput style={styles.input}/>

</View>
<View style={{marginVertical:SH(10)}}>
<View style={{display:'flex',flexDirection:'row'}}>
<Text style={styles.inputLabel}>email address </Text>
<Entypo name={'star'} color='red' size={15}/></View>

<TextInput style={styles.input}/>

</View>

</View>

      
      </ScrollView>
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
    marginTop:SH(10)
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
    fontFamily:'Poppins-Regular',
  },
  hotelName: {
    color: '#000',
    fontFamily:'Poppins-Regular',
    fontSize: SF(18),
  },
  hotelDescription: {
    color: Colors.gray_text_color,
    fontWeight: '400',
    fontSize: SF(14),
    fontFamily:'Poppins-Regular',
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
  paymentText:{
    fontFamily:'Poppins-Medium',
    color:'black',
    textTransform:'capitalize',
    fontSize:SF(15)
  },
  DetailsContanier:{
    paddingVertical: SH(10),
    marginTop: SH(10),
    width: '100%',
  },
  input:{
    padding:SW(10),
    borderColor:'gray',
    borderWidth:1,
    borderRadius:5
  },
  inputHeading:{
      fontFamily:'Poppins-Bold',
    fontSize:SF(18),
    color:'black',
    textTransform:'capitalize'
  },
  inputLabel:{
    fontFamily:'Poppins-Regular',
    fontSize:SF(15),
    color:'black',
    textTransform:'capitalize'
  }
});
