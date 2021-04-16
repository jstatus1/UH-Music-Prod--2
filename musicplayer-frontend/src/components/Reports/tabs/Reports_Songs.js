import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import '../Reports.css'

const Reports_Songs = () => {
    const [title, setSongTitle] = useState('');
    const [username, setUsername] = useState(''); /* from user table */
    const [first_name, setFirstName] = useState(''); /* from user table */ 
    const [last_name, setLastName] = useState(''); /* from user table */
    const [album_title, setAlbumName] = useState(''); /* from album table*/
    const [duration, setDuration] = useState('');
    const [release_date, setReleaseDate] = useState('');
    const [record_label, setRecordLabel] = useState('');
    const [songData, setSongData] = useState([]);
    const [searchIsClicked, setSearchIsClicked] = useState(false);

    const songSearch = (event) => {

        event.stopPropagation();
        event.preventDefault();

        setSearchIsClicked(true);

        const queryInput = {
            title: title,
            username: username,
            first_name: first_name,
            last_name: last_name,
            album_title: album_title,
            duration: duration,
            release_date: release_date,
            record_label: record_label
        }

        axios.get('/api/get/reports/songs', {
        params:{
            title: title,
            username: username,
            first_name: first_name,
            last_name: last_name,
            album_title: album_title,
            duration: duration,
            release_date: release_date,
            record_label: record_label
        }})
        .then((res) => {
            setSongData(res.data);
            console.log(songData);
        }).catch((error) => {
            console.log(error)
        })
        console.log(queryInput);
    }


    return (
        <div>

            <Row> {/* search form */}
                    <Container className="search-form">
                    <h5 style={{ "textAlign":"center", "paddingTop":"1em"}}>Search for Songs</h5>
                    
                    <Form onSubmit={songSearch}>
                        <Row>
                            <Col md="2"/>
                                <Col md="4">
                                    <Form.Label>Song Title</Form.Label>
                                    <Form.Control   type="text" 
                                                    value={title}
                                                    onChange={(e) => setSongTitle(e.target.value)}></Form.Control>
                                </Col>
                                <Col md="4">
                                    <Form.Label>Musician Username</Form.Label>
                                    <Form.Control type="text" 
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}></Form.Control>
                                </Col>
                                
                            <Col md="4"/>
                        </Row>
                        <Row>
                            <Col md="2"/>
                            <Col md="4">
                                <Form.Label>Album Title</Form.Label>
                                <Form.Control   type="text"
                                                value={album_title}
                                                onChange={(e) => setAlbumName(e.target.value)}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Musician First Name</Form.Label>
                                <Form.Control type="text"
                                              value={first_name}
                                              onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Musician Last Name</Form.Label>
                                <Form.Control type="text"
                                              value={last_name}
                                              onChange={(e) => setLastName(e.target.value)}></Form.Control>
                            </Col>
        
                            <Col md="1"/>
                        </Row>
                        <Row style={{"paddingBottom":"1em", "paddingTop":"1em"}}>
                            <Col md="5"/>
                            <Col md="auto">
                                <Button variant="secondary" onClick={() => window.location.reload()}>Reset</Button>
                            </Col>
                            
                            <Col>
                                <Button variant="danger" type="submit">Search</Button>
                                <t2 style={{ "paddingLeft":"1em"}}>{songData.length ? `${songData.length} Song(s) found!` : ''}
                                                                    {!songData.length && searchIsClicked ? 'No song found' : ''}
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
                            <th>Song Title</th>
                            <th>Musician Username</th>
                            <th>Musician Full Name</th>
                            <th>Album Title</th>
                            <th>Duration</th>
                            <th>Release Date</th>
                            <th>Record Label</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songData.map(song => {
                            return <tr>
                                <td>{song.title}</td>
                                <td>{song.username}</td>
                                <td>{song.first_name} {song.last_name}</td>
                                <td>{song.album_title}</td>
                                <td>{song.duration}</td>
                                <td>{song.release_date}</td>
                                <td>{song.record_label}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                
            </Container>


            <div style={{ 'marginTop':'50px'}}/>
        </div>
    )
}

export default Reports_Songs
