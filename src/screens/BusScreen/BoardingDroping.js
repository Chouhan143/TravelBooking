import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FlatList} from 'react-native';
import axios from 'axios';
import {ADD_BOARDING_DROPING} from '../../utils/BaseUrl';
import {useSelector} from 'react-redux';
import Radio from '../../components/commonComponents/Radio';
import {useNavigation} from '@react-navigation/native';
import {RouteName} from '../../routes';
import {selectBoardingPoint, selectDroppingPoint} from '../../redux/action';
import {useDispatch} from 'react-redux';
import {SW, SH, SF, Colors} from '../../utils';
import Toast from 'react-native-toast-message';
const Tab = createMaterialTopTabNavigator();

const BoardingDroping = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="BoardingPoints" component={BoardingPoint} />
      <Tab.Screen name="DropingPoints" component={DropingPoint} />
    </Tab.Navigator>
  );
};

export default BoardingDroping;

// Boarding Point screen here
const BoardingPoint = () => {
  const dispatch = useDispatch();
  const busSearchData=useSelector(state=>state.commomReducer.busData);
  const traceId=busSearchData.data.TraceId;
 
  const [boardingData, setBoardingData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const boardingDroping = async () => {
    try {
      setLoading(true);
      const payload = {
        TraceId: traceId,
      };

      const response = await axios.post(ADD_BOARDING_DROPING, payload);
      console.log(response);
      setBoardingData(response.data.BoardingPoints);
      setLoading(false);
      console.log('boarding response', response.data.BoardingPoints);
    } catch (error) {
      console.log(error.response);
      Toast.show({
        type: 'error',
        text1: 'sometime went wrong',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    boardingDroping();
  }, []);

  const onPressRadioButton = item => {
    setSelectedItem(item);
    dispatch(selectBoardingPoint(item));
    // Navigate to another screen upon selecting a boarding point
    navigation.navigate('DropingPoints', {
      selectedItem: item,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>All boarding points</Text>
      <View style={styles.bottomBorder} />

      {loading ? (
        <ActivityIndicator size={30} color={Colors.theme_background} />
      ) : (
        <FlatList
          data={boardingData}
          renderItem={({item}) => {
            const date = new Date(item.CityPointTime);
            const formatedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            });

            const formattedTime = date.toLocaleTimeString('en-US', {
              hour: '2-digit', // Two-digit hour (e.g., "14")
              minute: '2-digit', // Two-digit minute (e.g., "45")
            });

            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.2,
                }}
                onPress={() => onPressRadioButton(item)}>
                <View style={{flex: 1}}>
                  <Text style={styles.text}>{formattedTime}</Text>
                  <Text style={styles.text}>{formatedDate}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.text}>{item.CityPointAddress}</Text>
                  <Text style={styles.text}>{item.CityPointLandmark}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    alignSelf: 'center',
                  }}>
                  <Radio
                    checked={
                      item.CityPointIndex === selectedItem?.CityPointIndex
                    }
                    onPress={() => onPressRadioButton(item)}
                    // iconType="material"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#80aec5"
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const DropingPoint = () => {
  const dispatch = useDispatch();
  const busSearchData=useSelector(state=>state.commomReducer.busData);
  const traceId=busSearchData.data.TraceId;
  
  const [dropingData, setDropingData] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dropingDroping = async () => {
    try {
      setLoading(true);
      const payload = {
        TraceId: traceId,
      };
      const response = await axios.post(ADD_BOARDING_DROPING, payload);
      setDropingData(response.data.DroppingPoints);
      console.log('boarding response', response.data.DroppingPoints);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'sometime went wrong',
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    dropingDroping();
  }, []);

  const onPressRadioButton = item => {
    setSelectedItem(item);
    dispatch(selectDroppingPoint(item));
    // Navigate to another screen upon selecting a boarding point
    navigation.navigate(RouteName.PASSANGER_INFORMATION, {selectedItem: item});
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>All Droping points </Text>
      <View style={styles.bottomBorder} />
      {loading ? (
        <ActivityIndicator size={30} color={Colors.theme_background} />
      ) : (
        <FlatList
          data={dropingData}
          renderItem={({item}) => {
            const date = new Date(item.CityPointTime);
            const formatedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            });

            const formattedTime = date.toLocaleTimeString('en-US', {
              hour: '2-digit', // Two-digit hour (e.g., "14")
              minute: '2-digit', // Two-digit minute (e.g., "45")
            });

            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.2,
                }}>
                <View style={{flex: 1}}>
                  <Text style={styles.text}>{formattedTime}</Text>
                  <Text style={styles.text}>{formatedDate}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.text}>{item.CityPointLocation}</Text>
                  <Text style={styles.text}>{item.CityPointName}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    alignSelf: 'center',
                  }}>
                  {/* <Text>{item.check}</Text> */}
                  <Radio
                    checked={
                      item.CityPointIndex === selectedItem?.CityPointIndex
                    }
                    onPress={() => onPressRadioButton(item)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#80aec5"
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 'auto',
    borderRadius: 5,
    marginTop: 15,
    padding: SW(10),
    paddingBottom:SH(10)
  },
  headingText: {
    paddingHorizontal: 15,
    paddingTop: 10,
    color: '#000',
    textTransform: 'uppercase',
  },
  bottomBorder: {
    borderBottomWidth: 0.2,
    color: 'gray',
    marginVertical: 10,
  },
  text:{
  color:'#000',
  fontFamily:'Poppins-Regular',
  fontSize:SF(15),
  textTransform:'capitalize'
  }
});
