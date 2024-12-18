import { View, Text } from 'react-native'
import React from 'react'
import Button from './Button'
import Ant from 'react-native-vector-icons/AntDesign'

const index = ({ text }) => {
  return (
    <View className='px-4'>
      <Text className='text-[#989898] mb-4'>{text}</Text>
      <View className='flex flex-row w-full justify-between'> 
        <Button icon={
           <Ant
             name="google"
             size={24}
           />
        } />
        <Button icon={
           <Ant
             name="google"
             size={24}
           />
        } />
      </View>
    </View>
  )
}

export default index