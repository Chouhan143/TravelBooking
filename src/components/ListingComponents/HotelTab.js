import { Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { SF, SH, SW } from '../../utils';

const HotelTab = () => {
  const [ModalVisible, SetModalVisible] = useState(false);
  const [ModalVisible1, SetModalVisible1] = useState(false);
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [roomsCount, setRoomsCount] = useState(1);

  const handleChildrenChange = (change) => {
    setChildrenCount((prevCount) => {
      const newCount = Math.max(0, prevCount + change);
      if (newCount > prevCount) {
        setChildrenAges([...childrenAges, '']);
      } else {
        setChildrenAges(childrenAges.slice(0, -1));
      }
      return newCount;
    });
  };

  const handleChildAgeChange = (index, age) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  return (
    <View style={styles.mainContanier}>
      <View style={styles.header}>
        <Text style={styles.headerText1}>find your next stay</Text>
        <Text style={styles.headerText} onPress={() => SetModalVisible(true)}>search deals on hotels, homes, and much more .....</Text>
      </View>
      <View style={styles.searchbar}>
        <EvilIcons name={'search'} size={20} color='black' />
        <Text style={styles.search} onPress={() => SetModalVisible(true)}>Search Hotels .......</Text>
      </View>
      <View style={styles.dates}>
        <View style={styles.CheckDateBox}>
          <Text style={styles.checkindate}>check in date</Text>
          <Text style={styles.checkoutdate}>fri jan 25</Text>
        </View>
        <View style={styles.CheckDateBox}>
          <Text style={styles.checkindate}>check out date</Text>
          <Text style={styles.checkoutdate}>fri jan 26</Text>
        </View>
      </View>
      <View style={styles.ageContanier}>
        <View style={styles.ageSmallContanier}>
          <Text style={styles.text}>adults</Text>
          <Text style={styles.ageText} onPress={() => SetModalVisible1(true)}>{adultsCount}</Text>
        </View>
        <View style={styles.ageSmallContanier}>
          <Text style={styles.text}>children</Text>
          <Text style={styles.ageText} onPress={() => SetModalVisible1(true)}>{childrenCount}</Text>
        </View>
        <View>
          <Text style={styles.text}>Rooms</Text>
          <Text style={styles.ageText} onPress={() => SetModalVisible1(true)}>{roomsCount}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>search</Text>
      </TouchableOpacity>

      {/* search modal */}
      <Modal
        visible={ModalVisible}
        animationType='slide'
        onRequestClose={() => {
          SetModalVisible(!ModalVisible);
        }}
      >
        <View style={styles.modalHeader}>
          <View style={styles.modalHeaderContanier}>
            <Text style={styles.modalText}>enter destination</Text>
            <Entypo name={'cross'} size={25} color='black' onPress={() => SetModalVisible(!ModalVisible)} />
          </View>
        </View>
        <View style={styles.Modalsearchbar}>
          <EvilIcons name={'search'} size={20} color='black' />
          <Text style={styles.searchText}>e.g city, landmark, address</Text>
        </View>
        <Text style={styles.destinationHeading}>popular destinations nearby</Text>
        <View style={{ display: 'flex', flexDirection: 'row', margin: SW(15) }}>
          <FontAwesome6 name={'location-dot'} size={20} color='black' style={{ marginRight: SW(10) }} />
          <Text style={{ color: 'black' }}>Your Location</Text>
        </View>
      </Modal>

      {/* age modal */}
      <Modal
        visible={ModalVisible1}
        transparent={true}
        animationType='slide'
        onRequestClose={() => {
          SetModalVisible1(!ModalVisible1);
        }}
      >
        <ScrollView style={styles.ModalView}>
          <Entypo name={'cross'} size={30} color='#d9d5d4' onPress={() => SetModalVisible1(!ModalVisible1)}
            style={{ marginLeft: SW(320), marginTop: SH(10), marginBottom: SH(30) }} />
          <View style={styles.modalContanier}>
            <Text style={styles.ageModaltext}>adults</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => setAdultsCount(Math.max(1, adultsCount - 1))}>
              <Entypo name={'minus'} size={20} color='white' />
            </TouchableOpacity>
            <Text style={{ color: 'black' }}>{adultsCount}</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => setAdultsCount(adultsCount + 1)}>
              <Entypo name={'plus'} size={20} color='white' />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContanier}>
            <Text style={styles.ageModaltext}>children</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => handleChildrenChange(-1)}>
              <Entypo name={'minus'} size={20} color='white' />
            </TouchableOpacity>
            <Text style={{ color: 'black' }}>{childrenCount}</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => handleChildrenChange(1)}>
              <Entypo name={'plus'} size={20} color='white' />
            </TouchableOpacity>
          </View>
          {childrenCount > 0 && (
            <View>
              <View style={styles.ageTextContanier}>
              <Text style={{ color: 'black',fontFamily:'Poppins-Medium' }}>Age of child at check-out</Text>
              <Text style={{ color: 'black',fontFamily:'Poppins-Regular' }}>Add the age of each child to get the best match for beds, room size, and special prices.</Text>
              </View>
              {childrenAges.map((age, index) => (
                <View key={index} style={styles.ageInputContanier}>
                  <View style={{borderWidth:1,borderColor:'#86d5eb',padding:SW(10),paddingLeft:SW(40)}}>
                  <Ionicons name={'chevron-expand-outline'}  size={20} color='#86d5eb' style={{marginLeft:SW(90)}} />
                  </View>
                </View>
              ))}
            </View>
          )}
          <View style={styles.modalContanier}>
            <Text style={styles.ageModaltext}>Rooms</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => setRoomsCount(Math.max(1, roomsCount - 1))}>
              <Entypo name={'minus'} size={20} color='white' />
            </TouchableOpacity>
            <Text style={{ color: 'black' }}>{roomsCount}</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => setRoomsCount(roomsCount + 1)}>
              <Entypo name={'plus'} size={20} color='white' />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bottomButtom} onPress={() => SetModalVisible1(false)}>
            <Text style={styles.bottombuttonText}>Done</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default HotelTab;

const styles = StyleSheet.create({
  mainContanier: {
    marginTop: SH(20), marginBottom: SH(70)
  },
  headerText: {
    color: 'black',
    fontSize: SF(12),
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Regular'
  },
  headerText1: {
    color: 'black',
    fontSize: SF(12),
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Bold'
  },
  header: {
    margin: SW(5),
    marginBottom: SH(15)
  },
  search: {
    color: 'gray', textTransform: 'capitalize'
  },
  searchbar: {
    display: 'flex', flexDirection: 'row', marginBottom: SH(15), marginTop: SH(20),
    borderColor: 'gray', borderWidth: 1, padding: SW(15), borderRadius: 7
  },
  dates: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: SH(20)
  },
  checkindate: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    textTransform: 'capitalize',
    fontSize: SF(12)
  },
  checkoutdate: {
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Medium',
    fontSize: SF(15)
  },
  CheckDateBox: {
    borderColor: '#b3cee3',
    borderWidth: 1,
    paddingTop: SH(5),
    marginTop: SH(10),
    paddingBottom: SH(5),
    paddingLeft: SW(9),
    padding: SW(59),
    borderRadius: 7,
  },
  ageContanier: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
    padding: SW(7), borderColor: 'black', borderWidth: 1, marginTop: SH(10), borderRadius: 7,
    backgroundColor: '#f7fbfc', marginBottom: SH(15)
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: 'black', fontSize: SF(13)
  },
  ageText: {
    fontFamily: 'Poppins-Medium',
    color: 'black', fontSize: SF(18)
  },
  ageSmallContanier: {
    borderColor: '#b3cee3',
    borderRightWidth: 1,
    textAlign: "left",
    paddingRight: SW(67),
  },
  button: {
    marginTop: SH(60),
    backgroundColor: '#4dc0fa',
    borderRadius: 7,
    padding: SW(10)
  },
  buttonText: {
    color: 'white',
    fontSize: SF(20),
    textAlign: 'center',
  },
  modalText: {
    color: 'black', textTransform: 'capitalize',
    fontFamily: 'Poppins-Medium', fontSize: SF(18),
  },
  modalHeader: {
    margin: SW(20),
    marginLeft: 0, marginRight: 0, marginTop: 0,
  },
  modalHeaderContanier: {
    display: 'flex', flexDirection: 'row', marginTop: 0,
    justifyContent: 'space-between', padding: SW(25), borderBottomWidth: 1, borderColor: '#dcddde'
  },
  Modalsearchbar: {
    display: 'flex', flexDirection: 'row', padding: SW(15),
    margin: SW(15), borderColor: '#b8bdbf', borderWidth: 1, borderRadius: 5
  },
  searchText: {
    color: 'gray', fontFamily: 'Poppins-Regular', textTransform: 'capitalize'
  },
  destinationHeading: {
    color: 'black', fontFamily: 'Poppins-Bold', margin: SW(18), textTransform: 'capitalize'
  },
  ModalView: {
    marginTop: SH(170), backgroundColor: 'white',
    borderTopLeftRadius: 15, borderTopRightRadius: 15, paddingTop: 0, paddingLeft: SW(0),
    padding: SW(100), borderColor: '#c3c9de', borderWidth: 1, paddingRight: 0
  },
  modalContanier: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: SH(20)
  },
  buttons: {
    backgroundColor: '#5775d9', padding: SW(3), borderRadius: 5
  },
  ageModaltext: {
    color: 'black', textTransform: 'capitalize', fontSize: SF(15)
  },
  ageInputContanier: {
    marginBottom: SH(10),display:'flex',flexDirection:'row'
  },
  ageInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginLeft: SW(10),
    width: SW(50),
    textAlign: 'center'
  },
  bottomButtom: {
    backgroundColor: '#5775d9', marginTop: SH(200), padding: SW(7), margin: SW(10),
    borderRadius: 7
  },
  bottombuttonText: {
    color: 'white', fontSize: SF(20), textAlign: 'center'
  },
  ageTextContanier:{
    margin:SW(25),marginTop:SH(5),marginBottom:SH(5)
  }
});
