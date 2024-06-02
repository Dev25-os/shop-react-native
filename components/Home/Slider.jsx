import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { collection, query, getDocs } from "firebase/firestore"

import { db } from "../../config/FirebaseConfig"
import { useEffect } from 'react'
import { useState } from 'react'
import { Fonts } from "../../constants/Fonts"
import { Colors } from "../../constants/Colors"



export default function Slider() {

    const [data, setData] = useState([])

    const fetchData = async () => {
        setData([])
        const q = query(collection(db, 'Slider'))

        const snapshot = await getDocs(q);

        snapshot.forEach(item => {
            setData(prev => [...prev, item.data()])
        })
    }

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 20, fontFamily: Fonts.bold, color: Colors.SECONDARY }}>#Special for you </Text>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{ paddingLeft: 10, paddingTop: 10 }}
                renderItem={({ item }) => (
                    <View>
                        {/* <Text>{item.name} </Text> */}
                        <Image source={{ uri: item.imgUrl }} style={{ width: 300, height: 160, borderRadius: 10, objectFit: 'fill', marginRight: 15 }} />
                    </View>
                )}

            />
        </View>
    )
}