import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors, SH, SW, SF } from '../../utils';
import { RouteName } from '../../routes';
import { HOTEL_ROOM_DETAILS } from '../../utils/BaseUrl';
import axios from 'axios';

export default function HotelMoreDetails() {
    const [RoomData,setRoomData]=useState(null);
    useEffect(()=>{
        const fetchRoomData=async()=>{
            try{
                const playload={
                         ResultIndex: "9",
                         SrdvIndex: "SrdvTB",
                         SrdvType: "SingleTB",
                         HotelCode: "92G|DEL",
                         TraceId: "1"
                }
                const res= await axios.post(HOTEL_ROOM_DETAILS,playload);
                const RoomDataArr=res.data.GetHotelRoomResult.HotelRoomsDetails;
                setRoomData(RoomDataArr);
                console.log('Room Data',JSON.stringify(RoomDataArr));
            }
            catch(error){
            console.log('error',error)
            }
        }
        fetchRoomData();
    },[]);
    const navigation = useNavigation();

    const renderItem=({item})=>{
        return(
                <Text style={{color:'black'}}>{item.RoomTypeName}</Text>
        )
    }
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <ScrollView  style={{padding: SW(15)}}>
           <View  style={{paddingBottom:SH(50)}}>
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>Amenities</Text>
           <View style={{backgroundColor:'white',padding:SW(10)}}>
           <FlatList
            data={RoomData}
            renderItem={renderItem}
           />
           </View>
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>Amentity</Text>
          
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>BedTypes</Text>
          
          </View>
            </ScrollView>
            <TouchableOpacity style={{
                backgroundColor: Colors.theme_background,
                padding: SH(20)
            }}>
                <Text style={{ color: 'white', textAlign: 'center' }}
                 onPress={() => navigation.navigate(RouteName.MORE_DETAIL_CONTINUE_SCREEN)}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})