import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../config/FirebaseConfig'
import { Colors } from '../../constants/Colors'
import { Fonts } from '../../constants/Fonts'

import ShopHeader from '../../components/ShopDetails/ShopHeader'
import ShopActionButtons from '../../components/ShopDetails/ShopActionButtons'
import Review from '../../components/ShopDetails/Review'

export default function ShopDetails() {
    const { shopId } = useLocalSearchParams()
    const [shopData, setShopData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchShopDetails = async () => {
        setLoading(true)
        const docRef = doc(db, 'Shops', shopId)
        const docSanp = await getDoc(docRef)

        if (docSanp.exists()) {
            setShopData({ id: docSanp.id, ...docSanp.data() })
            setLoading(false)
        } else {
            console.log("no data found")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchShopDetails()
    }, [])


    if (loading) {
        return <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{
            marginTop: '70%'
        }} />
    }


    return (
        <View>
            <ScrollView>

                {/* Shop header/intro */}
                <ShopHeader shopData={shopData} />

                {/* Shop Action Buttons */}
                <ShopActionButtons shopData={shopData} />

                {/* Shop about */}
                <View style={{ padding: 10, backgroundColor: '#fff' }}>
                    <Text style={{ fontSize: 17, fontFamily: Fonts.bold, color: Colors.SECONDARY }}>About</Text>
                    <Text style={{ fontSize: 16, fontFamily: Fonts.regular, color: Colors.SECONDARY }}>{shopData?.about} </Text>
                </View>

                {/* Shop Review */}
                <Review />

            </ScrollView>
        </View>
    )
}