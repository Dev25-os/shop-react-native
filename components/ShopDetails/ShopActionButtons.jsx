import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ShopActionButtons({ shopData }) {
    const list = [
        {
            id: 1,
            name: 'Call',
            icon: require('../../assets/images/phone.png'),
            url: 'tel:' + shopData?.contact
        },
        {
            id: 2,
            name: 'Location',
            icon: require('../../assets/images/location.png'),
            url: 'https://www.google.com/maps/' + shopData?.location
        },
        {
            id: 3,
            name: 'Web',
            icon: require('../../assets/images/web.png'),
            url: 'https://www.youtube.com'
        },
        {
            id: 4,
            name: 'Share',
            icon: require('../../assets/images/share.png'),
            url: 'www.youtube.com'
        },
    ]

    const handleAction = (url) => {
        Linking.openURL(url)
    }

    return (
        <View style={{ backgroundColor: '#fff', padding: 10 }}>
            <FlatList
                data={list}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.6} onPress={() => handleAction(item.url)} style={{ display: 'flex', alignItems: 'center' }}>
                        <Image source={item.icon} style={{ width: 40, height: 40, backgroundColor: '#fff', borderRadius: 99 }} />
                        <Text style={{ textAlign: 'center', marginTop: 3 }}>{item.name} </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}