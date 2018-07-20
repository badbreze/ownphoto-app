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

import {MonoText} from '../components/StyledText';
import LoginApi from "../api/login";
import DatesGrid from "../components/DatesGrid";
import {paddingValue} from "../constants/Layout";
import BrowseApi from "../api/browse";

//Global vars
GLOBAL = require('../constants/Globals');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        let isTherePhotos = (typeof GLOBAL.photos == 'undefined' || !GLOBAL.photos) ? true : false

        this.state = {
            loading: !isTherePhotos,
            dates: []
        }
    }

    //confirm remove pet
    async loadItems() {
        //Set loading
        this.setState({loading: true});

        let browseApi = new BrowseApi();

        await browseApi.index().then((result) => {
            //Set data and stop loader
            this.setState({
                loading: false,
                dates: result
            });

            console.log(result.lenght,"DATAS");


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
            <DatesGrid dates={this.state.dates}/>
        );
    }
}

const styles = StyleSheet.create({
    //TODO
});
