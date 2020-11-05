import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    patient: '/patient/account/'
};

function getPatientById(accountID, callback) {
    let request = new Request(HOST.backend_api + endpoint.patient + accountID, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getPatientById,
};
