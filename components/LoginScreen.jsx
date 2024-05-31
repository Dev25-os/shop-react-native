import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from "../constants/Fonts"
import { Colors } from "../constants/Colors"
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);


    return (
        <View style={{ flex: 1, }}>
            <View style={{ display: 'flex', alignItems: 'center', paddingHorizontal: 10 }}>
                <Image source={require("../assets/images/welcome.png")} style={{ width: wp('90%'), objectFit: 'contain', height: hp('65%') }} />
            </View>
            <View style={{ paddingHorizontal: 30, marginTop: -30 }}>
                <Text style={{ fontSize: 35, color: Colors.SECONDARY, fontFamily: Fonts.medium, textAlign: 'center' }}>Explore all kind of stores near you on <Text style={{ color: Colors.PRIMARY }}>Shops</Text> </Text>
            </View>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8} style={{ backgroundColor: Colors.PRIMARY, marginHorizontal: 20, marginTop: 40, padding: 20, borderRadius: 50, textAlign: 'center' }}>
                <Text style={{ textAlign: 'center', color: "#fff", fontSize: 15, fontFamily: Fonts.medium }}>Let's Get Started</Text>
            </TouchableOpacity>
        </View >
    )
}