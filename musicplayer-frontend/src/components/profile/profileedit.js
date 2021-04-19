import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, } from 'react-bootstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { useHistory } from "react-router-dom"
import "./profile.css"

const ProfileEdit = ({auth}) => {
    
    const [display, setDisplay] = useState([]);
    const [username, setNewUsername] = useState(auth.username);
    const [new_password, setNewPassword] = useState('');
    const [first_name, setFirstName] = useState(auth.first_name);
    const [last_name, setLastName] = useState(auth.last_name);
    const [email, setEmail] = useState(auth.email);
    const [about_me, setAboutMe] = useState(auth.about_me);
    const [edit_profile, setEditProfile] = useState(false);
    const [account_updated, setUpdated] = useState(false);
    const [query_status, setQueryStatus] = useState(0);
    let history = useHistory();


    const updateAccount = (event) => {

        event.stopPropagation();
        event.preventDefault();

        const queryInput = {
            old_username: auth.username,
            username: username,
            new_password: new_password,
            first_name: first_name,
            last_name: last_name,
            email: email,
            about_me: about_me
        }

        console.log(queryInput)

        axios.post('/api/updateProfile', {queryInput})
        .then((res) => {
            
                console.log('User updated!')
                setUpdated(true);
                setEditProfile(false);
                history.push("/")
            
            
        }).catch((error) => {
            console.log(error)
            setQueryStatus(error.status)
        })
        console.log(queryInput);
    }

    return (
        <div>
            <div className={edit_profile ?  "display-on" : "display-off"}>
            <h2 style={{ "textAlign": "center", "paddingTop":"0.5em", "paddingBottom":"1em" }}>Edit Profile</h2>
            </div>
            <div className={edit_profile ?  "display-off" : "display-on"}>
            <h2 style={{ "textAlign": "center", "paddingTop":"0.5em", "paddingBottom":"1em" }}>Your Profile</h2>
            </div>
            <div  style={{"textAlign":"center"}}><img src={auth.profile_img_url} alt="null"/></div>
            <Container style={{"paddingTop":"30px"}}>
            <Form onSubmit = {updateAccount}>
            <Row>
                <Col md="3"></Col>
                <Col md="3">
                <t4 style={{ "fontWeight":"bold"}}>Username</t4>
                <div className={edit_profile ? "display-on" : "display-off"}>
                    <Form.Control   type="text"
                                    value={username}
                                    onChange={(e) => setNewUsername(e.target.value)}></Form.Control>
                </div>
                <div className={edit_profile ? "display-off" : "display-on"}>
                    <Form.Control type="text" readOnly plaintext defaultValue={username}/>
                </div>
                </Col>
                <Col md="3">
                <div className={edit_profile ? "":"display-off"}>
                    
                    <t4 style={{ "fontWeight":"bold"}}>New Password</t4>
                    <Form.Control type="password"
                                value={new_password}
                                onChange={(e) => setNewPassword(e.target.value)}></Form.Control>
                    
                </div>
                </Col>

                
            </Row>
            

            <Row>
                <Col md="3"></Col>
                <Col md="3">
                <t4 style={{ "fontWeight":"bold"}}>First Name</t4>
                <div className={edit_profile ? "display-on" : "display-off"}>
                <Form.Control type="text"
                              value={first_name}
                              onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                </div>
                <div className={edit_profile ? "display-off" : "display-on"}>
                <Form.Control type="text" readOnly plaintext defaultValue={first_name}/>
                </div>
                </Col>
                <Col md="3">
                
                <t4 style={{ "fontWeight":"bold"}}>Last Name</t4>
                <div className={edit_profile ? "display-on" : "display-off"}>
                <Form.Control type="text"
                              value={last_name}
                              onChange={(e) => setLastName(e.target.value)}></Form.Control>
                </div>
                <div className={edit_profile ? "display-off" : "display-on"}>
                <Form.Control type="text" readOnly plaintext defaultValue={last_name}/>
                </div>
                </Col>
            </Row>
            <Row>
                <Col md="3"></Col>
                <Col md="6">
                <t4 style={{ "fontWeight":"bold" }}>Email</t4>
                <div className={edit_profile ? "display-on" : "display-off"}>
                <Form.Control type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </div>
                <div className={edit_profile ? "display-off" : "display-on"}>
                <Form.Control type="text" readOnly plaintext defaultValue={email}/>
                </div>
                </Col>
            </Row>
            
            <Row>
                <Col md="3"></Col>
                <Col md="7">
                <t4 style={{ "fontWeight":"bold"}}>About Me</t4>
                </Col>
            </Row>
            <Row>
                <Col md="3"></Col>
                <Col md="6">
                <div className={edit_profile ? "display-on" : "display-off"}>
                <textarea class="about-me-textbox"
                          onChange={(e) => setAboutMe(e.target.value)}>{about_me}</textarea>
                </div>
                <div className={edit_profile ? "display-off" : "display-on about-me-textbox"}>
                <Form.Control type="text" readOnly plaintext defaultValue={about_me}/>
                </div>
                </Col>
            </Row>
            <Row style={{"paddingTop":"30px"}}>
                <Col md="6"></Col>
                <Col>
                <div className={edit_profile ?  "display-off" : "display-on"}>
                <Button variant="secondary" onClick={(e) => setEditProfile(true)}>Edit</Button>
                </div>

                <div className={edit_profile ?  "display-on" : "display-off"} style={{"marginRight":"1em"}}>
                <Button variant="secondary" onClick={(e) => {
                    setEditProfile(false) 
                    setAboutMe('')}}>Cancel</Button>
                </div>

                <div className={edit_profile ?  "display-on" : "display-off"}>
                <Button variant="primary" class="button-padding" type="submit">Save</Button>
                <t2 style={{ "paddingLeft":"1em"}}>{query_status === 200 ? `Profile Updated!` : ''}
                                                                    {query_status !== 200 && query_status !== 0 ? 'There was a problem updating your profile' : ''}
                                                                    </t2>
                </div>
                </Col>
            </Row>
            </Form>
            </Container>
            <div style={{"marginTop":"70px"}}/>
        </div>
    )
}


const mapStateToProps = state => ({
    auth: state.auth_reducer
});
  

export default connect(mapStateToProps, actions)(ProfileEdit)
