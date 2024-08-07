
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { HOTEL_INFO } from '../../utils/BaseUrl';
import { SH, SW, SF, Colors } from '../../utils';
import { RouteName } from '../../routes';
import ReadMoreText from '../../components/commonComponents/ReadMore';
import Feather from 'react-native-vector-icons/Feather';
import { setHotelInfo } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

const HotelDescriptionPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hotelDetails = useSelector(state => state.commomReducer.hotelInfo);
  console.log('redux info data in detail page ',hotelDetails);

  const renderItem = ({ item, index }) => {
    if (!item || typeof item !== 'string' || item.trim() === '') {
      return null;
    }

    return (
      <View style={{ elevation: 0.5, padding: 7 }} key={index}>
        <ImageBackground source={{ uri: item }} style={styles.image} />
        <TouchableOpacity
          onPress={() => navigation.navigate('HotelListScreen')}
          style={{ padding: 20, position: 'absolute', zIndex: 999, left: -20, top: -10 }}>
          <AntDesign name={'arrowleft'} size={35} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderStar = rating => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome 
          key={i} 
          name="star" 
          size={15} 
          color={i < rating ? "#FFD700" : "#C0C0C0"} 
        />
      );
    }
    return stars;
  };
  if (loading || hotelDetails === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.theme_background} />
      </View>
    );
  }

  const cleanUpDescription = (description) => {
    let cleanedDescription = description?.replace(/<b\s*\/?>/gi, ''); // Remove <b> tags
    cleanedDescription = cleanedDescription?.replace(/<\/?b\s*\/?>/gi, ''); // Remove both <b> and </b> tags
    cleanedDescription = cleanedDescription?.replace(/<br\s*\/?>/gi, ''); // Remove <br> tags
    cleanedDescription = cleanedDescription?.replace(/&nbsp;/gi, ' '); // Remove &nbsp;
    cleanedDescription = cleanedDescription?.trim(); // Trim leading/trailing spaces
    return cleanedDescription;
  };

  const filteredImages = hotelDetails.Images && Array.isArray(hotelDetails.Images) 
    ? hotelDetails.Images.filter(image => image.trim() !== '') 
    : [];
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 0 }}>
      <AppIntroSlider
        ref={sliderRef}
        data={filteredImages}
        renderItem={renderItem}
        showNextButton={false}
        showDoneButton={false}
        onSlideChange={(index) => setCurrentIndex(index)}
        dotStyle={styles.dot}
      />
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>{`${currentIndex + 1} / ${filteredImages.length}`}</Text>
      </View>
      <ScrollView style={styles.descriptionCard} height='62%'>
        <View style={{ paddingBottom: SH(30) }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>{hotelDetails.HotelName}</Text>
            <View style={{ marginLeft: SW(70), display: 'flex', flexDirection: 'row' }}>
              {renderStar(hotelDetails.StarRating)}
            </View>
          </View>
          <Text style={{ color: 'gray', fontSize: SF(13), fontFamily: 'Poppins-Regular' }}>{hotelDetails.Address}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: SH(7) }}>
            <Text style={{ color: 'black', marginRight: SW(5), fontSize: SF(15), fontFamily: 'Poppins-Regular' }}>{hotelDetails.CountryName}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Feather name={'phone-call'} color='black' size={15} />
              <Text style={{ color: 'black', fontSize: SF(15), fontFamily: 'Poppins-regular', marginLeft: SW(5) }}>
                {hotelDetails?.HotelContactNo?.replace(/^91/, '')}</Text>
            </View>
          </View>

          <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>Description</Text>
          <ReadMoreText text={cleanUpDescription(hotelDetails.Description)}
            textStyle={{ color: 'black', fontSize: SF(13) }}
            readMoreStyle={{
              color: Colors.theme_background, fontFamily: 'Poppins-Bold',
              fontSize: SF(13), marginLeft: 0, marginTop: SH(5)
            }} />

          <View>
            <Text style={{ color: 'black', fontSize: SF(20), fontFamily: 'Poppins-Bold' }}>HotelFacilities</Text>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {hotelDetails?.HotelFacilities?.map((item, index) => (
                <View key={index} style={{ marginBottom: SH(10) }}>
                  <Text style={{
                    color: 'black',
                    padding: SW(5),
                    borderColor: '#60d3f0',
                    borderRadius: 7,
                    fontFamily: 'Poppins-Regular',
                    borderWidth: 1,
                    fontSize: SF(10),
                    marginRight: SW(5)
                  }}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{ backgroundColor: Colors.theme_background, padding: SH(15), alignItems: 'center' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: SF(17) }} onPress={() => navigation.navigate(RouteName.HOTEL_MORE_DETAILS)}>Add Room </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HotelDescriptionPage;

const styles = StyleSheet.create({
  image: {
    width: SW(500),
    height: SH(250),
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: -7,
    marginLeft: -7
  },
  pagination: {
    position: 'absolute',
    bottom: SH(566),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    left: SW(300)
  },
  paginationText: {
    color: 'black',
    fontSize: 16
  },
  dot: {
    color: 'white'
  },
  descriptionCard: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 999,
    top: SH(243),
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SW(20),
    elevation: 5,
    paddingBottom: SH(80),
  },
});


