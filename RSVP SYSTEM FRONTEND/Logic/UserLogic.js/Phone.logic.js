import { useEffect, useState } from "react";
import { PROJECT_ID, API_ENDPOINT } from '@env'
import { Client, Account, ID, Locale } from "appwrite";
import { useRouter, useSearchParams, useLocalSearchParams } from "expo-router";
import { useToast } from "../../context/ToastContext";
import client from "../../appwrite.config.js";

function phoneLogic() {
  const [phone, setPhone] = useState("");
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);
  const [phoneCode, setPhoneCode] = useState(null);

  const router = useRouter();
  const {email, password, countryCode} = useLocalSearchParams ();
  console.log('Router >>>>>> ', router, email, password, countryCode);

  const toast = useToast();

  console.log(toast);

  const { setToast } = toast;

  useEffect(() => {
    const getPhoneCode = async () => {
      const locale = new Locale(client);
      try {
        const localesResponse = await locale.listCountriesPhones();
        setPhoneCode(prev => localesResponse?.phones?.filter((country) => country.countryCode.toLowerCase() === countryCode.toLowerCase())[0]?.code);
      }
      catch (error) {
        console.log(error);
      }
    }
    if(countryCode && countryCode.length > 0)
      getPhoneCode();
  },[countryCode])

  console.log('Phone Code >>>>> ', phoneCode);

  const inputs = [
    {
      label: "Phone Number",
      placeholder: "1234567890",
      value: phone,
      cb: setPhone,
      inputMode: "tel",
      keyboard: "numeric",
    },
  ];

  const updatePhoneNumber = async () => {
    setSigningin(prev => true);
    setValidateMessage(prev => null);
    console.log("Phone ", phone);
    
    const account = new Account(client);

    try {
      const phoneUpdateResponse = await account.updatePhone(`${phoneCode}${phone}`, password)
      console.log(phoneUpdateResponse);
      const sendOTPResponse = await account.createPhoneVerification();
      console.log(sendOTPResponse);
      setToast(prev => ({
        show: true,
        message: "Phone number updated successfully. Please Check for OTP.",
        type: "success",
      }));
      router.replace({pathname: '/splash/otp', params: {
        ...sendOTPResponse,
        email,
        password,
        phone: `${phoneCode}${phone}`
      }})
    }
    catch (error) {
      console.log(error,error.message);
      setValidateMessage(prev => error.message);
    }
    finally{
      setSigningin(prev => false);
    }
  }

  return {
    inputs,
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    updatePhoneNumber,
    phoneCode
};
}

export default phoneLogic;
