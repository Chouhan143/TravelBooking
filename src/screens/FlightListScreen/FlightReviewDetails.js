import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, SF, SW} from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

      <View style={styles.fareBox}>
        <View>
          <Text
            style={{
              color: Colors.orange,
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: 'bold',
            }}>
            <MaterialCommunityIcons
              name={'timer'}
              size={20}
              color={Colors.orange}
            />
            05m17s Left
          </Text>
        </View>
        <View style={{paddingLeft: 5}}>
          <Text>To make payment & confirm booking</Text>
        </View>
      </View>

      {/* grand total box  */}

      <View style={styles.tottalAmt}>
        <View style={styles.AmtFlex}>
          <Text>Air Fare</Text>
          <Text>33,426</Text>
        </View>
        <View style={styles.AmtFlex}>
          <Text>Convenience Fee</Text>
          <Text>1,047</Text>
        </View>
        <View style={styles.AmtFlex}>
          <Text>Add-Ons</Text>
          <Text>400</Text>
        </View>
        <View style={[styles.AmtFlex, {paddingBottom: 10}]}>
          <Text>Free Cancellation</Text>
          <Text>1662</Text>
        </View>
        <View
          style={[
            styles.AmtFlex,
            {borderTopWidth: 0.5, borderTopColor: 'gray', paddingVertical: 10},
          ]}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
            Grand Total
          </Text>
          <Text style={{color: '#000', fontSize: 16, fontWeight: '700'}}>
            30,550
          </Text>
        </View>
      </View>

      {/* flight details  */}

      <View style={[styles.tottalAmt, {}]}>
        <View style={styles.AmtFlex}>
          <Text>ONWARD</Text>
          <Text>THU,13 Jun</Text>
        </View>
        <View style={styles.AmtFlex}>
          <Text>Indore</Text>
          <Text>Guwahati</Text>
        </View>
        <View style={styles.AmtFlex}>
          <Text>09:20 Pm</Text>
          <Text>07:15 Am</Text>
        </View>
      </View>
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
    backgroundColor: Colors.light_yellow,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  tottalAmt: {
    width: '100%',
    height: 'auto',
    borderWidth: 0.5,
    borderColor: Colors.gray_text_color,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  AmtFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
