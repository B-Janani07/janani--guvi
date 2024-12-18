import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SplashHeader from "../../components/Headers/SplashHeader";
import Input from "../../components/Input";
import SplashButton from "../../components/Buttons/SplashButton";
import createEventLogic from "../../Logic/EventsLogic/createEvent.logic";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const createEvent = () => {
  const router = useRouter();

  console.log(router);

  const {
    inputs,
    validateMessage,
    signingin,
    imageError,
    images,
    handleImage,
    setImages,
    handleCreateEvent
  } = createEventLogic();

  return (
    <>
      <SafeAreaView className="h-full bg-black">
        <SplashHeader headerTitle="Create Event" headerLeft={true} />
        <ScrollView
          style={{ paddingVertical: 20 }}
          alwaysBounceVertical={true}
          className="p-4 h-full flex flex-col w-full"
        >
          {inputs.map((input, index) => (
            <Input key={index} {...input} />
          ))}
          {validateMessage && (
            <Text className="text-red-600 px-4">{validateMessage}</Text>
          )}
          {images?.length < 3 && (
            <TouchableOpacity
              onPress={handleImage}
              className=" border-[1.5px] bg-neutral-900 border-neutral-800 border-dashed"
              style={[
                {
                  marginVertical: 16,
                  border: "1px solid #fff",
                  padding: 8,
                  borderRadius: 18,
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={32}
                color={"rgb(229 229 229)"}
              />
            </TouchableOpacity>
          )}
          <ScrollView
            horizontal={true}
            style={{ marginVertical: 16 }}
            className="flex flex-row gap-2"
            showsHorizontalScrollIndicator={true}
          >
            {images?.map((item, index) => (
              <View key={index} className="relative">
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 18
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setImages((prev) =>
                      prev?.filter((img, index) => img.uri !== item.uri)
                    );
                  }}
                >
                  <Text className='text-neutral-400 text-center py-2'>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {imageError !== "" && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {imageError}
            </Text>
          )}
          <SplashButton text="Create" loading={signingin}  cb={handleCreateEvent}/>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default createEvent;

// onPress={() =>
//     setImages((prev) =>
//       prev?.filter((img, index) => img !== item)
//     )
//   }
