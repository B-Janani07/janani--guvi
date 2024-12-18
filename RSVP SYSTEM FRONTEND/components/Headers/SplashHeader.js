import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SplashHeader = ({headerTitle, headerLeft, paddingTop}) => {

    const router = useRouter()

  return (
    <SafeAreaView className={`flex flex-row w-full bg-black p-4 ${paddingTop && 'pt-12'} items-center`}>
      {headerLeft !== null && <TouchableOpacity
        title="Back"
        className="mr-4 p-2 aspect-square flex items-center justify-center rounded-[14px] border-2 border-neutral-600 shadow-lg"
        style={{
            elevation: 5,
        }}    
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons style={{
          transform: [{ translateX: 4 }],
          color: "#dddddd"
        }} name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>}
      <Text className="font-bold text-white text-4xl">{headerTitle}</Text>
    </SafeAreaView>
  );
};

export default SplashHeader;
