import { StyleSheet, Text, View, TextInput, Button, Alert, ImageBackground, Image, Pressable, ScrollView } from 'react-native'
import { React, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { account } from './Signup';



const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loggedin, setloggedIn] = useState(null);

    async function Signin(email, pass) {
        try {
            await account.createEmailPasswordSession(email, pass);

            navigation.navigate("Center")
            setloggedIn(await account.get())


        } catch (err) {
            console.log(err)
        }

    }



    return (
        <ScrollView>
            <View style={styles.header}>

                <View style={styles.container}>

                    <ImageBackground source={{ uri: "https://media.istockphoto.com/id/1083689108/vector/black-spots-scatter-glitter-distress-abstract-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZTnmS38gLFAscJRnA3xEMUjDd_Pr53032O4dNbQc2rE=" }}
                        style={styles.image}
                    >
                        <Image
                            source={{ uri: "https://rovenlogos.com/wp-content/uploads/2021/02/rovenlogos_lawyer.png" }}
                            style={styles.imglogo}
                        />
                        <Text style={styles.heading}>Login</Text>
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
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
                            onPress={() => { return Signin(email, pass) }}
                        />
                    </ImageBackground>


                </View>
                <Pressable onPress={() => { navigation.navigate("Login") }} style={styles.login}><Text >
                    New to Our Platform.<Text style={styles.loginText}>  Register Here</Text>
                </Text></Pressable>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#DAE0E2",
        height: 800
    },
    heading: {
        // flex: 1,
        // alignItems: "center",
        //justifyContent: "center",
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
        height: 500,
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
        height: 50,
        fontSize: 15,
        color: "#006266",
        fontWeight: "bold"
    },
    login: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20

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
        height: 490,
        borderRadius: 20
    },
    imglogo: {
        height: 100,
        width: 100,
        marginBottom: 30,
        borderRadius: 50
    }
})
export default Login

