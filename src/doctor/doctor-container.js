import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button, Card, CardHeader, Col, Modal, ModalBody, ModalHeader, Row
} from 'reactstrap';
import PatientForm from "./components/patient-form";
import {withRouter} from "react-router-dom";
import * as API_PATIENT from "./api/doctor-api"
import * as API_CAREGIVER from "./api/caregiver-api"
import * as API_MEDICATION from "./api/medication-api"
import PatientTable from "./components/patient-table";
import MedicationTable from "./components/medication-table";
import CaregiverTable from "./components/caregiver-table";
import MedicationForm from "./components/medication-form";
import CaregiverForm from "./components/caregiver-form";
import MedicationPlanForm from "./components/medicationPlan-form";

const addbuttonstyle = {
    color: "#000000",
    backgroundColor: "#0f8809",
    textAlign: "center",
    fontFamily: "Arial"
};

const columnstyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};


class DoctorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleInsertPatientForm = this.toggleInsertPatientForm.bind(this);
        this.toggleInsertCaregiverForm = this.toggleInsertCaregiverForm.bind(this);
        this.toggleInsertMedicationForm = this.toggleInsertMedicationForm.bind(this);
        this.toggleAddMedicationPlan = this.toggleAddMedicationPlan.bind(this);
        this.reloadInsertPatient = this.reloadInsertPatient.bind(this);
        this.reloadInsertCaregiver = this.reloadInsertCaregiver.bind(this);
        this.reloadInsertMedication = this.reloadInsertMedication.bind(this);
        this.reloadAddMedicationPlan = this.reloadAddMedicationPlan.bind(this);
        this.state = {
            patientOn: true,
            caregiverOn: false,
            medicationOn: false,
            insertSelectedPatient: false,
            insertSelectedCaregiver: false,
            insertSelectedMedication: false,
            addMedicationPlan: false,
            collapseForm: false,
            patientTableData: [],
            caregiverTableData: [],
            medicationTableData: [],
            availablePatients: [],
            isPatientLoaded: false,
            isCaregiverLoaded: false,
            isMedicationLoaded: false,
            errorStatus: 0,
            error: null,
            text: 'Patients'
        };
    }

    componentDidMount() {
        this.fetchPatients();
        this.fetchCaregivers();
        this.fetchMedications();
    }

    fetchPatients() {
        return API_PATIENT.getPatients((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    patientTableData: result,
                    isPatientLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchCaregivers() {
        return API_CAREGIVER.getCaregivers((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    caregiverTableData: result,
                    isCaregiverLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    fetchMedications() {
        return API_MEDICATION.getMedications((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    medicationTableData: result,
                    isMedicationLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleInsertPatientForm() {
        this.setState({insertSelectedPatient: !this.state.insertSelectedPatient});
    }

    toggleInsertCaregiverForm() {
        this.setState({insertSelectedCaregiver: !this.state.insertSelectedCaregiver});

    }

    toggleInsertMedicationForm() {
        this.setState({insertSelectedMedication: !this.state.insertSelectedMedication});
    }

    toggleAddMedicationPlan() {
        this.setState({addMedicationPlan: !this.state.addMedicationPlan});
    }

    showPatients() {
        if (!this.state.patientOn) {
            this.setState({patientOn: true});
        }
        this.setState({caregiverOn: false});
        this.setState({medicationOn: false});
        this.setState({isPatientLoaded: false});
        this.setState({text: 'Patients'});
        this.fetchPatients();
    }

    showCaregivers() {
        if (!this.state.caregiverOn) {
            this.setState({caregiverOn: true});
        }
        this.setState({patientOn: false});
        this.setState({medicationOn: false});
        this.setState({isCaregiverLoaded: false});
        this.setState({text: 'Caregivers'});
        this.fetchCaregivers();
    }

    showMedications() {
        if (!this.state.medicationOn) {
            this.setState({medicationOn: true});
        }
        this.setState({patientOn: false});
        this.setState({caregiverOn: false});
        this.setState({isMedicationLoaded: false});
        this.setState({text: 'Medications'});
        this.fetchMedications();
    }

    reloadInsertPatient() {
        this.setState({
            isPatientLoaded: false
        });
        this.toggleInsertPatientForm();
        this.fetchPatients();
    }

    reloadInsertCaregiver() {
        this.setState({
            isCaregiverLoaded: false
        });
        this.toggleInsertCaregiverForm();
        this.fetchCaregivers();
    }

    reloadInsertMedication() {
        this.setState({
            isMedicationLoaded: false
        });
        this.toggleInsertMedicationForm();
        this.fetchMedications();
    }

    reloadAddMedicationPlan() {
        this.toggleAddMedicationPlan();
        this.fetchPatients();
        this.fetchCaregivers();
    }

    getAvailablePatients() {
        if (this.state.insertSelectedCaregiver === true) {
            let patientsStart = this.state.patientTableData;
            let caregivers = this.state.caregiverTableData;
            let patientsID = [];
            let finalPatients = [];
            for (let i = 0; i < caregivers.length; i++) {
                if (caregivers[i].patients != null) {
                    for (let j = 0; j < caregivers[i].patients.length; j++) {
                        patientsID.push(caregivers[i].patients[j].id);
                    }
                }
            }
            for (let k = 0; k < patientsStart.length; k++) {
                if (patientsID.indexOf(patientsStart[k].id) === -1)
                    finalPatients.push(patientsStart[k]);
            }
            return finalPatients;
        } else
            return [];

    }

    getAvailablePatientsForMedicationPlan() {
        if (this.state.addMedicationPlan === true) {
            let patientsStart = this.state.patientTableData;
            let finalPatients = [];
            for (let i = 0; i < patientsStart.length; i++) {
                if (patientsStart[i].medicationPlan.treatmentPeriod === 0) {
                    finalPatients.push(patientsStart[i]);
                }
            }
            return finalPatients;
        } else
            return [];

    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> {'Doctor\'s current operation: ' + this.state.text} </strong>
                    <Button className="btn navbar-btn btn-danger" name="logout" id="logout"
                            value="Log Out"
                            onClick={() => this.props.history.push({
                                pathname: '/'
                            })}>
                        Log Out
                    </Button>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 4}}>
                            <Button color="primary" onClick={() => this.showPatients()}>Patients</Button>
                            {" "}
                            <Button color="primary" onClick={() => this.showCaregivers()}>Caregivers</Button>
                            {" "}
                            <Button color="primary" onClick={() => this.showMedications()}>Medications</Button>
                            {" "}
                            <Button color="primary" onClick={this.toggleAddMedicationPlan}>Add medication
                                plan</Button>

                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 2}}>
                            {this.state.isPatientLoaded && this.state.patientOn &&
                            <PatientTable tableData={this.state.patientTableData}/>}

                            {this.state.isCaregiverLoaded && this.state.caregiverOn &&
                            <CaregiverTable tableData={this.state.caregiverTableData}/>}

                            {this.state.isMedicationLoaded && this.state.medicationOn &&
                            <MedicationTable tableData={this.state.medicationTableData}/>}

                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={columnstyle}>
                            <br></br>
                            {this.state.patientOn &&
                            <Button style={addbuttonstyle} onClick={this.toggleInsertPatientForm}>Add patient</Button>}
                            {this.state.caregiverOn &&
                            <Button style={addbuttonstyle} onClick={this.toggleInsertCaregiverForm}>Add
                                caregiver</Button>}
                            {this.state.medicationOn &&
                            <Button style={addbuttonstyle} onClick={this.toggleInsertMedicationForm}>Add
                                medication</Button>}
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.insertSelectedPatient} toggle={this.toggleInsertPatientForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertPatientForm}>Add a new patient</ModalHeader>
                    <ModalBody>
                        <PatientForm reloadHandler={this.reloadInsertPatient}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.insertSelectedCaregiver} toggle={this.toggleInsertCaregiverForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertCaregiverForm}>Add a new caregiver</ModalHeader>
                    <ModalBody>
                        <CaregiverForm reloadHandler={this.reloadInsertCaregiver}
                                       availablePatients={this.getAvailablePatients()}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.insertSelectedMedication} toggle={this.toggleInsertMedicationForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleInsertMedicationForm}>Add a new medication</ModalHeader>
                    <ModalBody>
                        <MedicationForm reloadHandler={this.reloadInsertMedication}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.addMedicationPlan} toggle={this.toggleAddMedicationPlan}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleAddMedicationPlan}>Add a medication plan</ModalHeader>
                    <ModalBody>
                        <MedicationPlanForm reloadHandler={this.reloadAddMedicationPlan}
                                            availablePatients={this.getAvailablePatientsForMedicationPlan()}
                                            availableMedications={this.state.medicationTableData}/>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

export default withRouter(DoctorContainer);
