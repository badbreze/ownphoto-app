import Api from "../helpers/Api";

export default class ModuleApi extends Api {
    login(username, password) {
        return this.POST('/mobilebridge/v1/security/login', {username: username, password: password});
    }
};