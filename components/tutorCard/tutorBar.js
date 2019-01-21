import React from 'react';
import {View} from 'react-native';
import {
    RkText,
    RkButton,
    RkComponent,
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export class TutorBar extends RkComponent {
    componentName = 'SocialBar';

    typeMapping = {
        container: {},
        section: {},
        icon: {},
        label: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.likes || 0,
            comments: this.props.comments || 0,
            shares: this.props.shares || 0,
        };
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
                            <Icon name={'thumbs-up'}/>
                        </RkText>
                        <RkText rkType='primary primary4' style={label}>{likes}{' Positivi'}</RkText>
                    </RkButton>
                </View>
                <View style={section}>
                    <RkButton rkType='clear'>
                        <RkText rkType='awesome hintColor' style={icon}>
                            <Icon name={'thumbs-down'}/>
                        </RkText>
                        <RkText rkType='primary4 hintColor' style={label}>{comments}{' Negativi'}</RkText>
                    </RkButton>
                </View>
                <View style={section}>
                    <RkButton rkType='clear'>
                        <RkText rkType='awesome hintColor' style={icon}>
                            <Icon name={'users'}/>
                        </RkText>
                        <RkText rkType='primary4 hintColor' style={label}>{shares}{' Alunni'}</RkText>
                    </RkButton>
                </View>
            </View>
        );
    }
}
