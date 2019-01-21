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
import {TutorBar} from './tutorBar';

const moment = require('moment');

export default class TutorCard extends RkComponent {
    componentName = 'TutorCard';

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
        };
    }

    render() {
        return (
            <RkCard style={styles.card}>
                <View rkCardHeader>
                    <Avatar
                        rkType='small'
                        style={styles.avatar}
                        img={this.state.user.avatar}
                    />
                    <View>
                        <RkText rkType='header4'>{`${this.state.user.profile.nome} ${this.state.user.profile.cognome}`}</RkText>
                        <RkText rkType='secondary2 hintColor'>{moment().add(this.state.user.time, 'seconds').fromNow()}</RkText>
                    </View>
                </View>
                <View style={styles.footer} rkCardFooter>
                    <TutorBar/>
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
