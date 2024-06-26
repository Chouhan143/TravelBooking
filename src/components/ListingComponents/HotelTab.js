import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors, SF, SH, SW} from '../../utils';
import AgeModal from '../commonComponents/AgeModal';
import {useNavigation} from '@react-navigation/native';
import {HOTEL_SEARCH} from '../../utils/BaseUrl';
import axios from 'axios';
import {getLocationLatLong, setHotelData} from '../../redux/action';
import {useDispatch} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {DatePicker, Lottie} from '../commonComponents';
import FormatedDate from '../commonComponents/FormatedDate';
import {RouteName} from '../../routes';
import HotelCitySearch from '../commonComponents/HotelCitySearch';
const HotelTab = () => {
  const [ModalVisible, SetModalVisible] = useState(false);
  const [ModalVisible1, SetModalVisible1] = useState(false);
  const [ModalVisible2, SetModalVisible2] = useState(false);
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [locationDenied, setLocationDenied] = useState(false);
  const [checkinDate, setCheckInDate] = useState('');
  const [checkoutDate, setCheckOutDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [roomsCount, setRoomsCount] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Location Permissions requests

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App requred Location Permission',
          message:
            ' App needs access to your Location ' +
            'so you can search near by hotels.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLocationDenied(false);
        getLocation();
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
        setLocationDenied(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(getLocationLatLong(position));
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
        if (error.code === 1) {
          setLocationDenied(true);
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    const checkLocationEnabled = async () => {
      const enabled = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (enabled) {
        getLocation();
      } else {
        setLocationDenied(true);
      }
    };
    checkLocationEnabled();
  }, []);

  useEffect(() => {
    if (!locationDenied) {
      console.log('Getting location...');
      getLocation();
    }
  }, [locationDenied]);

  const handleChildrenChange = change => {
    setChildrenCount(prevCount => {
      const newCount = Math.max(0, prevCount + change);
      if (newCount > prevCount) {
        setChildrenAges([...childrenAges, '']);
      } else {
        setChildrenAges(childrenAges.slice(0, -1));
      }
      return newCount;
    });
  };

  const calculateNights = (checkInDate, checkoutDate) => {
    let oneday = 24 * 60 * 60 * 1000;
    return Math.round((checkoutDate - checkInDate) / oneday);
  };

  // hotel search api
  const FetchHotelData = async () => {
    let checkInDate = new Date(checkinDate);
    let checkOutDate = new Date(checkoutDate);
    // this date pass to api payloads
    let formattedCheckInDate = FormatedDate(checkInDate);
    let formattedCheckOutDate = FormatedDate(checkOutDate);
    let noOfNights = calculateNights(checkInDate, checkOutDate);
  
    const payload = {
      BookingMode: '5',
      CheckInDate: '30/04/2020',
      NoOfNights: '1',
      CountryCode: 'IN',
      CityId: '130443',
      ResultCount: null,
      PreferredCurrency: 'INR',
      GuestNationality: 'IN',
      NoOfRooms: '1',
      RoomGuests: [
        {
          NoOfAdults: 1,
          NoOfChild: '0',
          ChildAge: [],
        },
      ],
      MaxRating: '5',
      MinRating: '0',
    };
  
    setLoading(true);
  
    setTimeout(async () => {
      try {
        const res = await axios.post(HOTEL_SEARCH, payload);
        const HotelListArr = res.data.Results;
        // console.log('Fetched Data:', HotelListArr);
        dispatch(setHotelData(HotelListArr));
        navigation.navigate(RouteName.HOTEL_LIST_SCREEN);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    }, 5000);
  };
  

  const handleChildAgeChange = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  // const HandleCity = () => {
  //   navigation.navigate(RouteName.HOTEL_LIST_SCREEN);
  // };
  return (
    <View style={styles.mainContanier}>
      <View style={styles.header}>
        <Text style={styles.headerText1}>find your next stay</Text>
        <TouchableOpacity></TouchableOpacity>
        <Text style={styles.headerText} onPress={() => SetModalVisible(true)}>
          search deals on hotels, homes, and much more .....
        </Text>
      </View>

      <TouchableOpacity
        style={styles.searchbar}
        onPress={() => SetModalVisible(true)}>
        <EvilIcons name={'search'} size={25} color="gray" />
        <Text style={styles.search}>Search Hotels .......</Text>
      </TouchableOpacity>


      <View style={styles.dates}>
        <View style={styles.CheckDateBox}>
          <Text style={styles.checkindate}>check in date</Text>
          <DatePicker onDateSelect={date => setCheckInDate(date)} />
        </View>
        <View style={styles.CheckDateBox}>
          <Text style={styles.checkindate}>check out date</Text>
          <DatePicker onDateSelect={date => setCheckOutDate(date)} />
        </View>
      </View>
      <View style={styles.ageContanier}>
        <View style={styles.ageSmallContanier}>
          <Text style={styles.text}>adults</Text>
          <Text style={styles.ageText} onPress={() => SetModalVisible1(true)}>
            {adultsCount}
          </Text>
        </View>
        <View style={styles.ageSmallContanier}>
          <Text style={styles.text}>children</Text>
          <Text style={styles.ageText} onPress={() => SetModalVisible1(true)}>
            {childrenCount}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>Rooms</Text>
          <Text style={styles.ageText} onPress={() => SetModalVisible1(true)}>
            {roomsCount}
          </Text>
        </View>
      </View>

      {loading ? (
        <Lottie
          source={require('../../images/LottieAnimation/isLoader.json')}
          Lottiewidthstyle={{
            width: '32%',
            height: '80%',
            paddingTop: SH(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={FetchHotelData}>
          <Text style={styles.buttonText}>search</Text>
        </TouchableOpacity>
      )}


      <HotelCitySearch
        ModalVisible={ModalVisible}
        SetModalVisible={SetModalVisible}
      />

      {/* age modal */}
      <Modal
        visible={ModalVisible1}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          SetModalVisible1(!ModalVisible1);
        }}>
        <ScrollView style={styles.ModalView}>
          <Entypo
            name={'cross'}
            size={30}
            color="#d9d5d4"
            onPress={() => SetModalVisible1(!ModalVisible1)}
            style={{
              marginLeft: SW(320),
              marginTop: SH(10),
              marginBottom: SH(30),
            }}
          />
          <View>
            <View style={styles.modalContanier}>
              <Text style={styles.ageModaltext}>adults</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => setAdultsCount(Math.max(1, adultsCount - 1))}>
                <Entypo name={'minus'} size={20} color="white" />
              </TouchableOpacity>
              <Text style={{color: 'black'}}>{adultsCount}</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => setAdultsCount(adultsCount + 1)}>
                <Entypo name={'plus'} size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContanier}>
              <Text style={styles.ageModaltext}>children</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => handleChildrenChange(-1)}>
                <Entypo name={'minus'} size={20} color="white" />
              </TouchableOpacity>
              <Text style={{color: 'black'}}>{childrenCount}</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => handleChildrenChange(1)}>
                <Entypo name={'plus'} size={20} color="white" />
              </TouchableOpacity>
            </View>
            {childrenCount > 0 && (
              <View>
                <View style={styles.ageTextContanier}>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Medium'}}>
                    Age of child at check-out
                  </Text>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                    Add the age of each child to get the best match for beds,
                    room size, and special prices.
                  </Text>
                </View>
                {childrenAges.map((age, index) => {
                  if (index % 2 === 0) {
                    return (
                      <View key={index} style={styles.ageInputRow}>
                        <View style={styles.ageInputContainer}>
                          <TouchableOpacity
                            onPress={() => SetModalVisible2(true)}>
                            <Text style={styles.ageModaltext}>
                              Child {index + 1} Age
                            </Text>
                          </TouchableOpacity>
                          <Ionicons
                            name={'chevron-expand-outline'}
                            size={20}
                            color={Colors.theme_background}
                          />
                        </View>
                        {index + 1 < childrenAges.length && (
                          <View style={styles.ageInputContainer}>
                            <TouchableOpacity
                              onPress={() => SetModalVisible2(true)}>
                              <Text style={styles.ageModaltext}>
                                Child {index + 2} Age
                              </Text>
                            </TouchableOpacity>
                            <Ionicons
                              name={'chevron-expand-outline'}
                              size={20}
                              color={Colors.theme_background}
                            />
                          </View>
                        )}
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            )}
            <View style={styles.modalContanier}>
              <Text style={styles.ageModaltext}>Rooms</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => setRoomsCount(Math.max(1, roomsCount - 1))}>
                <Entypo name={'minus'} size={20} color="white" />
              </TouchableOpacity>
              <Text style={{color: 'black'}}>{roomsCount}</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => setRoomsCount(roomsCount + 1)}>
                <Entypo name={'plus'} size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bottomButtom}
            onPress={() => SetModalVisible1(false)}>
            <Text style={styles.bottombuttonText}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <Modal
        visible={ModalVisible2}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          SetModalVisible2(!ModalVisible2);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.childModalContent}>
            <AgeModal SetModalVisible2={SetModalVisible2} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HotelTab;

const styles = StyleSheet.create({
  mainContanier: {
    marginTop: SH(10),
    marginBottom: SH(40),
  },
  headerText: {
    color: 'black',
    fontSize: SF(12),
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular',
  },
  headerText1: {
    color: 'black',
    fontSize: SF(12),
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Bold',
  },
  header: {
    margin: SW(5),
    marginBottom: SH(15),
  },
  search: {
    color: 'gray',
    textTransform: 'capitalize',
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: SH(15),
    marginTop: SH(20),
    borderColor: 'gray',
    borderWidth: 1,
    padding: SW(15),
    borderRadius: 7,
  },
  dates: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SH(20),
  },
  checkindate: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    fontSize: SF(12),
  },
  checkoutdate: {
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Medium',
    fontSize: SF(15),
  },
  CheckDateBox: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingTop: SH(5),
    marginTop: SH(10),
    paddingBottom: SH(5),

    paddingHorizontal: SW(25),
    borderRadius: 7,
  },
  ageContanier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SW(7),
    borderColor: 'black',
    borderWidth: 1,
    marginTop: SH(10),
    borderRadius: 7,
    backgroundColor: '#ebecf0',
    marginBottom: SH(15),
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: SF(13),
  },
  ageText: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: SF(18),
  },
  ageSmallContanier: {
    borderColor: 'gray',
    borderRightWidth: 1,
    textAlign: 'left',
    paddingRight: SW(67),
  },
  button: {
    marginTop: SH(60),
    backgroundColor: Colors.theme_background,
    borderRadius: 7,
    padding: SW(10),
  },
  buttonText: {
    color: 'white',
    fontSize: SF(20),
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Medium',
    fontSize: SF(18),
  },
  modalHeader: {
    margin: SW(20),
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  modalHeaderContanier: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
    padding: SW(25),
    borderBottomWidth: 1,
    borderColor: '#dcddde',
  },
  Modalsearchbar: {
    display: 'flex',
    flexDirection: 'row',
    padding: SW(15),
    margin: SW(15),
    borderColor: '#b8bdbf',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchText: {
    color: 'gray',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
  },
  destinationHeading: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    margin: SW(18),
    textTransform: 'capitalize',
  },
  ModalView: {
    marginTop: SH(170),
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 0,
    paddingLeft: SW(0),
    padding: SW(100),
    borderColor: '#c3c9de',
    borderWidth: 1,
    paddingRight: 0,
  },
  modalContanier: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SH(20),
  },
  buttons: {
    backgroundColor: Colors.theme_background,
    padding: SW(3),
    borderRadius: 5,
  },
  ageModaltext: {
    color: 'black',
    textTransform: 'capitalize',
    fontSize: SF(15),
  },
  ageInputContanier: {
    marginBottom: SH(10),
    display: 'flex',
    flexDirection: 'row',
  },
  ageInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginLeft: SW(10),
    width: SW(50),
    textAlign: 'center',
  },
  bottomButtom: {
    backgroundColor: Colors.theme_background,
    marginTop: SH(200),
    padding: SW(7),
    margin: SW(10),
    borderRadius: 7,
  },
  bottombuttonText: {
    color: 'white',
    fontSize: SF(20),
    textAlign: 'center',
  },
  ageTextContanier: {
    margin: SW(25),
    marginTop: SH(5),
    marginBottom: SH(5),
  },
  ageInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SH(10),
    margin: SW(15),
  },
  ageInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.theme_background,
    marginHorizontal: SW(5),
    padding: SW(3),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  permissionDeniedContainer: {
    padding: 16,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionDeniedText: {
    color: '#721c24',
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#d4edda',
    padding: 10,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: '#155724',
  },
});
