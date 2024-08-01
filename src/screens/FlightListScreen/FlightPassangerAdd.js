import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, SH, SW} from '../../utils';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';

const FlightPassangerAdd = ({
  passengerType,
  data,
  iconBackgroundColor,
  passengerCount,
  onRemovePassenger,
  onSelectionChange,
}) => {
  const navigation = useNavigation();
  const [selectedIndices, setSelectedIndices] = useState([]);

  const toggleSelection = (index, passengerData) => {
    setSelectedIndices(prevSelectedIndices => {
      const isSelected = prevSelectedIndices.includes(index);
      let updatedSelection;

      if (isSelected) {
        updatedSelection = prevSelectedIndices.filter(
          selectedIndex => selectedIndex !== index,
        );
      } else if (prevSelectedIndices.length < passengerCount) {
        updatedSelection = [...prevSelectedIndices, index];
      } else {
        updatedSelection = prevSelectedIndices;
      }

      // Update the selectedPassengers state in the parent component
      onSelectionChange(passengerData, index, !isSelected); // Pass the complete passenger data
      return updatedSelection;
    });
  };

  const handleRemovePassenger = index => {
    setSelectedIndices(prevSelectedIndices => {
      const updatedSelection = prevSelectedIndices.filter(
        selectedIndex => selectedIndex !== index,
      );
      onSelectionChange(updatedSelection.length);
      return updatedSelection;
    });
    onRemovePassenger(index);
  };

  const colorChange = selectedIndices.length === passengerCount;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <View
              style={{
                backgroundColor: iconBackgroundColor,
                borderRadius: 20,
                width: SW(35),
                height: SW(35),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name={'user-alt'} size={17} />
            </View>
            <Text style={{color: 'black', fontFamily: 'Poppins-Bold'}}>
              {passengerType}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 5}}>
          <Text
            style={{
              color: colorChange ? 'green' : null,
            }}>
            {selectedIndices.length}/{passengerCount}
          </Text>
          <Text
            style={{
              color: colorChange ? 'green' : null,
            }}>
            Added
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            const isSelected = selectedIndices.includes(index);

            return (
              <View style={styles.passengerList}>
                <TouchableOpacity
                  onPress={() => toggleSelection(index, item)}
                  disabled={
                    !isSelected && selectedIndices.length >= passengerCount
                  }
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome5
                    name={isSelected ? 'check-square' : 'square'}
                    size={20}
                    color={isSelected ? Colors.theme_background : '#ccc'}
                    style={{marginRight: 10}}
                  />
                  <Text style={{color: 'black'}}>
                    {item.firstName} {item.lastName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemovePassenger(index)}>
                  <AntDesign name={'delete'} size={20} color={'black'} />
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate(RouteName.FLIGHT_TRAVELER_DETAILS, {
            passengerType: passengerType,
          })
        }>
        <Text
          style={{color: Colors.theme_background, fontFamily: 'Poppins-Bold'}}>
          + ADD NEW {passengerType.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlightPassangerAdd;

const styles = StyleSheet.create({
  addButton: {
    width: '95%',
    height: SH(50),
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 22,
    borderRadius: 5,
  },
  passengerList: {
    width: '95%',
    height: SH(50),
    borderWidth: 0.5,
    borderStyle: 'dotted',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
});
