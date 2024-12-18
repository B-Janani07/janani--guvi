import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Input from "../../components/Input";
import otpLogic from "../../Logic/UserLogic.js/Otp.logic.js";
import SplashButton from "../../components/Buttons/SplashButton";
import { SafeAreaView } from "react-native-safe-area-context";

const OTP = () => {
  const { inputs, validateMessage, updatePhoneVerificationStatus, signingin, timeString, phone, timeLeft, resendCode } =
    otpLogic();

  return (
    <KeyboardAvoidingView behavior="padding" className="bg-black">
      <Stack.Screen
        options={{
          headerTitle: "Provide the OTP",
          headerLeft: null,
        }}
      />
      <SafeAreaView>
        <View className="p-4 h-full flex flex-col w-full">
          <Text className="text-neutral-100 pb-10">
            A verification code has been sent to +{phone.slice(0, 6)}*****{phone.slice(10)}. Please enter the code below.
          </Text>
          {inputs.map((input, index) => (
            <Input
              key={index}
              {...input}
            />
          ))}
          {validateMessage && (
            <Text className="text-red-600 px-4">{validateMessage}</Text>
          )}
          <SplashButton
            text="Verify OTP"
            loading={signingin}
            cb={updatePhoneVerificationStatus}
          />
          <Text className='text-white text-center font-bold text-base'>Time Left: {timeString}</Text>
          {timeLeft <= 0 && <Text className='text-neutral-100 py-4'>Didn't receive the code? <Text onPress={resendCode} className='text-blue-500'>Resend</Text></Text>}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OTP;