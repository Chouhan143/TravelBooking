import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, Image, Modal ,StyleSheet} from "react-native";
import { ProfileTabStyles, Style } from '../../../styles';
import { Button, Spacing, Input, VectorIcon, ConfirmationAlert } from '../../../components';
import { SH, SF,SW } from '../../../utils';
import images from "../../../index";
import RouteName from "../../../routes/RouteName";
import { useTranslation } from "react-i18next";
import { useTheme } from '@react-navigation/native';
import Colors from "../../../utils";
import * as ImagePicker from 'react-native-image-picker';
const ProfileTab = (props) => {
  const { Colors } = useTheme();
  const ProfileTabStyle = useMemo(() => ProfileTabStyles(Colors), [Colors]);
  const { navigation } = props;
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalcontent, setmodalcontent] = useState(0);
  const [passwordVisibilityold, setpasswordVisibilityold] = useState(true);
  const [passwordVisibilitynew, setpasswordVisibilitynew] = useState(true);
  const [passwordVisibilityconfirm, setPasswordVisibilityconfirm] = useState(true);
  const [profileImage, setProfileImage] = useState(require('../../../images/userdp.jpg')); 

  const stateArray = {
    Oldpassword: "",
    Newpassword: "",
    email: "testemail@example.com",
    Confirmpassword: "",
    number: "9603456878",
  };
  const [state, setState] = useState(stateArray);
  const onChangeText = (text) => {
    if (text === 'Oldpassword') setpasswordVisibilityold(!passwordVisibilityold);
    if (text === 'Newpassword') setpasswordVisibilitynew(!passwordVisibilitynew);
    if (text === 'Confirmpassword') setPasswordVisibilityconfirm(!passwordVisibilityconfirm);
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      setModalVisible(false);
      setmodalcontent(0);
    });
  }, [navigation]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  var alertdata = {
    'logout': t("Are_You_Sure_logout"),
  }
  const onoknutton = () => {
    navigation.navigate(RouteName.LOGIN_SCREEN);
  }
  const selectImage = () => {
    const options = {
      title: 'Select Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
      }
    });
  };
  const handleSaveChanges = () => {
    setModalVisible(false);
  };

  return (
    <View style={ProfileTabStyle.BackgroundWhite}>
      <View style={ProfileTabStyle.whilistminbody}>
        <View style={ProfileTabStyle.ImagCenter}>
          <View>
          <TouchableOpacity onPress={selectImage}>
          <Image style={ProfileTabStyle.ImageStyles} resizeMode='cover' source={profileImage} />
        </TouchableOpacity>
            <Text style={ProfileTabStyle.UserName}>{t("Allison_Perry")}</Text>
          </View>
        </View>
        <View style={ProfileTabStyle.ProfileDetailesMinview}>
          <Text style={{marginTop: '8%', fontFamily:'Poppins-Bold',textTransform:'uppercase',
    color: Colors.black_text_color,fontSize: SF(19),paddingBottom: SH(13),marginLeft:SW(7)}}>
            {t("Edit_Profile")}
          </Text>
          <View style={ProfileTabStyle.PhoneNumberAndIcon}>
            <View style={styles.inputs}>
              <View>
                <Text style={ProfileTabStyle.PhoneNumberText}>{t("Phone_Number")}</Text>
                <Text style={ProfileTabStyle.DigitNumberText}>{state.number}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => { setModalVisible(true); setmodalcontent(1) }} >
                  <View>
                    <VectorIcon
                      icon="EvilIcons"
                      size={SF(30)}
                      name="pencil"
                      color={Colors.theme_background}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => { setModalVisible(!modalVisible) }}
            >
              <View style={ProfileTabStyle.CenteredView}>
                <View style={ProfileTabStyle.ModalView}>
                  <View style={ProfileTabStyle.ShadowStyleModalTwo}>
                    <View style={ProfileTabStyle.AllPaddingModal}>
                      <TouchableOpacity style={ProfileTabStyle.IconClose} onPress={() => setModalVisible(!modalVisible)}>
                        <VectorIcon
                          icon="AntDesign"
                          size={SF(25)}
                          name="close"
                          color={Colors.black_text_color}
                        />
                      </TouchableOpacity>
                      {modalcontent === 1 ?
                        <View>
                          <Text style={ProfileTabStyle.ModalText}>{t("Change_Phone_Number")}</Text>
                          <Spacing space={SH(15)} />
                          <Input
                            style={ProfileTabStyle.input}
                            onChangeText={(text) => setState({ ...state, number: text })}
                            value={state.number}
                            placeholder="9603456878"
                            placeholderTextColor={Colors.gray_text_color}
                            keyboardType="numeric"
                          />
                        </View>
                        :
                        modalcontent === 2 ?
                          <View>
                            <Text style={ProfileTabStyle.ModalText}>{t("Change_Email")}</Text>
                            <Spacing space={SH(15)} />
                            <View>
                              <Input
                                style={ProfileTabStyle.BgWhiteShadowInputModal}
                                onChangeText={(text) => setState({ ...state, email: text })}
                                value={state.email}
                                placeholder={t("Exam_Email_Text")}
                                placeholderTextColor={Colors.gray_text_color}
                              />
                            </View>
                          </View>
                          :
                          modalcontent === 3 ?
                            <View>
                              <Text style={ProfileTabStyle.ModalText}>{t("Change_Your_Password")}</Text>
                              <Spacing space={SH(20)} />
                              <View style={Style.FlexRowPassword}>
                                <View style={Style.InputViewWidth}>
                                  <Spacing space={SH(35)} />
                                  <Input
                                    name="password"
                                    placeholder={t("Old_Password")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    secureTextEntry={passwordVisibilityold}
                                    onChangeText={(text) => setState({ ...state, Oldpassword: text })}
                                    value={state.Oldpassword}
                                    enablesReturnKeyAutomatically
                                    placeholderTextColor={Colors.gray_text_color}
                                  />
                                  <TouchableOpacity style={Style.IconPostionAboluteTwo} onPress={() => { onChangeText("Oldpassword") }}>
                                    <VectorIcon icon="Ionicons" name={passwordVisibilityold ? 'eye-off' : 'eye'} size={25} style={ProfileTabStyle.eyeiconset} />
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <Spacing space={SH(20)} />
                              <View style={Style.FlexRowPassword}>
                                <View style={Style.InputViewWidth}>
                                  <Spacing space={SH(35)} />
                                  <Input
                                    inputStyle={Style.InputStyles}
                                    name="password"
                                    placeholder={t("New_Password")}
                                    autoCapitalize="none"
                                    placeholderTextColor={'gray'}
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    secureTextEntry={passwordVisibilitynew}
                                    onChangeText={(text) => setState({ ...state, Newpassword: text })}
                                    value={state.Newpassword}
                                    enablesReturnKeyAutomatically
                                  />
                                  <TouchableOpacity style={Style.IconPostionAboluteTwo} onPress={() => { onChangeText("Newpassword") }}>
                                    <VectorIcon icon="Ionicons" name={passwordVisibilitynew ? 'eye-off' : 'eye'} size={25} style={ProfileTabStyle.eyeiconset} />
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <Spacing space={SH(20)} />
                              <View style={Style.FlexRowPassword}>
                                <View style={Style.InputViewWidth}>
                                  <Spacing space={SH(35)} />
                                  <Input
                                    inputStyle={Style.InputStyles}
                                    name="Confirm New Password"
                                    placeholder={t("Conform_Password")}
                                    placeholderTextColor={Colors.gray_text_color}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    secureTextEntry={passwordVisibilityconfirm}
                                    onChangeText={(text) => setState({ ...state, Confirmpassword: text })}
                                    value={state.Confirmpassword}
                                    enablesReturnKeyAutomatically
                                  />
                                  <TouchableOpacity style={Style.IconPostionAboluteTwo} onPress={() => { onChangeText("Confirmpassword") }}>
                                    <VectorIcon icon="Ionicons" name={passwordVisibilityconfirm ? 'eye-off' : 'eye'} size={25} style={ProfileTabStyle.eyeiconset} />
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <Spacing space={SH(30)} />
                            </View>
                            :
                            modalcontent === 4 &&
                              <Text style={ProfileTabStyle.ModalText}>{t("Are_You_Sure")}</Text>
                              }
                      {modalcontent === 1 || modalcontent === 2 || modalcontent === 3 ?
                        <View style={ProfileTabStyle.ButtonsetModleTwoButton}>
                          <View style={ProfileTabStyle.Marginright}>
                            <Button onPress={() => setModalVisible(!modalVisible)}
                              buttonTextStyle={{ color: Colors.white_text_color }}
                              title={t("Ok")} />
                          </View>
                          <View style={ProfileTabStyle.Marginright}>
                            <Button buttonStyle={{borderColor: Colors.theme_background,backgroundColor: Colors.white_text_color,borderWidth: SW(1),}} 
                            buttonTextStyle={{color:Colors.theme_background}} title={t("Cancel_Button")} onPress={() => setModalVisible(!modalVisible)} />
                          </View>
                        </View>
                        :
                        <View style={ProfileTabStyle.ButtonsetModleTwoButton}>
                          <View style={ProfileTabStyle.MarginRightView}>
                            <Button title={t("Log_Out")} onPress={() => navigation.navigate(RouteName.LOGIN_SCREEN)} />
                          </View>
                          <View style={ProfileTabStyle.MarginRightView}>
                            <Button title={t("Cancel_Button")} onPress={() => setModalVisible(!modalVisible)} buttonStyle={ProfileTabStyle.SingleButtonStyles} buttonTextStyle={ProfileTabStyle.SingleButtonText}
                            />
                          </View>
                        </View>
                      }
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={ProfileTabStyle.PhoneNumberAndIcon}>
            <View style={styles.inputs}>
              <View style={ProfileTabStyle.setpadiingtext}>
                <Text style={ProfileTabStyle.PhoneNumberText}>{t("Email_Text")}</Text>
                <Text style={ProfileTabStyle.DigitNumberText}>{state.email}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => { setModalVisible(true); setmodalcontent(2) }}>
                  <View>
                    <VectorIcon
                      icon="EvilIcons"
                      size={SF(30)}
                      name="pencil"
                      color={Colors.theme_background}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={ProfileTabStyle.PhoneNumberAndIcon}>
            <View style={styles.inputs}>
              <View>
                <Text style={ProfileTabStyle.PhoneNumberText}>{t("Password_Text")}</Text>
                <Text style={ProfileTabStyle.DigitNumberText}>{state.Newpassword}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => { setModalVisible(true); setmodalcontent(3) }}>
                  <View>
                    <VectorIcon
                      icon="EvilIcons"
                      size={SF(30)}
                      name="pencil"
                      color={Colors.theme_background}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Spacing space={SH(20)} />
          <TouchableOpacity onPress={() => {
            setAlertVisible(true);
            setAlertMessage(alertdata.logout);
          }}>
            <View style={ProfileTabStyle.IconAndTextFlex}>
              <View style={{backgroundColor:Colors.theme_background,padding:SW(7),
               width:SW(340),display:'flex',flexDirection:'row',justifyContent:'center',
                borderRadius:10}}>
                <Text style={{fontFamily:'Poppins-Medium',color:'white',fontSize:SF(20),textTransform:"uppercase"}}>{t("Log_Out")}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <ConfirmationAlert
            message={alertMessage}
            modalVisible={alertVisible}
            setModalVisible={setAlertVisible}
            onPressCancel={() => setAlertVisible(!alertVisible)}
            onPress={() => { setAlertVisible(!alertVisible), onoknutton() }}
            cancelButtonText={t("Cancel_Button")}
            buttonText={t("Ok")}
          />
          <TouchableOpacity onPress={() => navigation.navigate(RouteName.SETTING_SCREEN)}>
            <View style={{backgroundColor:Colors.theme_background,padding:SW(7),marginTop:SH(10),width:SW(340),
              display:'flex',flexDirection:'row',justifyContent:'center',
              borderRadius:10}}>
              <Text style={{fontFamily:'Poppins-Medium',color:'white',fontSize:SF(20),textTransform:"uppercase"}}>{t("Setting_Text")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputs:{
    backgroundColor:'white',
    width:SW(340),
    textAlign: 'center',
    height: SH(75),
    borderRadius: SW(7),
    padding: SH(10),
    justifyContent: 'center',
    shadowColor:'#5e6360',
    borderColor:'gray',
    borderWidth:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {
      width: SW(0),
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  }
})
export default ProfileTab;