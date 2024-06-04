import React, { useMemo } from "react";
import { Text, View, Image, FlatList, KeyboardAvoidingView, TouchableOpacity, } from "react-native";
import { PaymentStyle } from '../../styles';
import images from '../../index';
import { RouteName } from '../../routes';
import { Container, Spacing, PaymentListData } from "../../components";
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';

const PaymentScreen = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const PaymentStyles = useMemo(() => PaymentStyle(Colors), [Colors]);

  const Paymentdata = [
    {
      "id": 1,
      "paymentparegraph": "Payment_screen_Paragraph_One",
      "image": images.Upi,
      "smalltext": "Pay_Via_UPI_Label",
      "walletstextset": "Wallets_Lebal",
    },
    {
      "id": 2,
      "paymentparegraph": "Payment_screen_Paragraph_Two",
      "image": images.paytem,
      "smalltext": "Paytm_Label",
    },
    {
      "id": 3,
      "paymentparegraph": "Payment_screen_Paragraph_Three",
      "image": images.Mobikwikimage,
      "smalltext": "MobikWik_Label",
    },
  ]

  return (
    <Container>
      <Spacing />
      <View style={PaymentStyles.MinStyleViewPhotograpgy}>
        <ScrollView nestedScrollEnabled={true}>
          <KeyboardAvoidingView enabled>
            <View style={PaymentStyles.MinFlexView}>
              <View style={PaymentStyles.MinViewSigninScreen}>
                <View>
                  <Text style={PaymentStyles.CardTextStyleTwo}>{t("UPI_Label")}</Text>
                  <TouchableOpacity style={PaymentStyles.FlexRowCreditCardTwo} onPress={() => navigation.navigate(RouteName.PAYMENT_SUCCESSFULLY)}>
                    <View style={PaymentStyles.IconSetBorderWidth}>
                      <Image source={images.Google_pay} resizeMode='center' style={PaymentStyles.SetbgImage} />
                    </View>
                    <Text style={PaymentStyles.CreditCardText}>{t("UPI_Label")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[PaymentStyles.FlexRowCreditCardTwo, PaymentStyles.BottomBorder]} onPress={() => navigation.navigate(RouteName.PAYMENT_SUCCESSFULLY)}>
                    <View style={PaymentStyles.IconSetBorderWidth}>
                      <Image source={images.paypal} resizeMode='center' style={PaymentStyles.SetbgImage} />
                    </View>
                    <Text style={PaymentStyles.CreditCardText}>{t("Paypal")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={PaymentStyles.FlexRowCreditCardTwo} onPress={() => navigation.navigate(RouteName.PAYMENT_SUCCESSFULLY)}>
                    <View style={PaymentStyles.IconSetBorderWidth}>
                      <Image source={images.Upi} resizeMode='center' style={PaymentStyles.SetbgImage} />
                    </View>
                    <Text style={PaymentStyles.CreditCardText}>{t("Google_Pay")}</Text>
                  </TouchableOpacity>
                  <Text style={PaymentStyles.CardTextStyleThree}>{t("Wallets_Lebal")}</Text>
                  <FlatList
                    data={Paymentdata}
                    renderItem={({ item }) => (<PaymentListData
                      item={item}
                    />)}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Container>
  );
};
export default PaymentScreen;