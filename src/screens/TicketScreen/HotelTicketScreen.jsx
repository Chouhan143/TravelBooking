// import { StyleSheet, Text, View, KeyboardAvoidingView,TouchableOpacity,Modal } from 'react-native';
// import React,{useState} from 'react';
// import { SF, SH, SW, Colors } from '../../utils';
// import { useTranslation } from 'react-i18next';
// import { useTheme } from '@react-navigation/native';
// import { Spacing } from '../../components'; 
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation } from '@react-navigation/native';
// const HotelTicketScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [cancelModalVisible, setCancelModalVisible] = useState(false);
//   const { t } = useTranslation();
//   const { Colors } = useTheme();
//   const navigation=useNavigation();
//   return (
//     <View style={styles.Maincontanier} >
//       <KeyboardAvoidingView enabled>
//         <View style={styles.container}>
//           <View style={styles.ticketInfo}>
//             <Text style={styles.routeText}>
//               Hotel Name 
//             </Text>
           
//             <Text style={styles.ticketIdText}>
//               ( CBCE - 1068-51042 )
//             </Text>
//           </View>

//           <Spacing space={SH(15)} />

//           <View style={styles.detailRow}>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 {t('name')}
//               </Text>
//               <Text style={styles.valueText}>
//                 {t('Graham_Gooch')}
//               </Text>
//             </View>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 {t('Ticket_No')}
//               </Text>
//               <Text style={styles.valueText}>
//                 # 82403
//               </Text>
//             </View>
//           </View>

//           <Spacing space={SH(10)} />

//           <View style={styles.detailRow}>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 Check In Date 
//               </Text>
//               <Text style={styles.valueText}>
//                 Jun 17, 2023
//               </Text>
//             </View>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//               Check Out Date 
//               </Text>
//               <Text style={styles.valueText}>
//               Jun 17, 2023
//               </Text>
//             </View>
//           </View>

//           <View style={styles.detailRow}>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 Check In Time
//               </Text>
//               <Text style={styles.valueText}>
//                 12:30 PM
//               </Text>
//             </View>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//               Check Out Time
//               </Text>
//               <Text style={styles.valueText}>
//               1:00 PM
//               </Text>
//             </View>
//           </View>

//           <Spacing space={SH(10)} />

//           <View style={styles.detailRow}>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 Number of Persons 
//               </Text>
//               <Text style={styles.valueText}>
//                 3
//               </Text>
//             </View>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 Room Number 
//               </Text>
//               <Text style={styles.valueText}>
//                 {t('Economy')}
//               </Text>
//             </View>
//           </View>

//           <Spacing space={SH(10)} />

//           <View style={styles.detailRow}>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 Room Number 
//               </Text>
//               <Text style={styles.valueText}>
//                 18
//               </Text>
//             </View>
//             <View style={styles.detailItem}>
//               <Text style={styles.labelText}>
//                 Room Price 
//               </Text>
//               <Text style={styles.valueText}>
//                 ₹ 1770.00
//               </Text>
//             </View>
//           </View>
//         </View>
        
//         <View style={{ margin: SW(10), marginTop: SH(20) }}>
//         <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
//           <Text style={styles.buttonText}>Download</Text>
//         </TouchableOpacity>

//         <Modal
//           visible={modalVisible}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalView}>
//           <AntDesign name={'checkcircle'} color='#28f77e'  size={45}
//           style={{position:'absolute',marginTop:-SH(20)}}/>
//             <Text style={styles.modalText}>
//               You successfully Downloaded Your Bus Booking Ticket
//             </Text>
//             <TouchableOpacity onPress={() => setModalVisible(false)}>
//               <Text style={styles.modalButton} onPress={()=>navigation.navigate("Root")}>Back To Home</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>

//         <TouchableOpacity style={styles.button} onPress={() => setCancelModalVisible(true)}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>

//         <Modal
//           visible={cancelModalVisible}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setCancelModalVisible(false)}
//         >
//           <View style={styles.modalView}>
//           <AntDesign name={'checkcircle'} color='#28f77e'  size={45}
//           style={{position:'absolute',marginTop:-SH(20)}}/>
//             <Text style={styles.modalText}>
//               You successfully Cancelled Your Bus Booking Ticket
//             </Text>
//             <TouchableOpacity onPress={() => setCancelModalVisible(false)}>
//               <Text style={styles.modalButton} onPress={()=>navigation.navigate("Root")}>Back To Home</Text>
//             </TouchableOpacity>
//           </View>
//         </Modal>
//       </View>
//         <Text style={styles.Text}>
//   Generate your Hotel ticket PDF by pressing the "Download" 
//   button or cancel your booking by pressing the "Cancel" button.
// </Text>
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default HotelTicketScreen;

// const styles = StyleSheet.create({
//     Maincontanier:{
//               flex:1,
//               padding:SH(15),
//               paddingTop:SH(80),
//               backgroundColor:'white'
//     },
//   container: {
//    backgroundColor:'#f5f6f7',
//     padding: SW(20),
//     borderRadius:7
   
//   },
//   ticketInfo: {
//     alignItems: 'center',
//     marginBottom: SH(20),
//   },
//   routeText: {
//     color: 'black',
//     fontFamily: 'Poppins-Bold',
//     fontSize: SF(20),
//   },
//   ticketIdText: {
//     color: Colors.theme_background,
//     fontFamily:'Poppins-Medium'
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: SH(10),
//   },
//   detailItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   labelText: {
//     fontSize: SF(14),
//     color: 'black',
//     fontFamily:'Poppins-Regular'
//   },
//   valueText: {
//     fontSize: SF(16),
//    color: 'black',
//    fontFamily:'Poppins-Medium'
//   },
//   imageStyle: {
//     width: SW(150),
//     height: SH(150),
//   },
//   button: {
//     backgroundColor: Colors.theme_background,
//     paddingVertical: SH(10),
//     paddingHorizontal: SW(14),
//     marginBottom: SH(10),
//     borderRadius: 10
//   },
//   buttonText: {
//     color: 'white',
//     fontFamily: 'Poppins-Medium',
//     textTransform: 'capitalize',
//     fontSize: SF(15),
//     textAlign: 'center'
//   },
//   Text:{
//     fontSize: SF(12),
//    color: 'gray',
//    fontFamily:'Poppins-Regular',
//    textAlign:'center',
//    margin:SW(10),
//    marginHorizontal:SW(25)

//   },
//   modalView: {
//     margin: SH(20),
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: SH(35),
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     marginTop:SH(300)
//   },
//   modalText: {
//     marginBottom: SH(15),
//     textAlign: 'center',
//     color: 'black',
//     fontFamily:'Poppins-Medium'
//   },
//   modalButton: {
//     color: '#28f77e',
//     marginTop: SH(10),
//     fontFamily:'Poppins-Bold'
//   },
// });

import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Alert,KeyboardAvoidingView,Modal } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { useTranslation } from 'react-i18next';
import { Spacing } from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { SF, SH, SW,Colors } from '../../utils';
const HotelTicketScreen = () => {
const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [pdfFilePath, setPdfFilePath] = useState('');
  const { t } = useTranslation();
 const navigation=useNavigation();
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

  const createPDF = async () => {
    await requestPermission();

    let options = {
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #000; width: 600px; margin: auto; margin-top: 20px;">
          <h1 style="text-align: center;">Hotel Ticket</h1>
          <p><strong>Passenger Name:</strong> John Doe</p>
          <p><strong>Hotel Id:</strong> ABC123</p>
         
          
          <h2 style="text-align: center;">Room Details</h2>
          <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr>
              <th style="padding: 8px;"> Room Number</th>
              <th style="padding: 8px;">Class</th>
            </tr>
            <tr>
              <td style="padding: 8px;">12A</td>
              <td style="padding: 8px;">Economy</td>
            </tr>
          </table>

           <h2 style="text-align: center;">Ticket Details</h2>
          <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr>
              <th style="padding: 8px;">Ticket Number</th>
            </tr>
            <tr>
               <td style="padding: 8px;">#123456</td>
            </tr>
          </table>

          <h2 style="text-align: center;">Flight Details</h2>
          <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr>
              <th style="padding: 8px;">Flight Number</th>
             
            </tr>
            <tr>
              <td style="padding: 8px;">ABC123</td>
            </tr>
          </table>
          

          <p style="text-align: center; margin-top: 20px;">Thank you for choosing our flight service. Have a safe journey!</p>
        </div>
      `,
      fileName: 'hotel_ticket',
      directory: 'Download',
    };
    
    try {
      let file = await RNHTMLtoPDF.convert(options);
      const newFilePath = `${RNFS.DownloadDirectoryPath}/hotel_ticket.pdf`;
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
                     Address
                     </Text>
                     <Text style={styles.valueText}>
                       shivampuri indore , bholram 
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
          
          <TouchableOpacity style={styles.button} onPress={() => setCancelModalVisible(true)}>
            <Text style={styles.buttonText}>Cancel</Text>
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
        <Text style={styles.Text}>
           Generate your Hotel ticket PDF by pressing the "Download" 
           button or cancel your booking by pressing the "Cancel" button.
         </Text>
      </KeyboardAvoidingView>
      </View>
     
    </View>
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
   fontFamily:'Poppins-Medium',
   flexWrap:'wrap',
   marginHorizontal:SW(15)
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
});