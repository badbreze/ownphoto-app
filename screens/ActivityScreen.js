import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ActivityScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Attività'
    });

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <View>
                <Text>{'Dettaglio Activity'}</Text>
            </View>
        );
    }
}
