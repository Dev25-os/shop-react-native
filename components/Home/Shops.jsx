import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { collection, query, getDocs } from "firebase/firestore"

import { db } from "../../config/FirebaseConfig"
import { useEffect } from 'react'
import { useState } from 'react'
import { Fonts } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"



export default function Shops() {

    const [data, setData] = useState([])

    const fetchData = async () => {
        setData([])
        const q = query(collection(db, 'Shops'))

        const snapshot = await getDocs(q);

        snapshot.forEach(item => {
            setData(prev => [...prev, item.data()])
        })
    }

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 20, fontFamily: Fonts.bold, color: Colors.SECONDARY }}>Shops near you </Text>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{ paddingLeft: 10, marginTop: 10 }}
                renderItem={({ item }) => (
                    <View style={{ padding: 15, marginRight: 10, backgroundColor: '#fff', borderRadius: 15 }}>
                        {/* <Text>{item.name} </Text> */}
                        <Image source={{ uri: item.logo }} style={{ width: 300, height: 160, borderRadius: 10, objectFit: 'fill' }} />

                        <View>

                            <Text style={{ marginTop: 5, fontSize: 17, color: Colors.SECONDARY, fontFamily: Fonts.bold }}>{item.name}</Text>

                            <Text style={{ marginTop: 3, fontSize: 14, color: 'gray', fontFamily: Fonts.regular }}>{item.address}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 }}>
                            <View style={{ display: "flex", flexDirection: 'row', gap: 3 }}>
                                <Text>⭐</Text>
                                <Text style={{ fontFamily: Fonts.medium, fontSize: 17 }}>4.5</Text>
                            </View>
                            <View style={{ backgroundColor: Colors.PRIMARY, paddingVertical: 5, paddingHorizontal: 7, borderRadius: 5 }}>
                                <Text style={{ color: '#fff', fontFamily: Fonts.medium }}>{item.category}</Text>
                            </View>
                        </View>


                    </View>
                )}

            />
        </View>
    )
}