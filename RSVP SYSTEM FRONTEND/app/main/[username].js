import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useSearchParams } from 'expo-router'

const profile = () => {
    const {name, username} = useSearchParams()
    return (
    <View>
      <Stack.Screen options={
          {
              title: username,
              headerShown: false
          }
      } />
      <Text>profile {username} {name}</Text>
    </View>
  )
}

export default profile