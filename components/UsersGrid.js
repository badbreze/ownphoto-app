import React from 'react';

import {
    RkStyleSheet,
    RkText,
    RkTextInput,
    RkCard
} from 'react-native-ui-kitten';
import Colors from '../constants/Colors';
import {StyleSheet, ScrollView, RefreshControl, Platform, View, StatusBar, FlatList, TouchableOpacity, Image} from "react-native";
import {paddingValue} from "../constants/Layout";
import {SearchBar} from 'react-native-elements';
import {Icon, ListItem} from 'react-native-elements';
import {Avatar} from './avatar';

const moment = require('moment');

export default class UsersGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            users: this.props.users
        };
    }

    componentWillReceiveProps(props) {
        if (props.users !== this.state.users) {
            this.setState({users: props.users});
        }
    }

    onItemPressed(item) {
        //
    }

    extractItemKey = (item) => `${item.id}`;

    renderItem = ({item}) => (
        <RkCard style={styles.card}>
            <View rkCardHeader>
                <Avatar
                    rkType='small'
                    style={styles.avatar}
                    img={item.avatar}
                />
                <View>
                    <RkText rkType='header4'>{`${item.profile.nome} ${item.profile.cognome}`}</RkText>
                    <RkText rkType='secondary2 hintColor'>{moment().add(item.time, 'seconds').fromNow()}</RkText>
                </View>
            </View>
            <View style={styles.footer} rkCardFooter>
                <SocialBar />
            </View >
        </RkCard>
    );

    render = () => (
        <FlatList
            data={this.state.users}
            renderItem={this.renderItem}
            keyExtractor={this.extractItemKey}
            style={styles.container}
        />
    );
}

const styles = RkStyleSheet.create(theme => ({
    container: {
        backgroundColor: theme.colors.screen.scroll,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    card: {
        marginVertical: 8,
    },
    avatar: {
        marginRight: 16
    },
}));
