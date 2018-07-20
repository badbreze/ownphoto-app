//Base components
import {
    Alert
} from "react-native";

export default function catchError(title, result) {
    Alert.alert(title, result.message, [
        {text: 'OK'},
    ]);
}