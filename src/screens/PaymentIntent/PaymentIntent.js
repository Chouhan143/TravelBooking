import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ToastAndroid,
  Platform,
  Linking,
} from 'react-native';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import axios from 'axios';
import {sha256} from 'react-native-sha256';
import base64 from 'react-native-base64';
import uuid from 'react-native-uuid';
import HotelPayment from '../HotelScreen/HotelPayment';

const PaymentScreen = () => {
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [phonePeInstalled, setPhonePeInstalled] = useState(false);
  const [gPayInstalled, setGPayInstalled] = useState(false);
  const [paytmInstalled, setPaytmInstalled] = useState(false);
  const [merchantId, setMerchantId] = useState(null);HotelPayment
  const [merchantTransactionId, setMerchantTransactionId] = useState(null);

  useEffect(() => {
    initializePhonePeSDK();
  }, []);

  useEffect(() => {
    if (sdkInitialized) {
      checkAppInstallations();
      if (Platform.OS === 'android') {
        getPackageSignature();
      }
    }
  }, [sdkInitialized]);

  const initializePhonePeSDK = async () => {
    try {
      const environment = 'SANDBOX'; // or 'PRODUCTION'
      const merchantId = 'your-merchant-id';
      const appId = 'dummy-app-id'; // Use a dummy app ID initially
      const enableLogging = true; // Set to true for enabling logs

      const result = await PhonePePaymentSDK.init(
        environment,
        merchantId,
        appId,
        enableLogging,
      );

      if (result) {
        console.log('PhonePe SDK initialized successfully');
        setSdkInitialized(true);
      } else {
        console.log('Failed to initialize PhonePe SDK');
        setSdkInitialized(false);
      }
    } catch (error) {
      console.error('Initialization error:', error);
      setSdkInitialized(false);
    }
  };

  const getPackageSignature = async () => {
    try {
      const signature = await PhonePePaymentSDK.getPackageSignatureForAndroid();
      console.log('Package Signature:', signature);
      ToastAndroid.show(signature, ToastAndroid.LONG);
      // You can now share this signature with the PhonePe team to get the actual App ID
    } catch (error) {
      console.error('Error fetching package signature:', error);
    }
  };

  const checkAppInstallations = async () => {
    try {
      const isPhonePeInstalled = await PhonePePaymentSDK.isPhonePeInstalled();
      setPhonePeInstalled(isPhonePeInstalled);

      const isGPayInstalled = await PhonePePaymentSDK.isGPayAppInstalled();
      setGPayInstalled(isGPayInstalled);

      const isPaytmInstalled = await PhonePePaymentSDK.isPaytmAppInstalled();
      setPaytmInstalled(isPaytmInstalled);
    } catch (error) {
      console.error('Error checking app installations:', error);
    }
  };

  const handlePayment = async () => {
    if (!sdkInitialized) {
      Alert.alert('Error', 'SDK not initialized');
      return;
    }

    try {
      // Example transaction parameters (customize as needed)
      const transactionId = 'Tr-' + uuid.v4().toString(36).slice(-6);

      const payload = {
        merchantId: 'PGTESTPAYUAT86',
        merchantTransactionId: transactionId,
        merchantUserId: 'MUID-' + uuid.v4().toString(36).slice(-6),
        amount: 1000,
        mobileNumber: '9999999999',
        callbackUrl: 'https://webhook.site/callback-url',
        paymentInstrument: {
          type: 'UPI_INTENT',
          targetApp: 'com.phonepe.app',
        },
        deviceContext: {
          deviceOS: 'ANDROID',
        },
      };

      const dataPayload = JSON.stringify(payload);
      const dataBase64 = base64.encode(dataPayload);

      const apiEndPoint = '/pg/v1/pay'; // API endpoint
      const salt = '96434309-7796-489d-8924-ab56988a6076'; // Replace with your actual salt key
      const saltIndex = 1; // This might be different based on your configuration

      // Concatenate the base64 payload, API endpoint, and salt for checksum calculation
      const fullURL = `${dataBase64}${apiEndPoint}${salt}`;
      const dataSha256 = await sha256(fullURL);

      const checksum = `${dataSha256}###${saltIndex}`;

      const UAT_PAY_API_URL =
        'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
      const response = await axios.post(
        UAT_PAY_API_URL,
        {
          request: dataBase64,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
          },
        },
      );

      const redirectUrl = response.data.data.instrumentResponse.intentUrl;
      Linking.openURL(redirectUrl);

      setMerchantTransactionId(response.data.data.merchantTransactionId);
      console.log(response.data.data.merchantTransactionId);
      setMerchantId(response.data.data.merchantId);
      console.log('redirectUrl', redirectUrl);

      console.log('response', response.data.data);
    } catch (error) {
      console.error(
        'Transaction error:',
        error.response?.data || error.message,
      );
      Alert.alert(
        'Error',
        'An error occurred while processing the transaction.',
      );
    }
  };

  const checkTransactionStatus = async () => {
    if (!merchantTransactionId) {
      Alert.alert('Error', 'No transaction ID available');
      return;
    }

    try {
      const apiHostUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox'; // or 'https://api.phonepe.com/apis/pg' for production
      // const endpoint = `/payments/v2/transaction/${transactionId}/status`;

      const endpoint = `pg/v1/status/${merchantId}/${merchantTransactionId}`;

      const salt = '96434309-7796-489d-8924-ab56988a6076'; // Replace with your actual salt key
      const fullURL = `${endpoint}${salt}`;
      const dataSha256 = await sha256(fullURL);
      const saltIndex = 1; // This might be different based on your configuration

      const checksum = `${dataSha256}###${saltIndex}`;
      const merchantAuthToken = 'your-merchant-auth-token'; // Replace with your actual merchant auth token

      const response = await axios.get(`${apiHostUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `O-Bearer ${merchantAuthToken}`,
          'X-VERIFY': checksum,
        },
      });

      console.log('Transaction Status:', response.data);
      Alert.alert('Transaction Status', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching transaction status:', error.response.data);
      Alert.alert(
        'Error',
        'An error occurred while fetching the transaction status.',
      );
    }
  };

  const getUpiApps = async () => {
    if (Platform.OS === 'android') {
      try {
        const upiApps = await PhonePePaymentSDK.getUpiAppsForAndroid();
        if (upiApps != null) {
          ToastAndroid.show(upiApps, ToastAndroid.LONG);

          console.log('upiApps', upiApps);
        }
      } catch (error) {
        console.log('Error fetching UPI apps:', error);
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>PhonePe Payment Integration</Text>
      <Button title="Start Payment" onPress={handlePayment} />
      <Text>PhonePe Installed: {phonePeInstalled ? 'Yes' : 'No'}</Text>
      <Text>GPay Installed: {gPayInstalled ? 'Yes' : 'No'}</Text>
      <Text>Paytm Installed: {paytmInstalled ? 'Yes' : 'No'}</Text>
      {merchantId && (
        <Button
          title="Check Transaction Status"
          onPress={checkTransactionStatus}
        />
      )}
      {Platform.OS === 'android' && (
        <Button title="Get UPI Apps" onPress={getUpiApps} />
      )}
    </View>
  );
};

export default PaymentScreen;
