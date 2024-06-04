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
import {SH, SF} from '../../../utils';
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
      <View style={Logins.MinViewScreen}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Style.ScrollViewStyles}>
          <View style={Logins.Container}>
            <View style={Style.MinViewContent}>
              <View style={Logins.ManViewLogins}>
                <Image
                  style={Logins.ImageSet}
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
              <View style={Logins.ViewTextStyle}>
                <Text style={Logins.TextStyle}>
                  {t('Dont_Have_Account')}{' '}
                  <Text
                    style={Logins.registerTextStyle}
                    onPress={() => OnRegisterPress()}>
                    {' '}
                    {t('Register_Text')}
                  </Text>
                </Text>
              </View>
              <Text style={{color: 'red'}}>{error}</Text>
              <Spacing space={SH(40)} />
              <View style={Logins.LoginButton}>
                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color={Colors.theme_background}
                  /> // Display ActivityIndicator while loading
                ) : (
                  <Button title={t('Login_Text')} onPress={handleLogin} />
                )}
              </View>
              <Spacing space={SH(10)} />
              <TouchableOpacity
                onPress={() => navigation.navigate(RouteName.FORGOT_PASSWORD)}>
                <Text style={Logins.ForgetPasswordStyles}>
                  {t('Forgot_Password')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
export default LoginScreen;
