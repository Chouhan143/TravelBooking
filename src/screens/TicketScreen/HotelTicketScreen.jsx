import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import React from 'react';
import { SF, SH, SW, Colors } from '../../utils';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { Spacing } from '../../components'; 
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
const HotelTicketScreen = () => {
  const { t } = useTranslation();
  const { Colors } = useTheme();

  return (
    <AlertNotificationRoot>
    <View style={styles.Maincontanier} >
      <KeyboardAvoidingView enabled>
        <View style={styles.container}>
          <View style={styles.ticketInfo}>
            <Text style={styles.routeText}>
              Hotel Name 
            </Text>
           
            <Text style={styles.ticketIdText}>
              ( CBCE - 1068-51042 )
            </Text>
          </View>

          <Spacing space={SH(15)} />

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                {t('name')}
              </Text>
              <Text style={styles.valueText}>
                {t('Graham_Gooch')}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                {t('Ticket_No')}
              </Text>
              <Text style={styles.valueText}>
                # 82403
              </Text>
            </View>
          </View>

          <Spacing space={SH(10)} />

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                Check In Date 
              </Text>
              <Text style={styles.valueText}>
                Jun 17, 2023
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
              Check Out Date 
              </Text>
              <Text style={styles.valueText}>
              Jun 17, 2023
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                Check In Time
              </Text>
              <Text style={styles.valueText}>
                12:30 PM
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
              Check Out Time
              </Text>
              <Text style={styles.valueText}>
              1:00 PM
              </Text>
            </View>
          </View>

          <Spacing space={SH(10)} />

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                Number of Persons 
              </Text>
              <Text style={styles.valueText}>
                3
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                Room Number 
              </Text>
              <Text style={styles.valueText}>
                {t('Economy')}
              </Text>
            </View>
          </View>

          <Spacing space={SH(10)} />

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                Room Number 
              </Text>
              <Text style={styles.valueText}>
                18
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                Room Price 
              </Text>
              <Text style={styles.valueText}>
                ₹ 1770.00
              </Text>
            </View>
          </View>
        </View>
        <View style={{margin:SW(10),marginTop:SH(20)}}>
        <TouchableOpacity style={styles.button} onPress={() =>
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Congrats! You Successfully Downloaded Your Hotel Booking Ticket',
              button: 'Close',
              
            })
          }>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() =>
            Dialog.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Congrats! You Successfully Cancelled Your Hotel Booking Ticket',
              button: 'Close',
            })
          }>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.Text}>
  Generate your Hotel ticket PDF by pressing the "Download" 
  button or cancel your booking by pressing the "Cancel" button.
</Text>
      </KeyboardAvoidingView>
    </View>
    </AlertNotificationRoot>
  );
};

export default HotelTicketScreen;

const styles = StyleSheet.create({
    Maincontanier:{
              flex:1,
              padding:SH(15),
              paddingTop:SH(80),
              backgroundColor:'white'
    },
  container: {
   backgroundColor:'#f5f6f7',
    padding: SW(20),
    borderRadius:7
   
  },
  ticketInfo: {
    alignItems: 'center',
    marginBottom: SH(20),
  },
  routeText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: SF(20),
  },
  ticketIdText: {
    color: Colors.theme_background,
    fontFamily:'Poppins-Medium'
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SH(10),
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  labelText: {
    fontSize: SF(14),
    color: 'black',
    fontFamily:'Poppins-Regular'
  },
  valueText: {
    fontSize: SF(16),
   color: 'black',
   fontFamily:'Poppins-Medium'
  },
  imageStyle: {
    width: SW(150),
    height: SH(150),
  },
  button: {
    backgroundColor: Colors.theme_background,
    paddingVertical: SH(10),
    paddingHorizontal: SW(14),
    marginBottom: SH(10),
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
    fontSize: SF(15),
    textAlign: 'center'
  },
  Text:{
    fontSize: SF(12),
   color: 'gray',
   fontFamily:'Poppins-Regular',
   textAlign:'center',
   margin:SW(10),
   marginHorizontal:SW(25)

  }
});