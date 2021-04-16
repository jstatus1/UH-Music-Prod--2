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
              
            <ul className="navbar-nav ms-auto">
                        
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/upload' : '/'}>
                            Upload
                        </Link>
                        <Link 
                          className="nav-link" aria-current="page" to={this.props.auth ? '/reports' : '/'}>
                            Reports
                        </Link>
              <li class="nav-item dropdown">
                <div class="d-flex align-items-center">
                <img className="avatar_image_navbar" src={this.props.auth.avatar} alt={() => this.setState({avatar_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1"})}/>

                  <a class="nav-link dropdown-toggle" id="profile_dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <small>{this.props.auth.username}</small>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="profile_dropdown">
                   
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/profileedit`}>
                            Profile
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Likes
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Playlist
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Stations
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Following
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Who To Follow
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Try Pro
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Distribute
                      </Link>
                  </ul>
                </div>
                
              </li>


              <li className="nav-item dropdown">
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

              <li className="nav-item">
                  <a class="nav-link " aria-current="page" href="#">
                    <span class="material-icons">
                      mail
                    </span>
                    </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link " id="profile_dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="material-icons">
                    drag_indicator
                  </span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="profile_dropdown">
                <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            About Us
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Legal
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Copyright
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Get UH Sound Cloud +
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Mobile Apps
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            For Creators
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Blog
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Jobs
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Developers
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Support
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Keyboard Shortcuts
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Subscription
                      </Link>
                      <Link 
                          className="dropdown-item" aria-current="page" to={`/${this.props.auth.username}`}>
                            Settings
                      </Link>
                      
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <Link 
                    className="navbar-brand" to={this.props.auth ? '/discovery' : '/'}>
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