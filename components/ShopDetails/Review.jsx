import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../../constants/Colors'
import { Fonts } from '../../constants/Fonts'
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import { useLocalSearchParams } from 'expo-router'


export default function Review() {
    const [rating, setRating] = useState(0)
    const [reviewData, setReviewData] = useState('')
    const { user } = useUser()
    const { shopId } = useLocalSearchParams()
    const [shopData, setShopData] = useState(null)

    const fetchShopDetails = async () => {
        const docRef = doc(db, 'Shops', shopId)
        const docSanp = await getDoc(docRef)

        if (docSanp.exists()) {
            setShopData({ id: docSanp.id, ...docSanp.data() })
        } else {
            console.log("no data found")
        }
    }
    const handleSubmit = async () => {

        const docRef = doc(db, 'Shops', shopData.id);
        await updateDoc(docRef, {
            review: arrayUnion({
                ratingCount: rating,
                comment: reviewData,
                userName: user?.fullName,
                userImage: user?.imageUrl
            })
        })

        ToastAndroid.show("Review submitted", ToastAndroid.BOTTOM)

        setReviewData("")
        setRating(2)
        fetchShopDetails()
    }


    useEffect(() => {
        fetchShopDetails()
    }, [])


    return (
        <View style={{ backgroundColor: '#fff', padding: 10 }}>
            <Text style={{ fontSize: 17, fontFamily: Fonts.bold, color: Colors.SECONDARY }}>Reviews</Text>

            {shopData?.review && shopData.review.length > 0 &&
                shopData.review.map((item, index) => (
                    <View key={index} style={{ display: 'flex', flexDirection: 'row', gap: 15, borderColor: Colors.SECONDARY, borderWidth: 1, borderRadius: 4, padding: 10, marginVertical: 10 }}>
                        <View>
                            <Image source={{ uri: item?.userImage }} style={{ width: 40, height: 40, borderRadius: 99 }} />
                        </View>
                        <View style={{ gap: 5 }}>

                            <Text>{item.userName}</Text>
                            <Rating
                                readonly
                                ratingCount={item.ratingCount}
                                style={{ alignSelf: 'flex-start' }}
                                imageSize={20}
                            />
                            <Text>{item.comment}</Text>
                        </View>

                    </View>
                ))
            }





            <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontSize: 17, fontFamily: Fonts.bold, color: Colors.SECONDARY }}>Add review</Text>
                <Rating
                    showRating={false}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10, paddingLeft: 0, marginLeft: 0, alignSelf: 'flex-start' }}
                    imageSize={20}

                    ratingColor={rating}
                />
            </View>

            <View>
                <TextInput placeholder='Write review...' style={{ borderColor: Colors.SECONDARY, borderWidth: 2, borderRadius: 4, textAlignVertical: 'top', padding: 10, color: Colors.SECONDARY, borderColor: Colors.SECONDARY }} numberOfLines={4}
                    onChangeText={(value) => setReviewData(value)}
                    value={reviewData}
                />

                <TouchableOpacity
                    disabled={!reviewData}
                    onPress={handleSubmit}
                    activeOpacity={0.7} style={{ backgroundColor: Colors.PRIMARY, padding: 10, marginVertical: 10, borderRadius: 5 }}>
                    <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}