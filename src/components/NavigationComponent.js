import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, {useEffect, useState} from "react";
import WareHouseService from "../services/WareHouseService";
import {Button} from "react-bootstrap";
export default function NavigationComponent() {
    const [warehousesList, setWarehousesList] = useState([]);
    useEffect(() => {
        getAllWarehouses();
    },[]);
    function getAllWarehouses()  {
        WareHouseService.getWareHouseList().then((response) => {
            const data = response.data;
            setWarehousesList(data);
        })
    }
    return(
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="/home">Pharmacy Ngoc Linh</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/units">Unit</Nav.Link>
                    <Nav.Link href="/products">Product</Nav.Link>
                    <DropdownButton id="dropdown-basic-button" title="Ware Houses">
                        {
                            warehousesList.map((u) =>
                                <Dropdown.Item href="/wareHouses">{u.name}</Dropdown.Item>
                            )
                        }
                    </DropdownButton>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}