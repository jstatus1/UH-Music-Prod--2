import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import logo from './uhcampus.jpg';
import "./Homestyle.css"


import ExploreSongs from './ExploreSongs'

const Home = () => {
    
    return (
        <div>
            <Container>
                <div style={{"paddingTop":"20px"}}/>
            <Row><Col md="6"><img class="logo" src={logo} alt="Logo" style={{"width":"500px", "height":"250px"}}/></Col></Row>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <div style={{"border":"1px solid rgb(191,191,191)", "padding":"1em", "marginTop":"10px", "width":"500px"}}>
                        <Row><h3>Welcome to <h3 style={{"color":"red"}}>CoogMusic!</h3></h3></Row>
                        <t2>Check out your music in <Link to="/Library" style={{"color":"red"}}>Library</Link>!
                            <br/>
                            <Link style={{"color":"red"}} to="/upload">Upload</Link> to share your music to the world!
                            <br/>
                            Update your About Me section in your <Link style={{"color":"red"}} to="/profileedit">Profile</Link>!
                            <br/>
                            Your notifications can be viewed by clicking the bell on the Navigation Bar!
                        </t2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    
                </Row>
                <ExploreSongs></ExploreSongs>
            </Container>
            
           
        </div>
    )
}

export default Home

