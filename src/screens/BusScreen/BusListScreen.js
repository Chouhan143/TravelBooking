import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {BusListScreenStyle} from '../../styles';
import {RouteName} from '../../routes';
import {useDispatch, useSelector} from 'react-redux';
import {get_data_action} from '../../redux/action/CommonAction';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import {BusListFun, TopListFun} from '../../components';
import images from '../../index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SH,Colors, SF} from '../../utils';
const BusListScreen = props => {
  const {route} = props;
  const navigation = useNavigation();
  
  const {destinationCity, sourceCity, departDate} = route.params;
  const [travelingDate, setTravelingDate] = useState('');

  const busSearchData=useSelector(state=>state.commomReducer.busData);
  const traceId=busSearchData.data.TraceId;
  const ResultData=useSelector(state=>state.commomReducer.ResultData);
  const resultIndex=busSearchData.data.Result[0].ResultIndex;
  
  useEffect(() => {
    const updatedDate = new Date(departDate);
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    };
    const tUpdatedDate = updatedDate.toLocaleDateString('en-US', options);
    setTravelingDate(tUpdatedDate);
  }, [departDate]);

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {Colors} = useTheme();
  const BusListScreenStyles = useMemo(
    () => BusListScreenStyle(Colors),
    [Colors],
  );

  const handleItemPress = item => {
    // Dispatch action to store selected item data
    dispatch(get_data_action(item));

    console.log('bustype', item.BusType);

    navigation.navigate(RouteName.BUS_SEAT_SCREEN, {
      traceId:traceId,
      indexResult:resultIndex,
    });
  };

  return (
    <View style={{height: '100%',width: '100%',backgroundColor: Colors.white_text_color,paddingHorizontal: '5%',
     paddingTop:SH(15) }}>
      <View style={BusListScreenStyles.ContentContainerStyle}>
        <View>
          <View style={BusListScreenStyles.MinViewSigninScreen}>
            <View>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <AntDesign name={'arrowleft'} size={25} color={Colors.theme_background}/>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{fontSize: SF(17), color: '#000', 
                      fontFamily:'Poppins-Medium',textTransform:'capitalize'}}>
                    {sourceCity} to {destinationCity}
                  </Text>
                  <Text style={{fontSize: SF(15), color: 'gray',
                    fontFamily:'Poppins-Medium',textTransform:'capitalize'}}>
                    {travelingDate}
                  </Text>
                </View>
              </View>

              <View>
                <FlatList
                  data={ResultData}
                  renderItem={({item, index}) => (
                    <BusListFun
                      item={item}
                      index={index}
                      onPress={() => handleItemPress(item)}
                    />
                  )}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  style={BusListScreenStyles.ContentContainerStyle}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default BusListScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: SH(80),
    // justifyContent: 'center',
   marginBottom:SH(30),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
