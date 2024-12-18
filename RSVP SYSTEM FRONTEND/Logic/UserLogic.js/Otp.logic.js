import { useEffect, useState } from "react";
import { PROJECT_ID, API_ENDPOINT } from "@env";
import { Client, Account, ID, Locale } from "appwrite";
import { useRouter, useSearchParams, useLocalSearchParams } from "expo-router";
import { useToast } from "../../context/ToastContext";
import client from "../../appwrite.config.js";

function otpLogic() {
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [timeString, setTimeString] = useState("");

  const router = useRouter();
  const { password, userId, secret, phone, expire } = useLocalSearchParams();

  const toast = useToast();
  const { setToast } = toast;

  const inputs = [
    {
      label: "OTP",
      placeholder: "Please enter OTP",
      value: otp,
      cb: setOtp,
    },
  ];

  useEffect(() => {
    setTimeLeft(prev => (new Date(expire.split(' ').join('+')).getTime() - new Date().getTime()));
    setTimeString((prev) => {
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      return `${minutes <=9 ? '0' : ''}${minutes}:${seconds <=9 ? '0' : ''}${seconds}`;
    });
  }, [expire]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1000);
        setTimeString((prev) => {
          const minutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          return `${minutes <=9 ? '0' : ''}${minutes}:${seconds <=9 ? '0' : ''}${seconds}`;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const updatePhoneVerificationStatus = async () => {
    setSigningin((prev) => true);
    setValidateMessage((prev) => null);
    console.log("Phone ", phone);

    const account = new Account(client);

    try {
      const sendOTPResponse = await account.updatePhoneVerification(
        userId,
        otp
      );
      console.log(sendOTPResponse);
      setToast((prev) => ({
        show: true,
        message: "Phone number verification successful.",
        type: "success",
      }));
      router.replace({ pathname: "/main/home" });
    } catch (error) {
      console.log(error, error.message);
      setValidateMessage((prev) => error.message);
    } finally {
      setSigningin((prev) => false);
    }
  };

  const resendCode = async () => {
    const account = new Account(client);
    try {
      const sendOTPResponse = await account.createPhoneVerification();
        console.log(sendOTPResponse);
        setToast(prev => ({
          show: true,
          message: "OTP resend successfully.",
          type: "success",
        }));
        setTimeLeft(new Date(sendOTPResponse?.expire).getTime() - new Date().getTime());
      }  
      catch(err) {
        console.log(err); 
        setToast(prev => ({
          show: true,
          message: "OTP resend failed. Internal server error.",
          type: "error",
        }));
    }
  }

  return {
    inputs,
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    updatePhoneVerificationStatus,
    timeLeft,
    timeString,
    phone,
    resendCode
  };
}

export default otpLogic;
