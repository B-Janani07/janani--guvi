import {
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import SplashButton from "../../components/Buttons/SplashButton";
import LoginLogic from "../../Logic/UserLogic.js/Login.logic.js";
import OAuth from '../../components/OAuth/index.js'

const Login = () => {

  const { inputs, validateMessage, loginUser, signingin } = LoginLogic();

  return (
    <KeyboardAvoidingView behavior="padding" className="bg-black">
      <Stack.Screen options={{
        headerTitle: 'Log in',
      }} />
      <SafeAreaView>
        <OAuth text="Log in with one of the following options." />
        <View className="p-4 pt-10 h-full flex flex-col w-full">
          {
            inputs.map((input, index) => (
              <Input
                key={index}
                {...input}
              />
            ))
          }
          {validateMessage && <Text className='text-red-600 px-4'>{validateMessage}</Text>}
          <SplashButton text="Sign in" cb={loginUser} loading={signingin}/>  
          <Text className="text-[#7b7b7b] text-center py-4">
            Don't have an account? <Link className='text-neutral-100' href="splash/signup">Sign up</Link>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;