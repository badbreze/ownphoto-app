import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {WebBrowser} from 'expo';
import LoginApi from "../api/login";
import Colors from "../constants/Colors";

//Global vars
GLOBAL = require('../constants/Globals');

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
        }

        this.signInNow = this.signInNow.bind(this);
    }

    //confirm remove pet
    async signInNow() {
        //Set loading
        this.setState({loading: true});

        let username = this.state.username;
        let password = this.state.password;
        let loginApi = new LoginApi();

        await loginApi.login(username, password).then((result) => {
            //Set loading
            this.setState({loading: false});

            if (typeof result.username == "undefined") {
                Alert.alert("Impossibile Accedere", result.message, [
                    {text: 'Password Dimenticata?', onPress: () => alert("Funzione Disabilitata")},
                    {text: 'OK'},
                ]);
            } else {
                //Save data to local storage
                this._storeLoginData(result);

                //Logged in, go to home now
                this.props._getReadyImLoggedIn();
            }
        });
    }

    async _storeLoginData(data) {
        //Store entire profile
        GLOBAL.userProfile = JSON.stringify(data);
        await AsyncStorage.setItem('userProfile', GLOBAL.userProfile);

        //Store token apart
        GLOBAL.userToken = data.access_token ? data.access_token : data.accessToken;
        await AsyncStorage.setItem('userToken', GLOBAL.userToken);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                {(this.state.loading) && (
                    <ActivityIndicator size="large" style={styles.activity} color={'rgba(0,0,0,0.4)'}/>
                )}
                {(!this.state.loading) && (
                    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.helpContainer}>
                            <Text style={styles.helpLinkText}>Repetita</Text>
                        </View>

                        <View style={styles.welcomeContainer}>
                            <Image
                                source={require('../assets/images/repetita.png')}
                                style={styles.welcomeImage}
                            />
                        </View>

                        <View style={styles.helpContainer}>
                            <Text style={styles.descriptionText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum, sem ut fringilla aliquet, ante lorem faucibus elit, quis scelerisque quam orci non nunc
                            </Text>
                            <Text style={styles.descriptionText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum, sem ut fringilla aliquet, ante lorem faucibus elit, quis scelerisque quam orci non nunc
                            </Text>
                            <Text style={styles.descriptionText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum, sem ut fringilla aliquet, ante lorem faucibus elit, quis scelerisque quam orci non nunc
                            </Text>
                            <Text style={styles.descriptionText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum, sem ut fringilla aliquet, ante lorem faucibus elit, quis scelerisque quam orci non nunc
                            </Text>
                        </View>
                    </ScrollView>
                )}
                {(!this.state.loading) && (
                    <View style={styles.tabBarInfoContainer}>
                        <Text style={styles.haveAppText}>Already Have and Account?</Text>

                        <TextInput style={styles.input}
                                   autoCapitalize="none"
                                   value={this.state.username}
                                   onChangeText={(text) => this.setState({username: text})}
                                   ref={(input) => this.emailInput = input}
                                   onSubmitEditing={() => this.passwordInput.focus()}
                                   autoCorrect={false}
                                   keyboardType='email-address'
                                   returnKeyType="next"
                                   placeholder='Username or Email'
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   placeholderTextColor='rgba(225,225,225,0.7)'/>

                        <TextInput style={styles.input}
                                   returnKeyType="go"
                                   value={this.state.password}
                                   onChangeText={(text) => this.setState({password: text})}
                                   ref={(input) => this.passwordInput = input}
                                   placeholder='Password'
                                   placeholderTextColor='rgba(225,225,225,0.7)'
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   secureTextEntry/>

                        <TouchableOpacity style={styles.buttonContainer} onPress={this.signInNow}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.curtesyColor
    },
    contentContainer: {
        paddingTop: 30,
    },
    activity: {
        height: '100%'
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 20,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLinkText: {
        fontSize: 34,
        color: 'rgba(255,255,255,0.9)',
    },
    descriptionText: {
        fontSize: 12,
        color: '#FFFFFF',
        padding: 12
    },
    haveAppText: {
        fontSize: 12,
        color: '#FFFFFF',
        paddingBottom: 12
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: '700'
    }
});
