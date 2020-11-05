import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

class PatientDetails extends React.Component {

    constructor(props) {
        super(props);
        this.selectedPatient = this.props.selectedPatient;
        this.medications = this.medicationPrettyPrint();

        this.state = {

            errorStatus: 0,
            error: null,

            formControls: {
                name: {
                    value: this.selectedPatient.name,
                    valid: true
                },
                birthdate: {
                    value: this.selectedPatient.birthdate,
                    valid: true
                },
                gender: {
                    value: this.selectedPatient.gender,
                    valid: true
                },
                address: {
                    value: this.selectedPatient.address,
                    valid: true
                },

                medicalRecord: {
                    value: this.selectedPatient.medicalRecord,
                    valid: true
                },

                username: {
                    value: this.selectedPatient.account.userName,
                    valid: true
                },
                password: {
                    value: this.selectedPatient.account.password,
                    valid: true
                },
                treatmentPeriod: {
                    value: this.selectedPatient.medicationPlan.treatmentPeriod,
                    valid: true
                },
                medications: {
                    value: this.medications,
                    valid: true
                }
            }
        };
    }

    medicationPrettyPrint() {
        let result = "";
        for (let i = 0; i < this.selectedPatient.medicationPlan.medications.length; i++) {
            let medication = this.selectedPatient.medicationPlan.medications[i];
            let val = "Medication " + (i + 1) + "\nName: " + medication.name + ", Side effects: " + medication.sideEffects + ", Dosage: " + medication.dosage + "\n\n";
            result += val;
        }
        return result;
    }

    render() {
        return (
            <div>
                <Label> </Label>
                <Label style={{fontSize: '20px'}}> <b>Account details</b> </Label>
                <Label> </Label>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField'
                           value={this.state.formControls.name.value}
                           readOnly={true}
                    />
                </FormGroup>

                <FormGroup id='birthdate'>
                    <Label for='birthdateField'> Birthdate: </Label>
                    <Input name='birthdate' id='birthdateField'
                           value={this.state.formControls.birthdate.value}
                           readOnly={true}
                    />
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <Input name='gender' id='genderField'
                           value={this.state.formControls.gender.value}
                           readOnly={true}
                    />
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField'
                           value={this.state.formControls.address.value}
                           readOnly={true}
                    />
                </FormGroup>

                <FormGroup id='medicalRecord'>
                    <Label for='medicalRecordField'> Medical record: </Label>
                    <Input name='medicalRecord' id='medicalRecordField'
                           value={this.state.formControls.medicalRecord.value}
                           readOnly={true}
                    />
                </FormGroup>

                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField'
                           value={this.state.formControls.username.value}
                           readOnly={true}
                    />
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField'
                           type="password"
                           value={this.state.formControls.password.value}
                           readOnly={true}
                    />
                </FormGroup>

                <Label> </Label>
                <Label style={{fontSize: '20px'}}> <b>Medication plan</b> </Label>
                <Label> </Label>

                <FormGroup id='treatmentPeriod'>
                    <Label for='treatmentPeriodField'> Treatment period: </Label>
                    <Input name='treatmentPeriod' id='treatmentPeriodField'
                           value={this.state.formControls.treatmentPeriod.value}
                           readOnly={true}
                    />
                </FormGroup>

                <FormGroup id='medications'>
                    <Label for='medicationsField'> Medications: </Label>
                    <Input name='medications' id='medicationsField'
                           value={this.state.formControls.medications.value}
                           type='textarea'
                           rows="10"
                           cols="150"
                           readOnly={true}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default PatientDetails;
