import React from 'react'

import Banner from '../../Banner/Banner'
import AudioTable from '../../AudioTable/AudioTable'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import "./Tracks.css"

class Tracks extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            totalAudio: null,
            totalDurationSeconds: 0
        }
    }
   

    componentDidMount()
    {  
        try{
            this.fetchTrack.then(() => {
                
                this.props.fetch_track.map(data=>
                    {
                        this.setState({totalDurationSeconds:  this.state.totalDurationSeconds+data.duration})
                    })
            })
        }catch(err)
        {
            
        }  
    }
   
    render()
    {
        return(<React.Fragment>
                <Banner totalAudio={(this.props.fetch_track)?this.props.fetch_track.length:0} totalDurationSeconds={this.state.totalDurationSeconds}></Banner>
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