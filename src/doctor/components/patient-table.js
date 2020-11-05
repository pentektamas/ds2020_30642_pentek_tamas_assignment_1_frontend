import React from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import * as API_USERS from "../api/doctor-api";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import UpdatePatient from "./update-patient";

const mystyle = {
    color: "#000000",
    backgroundColor: "#afafaf",
    textAlign: "center",
    fontFamily: "Arial"
};

const deletebuttonstyle = {
    color: "#000000",
    backgroundColor: "#cf1c1c",
    textAlign: "center",
    fontFamily: "Arial"
};

const updatebuttonstyle = {
    color: "#000000",
    backgroundColor: "#11498a",
    textAlign: "center",
    fontFamily: "Arial"
};

class PatientTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            updateSelected: false,
            deleteSelected: false,
            patientToUpdate: null,
            errorStatus: 0,
            error: null,
        };
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
        this.reloadUpdate = this.reloadUpdate.bind(this);
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
                Header: 'Gender',
                accessor: 'gender',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Update',
                accessor: 'id',
                Cell: updateCell => (
                    <button style={updatebuttonstyle} onClick={() => this.getPatientById(updateCell.original.id)}>
                        Update
                    </button>
                )
            },
            {
                Header: 'Delete',
                accessor: 'id',
                Cell: deleteCell => (
                    <button style={deletebuttonstyle} onClick={() => this.deletePatientById(deleteCell.original.id)}>
                        Delete
                    </button>
                )
            }
        ];
        return columns;
    }

    deletePatientById(id) {
        return API_USERS.deletePatient(id, (result, status, err) => {

            if (result !== null && status === 200) {

                this.fetchPatients();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
                alert("Can't delete patient because he/she is binded to a caregiver!\nFirst delete the caregiver!");
            }
        });
    }

    fetchPatients() {
        return API_USERS.getPatients((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    getPatientById(id) {
        return API_USERS.getPatientById(id, (result, status, err) => {

            if (result !== null && status === 200) {

                this.setState({
                    updateSelected: !this.state.updateSelected,
                    patientToUpdate: result
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleUpdateForm() {
        this.setState({updateSelected: !this.state.updateSelected});
    }

    reloadUpdate() {
        this.toggleUpdateForm();
        this.fetchPatients();
    }


    render() {
        return (
            <div>
                <ReactTable
                    data={this.state.tableData}
                    columns={this.createColumns()}
                    pageSize={5}
                    style={mystyle}
                    showPageSizeOptions={false}
                />

                <Modal isOpen={this.state.updateSelected} toggle={this.toggleUpdateForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleUpdateForm}>Update selected patient</ModalHeader>
                    <ModalBody>
                        <UpdatePatient reloadHandler={this.reloadUpdate}
                                       selectedPatient={this.state.patientToUpdate}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default PatientTable;