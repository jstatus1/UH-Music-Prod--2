import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import logo from './uhcampus.jpg';
import "./Homestyle.css"

const Home = () => {
    
    return (
        <div>
            <Container>
            <img class="logo" src={logo} alt="Logo"/>
                <Row>
                    <Col md="3"></Col>
                    <Col md="5">
                        <h2>Welcome to Coog Music!</h2>
                        <t1>Check out your music in <Link to="/Library">Library</Link>!
                            <br/>
                            Click <Link to="/upload">Upload</Link> to add new music!
                            <br/>
                            Check out your <Link to="/MakePlaylist">playlists</Link> or other info about you by
                            using the profile dropdown!
                            <br/>
                            Your notifications can be viewed by cliking the bell on the navbar!
                        </t1>
                    </Col>
                </Row>
                <Row>
                    
                </Row>
                
            </Container>
            

        </div>
    )
}

export default Home

