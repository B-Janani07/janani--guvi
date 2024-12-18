import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import SplashHeader from "../../components/Headers/SplashHeader";
import AppHeader from "../../components/Headers/AppHeader";

const _layout = () => {
  return (
    
    <Drawer
      screenOptions={{
        header: (props) => {
          return <AppHeader {...props} />;
        }
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
          drawerLabel: "Home",
        }}
      />
       <Drawer.Screen 
            name="createEvent"
            options={{
                headerShown: false,
                title: 'Create Event',
                drawerLabel: 'Create Event',
            }}
        />
    </Drawer>
  );
};

export default _layout;

function drawer(props) {
  console.log(props);
  return (
    <View>
      <Text>Drawer Content</Text>
      <Text>Drawer Content</Text>
      <Text>Drawer Content</Text>
      <Text>Drawer Content</Text>
    </View>
  );
}
