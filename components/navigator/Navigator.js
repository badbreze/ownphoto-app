import React, {Component} from "react";

//base components
import {
    View,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    Dimensions
} from "react-native";

//Kitten Engine
import {
    RkStyleSheet,
    RkTheme,
    RkButton,
    RkText
} from 'react-native-ui-kitten';

//Block
import {Block} from "./Block";

//Padding for blocks
const paddingValue = 10;

export class Navigator extends Component {
    constructor(props) {
        super(props);

        //Define temporari routes var
        let routes = this.props.routes;

        this.state = {
            routes: routes ? routes : [],
            userName: "",
            params: null
        };
    }

    //Dash Router
    render() {

        //Navigation element
        const {navigate} = this.props.navigation;

        //Get enabled Items and render block
        let items = this.state.routes.map(function (route, index) {
            return (
                <Block style={styles.block} key={index} route={route} navigate={navigate}/>
            )
        });

        //By default only a flex view with components content
        return (
            <ImageBackground style={styles.bgContainer} source={require('../../assets/images/background.jpg')}>
                <ScrollView style={styles.root} contentContainerStyle={styles.rootContainer}>
                    {items}
                </ScrollView>
            </ImageBackground>
        );
    }
}

let styles = RkStyleSheet.create(theme => ({
    root: {
        padding: paddingValue
    },
    rootContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    block: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    blockList: {
        paddingTop: 40,
        marginBottom: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    bgContainer: {
        flex: 1,
        width: null,
        height: null,
    }
}));