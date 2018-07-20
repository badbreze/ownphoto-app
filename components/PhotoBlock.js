import React from 'react';
import {Icon} from 'expo';
import Colors from '../constants/Colors';
import {View, StyleSheet, TouchableOpacity, Text, Image} from "react-native";
import {blockSizes, paddingValue} from "../constants/Layout";
import { Viewport } from '@skele/components';

export default class PhotoBlock extends React.Component {
    constructor(props) {
        super(props);

        let id = typeof this.props.id == 'undefined' ? null : this.props.id;

        this.state = {
            ready: null,
            url: 'http://via.placeholder.com/350x350',
            visible: false,
            identiffier: id
        };
    }

    componentDidMount() {
        console.log(this.state.identiffier, "FotoMont");
        /*let browseApi = new BrowseApi();

        browseApi.index().then((result) => {
            //Set data and stop loader
            this.setState({
                photos: result
            });
        });*/
    }
    componentWillUnmount() {
        console.log(this.state.identiffier, "FotoDissssm");
    }

    //Draw Block
    render() {
        //The placeholder block
        /*const Placeholder = () => <View style={[styles.block, {width: blockSizes, height: blockSizes}]} />;

        //The viewport component
        const ViewPortBlock = Viewport.Aware(
            Viewport.WithPlaceholder(Image, Placeholder)
        );*/

        //By default only a flex view with components content
        return (
            <Image
                source={{uri: this.state.url}}
                style={[styles.image, {width: blockSizes, height: blockSizes}]}
                preTriggerRatio={0.5}
            />
        );
    }
}

const styles = StyleSheet.create({
    block: {
        //borderRadius: 6,
        margin: paddingValue,
        backgroundColor: Colors.curtesyColor,
        overflow: 'hidden'
    },
    image: {
        margin: paddingValue,
        backgroundColor: Colors.curtesyColor,
        overflow: 'hidden'
    }
});