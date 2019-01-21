import React from 'react';
import {
    ScrollView,
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RkText} from 'react-native-ui-kitten';
import {Avatar} from '../components/avatar';
import {UtilStyles} from '../style/Styles';

export default class ProfileScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Profilo'
    });

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <ScrollView
                automaticallyAdjustContentInsets={true}
                style={UtilStyles.container}>
                <View style={[UtilStyles.section, UtilStyles.bordered]}>
                    <RkText rkType='header'>Base avatar</RkText>
                    <View style={UtilStyles.columnContainer}>
                        <Avatar source={require('../assets/images/repetita.png')} name='Carole Blundon'/>
                        <Avatar source={require('../assets/images/background.jpg')} name='Edward Storton'/>
                    </View>

                </View>

                <View style={[UtilStyles.section, UtilStyles.bordered]}>
                    <RkText rkType='header'>Avatar with description</RkText>
                    <View style={UtilStyles.columnContainer}>
                        <Avatar
                            source={require('../assets/images/background.jpg')}
                            name='Nataly Rover'
                            description='Secondary text'
                        />
                        <Avatar
                            source={require('../assets/images/background.jpg')}
                            name='Alex Gilbert'
                            description='Secondary text'
                        />
                    </View>
                </View>

                <View style={[UtilStyles.section]}>
                    <RkText rkType='header'>Round avatar with description</RkText>
                    <View style={UtilStyles.columnContainer}>
                        <Avatar
                            rkType='round'
                            source={require('../assets/images/background.jpg')}
                            name='Helen Milpon'
                            description='Secondary text'
                        />
                        <Avatar
                            rkType='round'
                            source={require('../assets/images/background.jpg')}
                            name='Laura Meitner'
                            description='Secondary text'
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}
