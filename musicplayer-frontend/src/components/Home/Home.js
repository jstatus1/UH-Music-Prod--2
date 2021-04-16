import React from 'react'
import {useState} from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import logo from './uhcampus.jpg';
import "./Homestyle.css"

const Home = () => {
    
    return (
        <div>
            <Container>
            <img class="logo" src={logo} alt="Logo"/>
                <Row>
                    <Col md="4"></Col>
                    <Col md="5">
                        <h2>Welcome to Coog Music!</h2>
                    </Col>
                </Row>
                
            </Container>
            

        </div>
    )
}

export default Home

