import React, {Component} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

//base components
import {
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native";

//Kitten Engine
import {
    RkStyleSheet,
    RkButton,
    RkText
} from 'react-native-ui-kitten';


//Padding for blocks
const paddingValue = 8;

function _calculateItemSize() {
  let {height, width} = Dimensions.get('window');
  return (width - paddingValue * 7) / 2;
}
let size = _calculateItemSize();

export class Block extends Component {
    constructor(props) {
        super(props);

        this.state = {
            route: this.props.route,
            navigate: this.props.navigate
        };
    }

    //Draw Block
    render() {

        //By default only a flex view with components content
        return (
            <TouchableOpacity style={[styles.block, {width: size, height: size}]}
                              onPress={() => {
                                  this.state.navigate(this.state.route.id)
                              }}>
                <View style={styles.blockContent}>
                    <View style={styles.boxIcon}>
                        <Icon name={this.state.route.icon} size={size * 0.5} style={styles.icon} />
                    </View>
                    <View style={styles.boxBottom}>
                        <RkText style={styles.boxTitle}>
                            {this.state.route.title}
                        </RkText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

let styles = RkStyleSheet.create(theme => ({
    block: {
        //borderRadius: 6,
        margin: paddingValue,
        backgroundColor: theme.colors.tile,
        overflow: 'hidden'
    },
    blockContent: {
        flex: 1,
        flexDirection: 'column'
    },
    boxIcon: {
        flex: 1
    },
    icon: {
        color: 'white',
        textAlign: 'center',
        paddingTop: ((size - 30) - (size * 0.5)) / 2
    },
    boxBottom: {
        height: 30,
        backgroundColor: theme.colors.tileTitle
    },
    boxTitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 30
    }
}));