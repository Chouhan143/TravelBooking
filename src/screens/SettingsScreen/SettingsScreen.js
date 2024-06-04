import React, { useState, useMemo } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import { SettingStyle, Style, LanguageStyles } from '../../styles';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Spacing, Switchs, VectorIcon, ModalLanguage } from '../../components';
import { SH, SF } from '../../utils';

const SettingStylesScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const { Colors } = useTheme();
  const SettingStyles = useMemo(() => SettingStyle(Colors), [Colors]);

  const { t } = useTranslation();
  let englishLanguage = t("English");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectLabel, setSelectLabel] = useState(englishLanguage);

  const changeLang = (e) => {
    setSelectLabel(e)
  }

  return (
    <>
      <View style={[Style.MinViewScreen]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.contentContainerStyle}>
          <KeyboardAvoidingView enabled>
            <View style={SettingStyles.KeyBordTopViewStyle}>
              <View style={SettingStyles.MinFlexView}>
                <View style={SettingStyles.Togglrswitchflex}>
                  <View>
                    <Spacing space={SH(15)} />
                    <Text style={SettingStyles.CellularDataText}>{t("Location_Track")}</Text>
                  </View>
                </View>
                <View style={SettingStyles.TogglesWotchview}>
                  <Text style={SettingStyles.DownlodToggleswitchText}>
                    {t("Enalble_Location")}
                  </Text>
                  <View style={SettingStyles.WidthSwitch}>
                    <Switchs
                      trackColor={{ false: Colors.gray_text_color, true: Colors.theme_background_brink_pink }}
                      thumbColor={isEnabled ? Colors.light_gray_text_color : Colors.argent_color}
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
                <Spacing space={SH(10)} />
                <Text style={SettingStyles.CellularDataText}>{t("Location_text")}</Text>
                <View style={SettingStyles.RightiConMinview}>
                  <View>
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Location_Tracking")}</Text>
                    <Text style={SettingStyles.DownloadFasterText}>{t("Enables_Recommended")}</Text>
                  </View>
                  <View>
                    <VectorIcon
                      icon="AntDesign"
                      size={SF(30)}
                      name="check"
                      style={SettingStyles.ChekIconStyle}
                    />
                  </View>
                </View>
                <View style={SettingStyles.RightiConMinview}>
                  <View>
                    <Spacing space={SH(0)} />
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Location_Features")}</Text>
                    <Text style={SettingStyles.DownloadFasterText}>{t("Hours_Years")}</Text>
                  </View>
                </View>
                <Text style={LanguageStyles.Settingtext}>{t("Select_Your_Language")}</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={LanguageStyles.SettingStyle}>
                  <Text style={LanguageStyles.SelectText}>{selectLabel}</Text>
                  <View style={LanguageStyles.DropDownIcon}>
                    <VectorIcon icon="Feather" name="chevron-down" color={Colors.black_text_color} size={SF(25)} /></View>
                </TouchableOpacity>
                <ModalLanguage modalVisible={modalVisible}
                  setModalVisible={() => {
                    setModalVisible(!modalVisible);
                  }}
                  close={() => setModalVisible(!modalVisible)}
                  OnClose={() => setModalVisible(false)}
                  changeLang={changeLang}
                />
                <Spacing space={SH(25)} />
                <View style={SettingStyles.RightiConMinview}>
                  <View style={SettingStyles.BodyTextWidth}>
                    <Text style={SettingStyles.StandardRecommeDtext}>{t("Synce_Changes")}</Text>
                  </View>
                  <View>
                    <VectorIcon
                      icon="AntDesign"
                      size={SF(30)}
                      name="check"
                      style={SettingStyles.ChekIconStyle}
                    />
                  </View>
                </View>
                <Spacing space={SH(15)} />
                <Text style={SettingStyles.CellularDataText}>{t("Video_Qualitytext")}</Text>
                <View style={SettingStyles.RightiConMinviewtwo}>
                  <View>
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
