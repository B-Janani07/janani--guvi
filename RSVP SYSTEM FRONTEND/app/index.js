import { View, Text, Button, Image } from "react-native";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Splash1 from "../assets/images/splash1.jpg";
import Splash2 from "../assets/images/splash2.jpg";
import Splash3 from "../assets/images/splash3.jpg";
import Splash4 from "../assets/images/splash4.jpg";
import Splash5 from "../assets/images/splash5.jpg";
import Splash6 from "../assets/images/splash6.jpg";

import Ant from "react-native-vector-icons/AntDesign";
import Octicons from "react-native-vector-icons/Octicons";

const index = () => {
  const router = useRouter();

  const [img, setImg] = useState(0);

  useEffect(() => {
    (() => {
      AsyncStorage.getItem("token")
        .then((value) => {
          console.log(value);
          if ( value === null || value === undefined ) {
            console.log("no token");
          } else {
            router.replace("main");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  },[]);

  const images = [Splash1, Splash2, Splash3, Splash4, Splash5, Splash6];

  useEffect(() => {
    (() => {
      const interval = setInterval(() => {
        setImg((prev) => (prev + 1) % images.length);
      }, 15000);

      return () => clearInterval(interval);
    })();
  }, []);

  return (
    <View className="relative bg-black">
      <Image
        source={images[img]}
        resizeMode="cover"
        className="w-full h-full"
      ></Image>
      <SafeAreaView className="flex flex-col justify-between h-full p-8 px-4 w-full absolute bg-black/50">
        <View className="space-y-2">
          <Text className="text-white text-4xl capitalize">
            Discover the best events in your city
          </Text>
          <Text className="text-white">
            The best events we have prepared for you today
          </Text>
        </View>
        <View className="w-full space-y-4">
          <View className="flex flex-row gap-2 w-full justify-between">
            <Link
              href="splash/signup"
              className="bg-white/40 backdrop-blur text-white rounded-[100px] text-center p-[18px]"
            >
              <Ant
                className="m-0 p-0 self-center bg-red-400"
                name="google"
                size={20}
              />
            </Link>
            <Link
              replace={true}
              href="splash/signup"
              className="bg-white flex-1 text-black rounded-full p-4 text-center">
              <Text>Get Started</Text>
                <Octicons name="arrow-right" size={20}/>
            </Link>
          </View>
          <Text className="text-white text-center">
            Already have an account? <Link href={{pathname: "splash/login", replace: true}}>Sign in</Link>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default index;
