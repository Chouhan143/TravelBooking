import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SF, SW} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const FlightReviewDetails = () => {
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={back}>
          <AntDesign name={'arrowleft'} size={25} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.heading}>Review Your Trip Details</Text>
      </View>

      {/* Fare Details  */}

      <View style={styles.fareBox}></View>
    </View>
  );
};

export default FlightReviewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: SW(15),
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: SF(16),
    color: '#000',
    paddingLeft: SW(15),
  },
  fareBox: {
    width: '100%',
    height: 'auto',
  },
});
