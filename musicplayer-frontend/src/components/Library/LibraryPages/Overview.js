import React from 'react'
import {Link} from 'react-router-dom'

import SimpleAudioContainer from '../containers/SimpleAudioContainer'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import "./Overview.css"

class Overview extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props.fetchTracks()
        this.props.fetchAlbums()
        this.props.fetchPlaylist()
    }
    
    renderTrackItems()
    {
        try{
            return this.props.fetch_track.map((song, index) => {
                return (<SimpleAudioContainer id={index} song={song} link="library/tracks" type="track"></SimpleAudioContainer>)
            }) 
        }catch(err)
        {

        }
        
    }

    renderPlaylistItems()
    {
        try{
            return this.props.fetch_playlist.map((song, index) => {
                return (<SimpleAudioContainer id={index} song={song} link="playlists" type="playlist"></SimpleAudioContainer>)
            })
        }catch(err)
        {

        }
         
    }

    renderAlbumItems()
    {
        try{
            return this.props.fetch_album.map((song, index) => {
                return (<SimpleAudioContainer id={index} song={song} link="albums" type="album"></SimpleAudioContainer>)
            }) 
        }catch(err)
        {
            
        }
        
    }
   

    render()
    {
        return(<div className="container Overview-Container">
           { (this.props.fetch_track)?
                <div>
                    <Link to="/Library/Tracks"><button className="btn sub_titles">Tracks</button></Link>
                    <div className="wrapper pb-4">
                        {this.renderTrackItems()}
                    </div>
                </div>:null
            }
            { (this.props.fetch_track)?
                <div>
                    <Link to="/Library/Albums"><button className="btn sub_titles">Albums</button></Link>
                    <div className="wrapper pb-4">
                        {this.renderAlbumItems()}
                    </div>
                </div>:null
            }
            { (this.props.fetch_track)?
                <div>
                    <Link to="/Library/Playlists"><button className="btn sub_titles">Playlists</button></Link>
                    <div className="wrapper pb-4">
                        {this.renderPlaylistItems()}
                    </div>
                </div>:null
            }
        </div>)
    }
}

function mapStateToProps(state) {
    return { 
        fetch_track: state.fetch_track_reducer,
        fetch_playlist: state.fetch_playlists_reducer,
        fetch_album: state.fetch_albums_reducer
     };
}


export default connect(mapStateToProps, actions)(Overview)