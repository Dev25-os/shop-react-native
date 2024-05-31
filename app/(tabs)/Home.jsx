import { View, Text } from 'react-native'
import React from 'react'
import { Fonts } from "../../constants/Fonts"
import Header from '../../components/Home/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Home() {
  return (
    <SafeAreaView>

      {/* Header */}
      <View>
        <Header />
      </View>

    </SafeAreaView>
  )
}