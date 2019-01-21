import React from 'react';
import {View} from 'react-native';
import {
    RkText,
    RkButton,
    RkComponent,
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export class SessionBar extends RkComponent {
    componentName = 'SessionBar';

    typeMapping = {
        container: {},
        section: {},
        icon: {},
        label: {},
    };

    constructor(props) {
        super(props);
console.log(this.props.navigation);
        this.state = {
            likes: this.props.likes || 0,
            comments: this.props.comments || 0,
            shares: this.props.shares || 0,
            activity: this.props.activity
        };
    }

    onPressDetails(activity) {
        console.log("TESTTTTT");
        console.log(this.props);
        this.props.navigation.navigate('Detail', {id: activity.id})
    }

    render() {
        const {
            container, section, icon, label,
        } = this.defineStyles();

        const likes = this.state.likes + (this.props.showLabel ? ' Likes' : '');
        const comments = this.state.comments + (this.props.showLabel ? ' Comments' : '');
        const shares = this.state.shares + (this.props.showLabel ? ' Shares' : '');

        return (
            <View style={container}>
                <View style={section}>
                    <RkButton rkType='clear'>
                        <RkText rkType='awesome primary' style={icon}>
                            <Icon name={'sticky-note'}/>
                        </RkText>
                        <RkText rkType='primary primary4' style={label}>{likes}{' Annotazioni'}</RkText>
                    </RkButton>
                </View>
                <View style={section}></View>
                <View style={section}>
                    <RkButton rkType='clear'>
                        <RkText onPress={() => this.onPressDetails(this.state.activity)} rkType='primary primary4' style={label}>{'Dettagli'}</RkText>
                    </RkButton>
                </View>
            </View>
        );
    }
}