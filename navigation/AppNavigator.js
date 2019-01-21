import React from 'react';
import {createDrawerNavigator, createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import LinksScreen from "../screens/LinksScreen";
import {Platform, StyleSheet, Text} from "react-native";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from '@expo/vector-icons';
import MaterieScreen from "../screens/MaterieScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PeoplesScreen from "../screens/PeoplesScreen";
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivityScreen from "../screens/ActivityScreen";

let defaultHeader = {
    headerStyle: {
        backgroundColor: '#EA6B08'
    },
    headerMode: 'float',
    headerTintColor: 'white',
    drawerLabel: "Home",
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

let searchSection = createStackNavigator({
    Materie: {
        screen: MaterieScreen,
        navigationOptions: defaultHeader
    },
    Peoples: {
        screen: PeoplesScreen,
        navigationOptions: defaultHeader
    }
});

let homeSection = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: defaultHeader
    },
    Detail: {
        screen: ActivityScreen,
        navigationOptions: defaultHeader
    }
});

let messagesSection = createStackNavigator({
    Materie: {
        screen: MessagesScreen,
        navigationOptions: defaultHeader
    },
});

let profileSection = createStackNavigator({
    Materie: {
        screen: ProfileScreen,
        navigationOptions: defaultHeader
    },
});

export default createBottomTabNavigator({
    Home: {
        screen: homeSection,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({tintColor}) => (
                <Icon style={styles.icon} name="home" size={20}/>
            )
        }),
    },
    Search: {
        screen: searchSection,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({tintColor}) => (
                <Icon style={styles.icon} name="search" size={20}/>
            )
        }),
    },
    Messages: {
        screen: messagesSection,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({tintColor}) => (
                <Icon style={styles.icon} name="comment" size={20}/>
            )
        }),
    },
    Profile: {
        screen: profileSection,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({tintColor}) => (
                <Icon style={styles.icon} name="user-circle" size={20}/>
            )
        }),
    },
}, {
    tabBarOptions: {
        showLabel: false,
        activeBackgroundColor: 'rgba(0,0,0,0.05)',
        activeTintColor: 'rgba(0,0,0,0.5)'
    }
});

const styles = StyleSheet.create({
    icon: {
        color: '#777777'
    },
    tab: {
        backgroundColor: 'red'
    }
});