import React, { useRef } from "react";
import { Text, View,TouchableOpacity, StatusBar, FlatList } from "react-native";
import { TrainListingStyle } from '../../styles';
import { RouteName } from "../../routes";
import { useDispatch } from "react-redux";
import { get_data_action } from '../../redux/action/CommonAction';
import { Button, TrainBooking, TrainFlatlist, VectorIcon, RBSheet } from "../../components";
import { SF, SH, Colors } from "../../utils";
import { ScrollView } from 'react-native-virtualized-view';
import images from '../../index';

const TrainBookingListScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const doctordata = (data) => {
        dispatch(get_data_action(data))
        navigation.navigate(RouteName.BOOKING_TAB)
    }
    const refRBSheet = useRef();

    const MobileSelectData = [
        {
          id: 1,
          img: images.HomeViIcon,
          Cityfrom: "Delhi_Text",
          Cityto: "Mumbai_Text",
          CardType: 'Mon_Text',
        },
      ]
      const TrainFlatlistData = [
        {
            id: 1,
            trainNumber: '12312',
            TrainName: 'Sealdah Rajdhni',
            FromTime: '04:44',
            FromDeparName: 'Adrsh Ngr Delhi',
            EndTime: '08:05, 31 Jan',
            EndDeparName: 'Hawrah Jn',
            MainPrice: '1,150',
            DiscountAmount: '1,200',
            Off: '5% OFF',
            FromTme: '9:00 PM',
            SeatAvl: '19 Seats',
            TravelTime: '27 h 21 m',
            CheckAvialbl: 'Check future availability'
        },
        {
            id: 2,
            trainNumber: '12264',
            TrainName: 'PUNE DURNTO EXP',
            FromTime: '06:16',
            FromDeparName: 'H NIZAMUDDIN',
            EndTime: '08:05, 31 Jan',
            EndDeparName: 'VASAIL ROAD',
            MainPrice: '1,150',
            DiscountAmount: '1,200',
            Off: '5% OFF',
            FromTme: '9:00 PM',
            SeatAvl: '19 Seats',
            TravelTime: '15 h 27 m',
            CheckAvialbl: 'Check future availability'
        },
        {
            id: 3,
            trainNumber: '12952',
            TrainName: 'MMCT TEJAS RAJ',
            FromTime: '04:55',
            FromDeparName: 'New Delhi',
            EndTime: '08:35, 31 Jan',
            EndDeparName: 'Maumbai Central',
            MainPrice: '1,150',
            DiscountAmount: '1,200',
            Off: '5% OFF',
            FromTme: '9:00 PM',
            SeatAvl: '19 Seats',
            TravelTime: '27 h 21 m',
            CheckAvialbl: 'Check future availability'
        },
      ]
      
    return (
        <View style={TrainListingStyle.minstyleviewphotograpgyTow}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white_text_color} />
            <View>
                <FlatList
                    data={MobileSelectData}
                    renderItem={({ item }) =>
                        <TrainBooking
                            item={item}
                            onPress={() => doctordata(item)}
                        />}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <ScrollView nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                style={TrainListingStyle.contentContainerStyle}>
                <View style={TrainListingStyle.minflexview}>
                    <View style={TrainListingStyle.minviewsigninscreen}>
                        <View style={TrainListingStyle.Ph15Set}>
                            <View style={[TrainListingStyle.FlexRow, TrainListingStyle.spacebtn]}>
                                <View style={TrainListingStyle.TrainTopShowavlBox}>
                                    <Text style={TrainListingStyle.TrainTopShowavlText}>Available/RAC</Text>
                                    <View style={TrainListingStyle.TrainTopShowavlColorBox}></View>
                                </View>
                                <View style={TrainListingStyle.TrainTopShowavlBox}>
                                    <Text style={TrainListingStyle.TrainTopShowavlText}>Wishlist</Text>
                                    <View style={TrainListingStyle.TrainTopShowavlColorBoxTwo}></View>
                                </View>
                                <View style={TrainListingStyle.TrainTopShowavlBox}>
                                    <Text style={TrainListingStyle.TrainTopShowavlText}>Not Available</Text>
                                    <View style={TrainListingStyle.TrainTopShowavlColorBoxThree}></View>
                                </View>
                                <TouchableOpacity>
                                    <VectorIcon icon="AntDesign" name="closecircleo" color={Colors.gray_text_color} size={SF(16)} />
                                </TouchableOpacity>
                            </View>
                            <View style={TrainListingStyle.FleFlexRow}>
                                <VectorIcon icon="Ionicons" name="md-eye-outline" color={Colors.black_text_color} size={SF(16)} style={TrainListingStyle.EyeIcon} />
                                <Text style={TrainListingStyle.TrainTopShowavlText}>Hurry! 843 others looking for the same route.</Text>
                                <TouchableOpacity>
                                    <VectorIcon icon="AntDesign" name="close" color={Colors.black_text_color} size={SF(16)} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    data={TrainFlatlistData}
                                    renderItem={({ item }) =>
                                        <TrainFlatlist
                                            item={item}
                                            onPress={() => refRBSheet.current.open()}
                                        />}
                                    keyExtractor={item => item.id}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={TrainListingStyle.contentContainerStyle}
                                />
                            </View>
                            <View>
                                <RBSheet
                                    height={SH(350)}
                                    refRBSheet={refRBSheet}>
                                    <View style={TrainListingStyle.TrainFinalBox}>
                                        <View>
                                            <Text style={TrainListingStyle.textStyleligth}>You searched for trains between</Text>
                                        </View>
                                        <View style={TrainListingStyle.textDelhiBoxWrap}>
                                            <View style={TrainListingStyle.textDelhiBox}><Text style={TrainListingStyle.textDelhi}>Delhi-All Station (NDLS)</Text></View>
                                            <VectorIcon icon="AntDesign" name="arrowright" size={SF(18)} color={Colors.black_text_color} style={TrainListingStyle.Arrow} />
                                            <View style={TrainListingStyle.textDelhiBox}><Text style={TrainListingStyle.textDelhi}>Delhi-All Station (NDLS)</Text></View>
                                        </View>
                                        <View>
                                            <Text style={TrainListingStyle.textStyleligth}>But this train runs from</Text>
                                        </View>
                                        <View style={TrainListingStyle.textDelhiBoxWrap}>
                                            <View style={TrainListingStyle.textDelhiBox}><Text style={TrainListingStyle.textDelhi}>New Delhi (NDLS)</Text></View>
                                            <VectorIcon icon="AntDesign" name="arrowright" size={SF(18)} color={Colors.black_text_color} style={TrainListingStyle.Arrow} />
                                            <View style={TrainListingStyle.textDelhiBox}><Text style={TrainListingStyle.textDelhi}>Sealdah (SDAH)</Text></View>
                                        </View>
                                        <Button title={'Proceed with train selection'} buttonStyle={TrainListingStyle.TrainFinalBtn} buttonTextStyle={TrainListingStyle.TrainFinalBtnText} onPress={() => navigation.navigate(RouteName.PAYMENT_SCREEN)} />
                                    </View>
                                </RBSheet>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView >
        </View >
    );
};

export default TrainBookingListScreen;