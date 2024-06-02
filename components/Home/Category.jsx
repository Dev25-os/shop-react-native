import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Fonts } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"
import { useEffect } from 'react'
import { useState } from 'react'
import { collection, query, getDocs } from "firebase/firestore"

import { db } from "../../config/FirebaseConfig"
import { TouchableNativeFeedback } from 'react-native-web'
import { useRouter } from 'expo-router'
export default function Category() {

    const [data, setData] = useState([])
    const router = useRouter()
    const fetchData = async () => {
        setData([])
        const q = query(collection(db, 'Category'))

        const snapshot = await getDocs(q);

        snapshot.forEach(item => {
            setData(prev => [...prev, item.data()])
        })

    }

    const handleOnPress = (data) => {
        router.push("/shopList/" + data.name)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontFamily: Fonts.bold, color: Colors.SECONDARY }}>Category</Text>
                <Text style={{ fontSize: 18, fontFamily: Fonts.medium, color: 'gray' }}>View</Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <FlatList data={data} horizontal={true} showsHorizontalScrollIndicator={false}
                    style={{ paddingLeft: 10 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.6} onPress={() => handleOnPress(item)}>

                            <View key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#fff', marginHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 99 }}>

                                    <Image source={{ uri: item.logo }} style={{ width: 45, height: 45 }} />
                                </View>
                                <Text style={{ textAlign: 'center', fontFamily: Fonts.medium }}>{item.name} </Text>
                            </View>
                        </TouchableOpacity>

                    )}
                />
            </View>
        </View>
    )
}