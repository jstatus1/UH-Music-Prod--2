import React from 'react'

import Banner from '../../Banner/Banner'
import AudioTable from '../../AudioTable/AudioTable'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import "./Tracks.css"

class Tracks extends React.Component
{
    state = {
        totalAudio: null,
        totalDurationSeconds: 0
    }

    fetchTrack = new Promise((resolve, reject) => {
        setTimeout(() => {
            this.props.fetchTracks()
          resolve(1);
        }, 300);
    });
      
    componentDidMount()
    {
        this.props.fetchPlaylist()
        this.fetchTrack.then(() => {
            this.setState({totalAudio: this.props.fetch_track.length})
            this.props.fetch_track.map(data=>
                {
                    this.setState({totalDurationSeconds:  this.state.totalDurationSeconds+data.duration})
                })
        })
    }
   
    render()
    {
        return(<React.Fragment>
                <Banner totalAudio={this.state.totalAudio} totalDurationSeconds={this.state.totalDurationSeconds}></Banner>
                <div className="col-12 ">
                    <AudioTable fetch_track={this.props.fetch_track} ></AudioTable>
                </div>
                <div className="col-12 Track_Footer d-flex flex-column align-items-center">
                    <h3>
                        More uploads =  More Listener 
                    </h3>
                    <Link to="/upload">
                        <button className="btn btn-outline-dark">Upload More</button>
                    </Link>
                </div>
            </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return { 
      fetch_track: state.fetch_track_reducer
     };
}


export default connect(mapStateToProps, actions)(Tracks)