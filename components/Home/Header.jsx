import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

import { Colors } from "../../constants/Colors"

export default function Header() {
    const { user } = useUser()
    return (
        <View style={{ padding: 20, paddingBottom: 40, backgroundColor: Colors.PRIMARY, borderBottomEndRadius: 20, borderBottomStartRadius: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image source={{ uri: user?.imageUrl }} style={{ width: 50, height: 50, borderRadius: 99 }} />
                <View>
                    <Text style={{ color: '#fff' }}>Welcome</Text>
                    <Text style={{ color: '#fff', fontSize: 20 }}>{user.fullName} </Text>
                </View>
            </View>
            {/* searchbar */}
            <View style={{ marginTop: 30, backgroundColor: '#fff', display: 'flex', flexDirection: 'row', padding: 10, gap: 10, borderRadius: 10 }}>
                <Ionicons name="search" size={24} color={Colors.SECONDARY} />
                <TextInput placeholder='Search...' style={{ fontSize: 18, color: Colors.SECONDARY, cursor: 'pointer' }} />
            </View>
        </View>
    )
}