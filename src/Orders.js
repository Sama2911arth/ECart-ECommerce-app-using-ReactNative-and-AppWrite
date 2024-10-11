import { FlatList, ScrollView, StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { account, client, databases } from './auth/Signup';
import { Query } from 'react-native-appwrite';

const Orders = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userData, setUserData] = useState('');

    //get useremail
    const getUserEmail = async () => {
        try {
            const user = await account.get();
            setUserEmail(user.email);
            console.log(user.email);
            getDocumentsByEmail(user.email);
        } catch (err) {
            console.log("Error fetching user data:", err.message);
        }
    }

    // Getting all documents for a specific user email
    const getDocumentsByEmail = async (email) => {
        try {
            const documents = await databases.listDocuments(
                '66e46d870011089030e8',
                '66e7cf3e0027791b672c',
                [
                    Query.equal('Email', email)
                ]
            );

            if (documents.documents.length > 0) {
                const allOrders = documents.documents.map(document => ({
                    productName: document.ProductName,
                    customerName: document.CustomerName,
                    mobileNumber: document.MobileNumber,
                    email: document.Email,
                    address: document.Address,
                    productPrice: document.ProductPrice,
                    id: document.$id,
                    qty: document.Quantity
                }));


                setUserData(allOrders);
                console.log("User orders:", allOrders);
            } else {
                console.log("No document found for this user");
            }
        } catch (err) {
            console.error('Error querying documents:', err.message);
        }
    };


    useEffect(() => {
        getUserEmail();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.orderBox}>

            <Text style={styles.Pname}>{item.productName}</Text>
            <Text style={styles.text} selectable>OrderId : {item.id}</Text>
            <Text style={styles.text}>Name : {item.customerName}</Text>
            <Text style={styles.text}>Mobile Number : {item.mobileNumber}</Text>
            <Text style={styles.text}>Email : {item.email}</Text>
            <Text style={styles.text}>Qty  : {item.qty}</Text>
            <Text style={styles.text}>Price : ₹ {item.productPrice * item.qty}</Text>
            <Text style={styles.text}>Address : {item.address}</Text>
        </View>
    )

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.heading}>
                    View Your Order History Here...
                </Text>
                <Button title="Refresh Orders" onPress={() => getDocumentsByEmail(userEmail)} />
                <FlatList
                    data={userData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        alignItems: "center"
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        paddingRight: 100,
        marginTop: 10
    },
    orderBox: {
        height: 250,
        width: 360,
        borderWidth: 2,
        //alignItems: "center"
        paddingTop: 15,
        paddingLeft: 20,
        backgroundColor: "#192A56",
        borderRadius: 15,
        marginBottom: 15,
        marginTop: 15
    },
    Pname: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 5
    },
    text: {
        fontSize: 16,
        color: "#DAE0E2"
    }
})