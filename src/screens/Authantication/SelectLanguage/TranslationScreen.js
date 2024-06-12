import React, { useState } from 'react';
import '../SelectLanguage/i18n'
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Lottie, Spacing, VectorIcon, Button, ModalLanguage } from '../../../components';
import { LanguageStyles } from '../../../styles';
import { RouteName } from '../../../routes';
import images from '../../../index';
import { SH, Colors, SF,SW } from '../../../utils';

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
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{  flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',width: '80%',
          borderWidth: SW(1),
          borderColor: Colors.theme_background, borderRadius: SW(10),
          alignSelf: 'center',
          position: 'relative'}}>
          <Text style={{fontSize: SF(23),
    paddingVertical: SH(10),
    color: Colors.theme_background,
    marginRight: SW(10),
    fontFamily:'Poppins_Medium'}}>{selectLabel}</Text>
          <View style={LanguageStyles.DropDownIcon}>
            <VectorIcon icon="Feather" name="chevron-down" color={Colors.theme_background} size={SF(25)} /></View>
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
        <TouchableOpacity style={{ width: '80%',
          position: 'absolute',
          bottom: SH(30),backgroundColor:Colors.theme_background,
          padding:SW(6),borderRadius:7}}>
          <Text style={LanguageStyles.btnText} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} >
          Confirm</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
export default Translation;