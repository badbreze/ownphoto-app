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

    materie(page, model) {
        return this.GET('/v1/browse/list-materie');
    }

    tutors(id) {
        return this.GET('/v1/browse/list-tutors', {materie_id: id});
    }

    date(day, month, year) {
        return this.GET('/v1/browse/date', {day: day, month: month, year: year});
    }
};