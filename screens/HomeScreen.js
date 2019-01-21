import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    View,
    StatusBar,
    FlatList
} from 'react-native';
import {WebBrowser} from 'expo';
import LoginApi from "../api/login";
import {paddingValue} from "../constants/Layout";
import BrowseApi from "../api/browse";
import {Ionicons} from '@expo/vector-icons';
import {DrawerActions} from 'react-navigation-drawer';
import {List, Avatar, ListItem, SearchBar} from 'react-native-elements';
import UsersGrid from "../components/UsersGrid";
import {Navigator} from "../components/navigator/Navigator";
import Icon from 'react-native-vector-icons/FontAwesome';
import SessionCard from '../components/sessionCard';

//Kitten Engine
import {
    RkStyleSheet,
    RkTheme,
    RkButton,
    RkCard,
    RkText
} from 'react-native-ui-kitten';
import ActivityApi from "../api/activity";

//Global vars
GLOBAL = require('../constants/Globals');

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Repetita APP',
    });

    constructor(props) {
        super(props);

        this.state = {
            tutors: []
        }
    }

    //confirm remove pet
    async loadItems() {
        //Set loading
        this.setState({loading: true});

        let activityApi = new ActivityApi();

        await activityApi.tutors().then((result) => {
            //Set data and stop loader
            this.setState({
                loading: false,
                tutors: result
            });

            /*if (typeof result.username == "undefined") {
                Alert.alert("Impossibile Accedere", result.message, [
                    {text: 'Password Dimenticata?', onPress: () => alert("Funzione Disabilitata")},
                    {text: 'OK'},
                ]);
            } else {
                //Save data to local storage
                this._storeLoginData(result);

                //Logged in, go to home now
                this.props._getReadyImLoggedIn();
            }*/
        });
    }

    componentDidMount() {
        this.loadItems();
    }

    renderUserCard = ({item}) => (
        <SessionCard navigation={this.props.navigation} activity={item} />
    );

    extractItemKey = (item) => `${item.id}`;

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.tutors}
                    renderItem={this.renderUserCard}
                    keyExtractor={this.extractItemKey}
                />
            </ScrollView>
        );
    }
}

const styles = RkStyleSheet.create(theme => ({
    screen: {
        backgroundColor: '#f0f1f5',
        padding: 12,
    },
    container: {
        backgroundColor: theme.colors.screen.scroll,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    card: {
        marginBottom: 12,
    },
    buttonIcon: {
        marginRight: 7,
        fontSize: 19.7,
    },
    footer: {
        marginHorizontal: 16,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 17,
    },
    dot: {
        fontSize: 6.5,
        color: '#0000008e',
        marginLeft: 2.5,
        marginVertical: 10,
    },
    floating: {
        width: 56,
        height: 56,
        position: 'absolute',
        zIndex: 200,
        right: 16,
        top: 173,
    },
    footerButtons: {
        flexDirection: 'row',
    },
    overlay: {
        justifyContent: 'flex-end',
        paddingVertical: 23,
        paddingHorizontal: 16,
    },
}));