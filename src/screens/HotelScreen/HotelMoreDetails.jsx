import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, SH, SW, SF } from '../../utils';
import { RouteName } from '../../routes';
import { HOTEL_ROOM_DETAILS } from '../../utils/BaseUrl';
import ReadMoreText from '../../components/commonComponents/ReadMore';

export default function HotelMoreDetails() {
    const [RoomData, setRoomData] = useState(null);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const payload = {
                    ResultIndex: "9",
                    SrdvIndex: "SrdvTB",
                    SrdvType: "SingleTB",
                    HotelCode: "92G|DEL",
                    TraceId: "1"
                }
                const res = await axios.post(HOTEL_ROOM_DETAILS, payload);
                const RoomDataArr = res.data.GetHotelRoomResult.HotelRoomsDetails;
                setRoomData(RoomDataArr);
                console.log('Room Data', JSON.stringify(RoomDataArr));
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchRoomData();
    }, []);

    const navigation = useNavigation();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const formatHotelDetails = (detailsString) => {
        if (!detailsString) {
            return "No details provided";
        }
    
        const [roomType, details] = detailsString.split('#^#');
        if (!roomType || !details) {
            return "Invalid details format";
        }
    
        const [charges, ...cancellationPolicies] = details.split('|');
        if (!charges || cancellationPolicies.length === 0) {
            return "Invalid cancellation policy format";
        }
    
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };
    
        const formattedPolicies = cancellationPolicies.map(policy => {
            const [amountText, dateRange] = policy.split(', If cancelled between ');
            if (!amountText || !dateRange) {
                return "Invalid policy format";
            }
            const [startDate, endDate] = dateRange.split(' and ');
            if (!startDate || !endDate) {
                return "Invalid date range format";
            }
    
            return `${amountText.trim()}, If cancelled between ${formatDate(startDate.trim())} and ${formatDate(endDate.trim())}`;
        });
    
        return `Room Type: ${roomType.replace('\n', ' ')}\nCharges: ${charges.trim()}\n\nCancellation Policies:\n${formattedPolicies.join('\n')}`;
    };

    const RenderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.RoomTypeName}</Text>
                {item.DayRates.map((rate, index) => (
                    <View key={index} style={styles.rateContainer}>
                        <Text style={styles.rateText}>
                            <FontAwesome name={'rupee'} color='black' />{rate.Amount}
                        </Text>
                        <Text style={styles.rateText}>{formatDate(rate.Date)}</Text>      
                    </View>
                ))}
                {item.Amenities.map((amenties,index) => (
                    <View key={index} style={styles.rateContainer}>
                        <Text style={styles.rateText}>
                            {amenties}
                        </Text>    
                    </View>
                ))}
                <View style={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.rateText}>{formatDate(item.LastCancellationDate)}</Text>
                <Text style={{fontFamily:'Poppins-Regular',color:'gray',fontSize:SF(10)}}>(last data for Cancellation)</Text>
                </View>
                <View style={{display:"flex",flexDirection:'row',justifyContent:'space-between',marginVertical:SH(5)}}>
                <Text style={styles.Text}>SmokingPreference </Text>
                <Text style={{fontFamily:'Poppins-Regular',color:'gray',fontSize:SF(10)}}>{item.SmokingPreference}</Text>
                </View>
                <View>
                <Text style={styles.Text}>CancellationPolicies</Text>
                <View >
                {item.CancellationPolicies.map((policy,index) => (
                    <View key={index} style={{display:'flex',flexDirection:'row',
                        justifyContent:'space-between',backgroundColor:'#e1e7e8',
                        padding:SW(5),borderRadius:5,marginBottom:SH(5)}} > 
                        <Text style={{fontSize:SF(12),
                            fontFamily:'Poppins-Regular',color:'black'}}> Charges 
                            {policy.Charge}
                        </Text>   
                        <Text style={styles.rateText}> From
                            {formatDate(policy.FromDate)}
                        </Text>   
                        <Text style={styles.rateText}> To
                            {formatDate(policy.ToDate)}
                        </Text>    
                    </View>
                ))}
                </View>
                <View style={{marginVertical:SH(5)}}>
                <Text style={styles.Text}>CancellationPolicy</Text>
                <ReadMoreText text={formatHotelDetails(item.CancellationPolicy)}
                textStyle={{fontFamily:'Poppins-Regular',color:'gray',fontSize:SF(10)}}
                readMoreStyle={{
                  color: Colors.theme_background, fontFamily: 'Poppins-Bold',
                  fontSize: SF(13), marginLeft: 0, marginTop: SH(5)
                }}/>
                <TouchableOpacity style={{backgroundColor:Colors.theme_background,
                    justifyContent:'flex-end',marginLeft:SW(250),borderRadius:10,height:SH(30),
                alignItems:'center'}}>
                <Text style={{color:'white',fontFamily:'Poppins-Bold'}}>Reserve</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={{textAlign:'center',
            paddingTop:SH(15),fontFamily:'Poppins-Bold',fontSize:SF(20),
            textTransform:'capitalize',color:Colors.theme_background}}>Select Room</Text>
            <FlatList
                data={RoomData}
                renderItem={RenderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}
                    onPress={() => navigation.navigate(RouteName.MORE_DETAIL_CONTINUE_SCREEN)}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: SH(50),
        margin: SW(15)
    },
    itemContainer: {
        backgroundColor: '#f2f5f5',
        padding: SW(10),
        marginBottom: SH(10),
        borderRadius: 8,
    },
    itemText: {
        color: 'black',
        fontSize: SF(15),
        fontFamily:'Poppins-Medium',
        textTransform:'capitalize'

    },
    rateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SH(5),
    },
    rateText: {
        color: 'black',
        fontSize: SF(12),
        fontFamily:'Poppins-Regular'
    },
    Text: {
        color: 'black',
        fontSize: SF(12),
        fontFamily:'Poppins-Medium',

    },
    continueButton: {
        backgroundColor: Colors.theme_background,
        padding: SH(20),
    },
    continueButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily:'Poppins-Bold'
    }
});
