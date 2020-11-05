import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    login: '/account/loginCredentials/'
};


function postLogin(account, callback) {
    let request = new Request(HOST.backend_api + endpoint.login + account.userName + "/" + account.password, {
        method: 'GET'
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    postLogin,
};
