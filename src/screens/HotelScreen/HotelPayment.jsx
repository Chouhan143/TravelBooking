import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
const HotelPayment = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const createPaymentIntent = async () => {
    try {
      setLoading(true);

      const payload = {
        user_id: userId,
        amount: amount,
      };

      const response = await axios.post('https://srninfotech.com/projects/travel-app/api/phonepe', payload);
      const paymentdata = response.data;

      if (response.status === 200 && response.data.status === 'success') {
        console.log('payment data', JSON.stringify(paymentdata));
        const redirectUrl = paymentdata.data.data.instrumentResponse.redirectInfo.url;
        setPaymentUrl(redirectUrl);

        Toast.show({
          type: 'success',
          text1: 'Payment Intent Created',
          text2: response.data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error Creating Payment Intent',
          text2: response.data.message || 'Something went wrong.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error Creating Payment Intent',
        text2: error.toString(),
      });
      console.error('Error creating payment intent:', error);
    } finally {
      setLoading(false);
    }
  };

  if (paymentUrl) {
    return <WebView source={{ uri: paymentUrl }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User ID:</Text>
      <TextInput
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
        placeholder="Enter User ID"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter Amount"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={createPaymentIntent}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating Payment Intent...' : 'Create Payment Intent'}
        </Text>
      </TouchableOpacity>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HotelPayment;