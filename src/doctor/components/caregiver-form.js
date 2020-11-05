import React from 'react';
import validate from "./validators/doctor-validators";
import Button from "react-bootstrap/Button";
import * as API_CAREGIVER from "../api/caregiver-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import {FormGroup, Input, Label} from 'reactstrap';
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


class CaregiverForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.availablePatients = this.props.availablePatients;
        this.selectedPatients = [];

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,
            selected: null,
            addedPatients: [],
            selectedPatient: null,

            formControls: {
                name: {
                    value: '',
                    placeholder: 'Caregiver\'s name',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                birthdate: {
                    value: '',
                    placeholder: 'Caregiver\'s birthdate ',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 10,
                        isRequired: true
                    }
                },
                gender: {
                    value: '',
                    placeholder: 'Caregiver\'s gender',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 1,
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'Caregiver\'s address',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 5,
                        isRequired: true
                    }
                },

                username: {
                    value: '',
                    placeholder: 'Caregiver\'s username',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Caregiver\'s password',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                }
            }
        };

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
            console.log("Validator: " + updatedFormElementName + "  :" + formIsValid);
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerCaregiver(caregiver) {
        return API_CAREGIVER.insertCaregiver(caregiver, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted caregiver with id: " + result);
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

        let account = {
            userName: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            accountType: "CAREGIVER"
        };

        let caregiver = {
            name: this.state.formControls.name.value,
            birthdate: this.state.formControls.birthdate.value,
            gender: this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
            patients: this.selectedPatients,
            account: account
        };

        //caregiver.patients = this.state.addedPatients;
        console.log(caregiver.patients[0].name);
        console.log(caregiver.patients[0].birthdate);
        console.log(caregiver.patients[0].gender);

        this.registerCaregiver(caregiver);
    }

    createColumns() {
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Birthdate',
                accessor: 'birthdate',
            },

            {
                Header: 'Add',
                accessor: 'id',
                Cell: addCell => (
                    <button id={"addButton"} style={addbuttonstyle}
                            onClick={() => this.addPatientById(addCell.original.id)}>
                        Add
                    </button>
                )
            }
        ];
        return columns;
    }

    addPatientById(id) {
        let addedPatient = null;
        for (let i = 0; i < this.availablePatients.length; i++) {
            if (id === this.availablePatients[i].id) {
                this.state.addedPatients.push(this.availablePatients[i]);
                addedPatient = this.availablePatients[i];
            }
        }
        this.setState({selectedPatient: addedPatient});
        this.selectedPatients.push(addedPatient);
        const newList = this.availablePatients.filter((item) => item.id !== addedPatient.id);

        this.availablePatients = newList;
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched ? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='birthdate'>
                    <Label for='birthdateField'> Birthdate: </Label>
                    <Input name='birthdate' id='birthdateField'
                           type='date'
                           placeholder={this.state.formControls.birthdate.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.birthdate.value}
                           touched={this.state.formControls.birthdate.touched ? 1 : 0}
                           valid={this.state.formControls.birthdate.valid}
                           required
                    />
                    {this.state.formControls.birthdate.touched && !this.state.formControls.birthdate.valid &&
                    <div className={"error-message row"}> * Birthdate error </div>}
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched ? 1 : 0}
                           valid={this.state.formControls.gender.valid}
                           required
                    />
                    {this.state.formControls.gender.touched && !this.state.formControls.gender.valid &&
                    <div className={"error-message row"}> * Birthdate error </div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched ? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                    {this.state.formControls.address.touched && !this.state.formControls.address.valid &&
                    <div className={"error-message"}> * Address error </div>}
                </FormGroup>

                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched ? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message"}> *Username error </div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           type="password"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched ? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message"}> *Password error </div>}
                </FormGroup>

                <FormGroup>
                    <Label> Patients: </Label>
                    <ReactTable
                        data={this.availablePatients}
                        columns={this.createColumns()}
                        pageSize={5}
                        style={mystyle}
                        showPageSizeOptions={false}

                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 5}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}> Save
                            caregiver </Button>
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

export default CaregiverForm;
