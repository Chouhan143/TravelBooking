import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors, SF, SH, SW } from '../../utils';

const SortModal = ({ setModalVisible, onSort }) => {
  const handleSort = (sortOption) => {
    onSort(sortOption);
    setModalVisible(false);
  };
  
  return (
    <View style={{backgroundColor:'#edf3f5',padding:SW(10),borderRadius:10}}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
        <Entypo name={'cross'} color={Colors.theme_background} size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>Sort by</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => handleSort('name')} style={styles.optionButton}>
          <Text style={styles.optionText}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('highPrice')} style={styles.optionButton}>
          <Text style={styles.optionText}> High to Low Price</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('lowPrice')} style={styles.optionButton}>
          <Text style={styles.optionText}> Low  to High Price</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('rating')} style={styles.optionButton}>
          <Text style={styles.optionText}>Sort by Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('distance')} style={styles.optionButton}>
          <Text style={styles.optionText}>Sort by Distance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SortModal;

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: SF(15),
    marginBottom: SH(20),
  },
  optionsContainer: {
    marginBottom: SH(65),
  },
  optionButton: {
    paddingVertical: SH(10),
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: SF(14),
  },
});
