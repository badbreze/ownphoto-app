import {serverUrl, serverProtocol} from "../constants/Configs.js";

export default class Api {
    constructor({headers = {}} = {}) {
        if (!serverUrl)
            throw new Error('missing baseUrl');

        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        //Merge Values from header
        Object.assign(this.headers, headers);

        //Store base url
        this.baseUrl = serverProtocol +'://'+ serverUrl;
    }

    _fullRoute(url) {
        return `${this.baseUrl}${url}`;
    }

    async _fetch(route, method, body, isQuery = false) {
        if (!route)
            throw new Error('Route is undefined');

        var fullRoute = this._fullRoute(route);

        if (isQuery && body) {
            var qs = require('qs');
            const query = qs.stringify(body);
            fullRoute = `${fullRoute}?${query}`;
            body = undefined;
        }

        let opts = {
            method,
            headers: this.headers
        };

        if (body) {
            Object.assign(opts, {body: JSON.stringify(body)});
        }

        //In case of error fill it
        let error;

        try {
          let response = await fetch(fullRoute, opts);

          if (response.status == 200) {
            let responseText = await response.text();
            
            try {
                return JSON.parse(responseText);
            } catch (e) {
                return responseText;
            }
          } else {
              try {
                  let errorText = await response.text();
                  let errorJSON = JSON.parse(errorText);

                  error = errorJSON["error-message"] || errorText;
              } catch (e) {
                  error = errorText || "";
              }

              throw {
                  error: new Error(error),
                  stats: response.status,
                  code: 104
              }
          }
        } catch (e) {
            console.log('There has been a problem with your fetch operation: ' + error);
            throw error;
        }
    }

    GET(route, query) {
        return this._fetch(route, 'GET', query, true);
    }

    POST(route, body) {
        return this._fetch(route, 'POST', body);
    }
}