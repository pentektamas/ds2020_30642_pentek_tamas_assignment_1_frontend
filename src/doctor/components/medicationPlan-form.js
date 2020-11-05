import React from 'react';
import validate from "./validators/doctor-validators";
import Button from "react-bootstrap/Button";
import * as API_MEDIPLAN from "../api/medicationPlan-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Input, Row} from "reactstrap";
import {FormGroup, Label} from 'reactstrap';
import ReactTable from "react-table";

const addbuttonstyle = {
    color: "#000000",
    backgroundColor: "#0f8809",
    textAlign: "center",
    fontFamily: "Arial"
};

const mystyle = {
    color: "#000000",
    backgroundColor: "#afafaf",
    textAlign: "center",
    fontFamily: "Arial"
};


class MedicationPlanForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.availablePatients = this.props.availablePatients;
        this.availableMedications = this.props.availableMedications;
        this.selectedMedications = [];

        this.state = {

            selectedPatient: null,
            selectedMedication: null,

            errorStatus: 0,
            error: null,

            formIsValid: false,
            selected: null,

            formControls: {
                treatmentPeriod: {
                    value: '',
                    placeholder: 'Treatment period',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 1,
                        isRequired: true
                    }
                }
            }
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerMedicationPlan(medicationPlan, id) {
        return API_MEDIPLAN.addMedicationPlan(medicationPlan, id, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medicationPlan with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {

        let medicationPlan = {
            treatmentPeriod: this.state.formControls.treatmentPeriod.value,
            medications: this.selectedMedications,
        };

        this.registerMedicationPlan(medicationPlan, this.state.selectedPatient.id);
    }

    createPatientsColumns() {
        const columns1 = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Birthdate',
                accessor: 'birthdate',
            },

            {
                Header: 'Select',
                accessor: 'id',
                Cell: addCell => (
                    <button style={addbuttonstyle}
                            onClick={() => this.addPatientById(addCell.original.id)}>
                        Add
                    </button>
                )
            }
        ];
        return columns1;
    }

    createMedicationColumns() {
        const columns2 = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Side effects',
                accessor: 'sideEffects',
            },
            {
                Header: 'Dosage',
                accessor: 'dosage',
            },
            {
                Header: 'Select',
                accessor: 'id',
                Cell: addCell => (
                    <button style={addbuttonstyle}
                            onClick={() => this.addMedicationById(addCell.original.id)}>
                        Add

                    </button>
                )
            }
        ];
        return columns2;
    }

    addPatientById(id) {
        let addedPatient = null;
        for (let i = 0; i < this.availablePatients.length; i++) {
            if (id === this.availablePatients[i].id) {
                addedPatient = this.availablePatients[i];
            }
        }
        this.setState({selectedPatient: addedPatient});
        this.availablePatients = [];
    }

    addMedicationById(id) {
        let addedMedication = null;
        for (let i = 0; i < this.availableMedications.length; i++) {
            if (id === this.availableMedications[i].id) {
                addedMedication = this.availableMedications[i];
            }
        }
        this.setState({selectedMedication: addedMedication});
        this.selectedMedications.push(addedMedication);
        const newList2 = this.availableMedications.filter((item) => item.id !== addedMedication.id);
        this.availableMedications = newList2;
    }

    render() {
        return (
            <div>

                <FormGroup>
                    <Label> Select a patient: </Label>
                    <ReactTable
                        elementId={"table"}
                        data={this.availablePatients}
                        columns={this.createPatientsColumns()}
                        pageSize={5}
                        style={mystyle}
                        showPageSizeOptions={false}


                    />
                </FormGroup>

                <FormGroup>
                    <Label> Select medications: </Label>
                    <ReactTable
                        data={this.availableMedications}
                        columns={this.createMedicationColumns()}
                        pageSize={5}
                        style={mystyle}
                        showPageSizeOptions={false}

                    />
                </FormGroup>

                <FormGroup id='treatmentPeriod'>
                    <Label for='treatmentPeriodField'> Treatment period: </Label>
                    <Input name='treatmentPeriod' id='treatmentPeriodField'
                           placeholder={this.state.formControls.treatmentPeriod.placeholder}
                           type='number'
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.treatmentPeriod.value}
                           touched={this.state.formControls.treatmentPeriod.touched ? 1 : 0}
                           valid={this.state.formControls.treatmentPeriod.valid}
                           required
                    />
                    {this.state.formControls.treatmentPeriod.touched && !this.state.formControls.treatmentPeriod.valid &&
                    <div className={"error-message row"}> * Treatment period error </div>}
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}> Add
                            medication plan </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        );
    }
}

export default MedicationPlanForm;
