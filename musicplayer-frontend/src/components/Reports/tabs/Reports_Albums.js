import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Table, Modal } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import { useHistory } from "react-router-dom"
import '../Reports.css'

const Reports_Albums = ({auth}) => {
    const [album_title, setAlbumTitle] = useState('');
    const [is_admin, setAdmin] = useState(auth.is_admin);
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [album_duration, setAlbumDuration] = useState('');
    const [date_published, setDatePublished] = useState('');
    const [searchIsClicked, setSearchIsClicked] = useState(false);
    const [albumData, setAlbumData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    let history = useHistory();

    const handleClose = (event) => {
        setShowModal(false);
    }

    const handleHome = (event) => {
        history.push("/home");
    }

    const albumSearch = (event) => {

        event.stopPropagation();
        event.preventDefault();

        setSearchIsClicked(true);

        const queryInput = {
            album_title: album_title,
            username: username,
            first_name: first_name,
            last_name: last_name
        }

        axios.get('/api/get/reports/albums', {
        params:{
            album_title: album_title,
            username: username,
            first_name: first_name,
            last_name: last_name
        }})
        .then((res) => {
            setAlbumData(res.data);
            console.log(albumData);
        }).catch((error) => {
            console.log(error)
        })
        console.log(queryInput);
    }

    const deleteAlbum = (album_info) => {
        axios.get('/api/delete/album', {
            params: {
                album_title: album_info.album_title,
                username: album_info.username,
                first_name: album_info.first_name,
                last_name: album_info.last_name 
            }})
            .then((res) => {
                console.log('Album deleted!')
                setShowModal(true)
            })
    }


    return ( 
        <div>

            <Row> {/* search form */}
                    <Container className="search-form">
                    <h5 style={{ "textAlign":"center", "paddingTop":"1em"}}>Search for Albums</h5>
                    
                    <Form onSubmit={albumSearch}>
                        <Row>
                            <Col md="2"/>
                                <Col md="4">
                                    <Form.Label>Album Title</Form.Label>
                                    <Form.Control   type="text" 
                                                    value={album_title}
                                                    onChange={(e) => setAlbumTitle(e.target.value)}></Form.Control>
                                </Col>
                                <Col md="4">
                                    <Form.Label>Musician Username</Form.Label>
                                    <Form.Control type="text" 
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}></Form.Control>
                                </Col>
                                
                            <Col md="2"/>
                        </Row>
                        <Row>
                            <Col md="2"/>
                            <Col md="4">
                                <Form.Label>Musician First Name</Form.Label>
                                <Form.Control   type="text"
                                                value={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Musician Last Name</Form.Label>
                                <Form.Control type="text"
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
                                <t2 style={{ "paddingLeft":"1em"}}>{albumData.length ? `${albumData.length} Album(s) found!` : ''}
                                                                    {!albumData.length && searchIsClicked ? 'No album found' : ''}
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
                            <th>Album Title</th>
                            <th>Musician Username</th>
                            <th>Musician Full Name</th>
                            <th>Duration</th>
                            <th>Release Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {albumData.map(album => {
                            return <tr>
                                <td className={is_admin ? "display-on" : "display-off"}>
                                    <Button variant="danger"
                                            onClick={(e) => deleteAlbum(album)}>Delete</Button>
                                </td>
                                <td>{album.album_title}</td>
                                <td>{album.username}</td>
                                <td>{album.first_name} {album.last_name}</td>
                                <td>{album.album_duration}</td>
                                <td>{album.release_date}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                
            </Container>

            <Modal show={showModal} onHide={(e) => handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Album Deleted</Modal.Title>
                </Modal.Header>
                <Modal.Body>B-but that was my favorite mixtape!</Modal.Body>
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
  

export default connect(mapStateToProps, actions)(Reports_Albums)
