import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {paddingValue} from "../constants/Layout";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Photos',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-photos${focused ? '' : '-outline'}`
                    : 'md-photos'
            }
        />
    ),
};

const AlbumsStack = createStackNavigator({
    Settings: SettingsScreen,
});

AlbumsStack.navigationOptions = {
    tabBarLabel: 'Albums',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-albums${focused ? '' : '-outline'}` : 'md-albums'}
        />
    ),
};

const SharesStack = createStackNavigator({
    Search: LinksScreen,
});

SharesStack.navigationOptions = {
    tabBarLabel: 'Shares',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-people${focused ? '' : '-outline'}` : 'md-people'}
        />
    ),
};

const MoreStack = createStackNavigator({
    More: SettingsScreen,
});

MoreStack.navigationOptions = {
    tabBarLabel: 'More',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    AlbumsStack,
    SharesStack,
    MoreStack,
}, {
    tabBarOptions: {
        style: {
            borderTopWidth: 0,
            ...Platform.select({
                ios: {
                    shadowColor: 'black',
                    shadowOffset: {height: -3},
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
                android: {
                    elevation: 20,
                },
            }),
        }
    }
});
