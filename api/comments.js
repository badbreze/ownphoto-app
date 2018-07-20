import Api from "../helpers/Api";

//Global vars
GLOBAL = require('../config/Globals');

export default class CommentsApi extends Api {
    constructor() {
        // Initialize with your base URL
        super({
            headers: {
                "Authorization": "Bearer " + GLOBAL.userToken,
            }
        });
    }

    commentsList(page, model, id) {
        return this.POST('/mobilebridge/v1/comments/item-comments', {offset: page, namespace: model, id: id});
    }

    pushComment(comment, model, id) {
        return this.POST('/mobilebridge/v1/comments/item-push-comment', {comment_text: comment, namespace: model, id: id});
    }
};