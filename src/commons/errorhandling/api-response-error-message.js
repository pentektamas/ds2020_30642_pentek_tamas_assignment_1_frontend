import React from 'react'
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, UncontrolledAlert} from 'reactstrap';
import styles from '../styles/project-style.css';

class APIResponseErrorMessage extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = {
            error: this.props.error,
            errorStatus: this.props.errorStatus,
            collapseForm: false
        }
    }
    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }
    render()
    {
        return (
            <div>

                <UncontrolledAlert color="danger">
                    An unexpected error occurred on the server side!
                    { this.state.errorStatus > 1 && <Button color="link"  onClick={this.toggleForm}>Details...</Button>}
                </UncontrolledAlert>

                { this.state.errorStatus > 1 &&
                <Modal isOpen={this.state.collapseForm} toggle={this.toggleForm}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggleForm} className={styles.errorTitle}> Server side error information: </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs="3"> Time: </Col>   <Col xs="auto" className={styles.errorText}>{ this.state.error.timestamp} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Resource : </Col>   <Col xs="auto" className={styles.errorText}>{ this.state.error.resource} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Error : </Col>   <Col xs="auto" className={styles.errorText}>{ this.state.error.status} - { this.state.error.error} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Message : </Col>   <Col xs="auto" className={styles.errorText}>{ this.state.error.message} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Path : </Col>   <Col xs="auto" className={styles.errorText}>{ this.state.error.path} </Col>
                        </Row>
                        <Row>
                            <Col xs="3"> Details : </Col>   <Col xs="auto" className={styles.errorText}>
                            {this.state.error.details}
                        </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleForm}>Cancel</Button>
                    </ModalFooter>
                </Modal>}
            </div>
        )
    }}
export default APIResponseErrorMessage

