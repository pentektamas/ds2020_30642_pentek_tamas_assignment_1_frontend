import React from "react";
import "react-table/react-table.css";
import ReactTable from "react-table";
import {Label} from "reactstrap";

const mystyle = {
    color: "#000000",
    backgroundColor: "#afafaf",
    textAlign: "center",
    fontFamily: "Arial"
};

class CaregiversPatientTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            errorStatus: 0,
            error: null,
        };

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
                Header: 'Medical record',
                accessor: 'medicalRecord',
            }
        ];
        return columns;
    }

    render() {
        return (
            <div>
                <Label> </Label>
                <Label style={{fontSize: '20px'}}> <b>Caregiver's patients</b> </Label>
                <Label> </Label>

                <ReactTable
                    data={this.state.tableData}
                    columns={this.createColumns()}
                    pageSize={5}
                    style={mystyle}
                    showPageSizeOptions={false}
                />
            </div>
        )
    }
}

export default CaregiversPatientTable;