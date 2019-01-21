import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    View
} from 'react-native';
import {WebBrowser} from 'expo';
import LoginApi from "../api/login";
import {paddingValue} from "../constants/Layout";
import BrowseApi from "../api/browse";
import {Ionicons} from '@expo/vector-icons';
import {DrawerActions} from 'react-navigation-drawer';
import {Icon, List, Avatar, ListItem, SearchBar} from 'react-native-elements';
import MaterieGrid from "../components/MaterieGrid";

//Global vars
GLOBAL = require('../constants/Globals');

export default class MaterieScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Materie',
    });

    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            materie: []
        }
    }

    //confirm remove pet
    async loadItems() {
        //Set loading
        this.setState({loading: true});

        let browseApi = new BrowseApi();

        await browseApi.materie().then((result) => {
            //Set data and stop loader
            this.setState({
                loading: false,
                materie: result
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

    render() {
        return (
            <ScrollView>
                <SearchBar
                    //onChangeText={someMethod}
                    //onClearText={someMethod}
                    placeholder='Cerca materia...' />
                <MaterieGrid materie={this.state.materie} navigation={this.props.navigation} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    menuButton: {
        paddingLeft: 20
    }
    //TODO
});
