import React from 'react'
import { Form, Button, Container,Row, Col } from 'react-bootstrap'
import './CreatePlaylist.css'





const CreatePlaylist = () => {

    return (
        <div>
            <Container>
            <Form>
            <Row>
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control type= "text" placeholder = "Playlist name"/> 
            </Row>

            <Row>
            <Form.Label>Playlist Description</Form.Label>
            <Form.Control type= "text" placeholder = "Playlist Description"/> 
            </Row>



            <Row>
                
                <Col>
                <Row>            <Form.Label  class = "playlistPadding">Song List</Form.Label></Row>
            <input type= "text" placeholder = "Songs go here" class = "songTable"/> 
                </Col>

                <Col>
                <Form.Label  class = "playlistButton"></Form.Label>
            <Button variant="primary" class = "playlistPadding">Add to Playlist</Button>{' '}
            </Col>

            <Col>
            <Form.Label  class = "playlistButton"></Form.Label>
            <Button variant="primary" class = "playlistPadding">Remove from Playlist</Button>{' '}
            </Col>

            <Col>
           <Row> <Form.Label class = "playlistPadding">Playlist</Form.Label></Row>
            <input type= "text" placeholder = "Songs in playlist" class = "songTable"/> 
            </Col>
            </Row>
            </Form>
            </Container>
        </div>
            
    )
            
}

export default CreatePlaylist
