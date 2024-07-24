import React,{useMemo} from "react";
import { Text, View, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, } from "react-native";
import { HelpScreenStyles, Style } from '../../styles';
import images from '../../index';
import { Spacing } from '../../components';
import { SH, SW,SF ,Colors} from '../../utils';
import { useTranslation } from "react-i18next";
import { useNavigation, useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
const NotificationScreen = () => {
  const navigation=useNavigation();
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const HelpScreenStyle = useMemo(() => HelpScreenStyles(Colors), [Colors]);
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    <View style={{display:'flex',flexDirection:'row',marginLeft:SH(20),marginVertical:SH(15)}}>
          <Entypo name={'menu'} color={Colors.theme_background} size={35} onPress={()=>navigation.navigate("Root")}/>
          <Text style={{color:Colors.theme_background,fontSize:SF(25)}}>Notifications</Text>
          </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewStyle}>
        <KeyboardAvoidingView enabled>
          <View style={HelpScreenStyle.NotificationView}>
            <View style={HelpScreenStyle.MinContentView}>
              <Spacing space={SH(20)} />
              <TouchableOpacity style={{display:'flex',flexDirection:'row',margin:SW(10),
                backgroundColor:'#f2fcff',padding:SW(15),
                borderColor:Colors.theme_background,borderWidth:1,borderRadius:7}}>
                <View>
                  <Image style={HelpScreenStyle.ImageSet} resizeMode='contain' source={images.Notification_one} />
                </View>
                <View style={{marginRight:SW(120)}}>
                  <Text style={{fontFamily:'Poppins-Regular',color:'black',marginTop:SH(20),fontSize:SW(10)}}>{t("Notification_Paregraph")}</Text>
                  <Text style={{fontFamily:'Poppins-Regular',color:'black',marginTop:SH(20),fontSize:SW(10)}}>{t("Notification_date")}</Text>
                </View>
              </TouchableOpacity>
              <Spacing space={SH(20)} />
              
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default NotificationScreen;
