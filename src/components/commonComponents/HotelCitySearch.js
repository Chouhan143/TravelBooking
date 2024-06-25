import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Colors, SF, SH, SW} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
const HotelCitySearch = ({ModalVisible, SetModalVisible}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchCityData();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchCityData = async () => {
    try {
      const response = await axios.get(
        `https://api.example.com/cities?query=${searchQuery}`,
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCitySelect = city => {
    // Handle city selection logic here
    SetModalVisible(false); // Close the modal on city select
  };

  return (
    <Modal
      visible={ModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => SetModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', paddingBottom: SH(20)}}
            onPress={() => SetModalVisible(false)}>
            <AntDesign
              name={'closecircle'}
              size={SW(25)}
              style={{color: 'red'}}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            placeholder="Search for cities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchResults.map((result, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resultItem}
              onPress={() => handleCitySelect(result)}>
              <Text>{result.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '95%',
    height: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // marginTop: 50,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
});

export default HotelCitySearch;
