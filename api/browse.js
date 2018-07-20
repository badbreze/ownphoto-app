import Api from "../helpers/Api";

//Global vars
GLOBAL = require('../constants/Globals');

export default class BrowseApi extends Api {
    constructor() {
        // Initialize with your base URL
        super({
            headers: {
                "Authorization": "Bearer " + GLOBAL.userToken,
            }
        });
    }

    index(page, model) {
        return this.GET('/v1/browse/index');
    }

    date(day, month, year) {
        return this.GET('/v1/browse/date', {day: day, month: month, year: year});
    }
};