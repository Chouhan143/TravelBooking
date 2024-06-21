import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { SW, SF, SH ,Colors} from '../../utils';
import AppIntroSlider from 'react-native-app-intro-slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const HotelDescriptionPage = () => {
  const navigation = useNavigation();
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < HotelDetails.Images.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        sliderRef.current?.goToSlide(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        sliderRef.current?.goToSlide(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const HotelDetails = {
    HotelName: "New Shahana - Hostel",
    StarRating: 1,
    Description: [
      {
        Name: "Amenities",
        Detail: [
          "Make use of convenient amenities, which include complimentary wireless Internet access and tour/ticket assistance."
        ]
      },
      {
        Name: "Rooms",
        Detail: [
          "Make yourself at home in one of the 20 air-conditioned guestrooms. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Bathrooms have showers and complimentary toiletries. Conveniences include phones, as well as safes and desks."
        ]
      },
      {
        Name: "Onsite payments",
        Detail: [
          "Visa, Mastercard"
        ]
      },
      {
        Name: "Dining",
        Detail: [
          "Take advantage of the hostel's 24-hour room service."
        ]
      },
      {
        Name: "Business amenities",
        Detail: [
          "Featured amenities include express check-in, complimentary newspapers in the lobby, and a 24-hour front desk."
        ]
      },
      {
        Name: "Location",
        Detail: [
          "Located in Mumbai (Andheri East), New Shahana - Hostel is within a 15-minute walk of Santacruz Electronic Export Processing Zone and MIDC Industrial Estate.",
          "This hostel is 6.5 mi (10.4 km) from Juhu Beach and 2.3 mi (3.7 km) from Powai Lake."
        ]
      },
      {
        Name: "Attractions",
        Detail: [
          "Distances are displayed to the nearest 0.1 mile and kilometer.",
          "Santacruz Electronic Export Processing Zone - 0.9 km / 0.6 mi",
          "MIDC Industrial Estate - 1 km / 0.6 mi",
          "Powai Lake - 3 km / 1.8 mi",
          "Indian Institute of Technology Bombay - 3.5 km / 2.2 mi",
          "Sanjay Gandhi National Park - 4.1 km / 2.5 mi",
          "Phoenix Market City Mall - 4.4 km / 2.7 mi",
          "Shoppers Stop - 4.7 km / 2.9 mi",
          "Hiranandani Business Park - Powai - 4.9 km / 3.1 mi",
          "KidZania Mumbai - 6.4 km / 3.9 mi",
          "Andheri Sports Complex - 6.7 km / 4.1 mi",
          "R City Mall - 6.8 km / 4.2 mi",
          "NESCO Center - 6.8 km / 4.2 mi",
          "ISKCON Temple - 7.1 km / 4.4 mi",
          "Nanavati Super Speciality Hospital - 7.3 km / 4.5 mi",
          "Bombay Convention & Exhibition Centre - 7.4 km / 4.6 mi",
          "The nearest major airport is Chhatrapati Shivaji International Airport (BOM) - 3.9 km / 2.4 mi"
        ]
      },
      {
        Name: "Headline",
        Detail: [
          "In Mumbai (Andheri East)"
        ]
      }
    ],
    PolicyAndInstruction: [
      {
        Name: "POLICIES",
        Data: [
          {
            SubName: "Know before you go",
            Detail: [
              "Local laws may restrict unmarried guests from sharing rooms. Guests are responsible for providing proof of marriage, if requested by the property.",
              "Only registered guests are allowed in the guestrooms.",
              "This property advises that enhanced cleaning and guest safety measures are currently in place.The property is cleaned and disinfected using an electrostatic sprayer; disinfectant is used to clean the property; bed sheets and towels are laundered at a temperature of at least 60°C/140°F; guestroom doors are sealed after cleaning.Social distancing measures are in place; staff at the property wear personal protective equipment; a shield is in place between staff and guests in main contact areas; periodic temperature checks are conducted on staff; temperature checks are available to guests; guests are provided with hand sanitizer; cashless payment methods are available for all transactions; masks are required in public areas.Contactless check-in and contactless check-out are available.Enhanced food service safety measures are in place.Each guestroom is kept vacant for a minimum of 24 hours between bookings.This property affirms that it adheres to the cleaning and disinfection practices of Safe Travels (WTTC - Global). "
            ]
          }
        ]
      },
      {
        Name: "CHECKIN INSTRUCTIONS",
        Data: [
          {
            SubName: "Special Instructions",
            Detail: [
              "This property offers transfers from the airport. To arrange pick-up, guests must contact the property 24 hours prior to arrival, using the contact information on the booking confirmation. Front desk staff will greet guests on arrival.",
              "To register at this property, guests who are Indian citizens must provide a valid photo identity card issued by the Government of India; travelers who are not citizens of India must present a valid passport and visa. "
            ]
          },
          {
            SubName: "Instructions",
            Detail: [
              "Extra-person charges may apply and vary depending on property policyGovernment-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental chargesSpecial requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteedSafety features at this property include a fire extinguisher, a security system, a first aid kit, and window guardsBe prepared: check the latest COVID-19 travel requirements and measures in place for this destination before you travel.Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property. "
            ]
          }
        ]
      }
    ],
    HotelFacilities: [
      {
        Name: "Free newspapers in lobby",
        FontAwesome: "fa-newspaper-o",
        IcoFont: "icofont-ui-check"
      },
      {
        Name: "Tours/ticket assistance",
        FontAwesome: "fa-ticket",
        IcoFont: "icofont-ui-check"
      },
      {
        Name: "Luggage storage",
        FontAwesome: "fa-briefcase",
        IcoFont: "icofont-ui-check"
      },
    ],
    HotelPicture: "https://i.travelapi.com/hotels/5000000/4930000/4928500/4928439/97828736_b.jpg",
    Images: [
      "https://i.travelapi.com/hotels/5000000/4930000/4928500/4928439/97828736_b.jpg",
      "https://i.travelapi.com/hotels/5000000/4930000/4928500/4928439/cdf03cb7_b.jpg",
      "https://i.travelapi.com/hotels/5000000/4930000/4928500/4928439/cdf03cb7_z.jpg",
      "https://i.travelapi.com/hotels/5000000/4930000/4928500/4928439/b4c18c8a_b.jpg",
    ],
    Address: "Shop no.5, Marol Maroshi Road",
    City: "Mumbai",
    State: "Maharashtra",
    PinCode: "400059",
    CountryName: "India",
    HotelContactNo: "91-22-29207776",
    Latitude: "19.1176",
    Longitude: "72.88012",
    RoomData: "",
    RoomFacilities: "",
    Services: ""
  }

  const getIconName = (faIcon) => {
    return faIcon.replace('fa-', '');
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ elevation: 0.5, padding: SW(7) }}>
        <View key={index}>
          <ImageBackground source={{ uri: item }} style={styles.image} />
          <TouchableOpacity onPress={() => navigation.navigate('HotelListScreen')}
            style={{ padding: SW(20), position: 'absolute', zIndex: 999, left: -20, top: -10 }}>
            <AntDesign name={'arrowleft'} size={35} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesome key={i} name="star" size={20} color="#FFD700"/>);
    }
    return stars;
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom:0 }}>
      <AppIntroSlider
        ref={sliderRef}
        data={HotelDetails.Images}
        renderItem={renderItem}
        showNextButton={false}
        showDoneButton={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onSlideChange={(index) => setCurrentIndex(index)}
      />
      <ScrollView style={styles.descriptionCard} height='63%'>
        <View style={{paddingBottom:SH(30)}}>
         <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{ color: 'black',fontSize:SF(20),fontFamily:'Poppins-Bold' }}>{HotelDetails.HotelName}</Text>
        <View style={{marginLeft:SW(70),display:'flex',flexDirection:'row'}}>
        {renderStars(HotelDetails.StarRating)}
        </View>
         </View>
          <Text style={{ color: 'gray',fontSize:SF(20),fontFamily:'Poppins-Regular' }}>{HotelDetails.Address}</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ color: 'gray', marginRight: SW(10),fontSize:SF(15),fontFamily:'Poppins-Regular'  }}>{HotelDetails.State}</Text>
            <Text style={{ color: 'gray', marginRight: SW(10),fontSize:SF(15),fontFamily:'Poppins-Regular'  }}>{HotelDetails.City}</Text>
            <Text style={{ color: 'gray', marginRight: SW(10),fontSize:SF(15),fontFamily:'Poppins-Regular'  }}>{HotelDetails.CountryName}</Text>
          </View>
          <Text style={{ color: 'gray',fontSize:SF(15),fontFamily:'Poppins-Regular' }}>{HotelDetails.HotelContactNo}</Text>
          <View style={{ padding: SW(7), paddingLeft: 0 }}>
          <Text style={{color: 'black',fontSize:SF(20),fontFamily:'Poppins-Bold'}}>Description</Text>
            {HotelDetails.Description.map((item, index) => (
              <View key={index}>
                <Text style={{ color: 'black', fontFamily: 'Poppins-Medium',
                  fontSize:SF(15),margin:SH(5),marginLeft:0 }}>{item.Name}</Text>
                {item.Detail.map((detail, idx) => (
                  <Text key={idx} style={{ color: 'gray', fontSize: SF(12),fontFamily:'Poppins-Regular' }}>{detail}</Text>
                ))}
              </View>
            ))}
          </View>
          <View>
          <Text style={{color: 'black',fontSize:SF(20),fontFamily:'Poppins-Bold'}}>HotelFacilities</Text>
          <View style={{ padding: SW(7), paddingLeft: 0, 
            justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
          {HotelDetails.HotelFacilities.map((item, index) => (
            <View key={index} style={{borderColor:'#c0cacc',padding:SW(5),alignItems:'center',borderWidth:1,marginRight:SW(2),
              borderRadius:10
            }}>
            
              <Text style={{ color: 'black', fontFamily: 'Poppins-Bold', fontSize: SF(9) }}>{item.Name}</Text>
              <View style={{alignItems:'center'}}> 
              <FontAwesome name={getIconName(item.FontAwesome)} size={20} color="black" />
                <Text style={{ color: 'black', fontFamily: 'Poppins-Regular', fontSize: SF(10) }}>{item.IcoFont}</Text>
              </View>
            </View>
          ))}
        </View>
          </View>
          
        </View>
      </ScrollView>
      <TouchableOpacity style={{backgroundColor:Colors.theme_background,padding:SH(20)}}>
      <Text style={{color:'white',textAlign:'center'}} onPress={()=>navigation.navigate('HotelMoreDetails')}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HotelDescriptionPage;

const styles = StyleSheet.create({
  descriptionCard: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 999,
    top: SH(240),
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SW(20),
    elevation: 5,
    paddingBottom:SH(80),
  },
  image: {
    width: SW(410),
    height: SH(250),
    borderRadius: 10,
    resizeMode: 'contain',
    marginTop: -SH(7),
    marginLeft: -SW(7)
  },
});
