import React from 'react'
import axios from 'axios'

class MainRegisterForm extends React.Component
{
    state = {
        email: "",
        password: "",
        passwordConfirmation: ""
    }

    register = (event) => {
        event.preventDefault();
        
        if(this.state.email == "") 
        {
            alert("Please Put In An Email")
            return 
        }

        if(this.state.password == "") 
        {
            alert("Please Put In An Password")
            return 
        }

        if(this.state.passwordConfirmation == "") 
        {
            alert("Please Confirm Your Password")
            return 
        }

        if(this.state.password != this.state.passwordConfirmation) 
        {
            alert("Passwords Do Not Match");
            return;
        }

        if(this.state.password.length < 10)
        {
            alert("Password Has To Be More Than 10 Characters")
            return;
        }
        
        

        axios.post('/register',  {
            email: this.state.email,
            password: this.state.password,
        }).then((res) => console.log(res.data))
        .catch((error) => {
            console.log(error)
            alert(`This ${this.state.email} already exists!`)
        });
    }

    login = () => {
        axios.post('/register',  {
            email: this.state.email,
            password: this.state.password,
        }).then((res) => console.log(res));
    }

    getUser = () => {
        axios.get('/user').then((res) => {
            console.log(res)
        })
    }
        

    render()
    {
        return(
            <div>
                <button>Facebook</button>
                <button>Google</button>
                <button>Apple</button>

                <hr></hr>

                    <h1>Register: </h1>
                    <form onSubmit={this.register}>
                        <input type='email' onChange={(e) => {this.setState({email: e.target.value})}} placeholder="Your email address or profile url"></input>
                        <input type='password' onChange={(e) => this.setState({password: e.target.value})} placeholder="Password"></input>
                        <input type='password' onChange={(e) => this.setState({passwordConfirmation: e.target.value})} placeholder="Password Confirmation"></input>
                        <button>Register</button>
                    </form>
                <br></br>

                    <h1>Login: </h1>
                    <input onChange={(e) => {this.setState({email: e.target.value})}} placeholder="Your email address or profile url"></input>
                    <input onChange={(e) => this.setState({password: e.target.value})} placeholder="Password"></input>
                    <input onChange={(e) => this.setState({passwordConfirmation: e.target.value})} placeholder="Password Confirmation"></input>
                    <button onClick={() => this.login()}>Continue</button>
                <br></br>

                    <h1>Get User: </h1>
                    <button onClick={() => this.getUser()}>Continue</button>
                <br></br>

                <a href="/auth/google">Google Auth</a>
            </div>
        )
    }
}

export default MainRegisterForm;