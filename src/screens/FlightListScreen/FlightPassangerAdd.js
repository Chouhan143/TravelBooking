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
}) => {
  const navigation = useNavigation();
  const [selectedIndices, setSelectedIndices] = useState([]);



  const toggleSelection = index => {
    setSelectedIndices(prevSelectedIndices => {
      // Prevent further selection if the maximum number is reached
      if (prevSelectedIndices.includes(index)) {
        return prevSelectedIndices.filter(
          selectedIndex => selectedIndex !== index,
        );
      } else if (prevSelectedIndices.length < passengerCount) {
        return [...prevSelectedIndices, index];
      } else {
        return prevSelectedIndices; // Do nothing if max is reached
      }
    });
  };

  const handleRemovePassenger = index => {
    setSelectedIndices(prevSelectedIndices =>
      prevSelectedIndices.filter(selectedIndex => selectedIndex !== index),
    );
    onRemovePassenger(index);
  };

  const colorChange = selectedIndices.length == passengerCount;

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
                // padding: 5,
                width: SW(30),
                height: SW(30),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name={'user-alt'} size={15} />
            </View>
            <Text>{passengerType}</Text>
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
      {/* traveller name and details  */}
      <View style={{marginVertical: 10}}>
        <FlatList
          data={data}
          renderItem={({item, index}) => {
            const isSelected = selectedIndices.includes(index);

            return (
              <View style={styles.passengerList}>
                <TouchableOpacity
                  onPress={() => toggleSelection(index)}
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
                  <Text>{item.firstName}</Text>
                </TouchableOpacity>

                {/* {index > 0 && ( */}
                <TouchableOpacity onPress={() => handleRemovePassenger(index)}>
                  <AntDesign name={'delete'} size={20} />
                </TouchableOpacity>
                {/* )} */}
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
        <Text style={{color: Colors.theme_background}}>
          +ADD NEW {passengerType.toUpperCase()}
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
    elevation: 2,
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
