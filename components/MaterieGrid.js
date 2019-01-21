import React from 'react';

import Colors from '../constants/Colors';
import {StyleSheet, ScrollView, RefreshControl, Platform, View, StatusBar, FlatList} from "react-native";
import {paddingValue} from "../constants/Layout";
import {SearchBar} from 'react-native-elements';
import { Icon, Avatar, ListItem } from 'react-native-elements';

export default class MaterieGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            materie: this.props.materie
        };
    }

    componentWillReceiveProps(props) {
        if (props.materie !== this.state.materie) {
            this.setState({materie: props.materie});
        }
    }

    onPressMateria(subjectId) {
        console.log("Subject: " +  subjectId);
        this.props.navigation.navigate('Peoples', {materie_id: subjectId})
    }

    render() {
        //By default only a flex view with components content
        return (
            <FlatList style={styles.list}
                      data={this.state.materie}
                      renderItem={({item}) => <ListItem
                          key={item.id}
                          title={item.name}
                          subtitle={item.description}
                          onPress={() => this.onPressMateria(item.id)}
                          leftIcon={{name:item.icon?item.icon:'star'}}
                      />}
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
        //paddingTop: StatusBar.currentHeight
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