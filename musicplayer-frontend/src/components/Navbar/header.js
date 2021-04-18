import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Component
import ModalLogin from '../profile/Modal_Login'
//Styling


class Header extends Component {
  renderContent()
  {
    
    switch(this.props.auth)
    {
      case null:
          return (<h1>Still Logging In...</h1>)
      case false:
          return(
              <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                          <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#SignInModal" >
                            Sign In
                          </button>
                        </li>

                        <li className="nav-item">
                          <button role="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#SignInModal">Create Account</button>
                        </li>
              </ul>
          )
      default:
        return(
          <React.Fragment>
            <ul className="navbar-nav ">
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/Home' : '/'}>
                            Home
                        </Link>
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/Library' : '/'}>
                            Library
                        </Link>
                        
            </ul>
              <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto">
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/Upgrade' : '/'}>
                            Upgrade
                        </Link>
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/upload' : '/'}>
                            Upload
                        </Link>
              <li class="nav-item dropdown">
                <div class="d-flex align-items-center">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="material-icons">
                      person_pin
                    </span>
                    <small>{this.props.auth.username}</small>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href={`/${this.props.auth.username}`}>Profile</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </div>
                
              </li>
              <li className="nav-item">
                    <a class="nav-link " aria-current="page" href="#">
                      <span class="material-icons">
                      notifications
                      </span>
                    </a>
                </li>
              <li className="nav-item">
                  <a class="nav-link " aria-current="page" href="#">
                    <span class="material-icons">
                      mail
                    </span>
                    </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-icons">
                    drag_indicator
                  </span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href="/api/logout">Log Out</a></li>
                </ul>
              </li>


            </ul>
          </React.Fragment>
        )

    }
  }
  render() {
    return(
      <React.Fragment>
      <ModalLogin ></ModalLogin>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <Link 
                    className="navbar-brand" to={this.props.auth ? '/discovery' : '/'}>
                      UH Sound Cloud
                  </Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse " id="navbarSupportedContent">


                    {this.renderContent()}


                  </div>
            </nav> 
            </React.Fragment>)
      
    }
}

function mapStateToProps(state) {
  return { 
    auth: state.auth_reducer
   };
}

export default connect(mapStateToProps)(Header);