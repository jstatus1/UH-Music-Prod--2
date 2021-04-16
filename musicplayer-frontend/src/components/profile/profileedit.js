import React from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import "./profile.css"

const ProfileEdit = () => {
    return (
        <div>
            <Container>
            <Form>
                <Row>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username"></Form.Control>
                </Col>

                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"></Form.Control>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name"></Form.Control>
                </Col>
                <Col md="1"></Col>
                <Col md="3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name"></Form.Control>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email address"></Form.Control>
                </Col>
            </Row>
            
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <Form.Label>About Me</Form.Label>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <textarea class="about-me-textbox"></textarea>
                </Col>
            </Row>
            <Row>
                <Col md="1"></Col>
                <Col md="7">
                <Button variant="primary" class="button-padding" type="submit">
                    Save
                </Button>
                </Col>
            </Row>
            </Form>
            </Container>
        </div>
    )
}

export default ProfileEdit
