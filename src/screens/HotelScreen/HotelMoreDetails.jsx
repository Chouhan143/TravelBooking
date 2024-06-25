import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors, SH, SW, SF } from '../../utils';
import { RouteName } from '../../routes';

const GetHotelRoomResult = {
    Amenities: [
        "Breakfast Buffet",
        "Complimentary Wi-Fi",
        "Fitness Center",
        "Swimming Pool",
        "Free Parking",
        "Swimming Pool",
    ],
    Amentity: [
        "Air conditioning",
        "Bathrobes",
        "DVD player",
        "Premium bedding",
        "Private bathroom",
        "Room service (24 hours)",
        "Separate dining area",
        "Separate sitting area",
        "Shower only",
        "Slippers",
        "Hair dryer",
        "Hypo-allergenic bedding available",
        "In-room childcare (surcharge)",
        "In-room climate control (air conditioning)",
        "In-room safe (laptop compatible)",
        "Individually decorated",
        "Individually furnished",
        "Iron/ironing board (on request)",
        "LCD TV",
        "MP3 docking station",
        "Memory foam mattress",
    ],
    BedTypes: [
        {
            BedTypecode: "13",
            BedTypeDescription: " 1 double bed "
        }
    ],
    CancellationPolicy: {
        Description: "You can cancel your hotel room reservation for free up to 48 hours before your scheduled arrival. Cancellations made within 48 hours of arrival will incur a fee equal to the first night's stay."
    },
    SmokingPreference: "NoPreference",
}
export default function HotelMoreDetails() {
    const navigation = useNavigation();
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <ScrollView  style={{padding: SW(15)}}>
           <View  style={{paddingBottom:SH(50)}}>
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>Amenities</Text>
           <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: SW(5) }}>
               {
                   GetHotelRoomResult.Amenities.map((item, index) => (
                       <Text style={{
                           color: 'black',
                           padding: SW(10), borderColor: '#60d3f0', borderRadius: 7,fontFamily:'Poppins-Regular',
                           borderWidth: 1, marginBottom: SH(10), fontSize: SF(10), marginRight: SW(5)
                       }}>{item}</Text>

                   )

                   )
               }
           </View>
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>Amentity</Text>
           <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: SW(5) }}>
               {
                   GetHotelRoomResult.Amentity.map((item, index) => (
                       <Text style={{
                           color: 'black',
                           padding: SW(5), borderColor: '#60d3f0', borderRadius: 7,fontFamily:'Poppins-Regular',
                           borderWidth: 1, marginBottom: SH(10), fontSize: SF(10), marginRight: SW(5)
                       }}>{item}</Text>

                   )

                   )
               }
           </View>
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>BedTypes</Text>
           <View style={{ flexDirection: 'row', padding: SW(5)}}>
               {
                   GetHotelRoomResult.BedTypes.map((item, index) => (
                       <View style={{display:"flex",flexDirection:"row"}}>
                           <Text style={{ color: 'black', marginBottom: SH(10), fontSize: SF(15),marginRight:SW(10) }}>
                           {item.BedTypecode}</Text>
                           <Text style={{ color: 'black', marginBottom: SH(10), fontSize: SF(15) }}>
                           {item.BedTypeDescription}</Text>
                       </View>
                   )

                   )
               }
           </View>
           <View>
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>CancellationPolicy</Text>
           <Text style={{color:'black',fontSize:SF(12)}}>{GetHotelRoomResult.CancellationPolicy.Description}</Text>
           </View>
           <View>
           <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold',
               paddingVertical:SH(7) }}>
           SmokingPreference</Text>
           <Text style={{color:'black',fontSize:SF(12)}}>{GetHotelRoomResult.SmokingPreference}</Text>
           </View>
           
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