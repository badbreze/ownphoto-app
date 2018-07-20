import React from 'react';
import {Icon} from 'expo';

import Colors from '../constants/Colors';
import {StyleSheet, View, Text, AsyncStorage} from "react-native";
import PhotoBlock from "./PhotoBlock";
import BrowseApi from "../api/browse";
import {blockSizes, paddingValue} from "../constants/Layout";

export default class DayGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: this.props.date,
            photos: null,
        };
    }

    async componentDidMount() {
        //Go away on photos loaded
        if(this.state.photos) {
            return true;
        }

        //Identiffier for photos of this day
        let storageIdentiffier = 'photoDay_' + this.state.date.id;

        //Load data from asyncStorage
        let inStorageDay = await AsyncStorage.getItem(storageIdentiffier);

        if(!inStorageDay) {
            let browseApi = new BrowseApi();
            let dateData = this.state.date;

            await browseApi.date(dateData.photo_day, dateData.photo_month, dateData.photo_year).then((result) => {
                //Store photos localy
                AsyncStorage.setItem(storageIdentiffier, result);

                console.log(result,'Fetched');

                //Set data
                this.setState({
                    photos: result
                });
            });
        } else {
            //Set data and stop loader
            this.setState({
                photos: inStorageDay
            });
        }
    }

    render() {
        //Resulting photos of a day
        let items = [];

        if(!this.state.photos) {
            //Number or photos in this day
            let numPhotos = this.state.date ? parseInt(this.state.date.photo_count) : 0;

            //Create the number of blocks by numphotos
            for (let index = 0; index < numPhotos; index++) {
                items.push(<PhotoBlock style={styles.block} key={index}/>);
            }
        } else {
            //Get enabled Items and render block
            let items = this.state.photos.map(function (route, index) {
                return (
                    <PhotoBlock style={styles.block} key={index}/>
                )
            });
        }

        //By default only a flex view with components content
        return (
            <View style={styles.root}>
                <View style={styles.title}>
                    <Text>{this.state.date.photo_day}-{this.state.date.photo_month}-{this.state.date.photo_year}</Text>
                </View>
                <View style={styles.blocksContainer}>
                    {items}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        margin: paddingValue,
    },
    title: {
        margin: paddingValue,
    },
    block: {
        flex: 1,
        flexDirection: "column",
        margin: paddingValue,
        justifyContent: "space-between"
    },
    blocksContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});