import React, { useState,useMemo } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView,TouchableOpacity } from "react-native";
import { HelpScreenStyles, Style } from '../../styles';
import { Button, ConfirmationAlert, Lottie, Spacing,RatingScreen, Input,VectorIcon } from '../../components';
import images from "../../index";
import { RouteName } from "../../routes";
import {  SF, SH ,SW,Colors} from "../../utils";
import { useTheme } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import Entypo from 'react-native-vector-icons/Entypo'
const ReviewsScreen = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const HelpScreenStyle = useMemo(() => HelpScreenStyles(Colors), [Colors]);
  const [text, onChangeText] = React.useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    'logout': t("Reviews_Submit_Successful"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.HOME_TAB);
  }

  return (
    <View style={HelpScreenStyle.MinViewScreenTwo}>
    <View style={{display:'flex',flexDirection:'row',marginVertical:SH(15)}}>
          <Entypo name={'menu'} color={Colors.theme_background} size={35} onPress={()=>navigation.navigate("Root")}/>
          <Text style={{color:Colors.theme_background,fontSize:SF(25)}}>Reviews</Text>
          </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewStyles}>
        <KeyboardAvoidingView enabled>
          <View style={HelpScreenStyle.KeyBordTopViewStyle}>
            <View style={HelpScreenStyle.MinFlexView}>
              <View style={HelpScreenStyle.MinContentView}>
                <Lottie Lottiewidthstyle={{ position: 'relative',right: SH(7),
                  width: SW(300),height:SH(300)}} source={images.Reviewsimage_screen} />
                <Text style={{ color: Colors.black_text_color,
                  fontSize: SF(22),
                  fontFamily: 'Poppins-BoldItalic',
                  textAlign: 'center',color:Colors.theme_background,margin:SW(5)}}>{t("Please_OnDemand_Service")}</Text>
                <View style={HelpScreenStyle.FlexRowStarSignup}>
                  <RatingScreen
                    type='custom'
                    ratingColor={Colors.amber_color}
                    ratingBackgroundColor={Colors.chinese_silver}
                    ratingCount={5}
                    tintColor={Colors.white_text_color}
                    imageSize={SW(30)}
                    startingValue={3.5}
                    isDisabled={false}
                  />
                </View>
                <Text style={{fontFamily:'Poppins-Regular',color:'black',fontSize:SF(15),
                  margin:SW(15),textAlign:'center'}}>{t("Please_OnDemand_Two")}</Text>
                <View style={HelpScreenStyle.InputUnderLineReviews}>
                  <Input
                    inputStyle={HelpScreenStyle.PositionStyleInput}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={t("Reviews_Enter_Your_Commenet")}
                    placeholderTextColor={Colors.theme_background}
                  />
                </View>
                
                <View style={HelpScreenStyle.AccountButton}>
                  <Button onPress={() => {
                    setAlertVisible(true);
                    setAlertMessage(alertdata.logout);
                  }} title={t("Reviews_Submit")}
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <ConfirmationAlert
        message={alertMessage}
        modalVisible={alertVisible}
        setModalVisible={setAlertVisible}
        onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
        buttonminview={HelpScreenStyle.ButtonView}
        iconVisible={true}
        buttonText={t("Ok")}
      />
    </View>
  );
};
export default ReviewsScreen;
