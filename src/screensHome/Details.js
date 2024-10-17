import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// react navigation
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Orders from '../Orders';
import { Databases, ID, Client, Query } from 'react-native-appwrite';
import { client, account, databases } from '../auth/Signup';
import ProductItem from './ProductItem';

//setting up the address collection
// const databases = new Databases(client);



const Details = ({ route }) => {
    const [address, setAddress] = useState('');
    const [qty, setQty] = useState(0);
    const [useremail, setUserEmail] = useState('');
    const [userData, setUserData] = useState('');
    const navigation = useNavigation();
    const { product } = route.params;

    //get useremail
    const getUserEmail = async () => {
        try {
            const user = await account.get();
            setUserEmail(user.email)
            console.log(user.email);
            getDocumentByEmail(user.email)
        } catch (err) {
            console.log("Error fetching user data:", err.message)
        }
    }
    //getting document using user data
    const getDocumentByEmail = async (email) => {
        try {
            const documents = await databases.listDocuments('66e46d870011089030e8', '66e46d99003335d602ef', [
                Query.equal('email', email)
            ]);
            if (documents.documents.length > 0) {
                const document = documents.documents[0];
                setUserData({
                    name: document.name,
                    email: document.email,
                    mobileNumber: document.MobileNumber


                });
            } else {
                console.error("No document found for this user")
            }

        } catch (err) {
            console.error('Error querying documents:', err.message);
        }
    };
    useEffect(() => {
        getUserEmail();
    }, [])


    async function Addressfn(address, qty, navigation) {
        console.log(product);
        console.log(qty);
        try {
            if (address && address.length > 20 && qty > 0 && qty <= 50) {
                const promise = await databases.createDocument(
                    '66e46d870011089030e8',
                    '66e7c1f60017b05a26e0',
                    ID.unique(),
                    {
                        AddRess: address,
                        Quantity: qty
                    }

                )
                TakeOrder()
                Alert.alert("Order Succesfull.");

                //navigation.navigate("Orders")
            }
            else if (address.length <= 20) {
                Alert.alert("Address should have atleast 20 characters or Valid Quantity upto 50")


            }
            else {
                Alert.alert("Please Enter Address to Order or Valid Quantity upto 50")
            }

        } catch (err) {
            console.log(err);
        }


    }

    async function TakeOrder() {

        try {
            await databases.createDocument(
                '66e46d870011089030e8',
                '66e7cf3e0027791b672c',
                ID.unique(),
                {
                    ProductName: product.name,
                    CustomerName: userData.name,
                    MobileNumber: userData.mobileNumber,
                    Email: userData.email,
                    Address: address,
                    ProductPrice: product.discountPrice,
                    Quantity: qty,
                }

            )
        } catch (err) {
            console.log(err);
        }

    }



    return (
        <ScrollView style={styles.container}>
            <View>
                <Image style={styles.image} source={{ uri: product.imageUrl }} />
                <View>
                    <Text style={styles.name}>{product.name}</Text>

                    <View style={[styles.rowContainer, styles.ratingContainer]}>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>{product.rating} ★</Text>
                        </View>
                        <Text style={styles.ratingCount}>
                            ({product.ratingCount.toLocaleString()})
                        </Text>
                    </View>

                    <View style={[styles.rowContainer, styles.priceContainer]}>
                        <Text style={styles.originalPrice}>
                            ₹{product.originalPrice.toLocaleString()}
                        </Text>
                        <Text style={styles.discountPrice}>
                            ₹{product.discountPrice.toLocaleString()}
                        </Text>
                        <Text style={styles.offerPercentage}>
                            %{product.offerPercentage} off
                        </Text>
                    </View>
                    {product.tags.map((tag, index) => (
                        <View key={index} style={styles.badge}>
                            <Text style={styles.tagBadge}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View>
                <TextInput style={styles.AddressIn}
                    placeholder='Enter Address to Order'
                    keyboardType='default'
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput style={styles.QtyIn}
                    placeholder='Enter Quantity : '
                    keyboardType='numeric'
                    value={qty}
                    onChangeText={(text) => {
                        const value = parseInt(text, 10);  // Convert text to integer
                        if (!isNaN(value)) {
                            setQty(value);
                        }
                    }
                    }
                />
            </View>

            <TouchableOpacity onPress={() => { Addressfn(address, qty, navigation) }}>
                <View style={styles.dataBox3}>

                    <Text style={styles.data2}> Order Now.</Text>


                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 18,
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: 300,
        height: 450,
        resizeMode: 'contain',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    name: {
        marginBottom: 4,

        fontSize: 20,
        fontWeight: '500',
    },
    ratingContainer: {
        marginVertical: 12,
    },
    priceContainer: {
        paddingVertical: 12,
        paddingHorizontal: 12,

        marginBottom: 12,

        borderRadius: 6,
        backgroundColor: '#deffeb',
    },
    rating: {
        marginRight: 4,

        borderRadius: 4,
        paddingHorizontal: 8,
        justifyContent: 'center',
        backgroundColor: '#008c00',
    },
    ratingText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    ratingCount: {
        fontSize: 14,
        color: '#878787',
    },
    originalPrice: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 8,

        color: 'rgba(0, 0, 0, 0.5)',
        textDecorationLine: 'line-through',
    },
    discountPrice: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600',
    },
    offerPercentage: {
        fontSize: 17,
        fontWeight: '600',
        color: '#4bb550',

        marginRight: 8,
    },
    badge: {
        margin: 2,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    tagBadge: {
        paddingVertical: 2,
        paddingHorizontal: 4,

        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.5)',

        color: 'rgba(0, 0, 0, 0.8)',
    },
    dataBox3: {
        height: 50,
        width: 330,
        borderWidth: .5,
        // marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // marginLeft: 25,
        //borderRadius: 20,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowColor: "#616C6F",
        shadowRadius: 10,
        elevation: 20,
        shadowOpacity: .8,
        borderBottomWidth: 2,
        backgroundColor: "#FF4848",
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 10
    },
    data: {
        fontSize: 18,
        paddingTop: 10,
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    },
    border: {
        borderBottomWidth: 2,
        marginBottom: 20,

    },
    data2: {
        paddingBottom: 4,
        fontSize: 18,
        paddingLeft: 3,
        paddingRight: 10,
        color: "#fff",
        fontWeight: "bold"
    },
    AddressIn: {
        height: 80,
        width: 330,
        borderWidth: 2,
        marginTop: 20,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 15
    },
    QtyIn: {
        height: 50,
        width: 330,
        borderWidth: 2,
        marginTop: 20,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 15
    }
});


export default Details;