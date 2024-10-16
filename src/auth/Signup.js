import { Button, Pressable, StyleSheet, Text, TextInput, View, Image, ImageBackground, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Client, Account, ID, Databases } from 'react-native-appwrite';
import Center from '../Center';


export let client = new Client();
export const databases = new Databases(client);
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e46d0f00121c6988ce')

export let account = new Account(client);


const Signup = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState(0);
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    async function register(email, pass, name, mobileNumber) {
        try {

            await account.create(ID.unique(), email, pass, name, mobileNumber)
            const promise = databases.createDocument(
                '66e46d870011089030e8',
                '66e46d99003335d602ef',
                ID.unique(),
                {
                    name: name,
                    email: email,
                    MobileNumber: mobileNumber
                }

            )
            navigation.navigate("Login")


        } catch (err) {
            console.log(err)
        }

    }

    function mobilenum() {
        setNumber(0)
        Alert.alert("Enter correct mobile number of 10 digits")
    }

    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground source={{ uri: "https://media.istockphoto.com/id/1083689108/vector/black-spots-scatter-glitter-distress-abstract-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZTnmS38gLFAscJRnA3xEMUjDd_Pr53032O4dNbQc2rE=" }}
                        style={styles.image}
                    >
                        <Image
                            source={{ uri: "https://rovenlogos.com/wp-content/uploads/2021/02/rovenlogos_lawyer.png" }}
                            style={styles.imglogo}
                        />
                        <Text style={styles.heading}>Register</Text>
                        <TextInput
                            placeholder='Name'
                            value={name}
                            onChangeText={setName}
                            keyboardType='default'
                            style={styles.input}

                        />
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Mobile Number'
                            value={number}
                            onChangeText={number >= 6000000000 ? mobilenum : setNumber}
                            keyboardType='numeric'
                            style={styles.input}
                        />

                        <TextInput
                            placeholder='Password'
                            value={pass}
                            onChangeText={setPass}
                            keyboardType='default'
                            secureTextEntry
                            style={styles.input}
                        />
                        <Button
                            title='Submit'
                            onPress={() => { return register(email, pass, name, number) }}
                        />
                    </ImageBackground>
                </View>

                <Pressable onPress={() => { navigation.navigate("Login") }} style={styles.login}><Text >
                    Already a User.<Text style={styles.loginText}>  Login Here</Text>
                </Text></Pressable>
            </ScrollView>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    heading: {
        // alignItems: "center",
        // justifyContent: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 50

    },
    container: {
        // flex: .2,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        borderWidth: 2,
        width: 330,
        height: 550,
        marginLeft: 20,
        borderRadius: 15
    },
    input: {
        borderWidth: 2,
        borderBottomWidth: 1,
        width: 250,
        paddingTop: 5,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
        height: 50
    },
    login: {
        alignItems: "center",
        marginTop: 20,

    },
    loginText: {
        fontSize: 15,
        color: "#0A79DF",
        fontStyle: "italic"
    },
    image: {
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 2,
        width: 320,
        height: 540,
        borderRadius: 15
    },
    imglogo: {
        height: 100,
        width: 100,
        marginBottom: 30,
        borderRadius: 50
    }
})