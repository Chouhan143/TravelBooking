import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
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
export default function HotelListScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const hotelData = useSelector(state => state.commomReducer.hotelData);

  const currentLocation = useSelector(
    state => state.commomReducer.positionLatLong,
  );

  console.log('currentLocation', currentLocation);

  const currentLocationLat = currentLocation?.coords?.latitude;

  const currentLocationLong = currentLocation?.coords?.longitude;

  const curLatLong = {currentLocationLat, currentLocationLong};

  // console.log('currentLocationLat', currentLocationLat);
  // console.log('currentLocationLong', currentLocationLong);

  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);
  const renderItem = ({item}) => {
    const Price = Math.round(item?.Price?.RoomPrice);

    const renderStar = rating => {
      let stars = [];
      for (let i = 0; i <= rating; i++) {
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

    return (
      <TouchableOpacity
        style={styles.HotelCards}
        onPress={() => navigation.navigate('HotelDescriptionPage')}>
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
  return (
    <View style={styles.MainContanier}>
      <View style={styles.searchView}>
        <View style={styles.searchbar}>
          <EvilIcons name={'search'} size={25} color="white" />
          <Text style={styles.searchText}>Searched City</Text>
        </View>
        <View style={styles.dateContainer}>
          <Entypo
            name={'calendar'}
            color="white"
            size={15}
            style={styles.icon}
          />
          <Text style={styles.headerText}>
            17 Jan{' '}
            <Ionicons
              name={'remove-outline'}
              color="white"
              size={15}
              style={styles.icon}
            />{' '}
            18 Jan
          </Text>
          <Text style={styles.headerText}>(2 nights)</Text>
          <FontAwesome
            name={'users'}
            color="white"
            size={15}
            style={styles.icon}
          />
          <Text style={styles.headerText}>2 adults</Text>
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
              <SortModal setModalVisible={setModalVisible} />
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
          data={hotelData}
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
    padding: SW(15),
    margin: SW(15),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: SH(400),
  },
  childModalContent: {
    width: '100%',
    padding: SW(20),
    backgroundColor: 'white',
    paddingTop: 0,
  },
});
