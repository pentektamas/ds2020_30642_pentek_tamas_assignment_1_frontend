import React from 'react'
import logo from './commons/images/icon.png';

import {
    Nav,
    Navbar,
    NavbarBrand,
} from 'reactstrap';

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} alt='logo'/>
            </NavbarBrand>
            <Nav className="mr-auto" navbar>


            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar
