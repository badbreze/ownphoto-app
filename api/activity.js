import Api from "../helpers/Api";

//Global vars
GLOBAL = require('../constants/Globals');

export default class ActivityApi extends Api {
    constructor() {
        // Initialize with your base URL
        super({
            headers: {
                "Authorization": "Bearer " + GLOBAL.userToken,
            }
        });
    }

    tutors(materie_id) {
        console.log("Materia: " + materie_id);
        return this.GET('/v1/activity/list-tutors');
    }

    date(day, month, year) {
        return this.GET('/v1/browse/date', {day: day, month: month, year: year});
    }
};