import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap'
import axios from 'axios'
import '../Reports.css'
//import ReportTable from './ReportTable'


const Reports_Users = (props) => { 

    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [isMusician, setMusician] = useState(false);
    const [record_label, setRecordLabel] = useState('');
    const [userData, setUserData] = useState([]);
    const [searchIsClicked, setSearchIsClicked] = useState(false);



    const userSearch = (event) => {

        event.stopPropagation();
        event.preventDefault();

        setSearchIsClicked(true);

        const queryInput = {
            username: username,
            first_name: first_name,
            last_name: last_name,
            record_label: record_label
        }

        axios.get('/api/get/reports/users', {
        params:{
            username: username,
            first_name: first_name,
            last_name: last_name,
            isMusician: isMusician,
            record_label: record_label}})
        .then((res) => {
            setUserData(res.data);
            console.log(userData);
        }).catch((error) => {
            console.log(error)
        })

        console.log(queryInput);

        

    }
    

    return (
        <div>

            <Row> {/* search form */}
                    <Container className="search-form">
                    <h5 style={{ "textAlign":"center", "paddingTop":"1em"}}>Search for Users</h5>
                    
                    <Form onSubmit={userSearch}>
                        <Row>
                            <Col md="2"/>
                                <Col md="4">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control   type="text" 
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}></Form.Control>
                                </Col>
                                <Col style={{"paddingTop":"2em"}}>
                                    <Form.Check type="checkbox" 
                                                label="Musician?"
                                                onChange={(e) => setMusician(!isMusician)}></Form.Check>
                                </Col>
                                
                            <Col md="2"/>
                        </Row>
                        <Row>
                            <Col md="2"/>
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control   type="text"
                                                value={first_name}
                                                onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
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
                                <t2 style={{ "paddingLeft":"1em"}}>{userData.length ? `${userData.length} User(s) found!` : ''}
                                                                    {!userData.length && searchIsClicked ? 'No users found' : ''}
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
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Musician?</th>
                            <th>Social Media</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map(user => {
                            return <tr>
                                <td>{user.username}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{String(user.isMusician) === 'undefined' ? '': String(user.isMusician)}</td>
                                <td>
                                <a href={String(user.socialmedia_fb)}>Facebook</a><t2> | </t2>
                                <a href={String(user.socialmedia_tw)}>Twitter</a><t2> | </t2>
                                <a href={String(user.socialmedia_in)}>Instagram</a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                
            </Container>


            <div style={{ 'marginTop':'50px'}}/>
        </div>
    )
}

export default Reports_Users
