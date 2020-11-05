import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    doctor: '/doctor/',
    medication: 'medication/'
};

function getMedications(callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + "medications", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationById(medicationId, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.medication + medicationId, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function insertMedication(medication, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.medication + 'insert', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function updateMedication(medication, id, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.medication + 'update/' + id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication)
    });

    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteMedication(medicationID, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.medication + "delete/" + medicationID, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicationID)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


export {
    getMedicationById,
    insertMedication,
    updateMedication,
    getMedications,
    deleteMedication
};
