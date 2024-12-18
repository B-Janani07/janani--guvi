import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Ant from "react-native-vector-icons/AntDesign";

const Button = ({ title, icon }) => {
  return (
    <TouchableOpacity className="bg-neutral-900 backdrop-blur border-2 border-neutral-800 rounded-[18px] flex items-center justify-center text-center p-6 w-[48%]">
      <Text className="text-neutral-100">{icon}</Text>
    </TouchableOpacity>
  );
};

export default Button;
