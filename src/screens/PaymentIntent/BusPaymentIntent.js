import {sha256, sha256Bytes} from 'react-native-sha256';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

export const makePayment = async () => {
  const transactionid = 'Tr-' + uuidv4().toString(36).slice(-6);

  const payload = {
    merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
    merchantTransactionId: transactionid,
    merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
    amount: 10000,
    redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
    redirectMode: 'POST',
    callbackUrl: `http://localhost:3000/api/status/${transactionid}`,
    mobileNumber: '9999999999',
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  const dataPayload = JSON.stringify(payload);
  console.log(dataPayload);

  const dataBase64 = Buffer.from(dataPayload).toString('base64');
  console.log(dataBase64);

  const fullURL = dataBase64 + '/pg/v1/pay' + process.env.NEXT_PUBLIC_SALT_KEY;
  const dataSha256 = sha256(fullURL);

  const checksum = dataSha256 + '###' + process.env.NEXT_PUBLIC_SALT_INDEX;
  console.log('c====', checksum);

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

  const redirect = response.data.data.instrumentResponse.redirectInfo.url;
  router.push(redirect);
};
