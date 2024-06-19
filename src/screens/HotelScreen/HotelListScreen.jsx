import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SW, SH, SF, Colors } from '../../utils';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

export default function HotelListScreen() {
    const hotelData = useSelector((state) => state.commomReducer.hotelData);
    console.log('hotelData',hotelData);
    const renderItem = ({ item }) => {
        return (
            <View style={styles.HotelCards}>
               <Image source={{ uri: item.HotelPicture }} style={styles.hotelImage} />
                <View style={styles.hotelDetails}>
                    <Text style={styles.DataText}>{item.HotelName}</Text>
                    <Text style={{fontSize:SF(10),color:'black'}}>{item.HotelAddress}</Text>

                   {/*} <Text style={styles.DataSubDetails}>{item.rating}</Text>
                    <Text style={styles.DataSubDetails}>{item.reviews} Reviews</Text>
                    <View style={styles.locationContainer}>
                        <Entypo name={'location'} color='black' size={15} style={styles.icon} />
                        <Text style={styles.DataSubDetails}>{item.location}</Text>
                    </View>
                    <Text style={styles.DataSubDetails}>{item.distance} Km From Center</Text>
                    <View style={styles.priceContainer}>
                        <FontAwesome name={'rupee'} color='black' size={15} style={styles.icon} />
                        <Text style={styles.DataSubDetails}>{item.price}</Text>
                    </View>*/}
                 </View>
            </View>
        );
    };

    return (
        <View style={styles.MainContanier}>
            <View style={styles.searchView}>
                <View style={styles.searchbar}>
                    <EvilIcons name={'search'} size={25} color='white' />
                    <Text style={styles.searchText}>Searched City</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Entypo name={'calendar'} color='white' size={15} style={styles.icon} />
                    <Text style={styles.headerText}>17 Jan <Ionicons name={'remove-outline'} color='white' size={15} style={styles.icon} /> 18 Jan</Text>
                    <Text style={styles.headerText}>(2 nights)</Text>
                    <FontAwesome name={'users'} color='white' size={15} style={styles.icon} />
                    <Text style={styles.headerText}>2 adults</Text>
                </View>
            </View>
            <View style={styles.filterContanier}>
                <View style={styles.filterOption}>
                    <MaterialCommunityIcons name={'sort'} color={Colors.theme_background} size={15} />
                    <Text style={styles.filterText}>Sort</Text>
                </View>
                <View style={styles.filterOption}>
                    <MaterialCommunityIcons name={'filter-variant'} color={Colors.theme_background} size={15} />
                    <Text style={styles.filterText}>Filter</Text>
                </View>
                <View style={styles.filterOption}>
                    <MaterialCommunityIcons name={'google-maps'} color={Colors.theme_background} size={15} />
                    <Text style={styles.filterText}>Map</Text>
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={hotelData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContanier: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: SH(200)
    },
    searchView: {
        backgroundColor: Colors.theme_background,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    searchbar: {
        display: 'flex',
        flexDirection: 'row',
        padding: SW(15),
        margin: SW(15),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5
    },
    searchText: {
        color: 'white',
        fontFamily: 'Poppins-Bold'
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: SW(13),
        marginTop: SH(1),
        marginHorizontal: SW(30),
        alignItems: 'center'
    },
    headerText: {
        fontSize: SF(12),
        marginRight: SW(15),
        fontFamily: 'Poppins-Regular',
        color: 'white'
    },
    HotelCards: {
        backgroundColor: 'white',
        margin: SW(10),
        marginBottom: SH(0),
        borderRadius: 10,
        padding: SH(15),
        elevation: 5,
        flexDirection: 'row',
        paddingBottom: SH(5)
    },
    hotelImage: {
        width: SW(120),
        height: SH(135),
        borderRadius: 10,
        resizeMode: 'contain'
    },
    hotelDetails: {
        flex: 2,
        margin: SW(5)
    },
    DataText: {
        color: 'black',
        fontFamily: 'Poppins-Regular',
        fontSize: SF(15),
        marginLeft: SW(5)
    },
    DataSubDetails: {
        color: 'black',
        fontFamily: 'Poppins-Regular',
        fontSize: SF(13),
        marginLeft: SW(5)
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 1
    },
    icon: {
        marginHorizontal: 2
    },
    priceContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    contentContainerStyle: {
        paddingBottom: 15
    },
    filterContanier: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        elevation: 5,
        margin: SW(10),
        padding: SW(10),
        borderRadius: 10
    },
    filterOption: {
        display: 'flex',
        flexDirection: 'row'
    },
    filterText: {
        color: Colors.theme_background
    },
    listContainer: {
        marginTop: SH(5)
    }
});
