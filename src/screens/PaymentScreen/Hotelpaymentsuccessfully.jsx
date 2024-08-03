import React, { useEffect, useMemo } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Payment } from '../../styles';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import images from "../../index";
import { useTheme } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Hotelpaymentsuccessfully = (props) => {
  const navigation=useNavigation();
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const PaymentStyle = useMemo(() => Payment(Colors), [Colors]);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      navigation.navigate("Root");
      clearInterval(interval);
    },300000);

    return () => clearInterval(interval);
  }, []);
  const storedbuspaymentpaymentdata=useSelector(state=>state.commomReducer.busPaymentUpdateData);
  const amount=storedbuspaymentpaymentdata.data.amount;
  const payment_method=storedbuspaymentpaymentdata.data.payment_method;
  const created_at=storedbuspaymentpaymentdata.data.created_at;
  const date = new Date(created_at);
  const TRANCATION_DATE_TIME = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  console.log(amount)
  return (
    <View style={{flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    backgroundColor:'white'}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        ContentContainerStyle={PaymentStyle.MainViewPaymentSuccess}>
        <View>
          <View>
            <View style={PaymentStyle.MinViewSigninScreen}>
              <TouchableOpacity style={PaymentStyle.Imagecebter}>
                <Image source={require('../../images/payment.jpg')} resizeMode='center' style={PaymentStyle.PaymentSuccesfullImg} />
              </TouchableOpacity>
              <View style={PaymentStyle.TextCenterView}>
                <Text style={PaymentStyle.TextCenterPayment}>{t("PAYMENT_SUCCESSFULL")}</Text>
              </View>
              <Text style={PaymentStyle.TextCenterPaymentTwo}>{t("Your_payment_has_been")}</Text>
              <TouchableOpacity style={PaymentStyle.FlexRowcoffiText}>
                <Text style={PaymentStyle.TotalQAmountPaid}>{t("PAYED_BY")}</Text>
                <Text style={PaymentStyle.PriceTextSet}>{payment_method}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={PaymentStyle.FlexRowcoffiTextTwo}>
                <Text style={PaymentStyle.TotalQAmountPaid}>{t("TRANCATION_DATE")}</Text>
                <Text style={PaymentStyle.PriceTextSet}>{TRANCATION_DATE_TIME}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={PaymentStyle.FlexRowcoffiTextTwo}>
              <Text style={PaymentStyle.TotalQAmountPaid}>{t("AMOUNT")}</Text>
              <Text style={PaymentStyle.PriceTextSet}><FontAwesome name="rupee" size={25} color="#000" />{amount}</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Hotelpaymentsuccessfully;