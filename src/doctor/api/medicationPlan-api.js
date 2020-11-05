import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    doctor: '/doctor/',
    medicationPlan: 'medicationplan/'
};


function addMedicationPlan(medicationPlan, patientID, callback) {
    let request = new Request(HOST.backend_api + endpoint.doctor + endpoint.medicationPlan + patientID, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicationPlan)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    addMedicationPlan
};
