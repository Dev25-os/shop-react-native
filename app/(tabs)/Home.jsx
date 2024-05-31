import { View, Text } from 'react-native'
import React from 'react'
import { Fonts } from "../../constants/Fonts"
export default function Home() {
  return (
    <View>
      <Text style={{ fontSize: 50, fontFamily: Fonts.medium }}>Home</Text>
    </View>
  )
}