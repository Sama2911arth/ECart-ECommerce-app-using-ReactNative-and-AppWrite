import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { PRODUCTS_LIST } from './data/Data'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Separator from './screensHome/Seperator';

const Search = () => {

    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);


    const handleSearch = (query) => {
        setQuery(query);
        if (query) {
            const filteredProducts = PRODUCTS_LIST.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setProducts(filteredProducts);
        } else {
            setProducts(PRODUCTS_LIST)

        }
    }
    const renderItem = ({ item }) => {
        return (

            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Details', { product: item })}>
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                    />

                    <View>
                        <Text style={styles.name}>{item.name}</Text>

                        <View style={[styles.rowContainer, styles.ratingContainer]}>
                            <View style={styles.rating}>
                                <Text style={styles.ratingText}>{item.rating} ★</Text>
                            </View>
                            <Text style={styles.ratingCount}>
                                ({item.ratingCount.toLocaleString()})
                            </Text>
                        </View>

                        <View style={[styles.rowContainer, styles.priceContainer]}>
                            <Text style={styles.originalPrice}>
                                ₹{item.originalPrice.toLocaleString()}
                            </Text>
                            <Text style={styles.discountPrice}>
                                ₹{item.discountPrice.toLocaleString()}
                            </Text>
                            <Text style={styles.offerPercentage}>
                                %{item.offerPercentage} off
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>

        )

    }

    return (
        <View style={styles.header}>
            <View style={styles.searchView}>
                <FontAwesome name="search" style={styles.icon} />
                <TextInput
                    placeholder='Search '
                    value={query}
                    onChangeText={handleSearch}
                    style={styles.search} />
            </View>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={Separator}
                renderItem={renderItem}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",

    },
    searchView: {
        height: 50,
        width: 330,
        borderWidth: 1.5,
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 20,
        flexDirection: "row"
    },
    search: {
        marginLeft: 10,
        fontSize: 16,
        paddingRight: 210
    },
    icon: {
        fontSize: 24,
        paddingTop: 9,
        // paddingRight: 150
    },
    container: {
        margin: 8,
        flexDirection: 'row',
        // alignItems: "center",
        // justifyContent: "center"
    },
    rowContainer: {
        flexDirection: 'row',
    },
    image: {
        width: 90,
        height: 150,
        resizeMode: 'contain',
        marginLeft: 50,
        marginRight: 12,
    },
    name: {
        marginBottom: 4,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '500',

    },
    ratingContainer: {
        marginLeft: 10,
        marginBottom: 8,
    },
    priceContainer: {
        marginLeft: 10,
        marginBottom: 12,
    },
    rating: {
        borderRadius: 4,
        paddingHorizontal: 8,
        justifyContent: 'center',
        backgroundColor: '#008c00',
        marginLeft: 10,
        marginRight: 4,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    ratingCount: {
        color: '#878787',
    },
    originalPrice: {
        fontSize: 18,
        marginRight: 4,
        fontWeight: '600',

        color: 'rgba(0, 0, 0, 0.5)',
        textDecorationLine: 'line-through',
    },
    discountPrice: {
        fontSize: 18,
        marginRight: 4,
        fontWeight: '600',

        color: '#000000',
    },
    offerPercentage: {
        fontSize: 17,
        fontWeight: '600',
        color: '#4bb550',
    },
})

export default Search

