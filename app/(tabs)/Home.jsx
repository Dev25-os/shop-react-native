import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Fonts } from "../../constants/Fonts"
import Header from '../../components/Home/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import Shops from '../../components/Home/Shops'
import { } from 'react-native-web'
export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView>


        {/* Header */}
        <Header />

        {/* Slider */}
        <Slider />

        {/* Category */}
        <Category />

        {/* Shops */}
        <Shops />
      </ScrollView>


    </SafeAreaView>
  )
}