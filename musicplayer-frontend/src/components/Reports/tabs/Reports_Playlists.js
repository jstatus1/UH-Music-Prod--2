import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Table, Modal } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import { useHistory } from "react-router-dom"
import '../Reports.css'

const Reports_Playlists = ({auth}) => {
    const [is_admin, setAdmin] = useState(auth.is_admin);
    const [playlist_name, setPlaylistName] = useState('');
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [playlistData, setPlaylistData] = useState([]);
    const [searchIsClicked, setSearchIsClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    let history = useHistory();

    const handleClose = (event) => {
        setShowModal(false);
    }

    const handleHome = (event) => {
        history.push("/home");
    }

    const playlistSearch = (event) => {

        event.stopPropagation();
        event.preventDefault();

        setSearchIsClicked(true);

        const queryInput = {
            playlist_name: playlist_name,
            username: username,
            first_name: first_name,
            last_name: last_name,
        }

        axios.get('/api/get/reports/playlists', {
        params:{
            playlist_name: playlist_name,
            username: username,
            first_name: first_name,
            last_name: last_name,
        }})
        .then((res) => {
            setPlaylistData(res.data);
            console.log(playlistData);
        }).catch((error) => {
            console.log(error)
        })
        console.log(queryInput);
    }

    const deletePlaylist = (playlist_info) => {
        axios.get('/api/delete/playlist', {
            params: {
                playlist_name: playlist_info.playlist_name,
            username: playlist_info.username,
            first_name: playlist_info.first_name,
            last_name: playlist_info.last_name,
            }})
            .then((res) => {
                console.log('Playlist deleted!')
                setShowModal(true);
                


            })
    }

    return (
        <div>

            <Row> {/* search form */}
                    <Container className="search-form">
                    <h5 style={{ "textAlign":"center", "paddingTop":"1em"}}>Search for Playlists</h5>
                    
                    <Form onSubmit={playlistSearch}>
                        <Row>
                            <Col md="2"/>
                                <Col md="4">
                                    <Form.Label>Playlist Name</Form.Label>
                                    <Form.Control   type="text" 
                                                    value={playlist_name}
                                                    onChange={(e) => setPlaylistName(e.target.value)}></Form.Control>
                                </Col>
                                <Col>
                                <Form.Label>Creator Username</Form.Label>
                                <Form.Control   type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}></Form.Control>
                                </Col>
                                
                            <Col md="2"/>
                        </Row>
                        <Row>
                            <Col md="2"/>
                            <Col>
                                <Form.Label>Creator First Name</Form.Label>
                                <Form.Control   type="text"
                                                value={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Creator Last Name</Form.Label>
                                <Form.Control   type="text"
                                                value={last_name}
                                                onChange={(e) => setLastName(e.target.value)}></Form.Control>
                            </Col>
                            <Col md="2"/>
                        </Row>
                        <Row style={{"paddingBottom":"1em", "paddingTop":"1em"}}>
                            <Col md="5"/>
                            <Col md="auto">
                                <Button variant="secondary" onClick={() => handleHome()}>Go to Home</Button>
                            </Col>
                            
                            <Col>
                                <Button variant="danger" type="submit">Search</Button>
                                <t2 style={{ "paddingLeft":"1em"}}>{playlistData.length ? `${playlistData.length} playlist(s) found!` : ''}
                                                                    {!playlistData.length && searchIsClicked ? 'No playlists found' : ''}
                                                                    </t2>
                            </Col>
                        </Row>
                    </Form>
                    </Container>
            </Row>

            <Container> {/* Results table */} 

                <Table striped hover responsive bordered>
                    <thead>
                        <tr>
                            <div  className={is_admin ? "display-on" : "display-off"}>
                            <th>Admin</th>
                            </div>
                            <th>Playlist Name</th>
                            <th>Creator Username</th>
                            <th>Creator First Name</th>
                            <th>Creator Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistData.map(playlist => {

                            
                            return <tr>
                                <td className={is_admin ? "display-on" : "display-off"}>
                                    <Button variant="danger"
                                            onClick={(e) => deletePlaylist(playlist)}>Delete</Button>
                                </td>
                                <td>{playlist.playlist_name}</td>
                                <td>{playlist.username}</td>
                                <td>{playlist.first_name}</td>
                                <td>{playlist.last_name}</td>
                            </tr>
                            
                            
                        })}
                    </tbody>
                </Table>
                
            </Container>

            <Modal show={showModal} onHide={(e) => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Playlist Deleted</Modal.Title>
                </Modal.Header>
                <Modal.Body>Another fire playlist bites the dust</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => handleClose()}>Close</Button>
                    <Button variant="danger" onClick={(e) => handleHome()}>Go to Home</Button>
                </Modal.Footer>
            </Modal>


            <div style={{ 'marginTop':'50px'}}/>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth_reducer
});
  

export default connect(mapStateToProps, actions)(Reports_Playlists)
