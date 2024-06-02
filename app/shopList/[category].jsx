import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "../../config/FirebaseConfig"
import { Fonts } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"

export default function ShopByCategory() {
    const navigation = useNavigation()
    const { category } = useLocalSearchParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        setData([])
        const q = query(collection(db, 'Shops'), where("category", "==", category))

        const snapshot = await getDocs(q);

        snapshot.forEach(item => {
            setData(prev => [...prev, item.data()])
        })
        setLoading(false)
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        })
        fetchData()
    }, [])

    if (loading) {
        return <ActivityIndicator color={Colors.PRIMARY} size={'large'} style={{ marginTop: '60%' }} />
    }


    return (
        <View>

            {data.length > 0 ? (

                <FlatList
                    data={data}
                    onRefresh={fetchData}
                    refreshing={loading}
                    renderItem={({ item }) => (
                        <View style={{
                            backgroundColor: '#fff', padding: 10, margin: 10, borderRadius: 5,
                            display: 'flex', flexDirection: 'row',

                        }}>
                            <View>
                                <Image source={{ uri: item.logo }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                            </View>
                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <Text style={{ marginTop: 5, fontSize: 17, color: Colors.SECONDARY, fontFamily: Fonts.bold }}>{item.name}</Text>

                                <Text style={{ fontSize: 14, color: 'gray', fontFamily: Fonts.regular }}>{item.address}</Text>
                                <View style={{ display: "flex", flexDirection: 'row', gap: 3, marginTop: 5 }}>
                                    <Text>⭐</Text>
                                    <Text style={{ fontFamily: Fonts.medium, fontSize: 17 }}>4.5</Text>
                                </View>

                            </View>
                        </View>
                    )}

                />

            ) : (
                <View >
                    <Text style={{ fontSize: 20, fontFamily: Fonts.medium, color: 'gray', marginTop: '50%', textAlign: 'center', }}>No shop found for the category - {category}</Text>
                </View>
            )}




        </View>
    )
}