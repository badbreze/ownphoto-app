import { Platform } from "react-native";
import Api from "../helpers/Api";

//Global vars
GLOBAL = require('../constants/Globals');

export default class LoginApi extends Api {
    login(username, password) {
        const os = Platform.OS === 'ios' ? 'ios' : 'android';

        return this.POST('/v1/security/login', {
            username: username,
            password: password,
            os: os,
            token: GLOBAL.pushToken
        });
    }

    verifyAuth(token) {
        return this.POST('/v1/security/verify-auth', {token: token});
    }
};