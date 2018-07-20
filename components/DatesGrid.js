import React from 'react';
import {Icon} from 'expo';

import Colors from '../constants/Colors';
import {StyleSheet, ScrollView, RefreshControl, Platform, View, StatusBar, FlatList} from "react-native";
import DayGrid from "./DayGrid";
import {paddingValue} from "../constants/Layout";
import {SearchBar} from 'react-native-elements';

export default class DatesGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            dates: this.props.dates
        };
    }

    componentWillReceiveProps(props) {
        if (props.dates !== this.state.dates) {
            this.setState({dates: props.dates});
        }
    }

    render() {
        //By default only a flex view with components content
        return (
            <FlatList style={styles.list}
                      data={this.state.dates}
                      renderItem={({item}) => <DayGrid date={item} KEY={item.id}/>}
                      keyExtractor={this._keyExtractor}
            />
        );
    }

    _keyExtractor = (item, index) => item.id;

    _onRefresh() {
        //
    }
}

const styles = StyleSheet.create({
    root: {
        padding: paddingValue,
        paddingTop: paddingValue * 3,
        paddingBottom: paddingValue * 3
    },
    list: {
        paddingTop: StatusBar.currentHeight
    },
    temp: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
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
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    }
});