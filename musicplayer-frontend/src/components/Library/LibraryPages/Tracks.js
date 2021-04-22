import React from 'react'

import Banner from '../../Banner/Banner'
import AudioTable from '../../AudioTable/AudioTable'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import "./Tracks.css"
import axios from 'axios'

class Tracks extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            totalAudio: null,
            totalDurationSeconds: 0,
            tracks: []
        }
    }
   

    componentDidMount()
    {  
        
        try{
            axios.get('/api/get/user/tracks')
            .then(res=> {
                this.setState({tracks: res.data})
            }).then(() => {
                this.props.fetch_track.map(data=>
                {
                    this.setState({totalDurationSeconds:  this.state.totalDurationSeconds+data.duration})
                })
            })
        }catch(err)
        {
            
        }  
    }

    removeSong(song)
    {
        let tempTracks = []
        for(let i = 0; i < this.state.tracks.length; i++)
        {
            if(song != this.state.tracks[i])
            {
                tempTracks.push(this.state.tracks[i])
            }
        }
        this.setState({tracks: tempTracks})
    }
   
    render()
    {
        return(<React.Fragment>
                <Banner totalAudio={(this.props.fetch_track)?this.props.fetch_track.length:0} totalDurationSeconds={this.state.totalDurationSeconds}></Banner>
                <div className="col-12 ">
                    <AudioTable fetch_track={this.state.tracks} 
                                type={"Track"} 
                                playlist_name={this.props.playlist_name} 
                                playlist_id={this.props.playlist_id}
                                removeSong={this.removeSong.bind(this)}>
                    </AudioTable>
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