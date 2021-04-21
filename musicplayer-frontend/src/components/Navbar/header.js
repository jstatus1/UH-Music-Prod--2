import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './coogmusic.png';
import "./style.css"

//Component
import ModalLogin from '../profile/Modal_Login'
import NotificationDropDown from './notifcations/notification_dropdown'
//Styling
import './header.css'
import SearchBar from '../SearchBar/SearchBar';


class Header extends Component {
  state = {
    display_notifications: false,
    notificationCounter: 0
  }

  retrieveNotificationCounter(count)
  {
    this.setState({notificationCounter: count})
  }

  renderContent()
  {
    
    switch(this.props.auth)
    {
      case null:
          return 
      case false:
          return(
              <ul className="navbar-nav ms-auto">
                

                        <li className="nav-link">
                          <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#SignInModal" >
                            Sign In
                          </button>
                          
                        </li>
                        <li className="nav-link">
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

            <div className="SearchBar">
            <SearchBar></SearchBar>
            </div>
            
             
            
            <ul className="navbar-nav ms-auto">
                        
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/upload' : '/'}>
                            Upload
                        </Link>
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/reports' : '/'}>
                            Reports
                        </Link>
              <li class="nav-item dropdown ">
                <div class="d-flex align-items-center">
                <img className="avatar_image_navbar" src={this.props.auth.avatar === null ? this.props.auth.profile_img_url : this.props.auth.avatar} alt={() => this.setState({avatar_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1"})}/>

                  <a class="nav-link dropdown-toggle" id="profile_dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <t2>{this.props.auth.username}</t2>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="profile_dropdown">
                   
                      <Link className="dropdown-item" aria-current="page" to={`/profileedit`}>
                            Profile
                      </Link>
                      
                  </ul>
                </div>
                
              </li>


              <li className="nav-item dropdown dropleft">
                <div>
                    <a class="nav-link" id="notification_dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span class="material-icons">
                        notifications
                      </span>
                      {
                        (this.state.notificationCounter > 0)? <span class="badge">{this.state.notificationCounter}</span>: null
                      }
                      
                    </a>
                    <NotificationDropDown retrieveNotificationCounter={this.retrieveNotificationCounter.bind(this)} />
                </div>
              </li>

              
              <li class="nav-item dropdown dropleft">
                <a class="nav-link " id="profile_dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-icons">
                    drag_indicator
                  </span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="profile_dropdown">
                        
                      
                  <li><a class="dropdown-item" href="/api/logout">Sign Out</a></li>
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
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link 
              className="navbar-brand" to={this.props.auth ? '/home' : '/'}>
                <img class="logo-size" src={logo} alt="Logo"/>
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