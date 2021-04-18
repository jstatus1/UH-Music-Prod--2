import React, { PureComponent } from 'react'
import axios from 'axios'

import Banner from '../../../Banner/Banner'
import AudioTable from '../../../AudioTable/AudioTable'

//Summary - displays all tracks and banner of playlist
export default class PlaylistDisplayPage extends PureComponent 
{
    state={
        playlist: []
    }

    componentDidMount()
    {
        axios.get('/api/get/playlistById', {params:{playlistId: this.props.playlist_id}})
        .then((response) => {
            console.log(response.data)
            this.setState({playlist: response.data})
        })
    }


    render() {
        return (<React.Fragment>
                <Banner fetch_track={this.state.playlist}></Banner>
                <div className="col-12 ">
                    <AudioTable fetch_track={this.state.playlist} ></AudioTable>
                </div>
            </React.Fragment>)
    }
}
