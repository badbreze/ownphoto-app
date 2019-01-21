import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MessagesScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Messaggi',
    });

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <View>
                <Text>{'Chat'}</Text>
            </View>
        );
    }
}
