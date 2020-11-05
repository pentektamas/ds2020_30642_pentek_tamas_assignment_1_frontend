import React from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import * as API_CAREGIVER from "../api/caregiver-api";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import UpdateCaregiver from "./update-caregiver";

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

class CaregiverTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            updateSelected: false,
            deleteSelected: false,
            caregiverToUpdate: null,
            errorStatus: 0,
            error: null,
        };
        this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
        this.reloadUpdate = this.reloadUpdate.bind(this);
        this.availablePatients = this.props.availablePatients;
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
                    <button style={updatebuttonstyle} onClick={() => this.getCaregiverById(updateCell.original.id)}>
                        Update
                    </button>
                )
            },
            {
                Header: 'Delete',
                accessor: 'id',
                Cell: deleteCell => (
                    <button style={deletebuttonstyle} onClick={() => this.deleteCaregiverById(deleteCell.original.id)}>
                        Delete
                    </button>
                )
            }
        ];
        return columns;
    }

    deleteCaregiverById(id) {
        return API_CAREGIVER.deleteCaregiver(id, (result, status, err) => {

            if (result !== null && status === 200) {

                this.fetchCaregivers();
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

    getCaregiverById(id) {
        return API_CAREGIVER.getCaregiverById(id, (result, status, err) => {

            if (result !== null && status === 200) {

                this.setState({
                    updateSelected: !this.state.updateSelected,
                    caregiverToUpdate: result
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
        this.fetchCaregivers();
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
                    <ModalHeader toggle={this.toggleUpdateForm}>Update selected caregiver</ModalHeader>
                    <ModalBody>
                        <UpdateCaregiver reloadHandler={this.reloadUpdate}
                                         selectedCaregiver={this.state.caregiverToUpdate}
                                         availablePatients={this.availablePatients}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CaregiverTable;