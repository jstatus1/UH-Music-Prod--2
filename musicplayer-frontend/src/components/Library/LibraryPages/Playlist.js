import React, { PureComponent } from 'react'
import CreatePlaylistModal from './components/CreatePlaylistModal'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'


import SimpleAudioContainerLG from '../containers/SimpleAudioContainer-lg'
import './Playlist.css'

class Playlist extends PureComponent {

    renderPlaylistRow()
    {
        try{
            return this.props.fetch_playlist.map((playlist, index) => {
               return(<SimpleAudioContainerLG id={index} playlist={playlist} link="/Library/Playlist"></SimpleAudioContainerLG>)
             })
        }catch(err)
        {
            return null
        }
    }
    
    render() {
        return (<React.Fragment>
                
                <div className="d-flex flex-row  mt-5 d-flex justify-content-between">
                    <div>
                        <h6>Hear your own playlists and the playlists you’ve liked: </h6>
                    </div>
                    <div>
                        <button  data-bs-toggle="modal" data-bs-target="#CreatePlaylistModal"><i class="bi bi-plus-circle-fill"></i> New Playlist</button>
                    </div>
                </div>
                <div className="Playlist_Container container mt-5 mb-5">
                    <div className="row">
                        {this.renderPlaylistRow()}
                    </div>
                </div>
                <CreatePlaylistModal></CreatePlaylistModal>
            </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return { 
      fetch_playlist: state.fetch_playlists_reducer
     };
}


export default connect(mapStateToProps, actions) (Playlist)
