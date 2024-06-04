import React, {useState, useMemo, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {BusSeatScreenStyle} from '../../styles';
import {RouteName} from '../../routes';
import {
  Button,
  MobileSelect,
  BusSeatDataFlatlist,
  BusSeatShowFunction,
} from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import images from '../../index';
import {ScrollView} from 'react-native-virtualized-view';
import axios from 'axios';
import {BUS_ADDSEAT_LAYOUT} from '../../utils/BaseUrl';
import {useSelector} from 'react-redux';
import {SH, SW} from '../../utils';

const BusSeatScreen = props => {
  const {route} = props;
  const {traceId, indexResult} = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const {navigation} = props;
  const {t} = useTranslation();
  const [tabShow, SettabShow] = useState('1');
  const [uperSeat, setUperSeat] = useState([]);
  const [lowerSeat, setLowerSeat] = useState([]);
  const [lowerSeatR, setLowerSeatR] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tId, setTid] = useState('');
  const {Colors} = useTheme();
  const BusSeatScreenStyles = useMemo(
    () => BusSeatScreenStyle(Colors),
    [Colors],
  );

  const combinedData = [...lowerSeat, ...lowerSeatR];

  // console.log('L', combinedData);

  // console.log('U', uperSeat);

  const getTraceIdFromRedux = useSelector(state => state.commomReducer.traceId);
  const selectedSeatData = useSelector(
    state => state.commomReducer.selectedSeats,
  );

  const commaSepratedSeat = selectedSeatData.join(', ');
  console.log(selectedSeatData.join(','));

  const busFare = useSelector(state => state.commomReducer.totalPrice);

  const getlayout = async () => {
    try {
      setLoading(true);
      const payload = {
        TraceId: traceId,
        ResultIndex: indexResult,
      };
      const res = await axios.post(BUS_ADDSEAT_LAYOUT, payload);
      console.log('Result  >>>', res.data);
      setLowerSeat(res.data.Result[0]);
      setLowerSeatR(res.data.Result[1]);
      // console.log('again test', res.data.Result[0]);
      setUperSeat(res.data.ResultUpperSeat[0]);
      setTid(res.data.TraceId);
      setLoading(false);
      // console.log('lower', res.data.Result);
      // console.log('uper', res.data.ResultUpperSeat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getlayout();
  }, []);

  const MobileSelectData = [
    {
      id: 1,
      img: images.HomeViIcon,
      Cityfrom: 'Delhi_Text',
      Cityto: 'Mumbai_Text',
      CardType: 'Mon_Text',
    },
  ];

  const BusSeatShowData = [
    {
      id: 1,
      Seaticon: 'seat',
      SeaticonColor: Colors.shadow_color,
      text: 'BusSeatShowData_text_1',
    },
    {
      id: 2,
      Seaticon: 'seat',
      SeaticonColor: Colors.green,
      text: 'BusSeatShowData_text_2',
    },

    {
      id: 3,
      Seaticon: 'seat',
      SeaticonColor: Colors.purple,
      text: 'BusSeatShowData_text_3',
    },

    {
      id: 4,
      Seaticon: 'seat',
      SeaticonColor: Colors.chinese_silver,
      text: 'BusSeatShowData_text_4',
    },
    {
      id: 5,
      Seaticon: 'seat',
      SeaticonColor: Colors.blue_color,
      text: 'BusSeatShowData_text_5',
    },
    {
      id: 6,
      Seaticon: 'seat',
      SeaticonColor: Colors.red_color,
      text: 'BusSeatShowData_text_6',
    },
  ];

  return (
    <View style={BusSeatScreenStyles.MinFlexView}>
      {/* <View>
        <View>
          <FlatList
            data={MobileSelectData}
            renderItem={({item}) => (
              <MobileSelect
                item={item}
                onPress={() => navigation.navigate(RouteName.BUS_LIST_SCREEN)}
              />
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View> */}
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        style={BusSeatScreenStyles.ContentContainerStyle}>
        {loading ? ( // Show loader if loading state is true
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : (
          <View style={BusSeatScreenStyles.MinFlexView}>
            <View>
              {tabShow == '1' ? (
                <View>
                  <FlatList
                    data={combinedData}
                    numColumns={2}
                    BusSeatDataFlatlist
                    renderItem={({item}) => (
                      <BusSeatDataFlatlist item={item} type="lower" />
                    )}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={
                      BusSeatScreenStyles.ContentContainerStyle
                    }
                  />
                </View>
              ) : (
                <View>
                  <FlatList
                    // data={BusSeatUpperData}
                    data={uperSeat}
                    renderItem={({item}) => (
                      <BusSeatDataFlatlist item={item} type="upper" />
                    )}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={
                      BusSeatScreenStyles.ContentContainerStyle
                    }
                  />
                </View>
              )}
            </View>
          </View>
        )}
        {/* </View> */}
      </ScrollView>
      <View>
        <View style={BusSeatScreenStyles.TabBoxTwWidththreeoMin}>
          <View style={BusSeatScreenStyles.TabBoxTwo}>
            <TouchableOpacity
              onPress={() => SettabShow('1')}
              style={
                tabShow === '1'
                  ? [
                      BusSeatScreenStyles.TabsettextActiveBoxTwo,
                      BusSeatScreenStyles.TableftAciveBorder,
                    ]
                  : [
                      BusSeatScreenStyles.TabsettextBoxTwo,
                      BusSeatScreenStyles.TableftAciveBorder,
                    ]
              }>
              <Text
                onPress={() => SettabShow('1')}
                style={
                  tabShow === '1'
                    ? BusSeatScreenStyles.TabsettextActiveTwo
                    : BusSeatScreenStyles.TabsettextTwo
                }>
                {t('Lover')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SettabShow('2')}
              style={
                tabShow === '2'
                  ? [
                      BusSeatScreenStyles.TabsettextActiveBoxTwo,
                      BusSeatScreenStyles.TablrightAciveBorder,
                    ]
                  : [
                      BusSeatScreenStyles.TabsettextBoxTwo,
                      BusSeatScreenStyles.TablrightAciveBorder,
                    ]
              }>
              <Text
                onPress={() => SettabShow('2')}
                style={
                  tabShow === '2'
                    ? BusSeatScreenStyles.TabsettextActiveTwo
                    : BusSeatScreenStyles.TabsettextTwo
                }>
                {t('Upper')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={BusSeatScreenStyles.BusSratflatlistbox}>
          <FlatList
            data={BusSeatShowData}
            renderItem={({item}) => <BusSeatShowFunction item={item} />}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
        <View style={BusSeatScreenStyles.BusFinalBoookedBox}>
          <View style={BusSeatScreenStyles.Widthone}>
            <Text style={BusSeatScreenStyles.Selectedtext}>
              {t('Seat')} {commaSepratedSeat}
            </Text>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Text
                style={[
                  BusSeatScreenStyles.SelectedSeattext,
                  {fontWeight: '800', fontSize: 18},
                ]}>
                ₹{busFare}
              </Text>
              <Text
                style={[
                  BusSeatScreenStyles.SelectedSeattext,
                  {fontWeight: '400', fontSize: 16},
                ]}>
                +Taxes
              </Text>
            </View>
          </View>
          <View style={BusSeatScreenStyles.Widthtwo}>
            {/* <Text style={BusSeatScreenStyles.Selectedtext}>
              {t('Book_for')}
            </Text> */}
          </View>
          <View style={BusSeatScreenStyles.Widththree}>
            <Button
              title={t('Proceed')}
              ButtonStyle={BusSeatScreenStyles.ButtonStyle}
              onPress={() =>
                navigation.navigate(RouteName.BORDING_DROPING_POINT, {
                  traceId: tId,
                })
              }

              // onPress={() =>
              //   navigation.navigate(RouteName.PASSANGER_INFORMATION, {
              //     traceId: tId,
              //   })
              // }
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default BusSeatScreen;
