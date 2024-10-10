import { StyleSheet, Text, View, Alert, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation, createNavigationContainer, NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { account, databases } from './auth/Signup';
import { Query } from 'react-native-appwrite';
import * as   IntentLauncher from "expo-intent-launcher"
import * as MailComposer from 'expo-mail-composer'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

const Profile = () => {
    const [userEmail, setUserEmail] = useState(null);
    const [userData, setUserData] = useState(null);

    //send mail
    const sendMail = async () => {
        let options = {
            recipients: ["samarthshukla994@gmail.com"],
            subject: "",
            body: "",
            isHTML: false
        }
        await MailComposer.composeAsync(options);


    }

    //app settings
    const appSettings = () => {
        IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APPLICATION_SETTINGS)
        // data: "package" + Application.applicationId,

    }

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

    async function Logout() {
        await account.deleteSession('current');
        navigation.navigate("Login");
    }


    //Pick an Image
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation();

    const pickImage = async () => {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (result.granted === false) {
            Alert.alert("Permission to access camera roll is required");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setImageUri(pickerResult.assets[0].uri);
        }
    };


    return (
        <View>
            <ScrollView>
                <View style={styles.basic}>
                    <View style={styles.imgContainer}>
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={{ uri: imageUri || "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" }} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                    {userData ? (<View style={styles.dataBox}>
                        <Text style={styles.dataName} selectable>{userData.name}</Text>
                        <View style={styles.dataBox2} selectable><Text style={styles.data}>Email : {userData.email}</Text></View>
                        <View style={styles.dataBox2} selectable><Text style={styles.data}>Mobile Number : +91 {userData.mobileNumber}</Text></View>
                    </View>) : (<Text>Loading User Data</Text>)}
                </View>
                <View style={styles.border}></View>
                <TouchableOpacity onPress={appSettings}>
                    <View style={styles.dataBox3}>
                        <Ionicons name="settings" size={24} color="white" />
                        <Text style={styles.data2}>  Settings  </Text>
                        <FontAwesome6 name="greater-than" size={16} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendMail}>
                    <View style={styles.dataBox3}>

                        <Text style={styles.data2}> Help Center ?</Text>

                        <FontAwesome6 name="greater-than" size={16} color="white" />
                    </View>
                </TouchableOpacity>
                <View style={styles.dataBox3}>

                    <Text style={styles.data2}>  About Us.  </Text>
                    <FontAwesome6 name="greater-than" size={16} color="white" />
                </View>
                <TouchableOpacity onPress={Logout}>
                    <View style={styles.dataBox3}>

                        <Entypo name="log-out" size={24} color="white" />
                        <Text style={styles.data2}>  Log Out.  </Text>
                        <FontAwesome6 name="greater-than" size={16} color="white" />

                    </View>
                </TouchableOpacity>



            </ScrollView>
        </View>
    );
}


export default Profile

const styles = StyleSheet.create({
    basic: {
        width: 360,
        height: 280,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,

        marginRight: 20
    },
    imgContainer: {
        height: 126,
        width: 126,
        borderRadius: 63,
        borderColor: "#DAE0E2",
        borderWidth: 2,

    },
    img: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    dataBox: {
        alignItems: "center",
        height: 120,
        height: 370,

    },
    dataName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10
    },
    dataBox2: {
        height: 50,
        width: 350,
        borderWidth: .5,
        marginBottom: 10,
        alignItems: "center",
        marginLeft: 25,
        borderRadius: 20,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowColor: "#616C6F",
        shadowRadius: 10,
        elevation: 20,
        shadowOpacity: .8,
        borderBottomWidth: 2
    },
    dataBox3: {
        height: 50,
        width: 330,
        borderWidth: .5,
        // marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 25,
        borderRadius: 10,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowColor: "#616C6F",
        shadowRadius: 5,
        elevation: 10,
        shadowOpacity: .8,
        borderBottomWidth: 2,
        backgroundColor: "#FF4848",
        marginBottom: 20
    },
    data: {
        fontSize: 18,
        paddingTop: 10,
        fontSize: 18
    },
    border: {
        borderBottomWidth: 2,
        marginBottom: 20,

    },
    data2: {
        paddingBottom: 4,
        fontSize: 18,
        paddingLeft: 3,
        paddingRight: 80,
        color: "#fff",
        fontWeight: "bold"
    }


})