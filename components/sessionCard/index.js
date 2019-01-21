import React from 'react';
import {View} from 'react-native';
import {
    RkText,
    RkButton,
    RkComponent,
    RkCard,
    RkStyleSheet,
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from '../avatar';
import {SessionBar} from './sessionBar';

const moment = require('moment');

export default class SessionCard extends RkComponent {
    componentName = 'SessionCard';

    constructor(props) {
        super(props);
        this.state = {
            activity: this.props.activity,
        };
    }

    render() {
        return (
            <RkCard style={styles.card}>
                <View rkCardHeader>
                    <Avatar
                        rkType='small'
                        style={styles.avatar}
                        img={this.state.activity.avatar}
                    />
                    <View>
                        <RkText rkType='header4'>{`${this.state.activity.profile.nome} ${this.state.activity.profile.cognome}`}</RkText>
                        <RkText rkType='secondary2 hintColor'>{moment().add(this.state.activity.time, 'seconds').fromNow()}</RkText>
                    </View>
                </View>
                <View style={styles.footer} rkCardFooter>
                    <SessionBar activity={this.state.activity} navigation={this.props.navigation} />
                </View>
            </RkCard>
        );
    }
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
