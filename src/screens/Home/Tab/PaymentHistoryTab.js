import React, { useMemo } from "react";
import { View, FlatList } from "react-native";
import { PaymentHistoryStyle } from '../../../styles';
import { RouteName } from "../../../routes";
import { PaymentHistoryFun } from "../../../components";
import { useTheme } from '@react-navigation/native';
import images from '../../../index';

const HistoryTab = (props) => {
    const { navigation } = props;
    const { Colors } = useTheme();
    const PaymentHistoryStyles = useMemo(() => PaymentHistoryStyle(Colors), [Colors]);
  
    const PaymentHistoryData = [
        {
          "id": 1,
          "image": images.paypal,
          "paymenttype": "Paypal",
          "Time": "Mar, 01 2023 at 08:26 PM",
          "Price": "₹ 390",
          "Result": "Successful",
          "Colour": Colors.green
        },
        {
          "id": 2,
          "image": images.Google_pay,
          "paymenttype": "G_pay",
          "Time": "Mar, 21 2023 at 09:20 PM",
          "Price": "₹ 410",
          "Result": "Successful",
          "Colour": Colors.green
        },
        {
          "id": 3,
          "image": images.Google_pay,
          "paymenttype": "G_pay",
          "Time": "Mar, 19 2023 at 09:16 AM",
          "Price": "₹ 390",
          "Result": "Failed",
          "Colour": Colors.red_color
        },
        {
          "id": 4,
          "image": images.paypal,
          "paymenttype": "Paypal",
          "Time": "Mar, 9 2023 at 11:18 AM",
          "Price": "₹ 390",
          "Result": "Pending",
          "Colour": Colors.blue_color
        },
        {
          "id": 5,
          "image": images.Creditcard,
          "paymenttype": "Card",
          "Time": "Feb, 23 2023 at 10:26 PM",
          "Price": "₹ 390",
          "Result": "Successful",
          "Colour": Colors.green
        },
        {
          "id": 6,
          "image": images.rupayimage,
          "paymenttype": "Rupay",
          "Time": "Feb, 16 2023 at 06:18 PM",
          "Price": "₹ 390",
          "Result": "Successful",
          "Colour": Colors.green
        },
        {
          "id": 7,
          "image": images.paypal,
          "paymenttype": "Paypal",
          "Time": "Jan, 19 2023 at 05:10 PM",
          "Price": "₹ 390",
          "Result": "Successful",
          "Colour": Colors.green
        },
        {
          "id": 8,
          "image": images.Google_pay,
          "paymenttype": "G_pay",
          "Time": "Jan, 11 2023 at 09:50 PM",
          "Price": "₹ 390",
          "Result": "Pending",
          "Colour": Colors.blue_color
        },
        {
          "id": 9,
          "image": images.paypal,
          "paymenttype": "Paypal",
          "Time": "Dec, 23 2022 at 10:20 AM",
          "Price": "₹ 390",
          "Result": "Successful",
          "Colour": Colors.green
        },
        {
          "id": 10,
          "image": images.Creditcard,
          "paymenttype": "Card",
          "Time": "Dec, 29 2022 at 11:00 AM",
          "Price": "₹ 390",
          "Result": "Successful",
          "Colour": Colors.green
        },
      ]
      
  
    return (
        <View style={[PaymentHistoryStyles.MinStyleViewPhotograpgyTwo, PaymentHistoryStyles.bgColorset]}>
            <View style={PaymentHistoryStyles.minflexview}>
                <View style={PaymentHistoryStyles.ContainerAppointmentWrap}>
                    <View style={PaymentHistoryStyles.PaymentBoxwrap}>
                        <FlatList
                            data={PaymentHistoryData}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <PaymentHistoryFun
                                    item={item}
                                    index={index}
                                    onPress={() => navigation.navigate(RouteName.TICKET_SCREEN)}
                                />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>
        </View >
    );
};
export default HistoryTab;