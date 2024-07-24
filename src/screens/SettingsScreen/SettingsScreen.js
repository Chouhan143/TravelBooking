import React, { useState, useMemo } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import { SettingStyle, Style, LanguageStyles } from '../../styles';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Spacing, Switchs, VectorIcon, ModalLanguage } from '../../components';
import { SH, SF,SW } from '../../utils';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
const SettingStylesScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { Colors } = useTheme();
  const SettingStyles = useMemo(() => SettingStyle(Colors), [Colors]);
   const navigation=useNavigation();
  const { t } = useTranslation();
  let englishLanguage = t("English");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectLabel, setSelectLabel] = useState(englishLanguage);

  const changeLang = (e) => {
    setSelectLabel(e)
  }

  return (
    <>
      <View style={[{flex:1,backgroundColor:'white'}]}>
      <View style={{display:'flex',flexDirection:'row',marginLeft:SH(20),marginVertical:SH(15)}}>
          <Entypo name={'menu'} color={Colors.theme_background} size={35} onPress={()=>navigation.navigate("Root")}/>
          <Text style={{color:Colors.theme_background,fontSize:SF(25)}}>Settings</Text>
          </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.contentContainerStyle}>
          <KeyboardAvoidingView enabled>
          
            <View style={SettingStyles.KeyBordTopViewStyle}>
            
              <View style={SettingStyles.MinFlexView}>
             
              <View style={{padding:SW(10),borderColor:'#b6ecfa',borderRadius:10,borderWidth:1,width:SW(350)}}>
              <View style={SettingStyles.Togglrswitchflex}>
              <View>
                <Spacing space={SH(10)} />
                <Text style={SettingStyles.CellularDataText}>{t("Location_Track")}</Text>
              </View>
            </View>
            <View style={SettingStyles.TogglesWotchview}>
              <Text style={{color:'black'}}>
                {t("Enalble_Location")}
              </Text>
              <View style={SettingStyles.WidthSwitch}>
                <Switchs
                  trackColor={{ false: Colors.gray_text_color, true: Colors.theme_background_brink_pink }}
                  thumbColor={isEnabled ? Colors.light_gray_text_color : Colors.theme_background}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
              </View>
                <Spacing space={SH(5)} />
                <Text style={SettingStyles.CellularDataText}>{t("Location_text")}</Text>
                <View style={{padding:SW(10),borderColor:'#b6ecfa',borderRadius:10,borderWidth:1,width:SW(350)}}>
                  <View >
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Location_Tracking")}</Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={SettingStyles.DownloadFasterText}>{t("Enables_Recommended")}</Text>
                    <VectorIcon
                      icon="AntDesign"
                      size={SF(30)}
                      name="check"
                      color={Colors.theme_background}
                    />
                  </View>
                </View>
                <View style={SettingStyles.RightiConMinview}>
                  <View style={{padding:SW(10),borderColor:'#b6ecfa',borderRadius:10,borderWidth:1,width:SW(350)}}>
                    <Spacing space={SH(0)} />
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Location_Features")}</Text>
                    <Text style={SettingStyles.DownloadFasterText}>{t("Hours_Years")}</Text>
                  </View>
                </View>
              <View style={{padding:SW(10),borderColor:'#b6ecfa',borderRadius:10,borderWidth:1}}>
              <Text style={LanguageStyles.Settingtext}>{t("Select_Your_Language")}</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{
                borderColor:Colors.theme_background,borderWidth:1,borderRadius:7,padding:SW(5),paddingTop:0,paddingBottom:0,
                display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={LanguageStyles.SelectText}>{selectLabel}</Text>
                  <VectorIcon icon="Feather" name="chevron-down" 
                  color={Colors.theme_background} size={SF(25)} />
              </TouchableOpacity>
              </View>
                <ModalLanguage modalVisible={modalVisible}
                  setModalVisible={() => {
                    setModalVisible(!modalVisible);
                  }}
                  close={() => setModalVisible(!modalVisible)}
                  OnClose={() => setModalVisible(false)}
                  changeLang={changeLang}
                />
                <Spacing space={SH(15)} />
                <View style={{padding:SW(10),borderColor:'#b6ecfa',borderRadius:10,borderWidth:1,width:SW(350),
                  justifyContent:'space-between',display:'flex',flexDirection:'row'}}>
                  <View style={SettingStyles.BodyTextWidth}>
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Synce_Changes")}</Text>
                  </View>
                  <View>
                    <VectorIcon
                      icon="AntDesign"
                      size={SF(30)}
                      name="check"
                      color={Colors.theme_background}
                    />
                  </View>
                </View>
                <Spacing space={SH(15)} />
                <Text style={SettingStyles.CellularDataText}>{t("Video_Qualitytext")}</Text>
                <View style={{paddingBottom:SH(5)}}>
                  <View style={{padding:SW(10),borderColor:'#b6ecfa',borderRadius:10,borderWidth:1,width:SW(350)}}>
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Standard_Qualitytext")}</Text>
                    <Text style={SettingStyles.DownloadFasterText}>{t("Downnloads_Qualitytext")}</Text>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
  );
};
export default SettingStylesScreen;
