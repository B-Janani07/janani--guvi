import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons";

const AppHeader = ({headerTitle, headerLeft, paddingTop, ...rest}) => {
    console.log(rest);  
    const navigation = rest.navigation;
    console.log(navigation);  
  return (
    <SafeAreaView
      className={`flex flex-row w-full justify-between bg-black p-4 ${
        paddingTop && "pt-12"
      } items-center`}
    >
      {headerLeft !== null && (
        <TouchableOpacity
          title="Back"
        
          style={{
            elevation: 5,
          }}
          onPress={() => {
            navigation.openDrawer()
          }}
        >
          <MaterialIcons
            style={{
              color: "#dddddd",
            }}
            name="menu"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      )}
      {/* <Text className="font-semibold text-white">{rest.options.title}</Text> */}
      <TouchableOpacity
          title="Back"
            className='flex flex-row items-center gap-1 bg-[#B615DD] px-2 py-1 rounded-[18px]'
          style={{
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate('createEvent')
          }}
        >
            <Text className='text-white'>Create</Text>
          <IonIcons
            style={{
              color: "#dddddd",
            }}
            name="ios-add-circle-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AppHeader;
