import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SF, SH, SW, Colors } from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ReadMoreText from '../../components/commonComponents/ReadMore';
import { useSelector } from 'react-redux';
import { HOTEL_BLOCK } from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';
import { roomCounterIncrement, roomCounterDecrement, setBlockRoomDetails, setHotelTotalPrice } from '../../redux/action';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
};
const RoomItem = ({ room, onBook, index }) => {
    const Price = Math.round(room.Price.RoomPrice);
    const [reserveIndexes, setReserveIndexes] = useState([]);
    const [reserve, setReserve] = useState(false);
    const [userRadio, setUserRadio] = useState(false);
    const [availabilityType, setAvailabilityType] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const count = useSelector(state => state.commomReducer.hotelRoomCounter);
    const priceMulRooms = Price * count;
    const navigation=useNavigation();
    dispatch(setHotelTotalPrice(priceMulRooms));
    const handleRadio = value => {
        setUserRadio(value);
    };

    const handleIncrement = () => {
        dispatch(roomCounterIncrement());
    };

    const handleDecrement = () => {
        dispatch(roomCounterDecrement());
    };
    const handleToggleReserve = index => {
        setReserveIndexes(prevState =>
            prevState.includes(index)
                ? prevState.filter(i => i !== index)
                : [...prevState, index],
        );
    };
    const FETCH_HOTEL_BLOCK = async () => {
        try {
            const payload = {
                SrdvIndex: '65',
                SrdvType: 'SingleTB',
                ResultIndex: '9',
                TraceId: '1',
                HotelCode: '341089',
                HotelName: 'The Manor',
                NoOfRooms: '1',
                HotelRoomsDetails: [{
                    ChildCount: '0',
                    RequireAllPaxDetails: false,
                    RoomId: '0',
                    RoomStatus: '0',
                    RoomTypeCode: '211504640|4|1',
                    RoomTypeName: 'Deluxe Room',
                    RatePlanCode: '230104963',
                    DayRates: [
                        {
                            Amount: '12325',
                            Date: '2019-09-28T00:00:00'
                        }
                    ],
                    Price: {
                        Discount: '2175',
                        PublishedPrice: '15464.3'
                    },
                    Amenities: [
                        'Breakfast Buffet'
                    ],
                    SmokingPreference: '0',
                    BedTypes: [
                        {
                            BedTypeCode: '13',
                            BedTypeDescription: '1 double bed'
                        }
                    ],
                    LastCancellationDate: "2020-04-16T23:59:59",
                    CancellationPolicies: [
                        {
                            Charge: 1658,
                            ChargeType: 1,
                            Currency: "INR",
                            FromDate: "2020-04-17T00:00:00",
                            ToDate: "2020-04-20T23:59:59"
                        },
                        {
                            Charge: 100,
                            ChargeType: 2,
                            Currency: "INR",
                            FromDate: "2020-04-21T00:00:00",
                            ToDate: "2020-05-01T23:59:59"
                        },
                        {
                            Charge: 100,
                            ChargeType: 2,
                            Currency: "INR",
                            FromDate: "2020-04-30T00:00:00",
                            ToDate: "2020-05-01T00:00:00"
                        }
                    ],
                    CancellationPolicy: "SINGLE DELUXE#^#INR 1658.00 will be charged, If cancelled between 17-Apr-2020 00:00:00 and 20-Apr-2020 23:59:59.|100.00% of total amount will be charged, If cancelled between 21-Apr-2020 00:00:00 and 01-May-2020 23:59:59.|100.00% of total amount will be charged, If cancelled between 30-Apr-2020 00:00:00 and 01-May-2020 00:00:00.|#!#",
                }]
            };
            const res = await axios.post(HOTEL_BLOCK, payload);
            const RoomDataArr = res.data;
            const { AvailabilityType } = RoomDataArr.BlockRoomResult;
            setAvailabilityType(AvailabilityType);
            console.log('Block hotel details', RoomDataArr);
            dispatch(setBlockRoomDetails(RoomDataArr));

            if (AvailabilityType === 'Confirm') {
                Toast.show({
                    type: 'success',
                    text1: 'Room is Blocked For a while ',
                    text2: 'This room is blocked for some time please try after some time  !',
                    textStyle: { color: 'green', fontSize: 12 },
                });
                navigation.navigate(RouteName.HOTEL_GUEST_DETAILS,{ priceMulRooms });
            } else {
                navigation.navigate(RouteName.HOTEL_MORE_DETAILS);
                Toast.show({
                    type: 'error',
                    text1: 'Room is Blocked for a while ',
                    text2: 'try after some time !',
                    textStyle: { color: 'red', fontSize: 12 },
                });
            }
        } catch (error) {
            console.log('Error fetching hotel block data', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.itemContainer}>
            <View style={styles.roomContainer}>
                <Text style={styles.roomName}>{room.RoomTypeName}</Text>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateText}>
                        <FontAwesome name="rupee" color="black" />
                        {Price}
                    </Text>
                    <Text style={styles.rateText}>
                        {room.DayRates.map(day => formatDate(day.Date)).join(', ')}
                    </Text>
                </View>
                {room.Amenities.map((amenties, index) => (
                    <View key={index} style={styles.rateContainer}>
                        <Text style={styles.rateText}>{amenties}</Text>
                    </View>
                ))}
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={styles.rateText}>
                        {formatDate(room.LastCancellationDate)}
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: 'gray',
                            fontSize: SF(10),
                        }}>
                        (last data for Cancellation)
                    </Text>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: SH(5),
                    }}>
                    <Text style={styles.Text}>SmokingPreference </Text>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Regular',
                            color: 'gray',
                            fontSize: SF(10),
                        }}>
                        {room.SmokingPreference}
                    </Text>
                </View>
                <Text style={styles.Text}>CancellationPolicies</Text>
                <View>
                    {room.CancellationPolicies.map((policy, index) => (
                        <View
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: '#dce0e6',
                                padding: SW(5),
                                borderRadius: 5,
                                marginBottom: SH(5),
                            }}>
                            <Text
                                style={{
                                    fontSize: SF(12),
                                    fontFamily: 'Poppins-Regular',
                                    color: 'black',
                                }}>
                                {' '}
                                Charges
                                {policy.Charge}
                            </Text>
                            <Text style={styles.rateText}>
                                {' '}
                                From
                                {formatDate(policy.FromDate)}
                            </Text>
                            <Text style={styles.rateText}>
                                {' '}
                                To
                                {formatDate(policy.ToDate)}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.Text}>CancellationPolicy</Text>
                <ReadMoreText
                    text={room.CancellationPolicy}
                    textStyle={{
                        fontFamily: 'Poppins-Regular',
                        color: 'gray',
                        fontSize: SF(10),
                    }}
                    readMoreStyle={{
                        color: Colors.theme_background,
                        fontFamily: 'Poppins-Bold',
                        fontSize: SF(13),
                        marginLeft: 0,
                        marginTop: SH(5),
                    }}
                />
                <View>
                    {reserveIndexes.includes(index) ? (
                        <TouchableOpacity
                            style={{
                                borderWidth: SH(1),
                                borderColor: Colors.theme_background,

                                flex: 1,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: '90%',
                                borderRadius: 10,
                                height: SH(40),
                                alignItems: 'center',
                                marginVertical: SH(15),
                                flexDirection: 'row',
                                gap: 10,
                            }}
                            onPress={() => handleToggleReserve(index)}>
                            <FontAwesome6
                                name={'delete-left'}
                                size={18}
                                color={Colors.theme_background}
                            />
                            <Text
                                style={{
                                    color: Colors.theme_background,
                                    fontFamily: 'Poppins-Bold',
                                }}>
                                Remove
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.theme_background,
                                flex: 1,
                                justifyContent: 'center',
                                alignSelf: 'center',
                                width: '90%',
                                borderRadius: 10,
                                height: SH(40),
                                alignItems: 'center',
                                marginVertical: SH(15),
                            }}
                            onPress={() => handleToggleReserve(index)}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins-Bold' }}>
                                Reserve
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                {/* counter functinality here  */}

                {reserveIndexes.includes(index) ? (
                    <>
                        <View
                            style={{
                                flex: 1,
                                width: SW(170),
                                height: SH(42),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                alignSelf: 'center',
                                borderRadius: SW(5),
                                flexDirection: 'row',
                                paddingHorizontal: SW(5),
                                borderWidth: SW(1),
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    borderRightWidth: SW(1),
                                    borderRightColor: Colors.gray_color,
                                }}
                                onPress={handleDecrement}>
                                <FontAwesome6
                                    name={'minus'}
                                    size={15}
                                    color={Colors.black_text_color}
                                />
                            </TouchableOpacity>

                            <TextInput
                                placeholder="1"
                                value={`${count} room`}
                                placeholderTextColor={Colors.black_text_color}
                                style={{
                                    fontFamily: 'Poppins-Medium',
                                    color: 'black',
                                    fontSize: SF(12),
                                    alignSelf: 'center',
                                }}
                            />
                            {/* <Text>{count}</Text> */}

                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    borderLeftWidth: SW(1),
                                    borderLeftColor: Colors.gray_color,
                                }}
                                onPress={handleIncrement}>
                                <FontAwesome6
                                    name={'plus'}
                                    size={15}
                                    color={Colors.black_text_color}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* choose no of guest  */}
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.Text}>Choose No of guest</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.guestChoose}
                                    onPress={() => handleRadio('single')}>
                                    <Fontisto
                                        name={
                                            userRadio === 'single'
                                                ? 'radio-btn-active'
                                                : 'radio-btn-passive'
                                        }
                                        size={18}
                                        color={userRadio === 'single' ? 'blue' : 'gray'}
                                    />
                                    <FontAwesome5 name={'user-alt'} size={18} color={'#000'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.guestChoose, { marginLeft: SW(15) }]}
                                    onPress={() => handleRadio('couple')}>
                                    <Fontisto
                                        name={
                                            userRadio === 'couple'
                                                ? 'radio-btn-active'
                                                : 'radio-btn-passive'
                                        }
                                        size={18}
                                        color={userRadio === 'couple' ? 'blue' : 'gray'}
                                    />
                                    <FontAwesome5
                                        name={'user-friends'}
                                        size={20}
                                        color={'#000'}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'space-around', margin: SW(10) }}>
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}>
                                    <View>
                                        <Text style={styles.text}>{count} room </Text>
                                        <Text style={styles.text}>selected </Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                                        <Text style={styles.text}>
                                            <FontAwesome name={'rupee'} size={12} color={'#000'} />
                                            {priceMulRooms}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.text}>include taxes and </Text>
                                        <Text style={styles.text}>charges </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={[styles.text, { textAlign: 'center' }]}>
                                        {' '}
                                        (1 night , wed 26 jun 2024 - thur jun 2024){' '}
                                    </Text>
                                    <TouchableOpacity onPress={() => { onBook(room); FETCH_HOTEL_BLOCK();}}  style={{ backgroundColor: Colors.theme_background,
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        width: '90%',
                                        borderRadius: 10,
                                        height: SH(40),
                                        alignItems: 'center',
                                        marginVertical: SH(15)}}>
                                    <Text style={{color: 'white', fontFamily: 'Poppins-Bold'}}>Continue</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            </View>
                        </View>
                    </>
                ) : null}

            </View>
        </View>
    );
};
export default RoomItem;
const styles = StyleSheet.create({
    itemContainer: {
       
        marginBottom: SH(10),
    },
    roomContainer: {
        backgroundColor: '#e6eced',
        padding: SW(10),
        borderRadius: 8,
    },
    roomName: {
        color: 'black',
        fontSize: SF(15),
        fontFamily: 'Poppins-Medium',
        textTransform: 'capitalize',
    },
    rateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: SH(5),
    },
    rateText: {
        color: 'black',
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
    },
    Text: {
        color: 'black',
        fontSize: SF(13),
        fontFamily: 'Poppins-Medium',
    },
    policyDescription: {
        fontFamily: 'Poppins-Regular',
        color: 'gray',
        fontSize: SF(10),
    },
    text: {
        color: '#000',
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
    },
    guestChoose: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SW(7),
        paddingHorizontal: SW(7),
        borderRadius: 4,
        flexDirection: 'row',
        gap: SW(5),
        margin: SW(5),
    },
});

