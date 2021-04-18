import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux'
import * as actions from './store/actions'



import Routes from './routes/routes'

class App extends React.Component
{
        
    //Initial State Initialization
    componentDidMount()
    {
        //Inital Authentication Fetch
        this.props.fetchUser();
        this.props.fetchTracks();
        this.props.fetchPlaylist();
    }

    

    render()
    {
        return(<React.Fragment>
            <Routes></Routes>
        </React.Fragment>)
    }
}


function mapStateToProps(state) {
    return { 
      auth: state.auth_reducer,
      fetch_track: state.fetch_track_reducer,
      fetch_playlist: state.fetch_playlists_reducer
     };
}

export default connect(mapStateToProps, actions)(App);
