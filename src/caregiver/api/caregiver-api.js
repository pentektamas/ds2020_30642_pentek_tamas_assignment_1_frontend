import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    caregiver: '/caregiver/account/'
};


function getCaregiverById(accountID, callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver + accountID, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getCaregiverById,
};
