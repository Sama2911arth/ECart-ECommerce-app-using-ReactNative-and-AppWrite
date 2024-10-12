import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//React navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackPramList } from "../App"

import ProductItem from './screensHome/ProductItem'
import Separator from './screensHome/Seperator'
import Details from './screensHome/Details'
import Details2 from './screensHome/Details'
// data
import { PRODUCTS_LIST } from './data/Data'

function Home2({ navigation }) {
    return (
        <View style={styles.container}>
            <FlatList
                data={PRODUCTS_LIST}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={Separator}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            navigation.navigate("Details", {
                                product: item
                            })
                        }}
                    >
                        <ProductItem product={item} />
                    </Pressable>
                )}
            />
        </View>
    )
}

const Home = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Trending Products'>
            <Stack.Screen name='Trending Products' component={Home2} options={{ headerShown: false }} />
            <Stack.Screen name='Details' component={Details} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',

        padding: 12,
        backgroundColor: '#FFFFFF',
    },
});

export default Home