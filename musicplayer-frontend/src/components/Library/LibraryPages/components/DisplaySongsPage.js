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

    removeSong(delSong)
    {
        console.log(delSong)
        let tempArr = []
        for(let i = 0; i < this.state.playlist.length; i++)
        {
            if(delSong != this.state.playlist[i]) 
            {
                tempArr.push(this.state.playlist[i])
            } 
        }

        this.setState({playlist: tempArr})
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
        }else if (this.props.type == "Tracks")
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
                <div className="col-6 ">
                    <button>Share</button>
                    <button>Edit</button>
                    <button>Add To Next Up</button>
                    <button>Delete Playlist</button>
                </div>
                <div className="col-12 ">
                    <AudioTable fetch_track={this.state.playlist} type={this.props.type} 
                            playlist_name={this.props.playlist_name} 
                            removeSong={this.removeSong.bind(this)}
                            playlist_id={this.props.playlist_id}></AudioTable>
                </div>
            </React.Fragment>)
        }else if(this.props.type == "Album")
        {
           return(<React.Fragment>
            <Banner fetch_track={this.state.album} intro="true"></Banner>
            <div className="col-12 ">
                <AudioTable fetch_track={this.state.album} type={this.props.type}></AudioTable>
            </div>
        </React.Fragment>)
        }else if(this.props.type == "Tracks")
        {
            return(<React.Fragment>
                <Banner fetch_track={this.state.tracks} intro="true"></Banner>
                <div className="col-12 ">
                    <AudioTable fetch_track={this.state.tracks} type={this.props.type}></AudioTable>
                </div>
            </React.Fragment>)
        }
    }


    render() {
        return (this.DisplayPageLogic())
    }
}
