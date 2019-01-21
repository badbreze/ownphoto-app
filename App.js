import React from 'react';
import {Platform, StatusBar, StyleSheet, View, AsyncStorage, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from "./screens/LoginScreen";
import LoginApi from "./api/login";
import Colors from "./constants/Colors";
import {Theme} from "./constants/Theme";

//Bootstrapping
//import {bootstrap} from './helpers/bootstrap';

//Global vars
GLOBAL = require('./constants/Globals');

//Do bootstrapping
bootstrap();
import { bootstrap } from './helpers/bootstrap';

bootstrap();

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadingComplete: false,
            loggedIn: false
        };

        this._getReadyImLoggedIn = this._getReadyImLoggedIn.bind(this);
    }

    componentWillMount() {
        this.loadAssets();
    }

    loadAssets = async () => {
        await Font.loadAsync({
            fontawesome: require('./assets/fonts/fontawesome.ttf'),
            icomoon: require('./assets/fonts/icomoon.ttf'),
            'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
            'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
            'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
            'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        });
        this.setState({ isLoaded: true });
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" style={styles.activity} color={'rgba(0,0,0,0.4)'}/>
                    <AppLoading
                        startAsync={this._loadResourcesAsync}
                        onError={this._handleLoadingError}
                        onFinish={this._handleFinishLoading}
                    />
                </View>
            );
        } else {
            if (this.state.loggedIn) {
                return (
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <AppNavigator/>
                    </View>
                );
            } else {
                return (
                    <KeyboardAvoidingView style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <LoginScreen _getReadyImLoggedIn={this._getReadyImLoggedIn}/>
                    </KeyboardAvoidingView>
                );
            }
        }
    }

    _getReadyImLoggedIn = () => {
        this.setState({loggedIn: true});
    };

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = async () => {
        //I need the token to check if the login is valid
        GLOBAL.userToken = await AsyncStorage.getItem('userToken');

        //Set header for content requests
        GLOBAL.headers = {
            "Authorization": "Bearer " + GLOBAL.userToken,
        };

        //Set the user profile as global to avoid many assyncstorage calls
        GLOBAL.userProfile = JSON.parse(await AsyncStorage.getItem('userProfile'));

        //Set push token as global to avoid many assyncstorage calls
        GLOBAL.pushToken = await AsyncStorage.getItem('pushToken');

        //Photos in cache
        GLOBAL.photos = JSON.parse(await AsyncStorage.getItem('photos'));

        //Albums in cache
        GLOBAL.albums = JSON.parse(await AsyncStorage.getItem('albums'));

        //Check if the login is already valid
        await this._checkTokenIsValid();

        //App Is ready to choose the right screen to show
        this.setState({isLoadingComplete: true});
    };

    //Verify the token is already valid
    async _checkTokenIsValid() {
        let token = GLOBAL.userToken;
        let loginApi = new LoginApi();

        await loginApi.verifyAuth(token).then((result) => {
            if (typeof result.status != "undefined") {
                //Set loading
                this.setState({loading: false});

                //Logged in, go to home now
                this._getReadyImLoggedIn();
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainColor
    },
    activity: {
        height: '100%'
    }
});
