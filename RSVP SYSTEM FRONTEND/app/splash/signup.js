import {
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import SplashButton from "../../components/Buttons/SplashButton";
import signupLogic from "../../Logic/UserLogic.js/Signup.logic.js";
import OAuth from '../../components/OAuth/index.js'

const Signup = () => {

  const { inputs, validateMessage, signUpUser, signingin } = signupLogic();

  return (
    <KeyboardAvoidingView behavior="padding" className="bg-black">
      <Stack.Screen options={{
        headerTitle: 'Sign up',
      }} />
      <SafeAreaView>
        <OAuth text="Sign up with one of the following options." />
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
          <SplashButton text="Create Account" loading={signingin} cb={signUpUser}/>  
          <Text className="text-[#7b7b7b] text-center py-4">
            Already have an account? <Link className='text-neutral-100' href="splash/login">Login</Link>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
