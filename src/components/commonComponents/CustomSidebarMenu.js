import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Sidemenu} from '../../styles';
import {RouteName} from '../../routes';
import {ConfirmationAlert, VectorIcon} from '../../components';
import {Colors, SF, SH, SW} from '../../utils';
import {useTranslation} from 'react-i18next';
import {logout} from '../../redux/action';
import {useDispatch} from 'react-redux';

const CustomSidebarMenu = props => {

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {navigation} = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  var alertdata = {
    logout: t('Are_You_Sure_logout'),
  };
  const onoknutton = () => {
    dispatch(logout());
    navigation.navigate(RouteName.LOGIN_SCREEN);
  };
  const Onpressfunction = e => {
    navigation.toggleDrawer();
    navigation.navigate(e);
  };
  return (
    <ScrollView>
      <View style={{margin:SW(20),marginTop:SH(50)}}>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.HOME_TAB)}>
          <VectorIcon
            icon="FontAwesome"
            size={SF(19)}
            name="home"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Home_Text')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.HISTORY_TAB)}>
          <VectorIcon
            icon="FontAwesome"
            size={SF(19)}
            name="history"
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Payment_History')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.PROFILE_TAB)}>
          <VectorIcon
            icon="FontAwesome"
            size={SF(19)}
            name="user-circle"
            style={Sidemenu.logoimage}
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Profile_Text')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.HELP_SCREEN)}>
          <VectorIcon
            icon="FontAwesome5"
            size={SF(19)}
            name="hands-helping"
            style={Sidemenu.logoimage}
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Help_Text')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.SETTING_SCREEN)}>
          <VectorIcon
            icon="Ionicons"
            size={19}
            name="settings"
            style={Sidemenu.logoimage}
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Setting_Text')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.FAQ_SCREEN)}>
          <VectorIcon
            icon="AntDesign"
            size={SF(19)}
            name="questioncircle"
            style={Sidemenu.logoimage}
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('FAQ_Text')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.REVIEWS_SCREEN)}>
          <VectorIcon
            icon="MaterialIcons"
            size={SF(19)}
            name="reviews"
            style={Sidemenu.logoimage}
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Reviews_Screen')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.NOTIFICTION_SCREEN)}>
          <VectorIcon
            icon="Ionicons"
            size={SF(19)}
            name="notifications"
            style={Sidemenu.logoimage}
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Notification_Text')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Sidemenu.flexrowset}
          onPress={() => Onpressfunction(RouteName.TICKET_SCREEN)}>
          <VectorIcon
            icon="Entypo"
            size={SF(19)}
            name="download"
            style={Sidemenu.logoimage}
            color={Colors.theme_background}
          />
          <Text style={Sidemenu.hometextstyle}>{t('Download_Ticket')}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={Sidemenu.flexrowset}
            onPress={() => {
              setAlertVisible(true);
              setAlertMessage(alertdata.logout);
            }}>
            <VectorIcon
              icon="Entypo"
              name="log-out"
              color={Colors.theme_background}
              size={SF(23)}
            />
            <Text style={Sidemenu.hometextstyle}>{t('Log_Out')}</Text>
          </TouchableOpacity>
        </View>
        <ConfirmationAlert
          message={alertMessage}
          modalVisible={alertVisible}
          setModalVisible={setAlertVisible}
          onPressCancel={() => setAlertVisible(!alertVisible)}
          onPress={() => {
            setAlertVisible(!alertVisible), onoknutton();
          }}
          cancelButtonText={t('Cancel_Button')}
          buttonText={t('Ok')}
        />
      </View>
    </ScrollView>
  );
};
export default CustomSidebarMenu;
