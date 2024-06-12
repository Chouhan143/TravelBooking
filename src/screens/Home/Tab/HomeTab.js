import React, {useEffect, useMemo, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {HomeTabStyle, BookingTabStyle} from '../../../styles';
import {SH, SF,SW} from '../../../utils';
import {Spacing, WhatsNewFun, VectorIcon, Search} from '../../../components';
import {RouteName} from '../../../routes';
import {useDispatch} from 'react-redux';
import {tab_action} from '../../../redux/action/CommonAction';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import images from '../../../index';
import {ScrollView} from 'react-native-virtualized-view';
import axios, {Axios} from 'axios';
import { OFFERS_DATA} from '../../../utils/BaseUrl';

const HomeTab = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  const {Colors} = useTheme();
  const HomeTabStyles = useMemo(() => HomeTabStyle(Colors), [Colors]);
  const BookingTabStyles = useMemo(() => BookingTabStyle(Colors), [Colors]);
  const [sliderImg, setSliderImg] = useState('');
  const dispatch = useDispatch();
  const tabdata = idd => {
    dispatch(tab_action(idd));
    navigation.navigate(RouteName.BOOKING_TAB);
  };

  const TicketBookData = [
    {
      id: 1,
      image: images.Bus_icon,
      text: 'Bus',
      iconname: 'directions-bus',
    },
    {
      id: 2,
      image: images.Flight_icon,
      text: 'Flight',
      iconname: 'flight',
    },
    {
      id: 3,
      image: images.Hotel_icon,
      text: 'Hotel',
      iconname: 'hotel',
    },
  ];

  const Offerdatas = async () => {
    try {
      const res = await axios.get(OFFERS_DATA);
      console.log('res', res.data.data);
      setSliderImg(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Offerdatas();
  }, []);

  return (
    <View style={{backgroundColor: Colors.white_text_color,height: '100%',}}>
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor:'white',marginRight:SW(15)}}>
        <View style={{ paddingHorizontal: '4%',paddingRight:0}}>
          <Spacing space={SH(17)} />
          <View style={HomeTabStyles.BorderWidth}>
            <Search />
          </View>
          <Spacing space={SH(15)} />
          <Text style={HomeTabStyles.OffersText}>{t('TICKET_BOOKING')}</Text>
          <Spacing />
          <View>
            <FlatList
              data={TicketBookData}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{ flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: SH(6),
                    marginHorizontal: SH(5),
                    borderRadius: SW(7),
                    borderWidth: SW(0.5),
                    borderColor: Colors.theme_background,
                    backgroundColor:Colors.theme_background,}}
                  onPress={() => tabdata(item.id)}>
                  <View style={HomeTabStyles.WidtSetNew}>
                    <VectorIcon
                      icon="MaterialIcons"
                      name={item.iconname}
                      size={SF(20)}
                      style={HomeTabStyles.TopLisIcon}
                      color={Colors.white_text_color}
                    />
                    <View>
                      <Text style={{color:'white',
                        fontSize:SF(15),textAlign: 'center',}}>
                        {t(item.text)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={HomeTabStyles.SetFlex}
            />
          </View>
          <Spacing space={SH(15)} />
          <View style={HomeTabStyles.BorderView}></View>
          <Spacing space={SH(16)} />
          <Text style={HomeTabStyles.OffersText}>{t('EXCLUSIVE_OFFERS')}</Text>
          <Spacing space={SH(12)} />
          <FlatList
            data={sliderImg}
            renderItem={({item, index}) => {
              console.log('item', item.id);
              return (
                <TouchableOpacity
                  style={HomeTabStyles.MainViewOffers}
                  onPress={() => tabdata(item.id)}>
                  <Image
                    resizeMode="cover"
                    style={{height: SH(150),
        width: SW(220),
        borderRadius: SW(15),
        resizeMode:'contain',
        backgroundColor:'white',
        marginRight:SW(10)}}
                    source={{uri: item.slider_img}}
                  />
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          <Spacing space={SH(20)} />
          <View style={HomeTabStyles.BorderView}></View>
          <Spacing space={SH(20)} />
          <View>
            <Text style={HomeTabStyles.OffersText}>{t('WHATS_NEW')}</Text>
            <Text>{t('Dreams_Trips')}</Text>
          </View>
          <FlatList
            data={sliderImg}
            renderItem={({item, index}) => (
              <WhatsNewFun
                item={item}
                index={index}
                onPress={() => tabdata(item.id)}
              />
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
          <Spacing space={SH(20)} />
          <View style={HomeTabStyles.BorderView}></View>
          <Spacing space={SH(20)} />
          <Text style={HomeTabStyles.OffersText}>{t('PREFER_TO_TRAVEL')}</Text>
          <Spacing space={SH(6)} />
          <Text style={{fontSize: SF(13),color:'black',fontFamily:'Poppins-Regular'}}>
            {t('Book_your_tickets_on')}
          </Text>
          <Spacing space={SH(20)} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeTab;
