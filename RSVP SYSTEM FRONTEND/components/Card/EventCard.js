import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Border from "../../assets/images/eventCard.png";

const EventCard = () => {
  return (
    <View className="bg-white p-1 rounded-[18px] mr-2">
      <View className="relative">
        <Image
          className="w-full h-[200px] rounded-[18px] object-cover"
          source={{
            uri: "https://images.wsj.net/im-689715?width=1280&size=1",
          }}
        />

        <View className=" w-min absolute inset-0 left-0 top-0 flex flex-row justify-between">
          <View>
            <Text className="bg-white p-2 px-4 rounded-tl-[8px] rounded-br-[18px]">
              Music
            </Text>
            <Image className="w-4 h-4 object-cover" source={Border} />
          </View>
            <Image className="w-4 h-4 object-cover" source={Border} />
        </View>
        <View className=" w-min absolute inset-0 right-0 bottom-0 flex flex-row items-end justify-between">
            <Image className="w-4 h-4 object-cover rotate-180" source={Border} />
          <View className='flex flex-col items-end'>
            <Image className="w-4 h-4 object-cover rotate-180" source={Border} />
            <Text className="bg-white p-2 px-4 rounded-tl-[18px] rounded-br-[12px]">
            <Ionicons name="ios-heart-outline" size={24} color="black" />
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-between items-start gap-4 p-2">
        <View className="flex flex-col items-start">
          <Text>Justin Bieber Tour</Text>
          <Text className="text-xs text-neutral-400">World Tour Events</Text>
        </View>
        <View className="flex flex-col items-end justify-end">
          <Text>19:00</Text>
          <Text className="text-xs text-neutral-400">Wed, Jul 12</Text>
        </View>
      </View>
    </View>
  );
};

export default EventCard;
