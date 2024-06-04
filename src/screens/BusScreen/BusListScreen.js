import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {BusListScreenStyle} from '../../styles';
import {RouteName} from '../../routes';
import {useDispatch} from 'react-redux';
import {get_data_action} from '../../redux/action/CommonAction';
import {useTranslation} from 'react-i18next';
import {useNavigation, useTheme} from '@react-navigation/native';
import {BusListFun, TopListFun} from '../../components';
import images from '../../index';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SH} from '../../utils';
const BusListScreen = props => {
  const {route} = props;
  const navigation = useNavigation();
  const {busData, destinationCity, sourceCity, departDate} = route.params;
  const [travelingDate, setTravelingDate] = useState('');

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

    console.log('bustype', item.bus_type);

    navigation.navigate(RouteName.BUS_SEAT_SCREEN, {
      traceId: item.trace_id,
      indexResult: item.result_index,
    });
  };

  return (
    <View style={BusListScreenStyles.MinStyleViewPhotograpgyTwo}>
      <View style={BusListScreenStyles.ContentContainerStyle}>
        <View>
          <View style={BusListScreenStyles.MinViewSigninScreen}>
            <View>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <AntDesign name={'arrowleft'} size={20} />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{fontSize: 16, color: '#000', fontWeight: '700'}}>
                    {sourceCity} to {destinationCity}
                  </Text>
                  <Text style={{fontSize: 14, color: 'gray'}}>
                    {travelingDate}
                  </Text>
                </View>
              </View>

              <View>
                <FlatList
                  data={busData}
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
    height: SH(60),
    // justifyContent: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
