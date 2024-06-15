import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SW,SH,SF,Colors } from '../../utils';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const HotelData=[
    {
        id:1,
        name:'Hotels Properties Citywide',
        rating:'4 star ',
        reviews:'11',
        location:'Indore',
        distance:'2',
        price:'1000',
        Image:require('../../images/hotel1.jpg')
    },
    {
        id:2,
        name:'Fab Express Blue Sky ',
        rating:'4 star ',
        reviews:'15',
        location:'Ahmedabad',
        distance:'5',
        price:'2000',
        Image:require('../../images/hotel2.jpg')
    },
    {
        id:3,
        name:'Fab Express Blue Sky ',
        rating:'4 star ',
        reviews:'15',
        location:'Ahmedabad',
        distance:'5',
        price:'2000',
        Image:require('../../images/hotel1.jpg')
    },
    {
        id:4,
        name:'Fab Express Blue Sky ',
        rating:'4 star ',
        reviews:'15',
        location:'Ahmedabad',
        distance:'5',
        price:'2000',
        Image:require('../../images/hotel2.jpg')
    },
    {
        id:5,
        name:'Fab Express Blue Sky ',
        rating:'4 star ',
        reviews:'15',
        location:'Ahmedabad',
        distance:'5',
        price:'2000',
        Image:require('../../images/hotel1.jpg')
    },
    {
        id:6,
        name:'Fab Express Blue Sky ',
        rating:'4 star ',
        reviews:'15',
        location:'Ahmedabad',
        distance:'5',
        price:'2000',
        Image:require('../../images/hotel2.jpg')
    }
]
export default function HotelListScreen() {
    const renderItem=({item})=>{
         return(
            <View style={styles.HotelCards}>
            <View style={{flex:2,flexDirection:'row'}}>
            <Image source={item.Image} 
            style={{width:SW(120),height:SH(135),borderRadius:10,resizeMode:'contain'}}/>
            <View style={{flex:2,margin:SW(5)}}>
            <Text style={styles.DataText}>{item.name}</Text>
            <Text style={styles.DataSubDetails}>{item.rating}</Text>
            <Text style={styles.DataSubDetails}>{item.reviews} Reviews </Text>
            <View style={{display:'flex',flexDirection:'row',flexShrink:1}}>
            <Entypo  name={'location'} color='black' size={15} style={{marginHorizontal:2}}/>
            <Text style={styles.DataSubDetails}>{item.location}</Text>
            </View>
            <Text style={styles.DataSubDetails}><Text>{item.distance}</Text>Km From Center</Text>
            <View style={{display:'flex',flexDirection:'row'}}>
            <FontAwesome  name={'rupee'} color='black' size={15} style={{marginHorizontal:2}}/>
            <Text style={styles.DataSubDetails}>{item.price}</Text>
            </View>
            </View>
            </View>
            </View>
         )
    }
  return (
    <View style={styles.MainContanier}>
     <View style={styles.searchView}>
     <View style={styles.searchbar}>
          <EvilIcons name={'search'} size={25} color='white' />
          <Text style={styles.searchText} >Searched City</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row',margin:SW(13),marginTop:SH(1),
            marginHorizontal:SW(30),alignItems:'center'}}>
            <Entypo  name={'calendar'} color='white' size={15} style={{marginHorizontal:2}}/>
        <Text style={styles.headerText}>17 Jan<Text><Ionicons name={'remove-outline'} color='white' size={15} style={{margin:10}}/>18 Jan</Text></Text>
        <Text  style={styles.headerText}>(2 nights)</Text>
        <FontAwesome  name={'users'} color='white' size={15} style={{marginHorizontal:2}}/>
        <Text  style={styles.headerText}>2 adults</Text>
        </View>
     </View>
     <View style={styles.filterContanier}>
      <View style={{display:'flex',flexDirection:'row'}}>
      <MaterialCommunityIcons name={'sort'} color={Colors.theme_background} size={15}/>
      <Text style={{color:Colors.theme_background}}>Sort</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row'}}>
      <MaterialCommunityIcons name={'filter-variant'} color={Colors.theme_background} size={15}/>
      <Text style={{color:Colors.theme_background}}>Fliter</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row'}}>
      <MaterialCommunityIcons name={'google-maps'} color={Colors.theme_background} size={15}/>
      <Text style={{color:Colors.theme_background}}>Map</Text>
      </View>
     </View>
     <View style={{marginTop:SH(5)}}>
     <FlatList
     data={HotelData}
     renderItem={renderItem}
     contentContainerStyle={styles.contentContainerStyle}
     />
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
    MainContanier:{
        flex:1,
        backgroundColor:'white',
        paddingBottom:SH(200)
    },
    searchView:{
      backgroundColor:Colors.theme_background,
      borderBottomLeftRadius:15, borderBottomRightRadius:15
    },
    searchbar:{
    display: 'flex', flexDirection: 'row', padding: SW(15),
    margin: SW(15), borderColor: 'white', borderWidth: 1, borderRadius: 5
    },
    searchText:{
        color:'white',fontFamily:'Poppins-Bold'
    },
    headerText:{
        fontSize:SF(12),marginRight:SW(15),fontFamily:'Poppins-Regular',color:'white'
    },
    HotelCards:{
    backgroundColor: 'white',
    margin: SW(10),
    marginBottom: SH(0),
    borderRadius: 10,
    padding: SH(15),
    elevation: 5, 
    flexDirection:'row',
     paddingBottom:SH(5)
    },
    DataText:{
        color:'black',
        fontFamily:'Poppins-Regular',
        fontSize:SF(15),
        marginLeft:SW(5)
    },
    DataSubDetails:{
        color:'black',
        fontFamily:'Poppins-Regular',
        fontSize:SF(13),
        marginLeft:SW(5)
       
    },
    contentContainerStyle:{
        paddingBottom: 15,
    },
    filterContanier:{
        display:'flex',flexDirection:'row',justifyContent:'space-around',
        backgroundColor:'white',elevation:5,margin:SW(10),padding:SW(10),borderRadius:10
    }
})