import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../config/FirebaseConfig'
import { Colors } from '../../constants/Colors'
import ShopHeader from '../../components/ShopDetails/ShopHeader'
import ShopActionButtons from '../../components/ShopDetails/ShopActionButtons'

export default function ShopDetails() {
    const { shopId } = useLocalSearchParams()
    const [shopData, setShopData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchShopDetails = async () => {
        setLoading(true)
        const docRef = doc(db, 'Shops', shopId)
        const docSanp = await getDoc(docRef)

        if (docSanp.exists()) {
            setShopData(docSanp.data())
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
            {/* Shop header/intro */}
            <ShopHeader shopData={shopData} />

            {/* Shop Action Buttons */}
            <ShopActionButtons shopData={shopData} />
        </View>
    )
}