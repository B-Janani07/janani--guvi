import React from "react";
import { Stack } from "expo-router";
import SplashHeader from "../../components/Headers/SplashHeader";

const _layout = () => {
  
  return (
    <Stack
      screenOptions={{
        header: (props) => {
          return  <SplashHeader paddingTop={true} {...props.options} />
        },
      }}
    ></Stack>
  );
};

export default _layout;
