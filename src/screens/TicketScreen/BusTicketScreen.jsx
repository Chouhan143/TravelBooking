import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Alert,KeyboardAvoidingView,Modal } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { useTranslation } from 'react-i18next';
import { Spacing } from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RouteName } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SF, SH, SW,Colors } from '../../utils';
import moment from 'moment';
import { BUS_CANCEL } from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';
import axios from 'axios';
const BusTicketScreen = ({route}) => {
const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [pdfFilePath, setPdfFilePath] = useState('');
  const passengername=route.params;
  const { t } = useTranslation();
 const navigation=useNavigation();
 const Data=useSelector(state=>state.commomReducer.busPayload);
 const selectedBoardingPoint=useSelector(state=>state.commomReducer.selectedBoardingPoint);
 const selectedDroppingPoint=useSelector(state=>state.commomReducer.selectedDroppingPoint);
  const busBookingStatus=useSelector(state=>state.commomReducer.busBookingStatus);
  const totalFare = useSelector(state => state.commomReducer.totalPrice);
  const mainPassenger = useSelector(state =>state.commomReducer.mainPassenger);
  const busId=busBookingStatus.result.data.Result.BusId;
  const TicketNo=busBookingStatus.result.data.Result.TicketNo;
  console.log('mainPassenger',mainPassenger);
  const selectedSeatData = useSelector(
    state => state.commomReducer.selectedSeats,
  );
  const commaSepratedSeat = selectedSeatData.join(', ');
  console.log(selectedSeatData.join(', '));
  const formatDate = (dateString) => {
    return moment(dateString).format('MMMM Do YYYY, h:mm:ss a');
  };
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const rationale = await PermissionsAndroid.shouldShowRequestPermissionRationale(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (rationale) {
          Alert.alert(
            'Permission Required',
            'This app needs access to your storage to save files.',
            [
              { text: 'OK', onPress: async () => {
                  const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                      title: 'Storage Permission',
                      message: 'App needs access to your storage to save files',
                      buttonNeutral: 'Ask Me Later',
                      buttonNegative: 'Cancel',
                      buttonPositive: 'OK',
                    }
                  );
                  if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'You need to give storage permission to save the file.');
                  }
                }
              },
            ],
            { cancelable: false }
          );
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to save files',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission Denied', 'You need to give storage permission to save the file.');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // cancel api 
   const CancelApi=async()=>{
        try{
          const payload={
            "BusId" : "11836",
            "SeatId" : "25SYK4ET",
            "Remarks": "test"
          }
          const res=await axios.post(BUS_CANCEL,payload);
          console.log('cancel bus data',res.data);
          setCancelModalVisible(true)
        }
        catch(error){
          console.log('error',error);
        }
   }

  const createPDF = async () => {
    await requestPermission();

    let options = {
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #000; width: 600px; margin: auto; margin-top: 20px;">
          <h1 style="text-align: center;">Bus Ticket</h1>
          <p><strong>Passenger Name:</strong>${passengername}</p>
          <p><strong>Bus Number:</strong> ${busId}</p>
          <p><strong>Date & Time Of  Boarding Point :</strong> ${formatDate(selectedBoardingPoint.CityPointTime)}</p>
          <p><strong>Date & Time Of  Dropping Point:</strong>${formatDate(selectedDroppingPoint.CityPointTime)}</p>
          <p><strong>Departure Location:</strong> ${selectedDroppingPoint.CityPointLocation}</p>
          <p><strong>Destination:</strong>${Data.destination_city}</p>
          
          <h2 style="text-align: center;">Seat Details</h2>
          <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr>
              <th style="padding: 8px;">Seat Number</th>
              <th style="padding: 8px;">Class</th>
            </tr>
            <tr>
              <td style="padding: 8px;">${commaSepratedSeat}</td>
              <td style="padding: 8px;">Economy</td>
            </tr>
          </table>

           <h2 style="text-align: center;">Ticket Details</h2>
          <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
          <tr>
              <th style="padding: 8px;">Ticket Number</th>
              <th style="padding: 8px;">Ticket Price</th>
            </tr>
            <tr>
              <td style="padding: 8px;">${TicketNo}</td>
              <td style="padding: 8px;">${totalFare}</td>
            </tr>
          </table>

          <h2 style="text-align: center;">Bus Details</h2>
          <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr>
              <th style="padding: 8px;">Bus Id</th>
            </tr>
            <tr>
              <td style="padding: 8px;">${busId}</td>  
            </tr>
          </table>
          <p style="text-align: center; margin-top: 20px;">Thank you for choosing our bus service. Have a safe journey!</p>
        </div>
      `,
      fileName: 'bus_ticket',
      directory: 'Documents',
    };
    
    try {
      let file = await RNHTMLtoPDF.convert(options);
      const newFilePath = `${RNFS.DownloadDirectoryPath}/bus_ticket.pdf`;
      await RNFS.moveFile(file.filePath, newFilePath);
      setModalVisible(true); // Show the success modal
      setPdfFilePath(newFilePath); // Set the PDF file path for the modal text
      // Alert.alert('PDF Created', `File saved to ${newFilePath}`);
      console.log(newFilePath);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
    <View  style={styles.Maincontainer}>
      <KeyboardAvoidingView enabled>
       
          <View style={styles.container}>
            <View style={styles.ticketInfo}>
              <Text style={styles.routeText}>
              <Text style={styles.contentText}>{Data.source_city} - {Data.destination_city}</Text>
              </Text>
              <Text style={styles.ticketIdText}>
             {busId}
              </Text>
            </View>

            <Spacing space={SH(10)} />

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.labelText}>
                  {t('name')}
                </Text>
                <Text style={styles.valueText}>
                {passengername}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.labelText}>
                  {t('Ticket_No')}
                </Text>
                <Text style={styles.valueText}>
                {TicketNo}
                </Text>
              </View>
            </View>

            <Spacing space={SH(10)} />

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.labelText}>
                  Boarding Point
                </Text>
                <Text style={styles.valueText}>
                  {selectedBoardingPoint.CityPointLocation}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.labelText}>
                  Dropping Point
                </Text>
                <Text style={styles.valueText}>
                 {selectedDroppingPoint.CityPointLocation}
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
                Time & Date
              </Text>
              <Text style={styles.valueText}>
            {  formatDate(selectedBoardingPoint.CityPointTime)}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.labelText}>
               Time & Date
              </Text>
              <Text style={styles.valueText}>
              {formatDate(selectedDroppingPoint.CityPointTime)}
              </Text>
            </View>
          </View>

            <Spacing space={SH(10)} />

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.labelText}>
                  {t('Seats Number')}
                </Text>
                <Text style={styles.valueText}>
                  {commaSepratedSeat}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.labelText}>
                  {t('Ticket_Price')}
                </Text>
                <Text style={styles.valueText}>
                  ₹ {totalFare}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ margin: SW(10), marginTop: SH(20) }}>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText} onPress={createPDF}>Download</Text>
          </TouchableOpacity>
        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
            <AntDesign name={'checkcircle'} color='#28f77e'  size={45}
            style={{position:'absolute',marginTop:-SH(20)}}/>
              <Text style={styles.modalText}>
                You successfully Downloaded Your Bus Booking Ticket In This Location ${pdfFilePath} 
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButton} onPress={()=>navigation.navigate("Root")}>Back To Home</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          
          <TouchableOpacity style={styles.button} onPress={CancelApi}>
            <Text style={styles.buttonText} >Cancel</Text>
          </TouchableOpacity>

          <Modal
            visible={cancelModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setCancelModalVisible(false)}
          >
            <View style={styles.modalView}>
            <AntDesign name={'checkcircle'} color='#28f77e'  size={45}
          style={{position:'absolute',marginTop:-SH(20)}}/>
              <Text style={styles.modalText}>
                You successfully Cancelled Your Bus Booking Ticket
              </Text>
              <TouchableOpacity onPress={() => setCancelModalVisible(false)}>
                <Text style={styles.modalButton} onPress={()=>navigation.navigate("Root")}>Back To Home</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
          <Text style={styles.infoText}>
            Generate your bus ticket PDF by pressing the "Download" button or cancel your booking by pressing the "Cancel" button.
          </Text>
        
      </KeyboardAvoidingView>
      </View>
      
    </View>
  );
};

export default BusTicketScreen;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    padding: SH(15),
    paddingTop: SH(80),
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: '#f5f6f7',
    padding: SW(20),
    borderRadius: 7,
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
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Bold',
  },
  valueText: {
    fontSize: SF(16),
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    margin: SW(10),
    marginTop: SH(20),
   
  },
  button: {
    backgroundColor: Colors.theme_background,
    paddingVertical: SH(10),
    paddingHorizontal: SW(20),
    borderRadius: 10,
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
    fontSize: SF(15),
    textAlign: 'center',
  },
  infoText: {
    fontSize: SF(12),
    color: 'gray',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    margin: SW(10),
    marginHorizontal: SW(25),
  },
  modalView: {
    margin: SH(20),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: SH(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop:SH(300)
  },
  modalText: {
    marginBottom: SH(15),
    textAlign: 'center',
    color: 'black',
    fontFamily:'Poppins-Medium'
  },
  modalButton: {
    color: '#28f77e',
    marginTop: SH(10),
    fontFamily:'Poppins-Bold'
  },
  contentText:{
    fontSize:SF(15),
    margin:SW(10),
    textTransform:'capitalize'
  }
});
