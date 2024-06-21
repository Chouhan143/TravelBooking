import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { SW, SH, SF, Colors } from '../../utils';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SortModal from './SortModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function HotelListScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const hotelData = useSelector((state) => state.commomReducer.hotelData);
    const navigation = useNavigation();
    const [imageError, setImageError] = useState(false);
    const renderItem = ({ item }) => {
        const Price = Math.round(item?.Price?.RoomPrice);
    
        const RenderStar=(rating)=>{
            let stars=[];
          for(let i=0; i<=rating ; i++){
                stars.push(<FontAwesome key={i} name="star" size={15} color="#FFD700"/>)
          }
          return stars;
        }
       
        return (
            <TouchableOpacity style={styles.HotelCards} onPress={() => navigation.navigate('HotelDescriptionPage')}>
                {imageError ? (
                    <Image 
                      source={{ uri:item.HotelPicture }} 
                      style={styles.hotelImage} 
                      onError={() => setImageError(true)} 
                    />
                  ) : (
                    <Text style={styles.imageNotFoundText}>Image Not Found</Text>
                  )}
                <View style={styles.hotelDetails}>
                    <Text style={styles.Name}>{item.HotelName}</Text>
                    <Text style={styles.Name}>{RenderStar(item.StarRating)}</Text>
                    <Text style={styles.adress}>{item.HotelAddress}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={{ color: 'black', fontFamily: 'Poppins-Regular', fontSize: SF(11) }}>Price :</Text>
                        <FontAwesome name={'rupee'} color='black' size={12} style={{ marginLeft: SW(5) }} />
                        <Text style={styles.Price}>{Price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
                <TouchableOpacity style={styles.filterOption} onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name={'sort'} color={Colors.theme_background} size={15} />
                    <Text style={styles.filterText}>Sort</Text>
                </TouchableOpacity>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType='slide'
                    height={300}
                    onRequestClose={() => setModalVisible(false)}
                    
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.childModalContent}>
                            <SortModal setModalVisible={setModalVisible} />
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={styles.filterOption}>
                    <MaterialCommunityIcons name={'filter-variant'} color={Colors.theme_background} size={15} />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterOption}>
                    <MaterialCommunityIcons name={'google-maps'} color={Colors.theme_background} size={15} />
                    <Text style={styles.filterText}>Map</Text>
                </TouchableOpacity>
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
        marginBottom: SH(5),
        borderRadius: 10,
        padding: SH(15),
        elevation: 5,
        flexDirection: 'row',
        paddingBottom: SH(20)
    },
    hotelImage: {
        width: SW(120),
        height: SH(135),
        borderRadius: 10,
        resizeMode: 'contain'
    },
    hotelDetails: {
        flex: 2,
        margin: SW(7),
        marginLeft:SW(10),
    },
    Name: {
        color: 'black',
        fontFamily: 'Poppins-Regular',
        fontSize: SF(15),
    },
    adress: {
        color: 'gray',
        fontFamily: 'Poppins-Regular',
        fontSize: SF(10),
    },
    Price: {
        color: 'black',
        fontFamily: 'Poppins-Bold',
        fontSize: SF(11),
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
    },
    modalContainer: {
       flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop:SH(400)
    },
    childModalContent: {
        width: '100%',
        padding: SW(20),
        backgroundColor: 'white',
        paddingTop:0
    },
    priceContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    }
});
