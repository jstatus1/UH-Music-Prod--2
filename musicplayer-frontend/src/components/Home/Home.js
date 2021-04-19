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
                        <div style={{"border":"2px solid rgb(191,191,191)", "padding":"1em", "marginTop":"10px", "width":"500px"}}>
                        <h2>Welcome to Coog Music!</h2>
                        <t2>Check out your music in <Link to="/Library">Library</Link>!
                            <br/>
                            Click <Link to="/upload">Upload</Link> to add new music!
                            <br/>
                            Check out your <Link to="/MakePlaylist">playlists</Link>
                            <br/>
                            Update your About Me section in your <Link to="/profileedit">Profile</Link>!
                            <br/>
                            Your notifications can be viewed by clicking the bell on the navbar!
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

