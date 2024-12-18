import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const SplashButton = ({text, cb, loading}) => {
  return (
    <LinearGradient
      className="p-4 rounded-[18px] my-4"
      colors={["#B615DD", "#D127A4"]}
      end={{ x: 0.9, y: 0.2 }}
    >
      <TouchableOpacity onPress={cb}>
        <Text className="text-white text-center  text-lg">{loading ? 'Processing...'  : text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SplashButton;
