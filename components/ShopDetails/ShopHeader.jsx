import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Fonts } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"

export default function ShopHeader({ shopData }) {
    const router = useRouter()

    useEffect(() => {
        console.log("dsf", shopData);
    },)
    return (
        <View>
            <View style={{ position: 'absolute', padding: 20, marginTop: 20, zIndex: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.back()} >
                    <Ionicons name="arrow-back-circle" size={40} color="white" />
                </TouchableOpacity>
                <View>
                    <Ionicons name="heart-outline" size={40} color="black" />
                </View>
            </View>
            <View style={{ position: 'relative' }}>
                <Image source={{ uri: shopData?.logo }} style={{ width: wp('100%'), height: hp('40%') }} />
            </View>
            <View style={{ padding: 20, backgroundColor: '#fff', marginTop: -20, borderTopEndRadius: 20, borderTopStartRadius: 20 }}>
                <Text style={{ marginTop: 5, fontSize: 17, color: Colors.SECONDARY, fontFamily: Fonts.bold }}>{shopData?.name}</Text>

                <Text style={{ fontSize: 14, color: 'gray', fontFamily: Fonts.regular }}>{shopData?.address}</Text>
            </View>
        </View>
    )
}