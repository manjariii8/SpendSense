import SmsAndroid from 'react-native-get-sms-android';

export const readSMS = () => {

  SmsAndroid.list(
    JSON.stringify({
      box: 'inbox',
      maxCount: 50
    }),

    fail => {
      console.log('Failed: ' + fail);
    },

    (count, smsList) => {

      const messages = JSON.parse(smsList);

      console.log(messages);
    }
  );
};