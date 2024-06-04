import React,{useMemo} from "react";
import { Text, View, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity, } from "react-native";
import { HelpScreenStyles, Style } from '../../styles';
import images from '../../index';
import { Spacing } from '../../components';
import { SH } from '../../utils';
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';

const NotificationScreen = () => {
  const { t } = useTranslation();
  const { Colors } = useTheme();
  const HelpScreenStyle = useMemo(() => HelpScreenStyles(Colors), [Colors]);
  return (
    <View style={HelpScreenStyle.MinViewScreen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={Style.ScrollViewStyle}>
        <KeyboardAvoidingView enabled>
          <View style={HelpScreenStyle.NotificationView}>
            <View style={HelpScreenStyle.MinContentView}>
              <Spacing space={SH(20)} />
              <TouchableOpacity style={HelpScreenStyle.FlexDiractionRow}>
                <View>
                  <Image style={HelpScreenStyle.ImageSet} resizeMode='cover' source={images.Notification_one} />
                </View>
                <View style={HelpScreenStyle.ParegraphWidth}>
                  <Text style={HelpScreenStyle.TextParegraph}>{t("Notification_Paregraph")}</Text>
                  <Text style={HelpScreenStyle.TwoNavemBerScreen}>{t("Notification_date")}</Text>
                </View>
              </TouchableOpacity>
              <Spacing space={SH(20)} />
              <TouchableOpacity style={HelpScreenStyle.FlexDiractionRowTwo}>
                <View>
                  <Image style={HelpScreenStyle.ImageSet} resizeMode='contain' source={images.Notification_two} />
                </View>
                <View style={HelpScreenStyle.ParegraphWidthTwo}>
                  <Text style={HelpScreenStyle.TextParegraph}>{t("Notification_Paregraph_Two")}</Text>
                  <Text style={HelpScreenStyle.TwoNavemBerScreen}>{t("Notification_Date_Two")}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default NotificationScreen;
