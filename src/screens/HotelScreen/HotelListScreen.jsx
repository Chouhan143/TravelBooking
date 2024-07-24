import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SW, SH, SF, Colors} from '../../utils';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import SortModal from './SortModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {haversineDistance} from '../../hooks/HaversineDistance';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { format, differenceInDays, parseISO } from 'date-fns';
import { setHotelInfo } from '../../redux/action';
import axios from 'axios';
import { HOTEL_INFO } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
export default function HotelListScreen() {
  const dispatch=useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const hotelData = useSelector(state => state.commomReducer.hotelData);
  const hotelDataResult = hotelData.Results || [];
  const checkInDate = parseISO(hotelData.CheckInDate);
  const checkOutDate = parseISO(hotelData.CheckOutDate);
  
  const formattedCheckInDate = format(checkInDate, 'MMM dd, yyyy');
  const formattedCheckOutDate = format(checkOutDate, 'MMM dd, yyyy');
const NoOfAdults=hotelData.NoOfRooms.map(item=>item.NoOfAdults);
  // Calculate the number of days between the dates
  const numberOfNights = differenceInDays(checkOutDate, checkInDate);
  const hotelDetails = useSelector(state => state.commomReducer.hotelInfo);
  console.log('redux info data',hotelDetails);
  const currentLocation = useSelector(
    state => state.commomReducer.positionLatLong,
  );

  const currentLocationLat = currentLocation?.coords?.latitude;
  const currentLocationLong = currentLocation?.coords?.longitude;

  const curLatLong = {currentLocationLat, currentLocationLong};

  useEffect(() => {
    let data = [...hotelDataResult];
    
    if (sortOption) {
      data = data.sort((a, b) => {
        switch (sortOption) {
          case 'name':
            return a.HotelName.localeCompare(b.HotelName);
          case 'highPrice':
            return b.Price.RoomPrice - a.Price.RoomPrice;
          case 'lowPrice':
            return a.Price.RoomPrice - b.Price.RoomPrice;
          case 'rating':
            return b.StarRating - a.StarRating;
          case 'distance':
            const distanceA = haversineDistance(currentLocation.coords, {latitude: a.Latitude, longitude: a.Longitude});
            const distanceB = haversineDistance(currentLocation.coords, {latitude: b.Latitude, longitude: b.Longitude});
            return distanceA - distanceB;
          default:
            return 0;
        }
      });
    }
    
    setFilteredData(data);
  }, [hotelDataResult, sortOption]);

  const onSearch = (text) => {
    setSearchText(text);
    const tempList = hotelDataResult.filter(item =>
      item.HotelName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(tempList);
  };

  const navigation = useNavigation();
  
  const renderItem = ({item}) => {
    const Price = Math.round(item?.Price?.RoomPrice);

    const renderStar = rating => {
      let stars = [];
      for (let i = 0; i < rating; i++) {
        stars.push(
          <FontAwesome key={i} name="star" size={15} color="#FFD700" />,
        );
      }
      return stars;
    };

    const hotelCoords = {latitude: item.Latitude, longitude: item.Longitude};
    const distance =
      curLatLong && hotelCoords
        ? haversineDistance(currentLocation.coords, hotelCoords).toFixed(0)
        : 'Calculating...';

        // hotel info

        const fetchHotelDetails = async () => {
          try {
            setLoading(true);
            console.log("Fetching hotel details...");
        
            const payload = {
              ResultIndex: "9",
              SrdvIndex: "SrdvTB",
              SrdvType: "SingleTB",
              HotelCode: "92G|DEL",
              TraceId: "1"
            };
        
            console.log("Payload:", payload);
        
            const res = await axios.post(HOTEL_INFO, payload);
            // console.log("Response data:", res.data);
            navigation.navigate('HotelDescriptionPage');
            
              const hotelInfoArr = res.data.HotelInfoResult.HotelDetails;
              console.log("Hotel Info Array:", hotelInfoArr);
              
              dispatch(setHotelInfo(hotelInfoArr));
             
          
            setLoading(false);
          } catch (error) {
            console.error("Error fetching hotel details:", error);
            if (error.response) {
              console.error("Error response:", error.response);
            }
            setLoading(false);
          }
        };
      
    return (
      <TouchableOpacity
        style={styles.HotelCards}
        onPress={fetchHotelDetails}>
        <View>
          {item.HotelPicture != null ? (
            <Image
              source={{uri: item.HotelPicture}}
              style={styles.hotelImage}
              alt="No Image Found"
            />
          ) : (
            <Image
              source={require('../../images/No_Image.jpg')}
              style={styles.hotelImage}
            />
          )}
        </View>

        <View style={styles.hotelDetails}>
          <Text style={styles.Name}>{item.HotelName}</Text>
          <Text style={styles.Name}>{renderStar(item.StarRating)}</Text>
          <Text style={styles.adress}>{item.HotelAddress}</Text>
          <View style={styles.priceContainer}>
            <FontAwesome
              name={'rupee'}
              color="black"
              size={11}
              style={{margin: SW(3)}}
            />
            <Text style={styles.Price}>{Price}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: SF(11),
                textTransform: 'capitalize',
              }}>
              (include taxes and fees)
            </Text>
          </View>
          <View>
            {currentLocation != null ? (
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Entypo name={'location'} size={15} color="black" />
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    fontSize: SF(11),
                  }}>
                  {distance} km from you
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSort = (sortOption) => {
    setSortOption(sortOption);
    setModalVisible(false);
  };

  return (
    <View style={styles.MainContanier}>
      <View style={styles.searchView}>
        <View style={styles.searchbar}>
          <EvilIcons name={'search'} size={25} color="white" />
          <TextInput
            style={styles.searchText}
            placeholder='Search by hotel name '
            placeholderTextColor={'white'}
            value={searchText}
            onChangeText={text => onSearch(text)}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => onSearch('')} style={{marginLeft:SW(300),position:'absolute',zIndex:999}}>
              <MaterialIcons name={'clear'} size={25} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.dateContainer}>
          <Entypo
            name={'calendar'}
            color="white"
            size={15}
            style={styles.icon}
          />
          <Text style={styles.headerText}>
        {formattedCheckInDate}{' '}
        <Ionicons
          name={'remove-outline'}
          color="white"
          size={15}
          style={styles.icon}
        />{' '}
        {formattedCheckOutDate}
      </Text>
          <Text style={styles.headerText}>{numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}</Text>
          <FontAwesome
            name={'users'}
            color="white"
            size={15}
            style={styles.icon}
          />
          <Text style={styles.headerText}>{NoOfAdults} adults</Text>
        </View>
      </View>
      <View style={styles.filterContanier}>
        <TouchableOpacity
          style={styles.filterOption}
          onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons
            name={'sort'}
            color={Colors.theme_background}
            size={15}
          />
          <Text style={styles.filterText}>Sort</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          height={300}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.childModalContent}>
              <SortModal setModalVisible={setModalVisible} onSort={handleSort} />
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.filterOption}>
          <MaterialCommunityIcons
            name={'filter-variant'}
            color={Colors.theme_background}
            size={15}
          />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterOption}>
          <MaterialCommunityIcons
            name={'google-maps'}
            color={Colors.theme_background}
            size={15}
          />
          <Text style={styles.filterText}>Map</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    paddingBottom: SH(200),
  },
  searchView: {
    backgroundColor: Colors.theme_background,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    margin: SW(15),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchText: {
    flex: 1,
    color: 'white',
    marginLeft: SW(10),
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: SW(13),
    marginTop: SH(1),
    marginHorizontal: SW(30),
    alignItems: 'center',
  },
  headerText: {
    fontSize: SF(12),
    marginRight: SW(15),
    fontFamily: 'Poppins-Regular',
    color: 'white',
    marginLeft:SW(5)
  },
  HotelCards: {
    backgroundColor: 'white',
    margin: SW(10),
    marginBottom: SH(5),
    borderRadius: 10,
    padding: SH(15),
    elevation: 5,
    flexDirection: 'row',
    paddingBottom: SH(20),
    display: 'flex',
    flexWrap: 'wrap',
  },
  hotelImage: {
    width: SW(120),
    height: SH(140),
    borderRadius: 10,
    resizeMode: 'contain',
  },
  hotelDetails: {
    flex: 1,
    margin: SW(7),
    marginLeft: SW(10),
  },
  Name: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: SF(15),
    marginVertical: SH(2),
  },
  adress: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: SF(11),
    flexWrap: 'wrap',
    marginVertical: SH(2),
    textTransform: 'capitalize',
  },
  Price: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: SF(11),
    marginVertical: SH(2),
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
  },
  filterContanier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    elevation: 5,
    margin: SW(10),
    padding: SW(10),
    borderRadius: 10,
  },
  filterOption: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterText: {
    color: Colors.theme_background,
  },
  listContainer: {
    marginTop: SH(5),
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   
  },
  childModalContent: {
    width: '100%',
    padding: SW(20),
    paddingTop: 0,
  },
});
