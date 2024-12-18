import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PROJECT_ID, API_ENDPOINT } from '@env'
import { Client, Account, ID } from "appwrite";
import { useRouter } from "expo-router";
import { useToast } from "../../context/ToastContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../../appwrite.config.js";

function signupLogic() {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);

  const router = useRouter();

  const toast = useToast();

  console.log(toast);

  const { setToast } = toast;

  const inputs = [
    {
      label: "Name",
      placeholder: "John Doe",
      value: name,
      cb: setName,
      inputMode: "text",
      keyboard: "default",
    },
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
        <TouchableOpacity 
        onPress={() => setShowPass((prev) => !prev)}>
          <MaterialIcons
            name={showPass ? "eye-off" : "eye"}
            size={24}
            color="#D3D3D3"
          />
        </TouchableOpacity>
      ),
    },
    // {
    //   label: "Confirm Password",
    //   placeholder: "Please retype password",
    //   value: CPassword,
    //   cb: setCPassword,
    //   inputMode: "text",
    //   keyboard: "default",
    //   secureTextEntry: !showCPass,
    //   rightIcon: (
    //     <TouchableOpacity 
    //     onPress={() => setShowCPass((prev) => !prev)}>
    //       <MaterialIcons
    //         name={showCPass ? "eye-off" : "eye"}
    //         size={24}
    //         color="#D3D3D3"
    //       />
    //     </TouchableOpacity>
    //   ),
    // },
  ];

  const signUpUser = async () => {
    setSigningin(prev => true);
    setValidateMessage(prev => null);
    console.log("Signing you up", name, email, password);

    const account = new Account(client);

    try {
      const response = await account.create( ID.unique(), email, password, name)
      console.log(response);
      const loggedInResponse = await account.createEmailSession(email, password);
      console.log(loggedInResponse);
      AsyncStorage.setItem("token", JSON.stringify(loggedInResponse));
      setToast(prev => ({
        show: true,
        message: "Account created successfully",
        type: "success",
      }));
      router.replace({pathname: '/splash/phone', params: { ...loggedInResponse, email, password }} )
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
    showPass,
    setShowCPass,
    showCPass,
    setShowPass,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    CPassword,
    setCPassword,
    signUpUser
};
}

export default signupLogic;
