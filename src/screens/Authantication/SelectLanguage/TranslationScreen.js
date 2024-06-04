import React, { useState } from 'react';
import '../SelectLanguage/i18n'
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Lottie, Spacing, VectorIcon, Button, ModalLanguage } from '../../../components';
import { LanguageStyles } from '../../../styles';
import { RouteName } from '../../../routes';
import images from '../../../index';
import { SH, Colors, SF, } from '../../../utils';

const Translation = (props) => {
  const { navigation } = props;
  const { t, i18n } = useTranslation();
  let englishLanguage = t("English");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectLabel, setSelectLabel] = useState(englishLanguage);

  const changeLang = (e) => {
    setSelectLabel(e)
  }

  return (
    <Container>
      <View style={LanguageStyles.MinView}>
        <Lottie source={images.Languageanimation} />
        <Spacing space={SH(50)} />
        <TouchableOpacity onPress={() => setModalVisible(true)} style={LanguageStyles.SelectTagWrap}>
          <Text style={LanguageStyles.SelectText}>{selectLabel}</Text>
          <View style={LanguageStyles.DropDownIcon}>
            <VectorIcon icon="Feather" name="chevron-down" color={Colors.black_text_color} size={SF(25)} /></View>
        </TouchableOpacity>
        <Spacing space={SH(20)} />
        <ModalLanguage modalVisible={modalVisible}
          setModalVisible={() => {
            setModalVisible(!modalVisible);
          }}
          close={() => setModalVisible(!modalVisible)}
          OnClose={() => setModalVisible(false)}
          changeLang={changeLang}
        />
        <View style={LanguageStyles.BtnVieStyle}>
          <Button title={t("Confirm_Text")} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
        </View>
      </View>
    </Container>
  );
};
export default Translation;