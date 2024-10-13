import { StyleSheet, Text, View, Alert, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, createNavigationContainer, NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Orders from './Orders';
import Profile from './Profile';
import Search from './Search';
import Details from './screensHome/Details';

const Center = () => {
    const Tab = createBottomTabNavigator();
    return (

        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home'
                        : 'home';

                } else if (route.name === 'Profile') {
                    iconName = focused ? "user" : "user";

                }
                else if (route.name === 'Orders') {
                    iconName = focused ? "shopping-cart" : "shopping-cart";

                }
                else if (route.name === 'Search') {
                    iconName = focused ? "search" : "search";

                }
                // else if (route.name === 'Details') {
                //     iconName = focused ? "list-alt" : "list-alt";

                // }

                return <FontAwesome name={iconName} size={size} color={color} />;

            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Search' component={Search} />
            <Tab.Screen name='Orders' component={Orders} />
            <Tab.Screen name='Profile' component={Profile} />
            {/* <Tab.Screen name='Details' component={Details} /> */}
        </Tab.Navigator>

    )


};

export default Center;

const styles = StyleSheet.create({

});
