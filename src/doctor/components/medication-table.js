import React from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import * as API_MEDICATION from "../api/medication-api";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import UpdateMedication from "./update-medication";

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

class MedicationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            updateSelected: false,
            deleteSelected: false,
            medicationToUpdate: null,
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
                Header: 'Side effects',
                accessor: 'sideEffects',
            },
            {
                Header: 'Dosage',
                accessor: 'dosage',
            },
            {
                Header: 'Update',
                accessor: 'id',
                Cell: updateCell => (
                    <button style={updatebuttonstyle} onClick={() => this.getMedicationById(updateCell.original.id)}>
                        Update
                    </button>
                )
            },
            {
                Header: 'Delete',
                accessor: 'id',
                Cell: deleteCell => (
                    <button style={deletebuttonstyle} onClick={() => this.deleteMedicationById(deleteCell.original.id)}>
                        Delete
                    </button>
                )
            }
        ];
        return columns;
    }

    deleteMedicationById(id) {
        return API_MEDICATION.deleteMedication(id, (result, status, err) => {

            if (result !== null && status === 200) {

                this.fetchMedications();
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

    getMedicationById(id) {
        return API_MEDICATION.getMedicationById(id, (result, status, err) => {

            if (result !== null && status === 200) {

                this.setState({
                    updateSelected: !this.state.updateSelected,
                    medicationToUpdate: result
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
        this.fetchMedications();
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
                    <ModalHeader toggle={this.toggleUpdateForm}>Update selected medication</ModalHeader>
                    <ModalBody>
                        <UpdateMedication reloadHandler={this.reloadUpdate}
                                          selectedMedication={this.state.medicationToUpdate}
                        />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default MedicationTable;