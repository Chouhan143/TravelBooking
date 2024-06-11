import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Container,
  Input,
  Spacing,
  VectorIcon,
} from '../../../components';
import {RouteName} from '../../../routes';
import {Style, Login} from '../../../styles';
import {SH, SF, SW} from '../../../utils';
import {useTheme} from '@react-navigation/native';
import images from '../../../index';
import {useTranslation} from 'react-i18next';
import useLogin from '../../../hooks/useLogin';
import {loginSuccess} from '../../../redux/action';

const LoginScreen = props => {
  const {login, error, loading, isLoggedIn} = useLogin();
  const {Colors} = useTheme();
  const Logins = useMemo(() => Login(Colors), [Colors]);
  const {navigation} = props;
  const [mobileNumber, setMobileNumber] = useState('7869839871');
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [TextInputPassword, setTextInputPassword] = useState('12345678');

  const handleLogin = () => {
    login(mobileNumber, TextInputPassword);
  };

  const onChangeText = text => {
    if (text === 'TextInputPassword')
      setpasswordVisibility(!passwordVisibility);
  };
  const {t} = useTranslation();

  const OnRegisterPress = () => {
    navigation.navigate(RouteName.REGISTER_SCREEN);
  };

  return (
    <Container>
      <View style={{flex:1,backgroundColor:'white',marginTop:SH(60)}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.ScrollViewStyles}>
          <View style={{margin:SW(10)}}>
            <View >
              <View style={{alignItems:'center'}}>
                <Image
                  style={{ width: SW(200),
                    height: SH(150),}}
                  resizeMode="contain"
                  source={images.Logo}
                />
              </View>
              <Text style={Logins.LoginText}>{t('Login_Text')}</Text>
              <Spacing space={SH(20)} />
              <View style={Logins.InputSpaceView}>
                <Input
                  title={t('Mobile_Number')}
                  placeholder={t('Mobile_Number')}
                  onChangeText={value => setMobileNumber(value)}
                  value={mobileNumber}
                  inputType="numeric"
                  maxLength={10}
                  placeholderTextColor={Colors.gray_text_color}
                />
              </View>
              <Spacing space={SH(20)} />
              <View style={Style.FlexRowPassword}>
                <View style={Style.InputViewWidth}>
                  <Input
                    name="password"
                    title={t('Password_Text')}
                    value={TextInputPassword}
                    placeholder={t('Password_Text')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={Colors.gray_text_color}
                    textContentType="newPassword"
                    secureTextEntry={passwordVisibility}
                    enablesReturnKeyAutomatically
                    onChangeText={text => setTextInputPassword(text)}
                  />
                  <TouchableOpacity
                    style={Style.IconPostionAboluteTwo}
                    onPress={() => {
                      onChangeText('TextInputPassword');
                    }}>
                    <VectorIcon
                      name={passwordVisibility ? 'eye-off' : 'eye'}
                      size={SF(25)}
                      color={Colors.gray_text_color}
                      icon="Ionicons"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Spacing space={SH(10)} />
              <TouchableOpacity
              onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD)}>
              <Text style={{margin:SW(10),color:'black',fontFamily:'Poppins-Bold',textAlign:'center'}}>
                {t('Forgot_Password')}
              </Text>
            </TouchableOpacity>
            <View>
                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color={Colors.theme_background}
                  /> // Display ActivityIndicator while loading
                ) : (
                  <TouchableOpacity 
                  style={{backgroundColor:Colors.theme_background,
                    padding:SW(15),borderRadius:7,marginTop:SH(10),margin:SW(7)
                  }}
                      onPress={() => handleLogin()}>
                      <Text style={{color:'white',textAlign:'center',
                        fontFamily:'Poppins-Medium',fontSize:SF(17)}}>{t('Login_Button_Text')}</Text>
                    </TouchableOpacity>
                )}
              </View>
              <View>
                <Text style={{color:'black',textAlign:'center',marginTop:SH(5)}}>
                  {t('Dont_Have_Account')}{' '}
                </Text>
                <TouchableOpacity 
                style={{backgroundColor:Colors.theme_background,
                  padding:SW(15),borderRadius:7,margin:SW(7),marginTop:SH(15)
                }}
                    onPress={() => OnRegisterPress()}>
                    <Text style={{color:'white',textAlign:'center',
                      fontFamily:'Poppins-Medium',fontSize:SF(17)}}>{t('Register_Text')}</Text>
                  </TouchableOpacity>
              </View>
              <Text style={{color: 'red'}}>{error}</Text>
              <Spacing space={SH(40)} />
              <Spacing space={SH(10)} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
export default LoginScreen;
