import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import '../Reports.css'

const Reports_Playlists = () => {
    const [playlist_name, setPlaylistName] = useState('');
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [playlistData, setPlaylistData] = useState([]);
    const [searchIsClicked, setSearchIsClicked] = useState(false);

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
                                <Button variant="secondary" onClick={() => window.location.reload()}>Reset</Button>
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
                            <th>Playlist Name</th>
                            <th>Creator Username</th>
                            <th>Creator First Name</th>
                            <th>Creator Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistData.map(playlist => {

                            
                            return <tr>
                                <td>{playlist.playlist_name}</td>
                                <td>{playlist.username}</td>
                                <td>{playlist.first_name}</td>
                                <td>{playlist.last_name}</td>
                            </tr>
                            
                            return null
                            
                        })}
                    </tbody>
                </Table>
                
            </Container>


            <div style={{ 'marginTop':'50px'}}/>
        </div>
    )
}

export default Reports_Playlists
