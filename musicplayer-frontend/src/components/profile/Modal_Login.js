import React from 'react'
import axios from 'axios'
import  { Redirect } from 'react-router-dom'


import './Modal_Login.css'

class ModalLogin extends React.Component
{
    state = {
        email: null,
        password: null,
        createAccount: false,
        userExist: false,
        showPassword:false,
        validEmail: true,
        validPassword: true,
        validUsername: true,
        username: null
    }

   
    continueLogic = (e) => {

            let self = this;
            //Email Validation
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(this.state.email).toLowerCase()))
            {
                this.setState({validEmail: true})
                axios.get('/api/checkEmail', 
                    {params: {
                        email: this.state.email
                    }}
                ).then(function (response) {
                    console.log(response.data.message)
                    if(response.data.message.userExist)
                    {
                        self.setState({userExist: true, createAccount: false})
                    }else
                    {   
                        self.setState({userExist: false, createAccount: true})
                    }
                })
                  .catch(function (error) {
                    console.log(error);
                })
                
            }else{
                this.setState({userExist: false, createAccount: false, validEmail: false}).then(function(response){
                    console.log(response.data.message) 
                })
                return
            }   
    }

    signInLogic = () => {
        let self = this
        if(this.state.password != null)
        {
            
            axios.post('/auth/login', {
                email: self.state.email,
                password: self.state.password
            }).then(function(response){
                if(response.data.message.validPassword)
                {
                    axios.post('/auth/login/callback', {
                        email: self.state.email,
                        password: self.state.password
                    }).then(()=> {

                    }).catch(
                        error => {
                            console.log(error)
                            window.location.reload();
                        }
                    )

                }else{
                    self.setState({validPassword: false})
                }
            })
            
        }else{
            this.setState({validPassword: false})
            return
        }
    }

    createAccountLogic = () => {
        let self = this

        if(this.state.username == null)
        {
            this.setState({validUsername: false})
            return
        }

        if(this.state.password != null && this.state.password.length > 10)
        {
            //create new account
            axios.post('/auth/register', 
                        {   email: this.state.email,
                            password: this.state.password,
                            username: this.state.username
                        }
                    ).then(function (response) {
                        console.log(response.data.message)
                        if(response.data.message.userExist)
                        {
                            self.setState({userExist: true, createAccount: false})
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            return
        }else{
            this.setState({validPassword: false})
            return
        }
    }

    preScreenModal = () => 
    {
       return <div class="modal fade" id="SignInModal" tabindex="-1" aria-labelledby="SignInModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-grid gap-2">
                            {/* <button type="button" class="provider-fb btn  justify-content-center align-items-center" >
                            <i class="profider-icon bi bi-facebook"></i>
                                Continue With Facebook
                            </button> */}
                            <a type="button" class="provider-google btn" href="/auth/google">
                                <i class="profider-icon bi bi-google"></i>
                                Continue With Google
                            </a>
                            {/* <button type="button" class="provider-apple btn" >
                                <img className="profider-icon-apple" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clker.com%2Fcliparts%2Fi%2Fs%2FH%2Ff%2F4%2FT%2Fapple-logo-white-hi.png&f=1&nofb=1"></img>
                                Continue With Apple
                            </button> */}
                            <hr></hr>
                            <input type="email" class={`form-control ${this.state.validEmail? null: "is-invalid"}`} id="emailInput" placeholder="Your Email Address or Username" aria-label="email" aria-describedby="basic-addon1" onChange={e=> this.setState({email: e.target.value})} value={this.state.email} required />
                            {
                                (!this.state.validEmail)?
                                    <small id="emailHelp" class="text-danger">
                                        Please Type A Proper Email!
                                    </small>:null
                            }
                            <button type="button" class="btn btn-danger" onClick={e => this.continueLogic(e)}>Continue</button>
                        </div> 
                    </div>
                        <div class="modal-footer">
                            <p className="sc-type-light">
                                <span>
                                    We may use your email and devices for updates and tips on UH Sound Cloud's products and services, and for activities notifications. You can unsubscribe for free at any time in your notification settings.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    }

    signInModal= () => {
        return  <div class="modal fade" id="SignInModal" tabindex="-1" aria-labelledby="SignInModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"> Sign In</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    
                    <div class="modal-body">
                        <div class="d-grid gap-2">
                            
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-arrow-left-short"></i></span>
                                </div>
                                <input type="text" id="emailInput"  class="form-control" aria-describedby="email-addon1" value={`${this.state.email}`} onClick={e=> {this.setState({userExist: false}); this.setState({password:null}); }} />
                            </div>
                           
                            <input type={(this.state.showPassword) ? "text" : "password"} class={`form-control ${this.state.validPassword? null: "is-invalid"}`} id="passwordInput" placeholder="Password" aria-label="password" aria-describedby="basic-addon1" onChange={e=> {this.setState({password: e.target.value});}}></input>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="0" id="ShowPassword" onClick={(e) => {this.setState({showPassword: !(this.state.showPassword)}); }}/>
                                <label class="form-check-label" for="ShowPassword">
                                    Display Password
                                </label>
                            </div>
                            {
                                !(this.state.validPassword)?
                                <small id="emailHelp" class="text-danger">
                                        Invalid Password
                                    </small>:null
                            }
                                       
                            
                            <button type="button" class="btn btn-danger" onClick={() => {this.signInLogic()}}>Sign In</button>
                            
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <p className="sc-type-light">
                            <span>
                                We may use your email and devices for updates and tips on UH Sound Cloud's products and services, and for activities notifications. You can unsubscribe for free at any time in your notification settings.
                            </span>
                        </p>
                    </div>
                    </div>
                </div>
            </div> 
    }


    createAccountModal = () => {
        return <div class="modal fade" id="SignInModal" tabindex="-1" aria-labelledby="SignInModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header text-center">
                            <button type="button" className="btn"  onClick={e => {this.setState({createAccount: false}); this.setState({password:null})}}><i class="bi bi-arrow-left-short"></i></button>
                            <h5 class="modal-title">Create Account</h5>
                            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div class="modal-body ">
                            <div class="d-grid gap-2">
                                
                                <div class="input-group mb-3 ">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-arrow-left-short"></i></span>
                                </div>
                                <input type="text" id="emailInput"  class="form-control" aria-describedby="email-addon1" value={`${this.state.email}`} onClick={e=> {this.setState({createAccount: false}); this.setState({password:null}); }} />
                                </div>

                                <input type="text" class={`form-control ${this.state.validUsername? null: "is-invalid"} mb-3`} 
                                        id="passwordInput" placeholder="Username" aria-label="username" aria-describedby="basic-addon1"
                                         onChange={e=> {this.setState({username: e.target.value}); this.setState({validPassword: true})}}/>      
                                    {
                                        (!this.state.validUsername)?
                                        <small id="passwordHelp" class="text-danger">
                                            Please Type A Username! 
                                        </small>:null
                                    }
                
                                
                                <input type={(this.state.showPassword) ? "text" : "password"} class={`mb-3 form-control ${this.state.validPassword? null: "is-invalid"}`} 
                                        id="passwordInput" placeholder="Password" aria-label="password" aria-describedby="basic-addon1"
                                         onChange={e=> {this.setState({password: e.target.value}); this.setState({validPassword: true})}}/>
                                
                                            
                                {
                                    (!this.state.validPassword)?
                                    <small id="passwordHelp" class="text-danger">
                                        Please Type A Valid Password! Password Has to Be Greater Than 10 Characters!
                                    </small>:null
                                }
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="0" id="ShowPassword" onClick={(e) => {this.setState({showPassword: !(this.state.showPassword)}); }}/>
                                    <label class="form-check-label" for="ShowPassword">
                                        Display Password
                                    </label>
                                </div>
                                <button type="button" class="btn btn-danger" onClick={e => this.createAccountLogic()}>Accept & Continue</button>
                                
                            </div> 
                        </div>
                        <div class="modal-footer text-center">
                            <p className="sc-type-light">
                                <span>
                                    By signing up I accept the Terms of Use. I have read and understood the Privacy Policy and Cookies Policy.
                                </span>
                            </p>
                            <small>
                                Are you trying to sign in?
                                The email address that you entered was not found.
                                Double-check your email address
                            </small>
                        </div>
                        </div>
                    </div>
                </div> 
    }

    showModalLogic()
    {
      
        if(!this.state.createAccount && !this.state.userExist)
        {
            return this.preScreenModal()
        }else if (!this.state.createAccount && this.state.userExist)
        {
            return this.signInModal()
        }else if(this.state.createAccount && !this.state.userExist)
        {
            return this.createAccountModal()
        }
                    
    }

    render()
    {
        return (
            <React.Fragment>
               {this.showModalLogic()}
            </React.Fragment>
        )
        
    }
}


export default ModalLogin;

// {(!this.state.createAccount) ? this.signIn() : this.createAccount()}