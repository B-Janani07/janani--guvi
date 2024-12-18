import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { TailwindProvider } from "tailwindcss-react-native";
import { ToastProvider } from "../context/ToastContext";
import ToastHeader from "../components/Headers/ToastHeader";


const _layout = () => {

  return (
    <TailwindProvider>
      <ToastProvider>
      <ToastHeader />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ToastProvider>
    </TailwindProvider>
  );
};

export default _layout;
