import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useState} from "react";
import Container from "react-bootstrap/Container";

export default function LoginComponent(){    
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col style={{marginTop: '15%' }}>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setUsername(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}