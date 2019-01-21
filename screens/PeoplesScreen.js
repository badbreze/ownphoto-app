import React from 'react';
import {
    ScrollView,
    Text,
    FlatList
} from 'react-native';
import {WebBrowser} from 'expo';
import LoginApi from "../api/login";
import {paddingValue} from "../constants/Layout";
import BrowseApi from "../api/browse";
import {Ionicons} from '@expo/vector-icons';
import {DrawerActions} from 'react-navigation-drawer';
import {Icon, List, Avatar, ListItem, SearchBar} from 'react-native-elements';
import UsersGrid from "../components/UsersGrid";
import TutorCard from "../components/tutorCard";
import {RkStyleSheet} from "react-native-ui-kitten";

//Global vars
GLOBAL = require('../constants/Globals');

export default class MaterieScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Tutors',
    });

    constructor(props) {
        super(props);

        let navParams = this.props.navigation.state.params;

        console.log(this.props);

        this.state = {
            materie_id: navParams.materie_id,
            users: []
        }
    }

    //confirm remove pet
    async loadItems() {
        //Set loading
        this.setState({loading: true});

        let browseApi = new BrowseApi();

        await browseApi.tutors(this.state.materie_id).then((result) => {
            //Set data and stop loader
            this.setState({
                loading: false,
                users: result
            });
        });
    }

    componentDidMount() {
        this.loadItems();
    }

    renderUserCard = ({item}) => (
        <TutorCard naviation={this.props.navigation} user={item} />
    );

    extractItemKey = (item) => `${item.id}`;

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderUserCard}
                    keyExtractor={this.extractItemKey}
                    onPress={() => {}}
                />
            </ScrollView>
        );
    }
}

const styles = RkStyleSheet.create(theme => ({
    container: {
        backgroundColor: theme.colors.screen.scroll,
        paddingVertical: 8,
        paddingHorizontal: 10,
    }
}));
