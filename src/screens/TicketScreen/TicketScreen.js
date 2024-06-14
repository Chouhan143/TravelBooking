import React, {useMemo} from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {TicketScreenStyle} from '../../styles';
import {AppHeader, Button, Spacing} from '../../components';
import {SF, SH, SW} from '../../utils';
import images from '../../index';
import {RouteName} from '../../routes';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const TicketScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {Colors} = useTheme();
  const TicketScreenStyles = useMemo(() => TicketScreenStyle(Colors), [Colors]);

  return (
    <View
      style={[
        TicketScreenStyles.minstyleviewphotograpgy,
        TicketScreenStyles.bgColorset,
      ]}>
      <View style={{flex:1,backgroundColor:'white',marginTop:SH(30)}}>
        <AppHeader
          headerTitle={t('Download_Ticket')}
          Iconname={true}
          onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}
          
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          ContentContainerStyle={TicketScreenStyles.MainViewTicketScreen}>
          <KeyboardAvoidingView enabled>
            <View style={TicketScreenStyles.minflexview}>
              <View style={TicketScreenStyles.MinViewSigninScreen}>
               
                <View style={TicketScreenStyles.qrcodescanner}>
                  <View>
                    <Text style={{color:'black',fontFamily:'Poppins-Bold',fontSize:SF(20)}}>
                      {t('Baroda_Surat')}
                    </Text>
                    {/* <Image source={images.Ticket_Qr} resizeMode={'contain'} style={TicketScreenStyles.imagestyleset} /> */}
                    <Text style={{color:Colors.theme_background}}>
                      ( CBCE - 1068-51042 )
                    </Text>
                  </View>
                </View>
                <View>
                  <Spacing space={SH(15)} />
                  <View style={TicketScreenStyles.Flexviewnametitle}>
                    <View>
                      <Text style={TicketScreenStyles.nametextstyles}>
                        {t('name')}
                      </Text>
                      <Text style={TicketScreenStyles.nametextstylestwo}>
                        {t('Graham_Gooch')}
                      </Text>
                    </View>
                    <View>
                      <Text style={TicketScreenStyles.nametextstyles}>
                        {t('Ticket_No')}
                      </Text>
                      <Text style={TicketScreenStyles.nametextstylestwo}>
                        # 82403
                      </Text>
                    </View>
                  </View>
                  <Spacing space={SH(10)} />
                  <View style={TicketScreenStyles.Flexviewnametitle}>
                    <View>
                      <Text style={TicketScreenStyles.nametextstyles}>
                        {t('Date')}
                      </Text>
                      <Text style={TicketScreenStyles.nametextstylestwo}>
                        Jun 17, 2023
                      </Text>
                    </View>
                    <View>
                      <Text style={TicketScreenStyles.nametextstyles}>
                        {t('Destination')}
                      </Text>
                      <Text style={TicketScreenStyles.nametextstylestwo}>
                        {t('Delhi')}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Spacing space={SH(10)} />
                    <View style={TicketScreenStyles.Flexviewnametitle}>
                      <View>
                        <Text style={TicketScreenStyles.nametextstyles}>
                          {t('Departure')}
                        </Text>
                        <Text style={TicketScreenStyles.nametextstylestwo}>
                          08:00 PM
                        </Text>
                      </View>
                      <View>
                        <Text style={TicketScreenStyles.nametextstyles}>
                          {t('Class')}
                        </Text>
                        <Text style={TicketScreenStyles.nametextstylestwo}>
                          {t('Economy')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Spacing space={SH(10)} />
                  <View style={TicketScreenStyles.Flexviewnametitle}>
                    <View>
                      <Text style={TicketScreenStyles.nametextstyles}>
                        {t('Seat')}
                      </Text>
                      <Text style={TicketScreenStyles.nametextstylestwo}>
                        18
                      </Text>
                    </View>
                    <View>
                      <Text style={TicketScreenStyles.nametextstyles}>
                        {t('Ticket_Price')}
                      </Text>
                      <Text style={TicketScreenStyles.nametextstylestwo}>
                        ₹ 1770.00
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={ { marginBottom:SH(50),margin:SW(30)}}>
          <Button
            onPress={() => navigation.navigate(RouteName.HOME_TAB)}
            title={t('Download_Ticket')}
          />
        </View>
      </View>
    </View>
  );
};
export default TicketScreen;
