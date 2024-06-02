import { View, Text } from 'react-native'
import React from 'react'
import { Fonts } from "../../constants/Fonts"
import Header from '../../components/Home/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
export default function Home() {
  return (
    <SafeAreaView>

      {/* Header */}

      <Header />


      {/* Slider */}

      <Slider />
      {/* Cateory */}

      <Category />

    </SafeAreaView>
  )
}