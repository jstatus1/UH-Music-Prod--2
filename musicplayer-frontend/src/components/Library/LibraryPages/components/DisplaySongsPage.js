import React, { PureComponent } from 'react'
import axios from 'axios'

import Banner from '../../../Banner/Banner'
import AudioTable from '../../../AudioTable/AudioTable'

//Summary - displays all tracks and banner of playlist

export default class DisplaySongsPage extends PureComponent 
{
    constructor(props)
    {
        super(props)
        this.state={
            playlist: [],
            album: [],
            tracks: []
        }


    }
    

    componentDidMount()
    {
        if(this.props.type == "Playlist")
        {
            axios.get('/api/get/playlistById', {params:{playlistId: this.props.playlist_id}})
            .then((response) => {
                this.setState({playlist: response.data})
            })
        }else if(this.props.type == "Album")
        {
            axios.get('/api/get/AlbumById', {params:{album_id: this.props.album_id}})
            .then((response) => {
                this.setState({album: response.data})
            })
        }else if (this.props.type == "User_Track")
        {
            axios.get('/api/get/user/tracks')
            .then((response) => {
                this.setState({tracks: response.data})
            })
        }
    }

    DisplayPageLogic()
    {
        if(this.props.type == "Playlist")
        {
            return(<React.Fragment>
                <Banner fetch_track={this.state.playlist} intro="true"></Banner>
                <div className="col-12 ">
                    <AudioTable fetch_track={this.state.playlist} ></AudioTable>
                </div>
            </React.Fragment>)
        }else if(this.props.type == "Album")
        {
           return(<React.Fragment>
            <Banner fetch_track={this.state.album} intro="true"></Banner>
            <div className="col-12 ">
                <AudioTable fetch_track={this.state.album} ></AudioTable>
            </div>
        </React.Fragment>)
        }else if(this.props.type == "User_Track")
        {
            return(<React.Fragment>
                    <Banner fetch_track={this.state.tracks} intro="true"></Banner>
                    <div className="col-12 ">
                        <AudioTable fetch_track={this.state.tracks} type={this.props.type}></AudioTable>
                    </div>
                </React.Fragment>)
        }else if(this.props.type == "Track")
        {
            <div>
                <h1>Currently Listening To:</h1>
                <h2>{this.props.title}</h2>
            </div>
        }
    }


    render() {
        return (this.DisplayPageLogic())
    }
}
