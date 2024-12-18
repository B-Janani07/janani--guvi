import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import client from "../../appwrite.config";
import { Account } from "appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useToast } from "../../context/ToastContext";

function loginLogic() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);

  const router = useRouter();

  const { toast, setToast } = useToast();

  const inputs = [
    {
      label: "Email",
      placeholder: "example@email.com",
      value: email,
      cb: setEmail,
      inputMode: "email",
      keyboard: "email-address",
    },
    {
      label: "Password",
      placeholder: "Please pick a strong password",
      value: password,
      cb: setPassword,
      inputMode: "text",
      keyboard: "default",
      secureTextEntry: !showPass,
      rightIcon: (
        <TouchableOpacity onPress={() => setShowPass((prev) => !prev)}>
          <MaterialIcons
            name={showPass ? "eye-off" : "eye"}
            size={24}
            color="#D3D3D3"
          />
        </TouchableOpacity>
      ),
    },
  ];

  const loginUser = async () => {
    setSigningin((prev) => true);
    setValidateMessage((prev) => null);
    console.log("Signing you up", email, password);

    const account = new Account(client);

    try {
      const loggedInResponse = await account.createEmailSession(
        email,
        password
      );
      console.log(loggedInResponse);
      AsyncStorage.setItem("token", JSON.stringify(loggedInResponse));
      setToast((prev) => ({
        show: true,
        message: "Logged in successfully",
        type: "success",
      }));
      const accountDetails = await account.get();
      console.log(accountDetails);
      if (accountDetails.phoneVerification)
        router.replace({ pathname: "/main/home" });
      else if (
        accountDetails.phone.length === 0 ||
        accountDetails.phone === null ||
        accountDetails.phone === undefined
      )
        router.replace({
          pathname: "/splash/phone",
          params: { ...loggedInResponse, email, password },
        });
      else {
        const sendOTPResponse = await account.createPhoneVerification();
        console.log(sendOTPResponse);
        setToast((prev) => ({
          show: true,
          message: "Please Verify your phone number. OTP sent successfully.",
          type: "success",
        }));
        router.replace({
          pathname: "/splash/otp",
          params: {
            ...sendOTPResponse,
            email,
            password,
            phone: accountDetails.phone,
          },
        });
      }
    } catch (error) {
      console.log(error, error.message);
      setValidateMessage((prev) => error.message);
    } finally {
      setSigningin((prev) => false);
    }
  };

  return {
    inputs,
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    showPass,
    setShowPass,
    email,
    setEmail,
    password,
    setPassword,
    loginUser,
  };
}

export default loginLogic;
