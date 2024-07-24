import React, { useState,useMemo } from "react";
import { Text, View, KeyboardAvoidingView,TextInput } from "react-native";
import { HelpScreenStyles, Style } from '../../styles';
import { Button, Spacing, ConfirmationAlert,VectorIcon} from '../../components';
import { SH,SF,SW} from '../../utils';
import { RouteName } from '../../routes';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import Entypo from 'react-native-vector-icons/Entypo'
const HelpScreen = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const { Colors } = useTheme();
  const HelpScreenStyle = useMemo(() => HelpScreenStyles(Colors), [Colors]);
  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    'logout': t("Help_sand_mail_Successful"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.HOME_TAB);
  }
  return (
    <View style={HelpScreenStyle.MinViewScreen}>
      <ScrollView nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewStyles}>
        <KeyboardAvoidingView enabled>
          <View style={HelpScreenStyle.HelpViewStyles}>
        <View style={{display:'flex',flexDirection:'row',marginTop:SH(20),marginLeft:SH(20)}}>
        <Entypo name={'menu'} color={Colors.theme_background} size={35} onPress={()=>navigation.navigate("Root")}/>
        <Text style={{color:Colors.theme_background,fontSize:SF(25)}}>Help </Text>
        </View>
            <Spacing space={SH(30)} />
            <View style={HelpScreenStyle.MinContentView}>
              <View style={{backgroundColor:'#ebf3f5',borderRadius: SH(7),borderWidth: SH(1),borderColor: Colors.gray_text_color,
        paddingBottom: SH(100),paddingHorizontal: SH(10),margin:SW(10)}}>
                <TextInput style={{color:'black',fontFamily:'Poppins_Medium',
                }} placeholder={t("Type_Your_Message")} placeholderTextColor="gray" />
              </View>
              <View style={HelpScreenStyle.TextparegraView}>
                <Text style={{
                  fontFamily:'Poppins_Medium',color: Colors.gray_text_color,fontSize: SF(15),paddingTop: SH(20),
                }}>{t("Help_paregraph")}</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{
        position: 'absolute',
        bottom: SH(0),
        width: '100%',
        paddingHorizontal: SH(20),
        paddingBottom: SH(50),
      }}>
        <Button onPress={() => {
          setAlertVisible(true);
          setAlertMessage(alertdata.logout);
        }} title={t("Help_sand_mail")} />
      </View>
      <ConfirmationAlert
        message={alertMessage}
        modalVisible={alertVisible}
        iconVisible={true}
        setModalVisible={setAlertVisible}
        onPressCancel={() => setAlertVisible(!alertVisible)}
        onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
        buttonminview={HelpScreenStyle.FlexCenterButton}
        buttonText={t("Ok")}
      />
    </View>
  );
};
export default HelpScreen;
