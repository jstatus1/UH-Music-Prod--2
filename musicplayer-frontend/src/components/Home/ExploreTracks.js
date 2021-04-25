import React, { PureComponent } from 'react'
import MusicBanner from '../Banner/Banner'
import axios from 'axios'

export default class ExploreTracks extends PureComponent {

    state={
        audio: {}
    }

    componentDidMount()
    {
         axios.get('/api/get/songBysong_id', {params:{song_id:this.props.song_id}})
        .then(response => {
            this.setState({audio:response.data[0] })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h1>Explore Tracks</h1>
                <MusicBanner 
                    song_id={this.props.song_id} 
                    song={this.state.audio}
                    explore_track={true}>
                </MusicBanner>
            </div>
        )
    }
}
