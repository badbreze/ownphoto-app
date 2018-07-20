//Storage Initialize
import {storage} from './config/storage';

export default function fetchSecure(url, configuration) {
    //Getting user profile
    let userRecord = storage.get('user');

    //Call passed configuration
    let advancedConfig = configuration;

    if(userRecord && (userRecord.access_token || userRecord.accessToken)) {
        let token = userRecord.access_token ? userRecord.access_token : userRecord.accessToken;

        //Set user token
        advancedConfig.headers["Authorization"] = 'Bearer ' + token;
    }

    return fetch(url, advancedConfig);
}
