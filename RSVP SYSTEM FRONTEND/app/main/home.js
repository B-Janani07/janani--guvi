import { Link } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import logoutLogic from "../../Logic/UserLogic.js/Logout.logic";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/Headers/AppHeader";
import { ScrollView } from "react-native-gesture-handler";
import categories from '../../Logic/EventsLogic/categories'
import { useState } from "react";
import EventCard from "../../components/Card/EventCard";
import IonIcons from "react-native-vector-icons/Ionicons";
import Input from "../../components/Input";

export default function Page() {
  const { logout } = logoutLogic();

  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <ScrollView className="bg-black w-full">
      <View className='p-2'>
      <Text className="font-bold text-3xl text-white">Plan Your Best Event</Text>
      <Text className='capitalize text-neutral-400'>Explore the best events around you.</Text>
      </View>
        
      <ScrollView horizontal={true}
      >
        <View  className='flex flex-row px-2 gap-2 flex-wrap'>
        {[{label: 'All'},...categories].map((category, index) => {
          return (
            <Pressable onPress={() => {
              setSelectedCategory(prev => (category?.value ?? category?.label))
            }} key={index} className={`rounded-[18px] h-min p-2`}>
              <Text className={`text-center text-neutral-400 ${(category?.value ?? category?.label) === selectedCategory && "text-[#B615DD]"}}`}>{category.label}</Text>
            </Pressable>
          )
        })}
        </View>
      </ScrollView>
      <View className='flex flex-row items-center bg-neutral-900 border-2 border-neutral-800 rounded-[18px] my-4 justify-between px-2 mx-2'>
        <TextInput inputMode="search" placeholder='Search Events' placeholderTextColor={'#d7d7d7'} className='p-2 text-white' />
        <IonIcons name='ios-search-outline' size={20} color='#d7d7d7' />
      </View>
      <View className='flex flex-row w-full items-center justify-between p-2'>
        <Text className='text-neutral-100 text-base'>All Events</Text>
        <Text className='text-neutral-400'>See All</Text>
      </View>
      <ScrollView horizontal={true}
      >
        <View  className='flex flex-row p-2 py-4 gap-2 flex-wrap'>
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </View>
      </ScrollView>
      <View className='flex flex-row w-full items-center justify-between p-2'>
        <Text className='text-neutral-100 text-base'>All Events</Text>
        <Text className='text-neutral-400'>See All</Text>
      </View>
      <ScrollView horizontal={true}
      >
        <View  className='flex flex-row p-2 py-4 gap-2 flex-wrap'>
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => logout()}>
        <Text className='text-white'>Logout User</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
