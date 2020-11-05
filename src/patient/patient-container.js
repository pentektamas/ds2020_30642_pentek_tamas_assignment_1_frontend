import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {withRouter} from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import * as API_PATIENT from "./api/patient-api";
import PatientDetails from "./components/patient-details";

class PatientContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPatient: null,
            isPatientLoaded: false,
            errorStatus: 0,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchPatient();
    }


    fetchPatient() {
        return API_PATIENT.getPatientById(this.props.location.state.currentID, (result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    currentPatient: result,
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

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> {'Patient\'s personal page'} </strong>
                    <Button className="btn navbar-btn btn-danger" name="logout" id="logout"
                            value="Log Out"
                            onClick={() => this.props.history.push({
                                pathname: '/'
                            })}>
                        Log Out
                    </Button>
                </CardHeader>
                <Card>
                    <Row>
                        <Col sm={{size: '4', offset: 4}}>
                            {this.state.isPatientLoaded &&
                            <PatientDetails selectedPatient={this.state.currentPatient}/>}
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 2}}>


                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />}
                        </Col>
                    </Row>

                </Card>

            </div>
        )
    }
}

export default withRouter(PatientContainer);
