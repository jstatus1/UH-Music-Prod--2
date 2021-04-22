import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import axios from 'axios'

import './AudioTable_Row.css'

import PlaylistModal from './PlaylistModal'

class AudioTable_Row extends PureComponent {

    state={
        mouse_in: false,
        current_songPlaying: false,
        renderPlaylists_toggle: false,
        mouse_in_playlist:false,
        showModalPlaylist: false,
        propertyOf: false
    }

    
    removeSongFromPlaylist()
    {
        try{
            axios.delete('/api/delete/songFromPlaylist', {params:{playlist_id:this.props.playlist_id, song_id:this.props.song.song_id}})
            .then(()=> {
                this.props.removeSong(this.props.song)
            })
            .catch(err=> {

            })
        }catch(err)
        {

        }
        
    }

    deleteSong()
    {
        
        try{
            axios.delete('/api/delete/trackById', 
            {params:{song_id:this.props.song.song_id, 
                     user_id:this.props.song.user_id,
                     s3_audio_key: this.props.song.s3_audio_key,
                     s3_image_key: this.props.song.s3_image_key
                    }})
            .then(()=> {
                this.props.removeSong(this.props.song)
            })
            .catch(err=> {

            })
        }catch(err)
        {

        }
    }
   

    secondsToHms(d) {

        d = Number(d);
    
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        
        
        return (d < 3600)? ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2) :
        ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }

    audioLogic()
    {
        this.props.selectSong(this.props.song)
        if(this.state.current_songPlaying)
        {
            
            this.setState({current_songPlaying:false})
            this.props.setAudio(false)
        }else{
            
            this.setState({current_songPlaying:true})
            this.props.setAudio(true)
        }
    }


    componentDidMount()
    {   
        //check if this property belongs to the current user
        let uid = JSON.parse(localStorage.getItem("User")).uid
        switch(this.props.type)
        {
            case "Track":
                if(uid == this.props.song.user_id)
                    this.setState({propertyOf: true})
                break;
            case "Tracks":
                if(uid == this.props.song.user_id)
                    this.setState({propertyOf: true})
                break;
            case "Album":
                if(uid == this.props.song.user_id)
                    this.setState({propertyOf: true})
                break;
            case "Playlist":
                if(uid == this.props.song.user_id)
                    this.setState({propertyOf: true})
                break;
        }
        
    }

    render() {
        return(<React.Fragment>
        <tr key={this.props.id} className="AudioTable_Row  align-item-center" 
                    onMouseEnter={() => this.setState({mouse_in: true})} 
                    onMouseLeave={() => this.setState({mouse_in: false})} >
                    <td><i class="bi bi-heart"></i></td>
                    <td>
                        <div className="AudioTable_Audio_Artwork">
                        <img className="AudioTable_Audio_Image" src={this.props.song.song_image || this.props.song.album_art}></img>
                            {
                                (this.state.mouse_in)?
                                <div className="AudioTable_Playbutton">
                                    <a onClick={() => this.audioLogic()}>
                                        {(this.props.selectedAudio == this.props.song && this.props.audioSetting)?
                                        <i class="bi bi-pause-circle-fill"></i>:
                                        <i class="bi bi-play-circle-fill"></i>
                                        }
                                    </a>
                                </div>:null

                            }
                        </div>
                    </td>
                    <td>{this.props.song.title}</td>
                    <td>{this.props.song.username}</td>
                    <td>{this.props.song.album_title || "------"}</td>
                    <td>{this.props.song.release_date}</td>
                    {
                        (this.state.mouse_in)?
                        <td>
                            <button className="btn AudioTable_Row_MoreButton dropdown-toggle" type="button" id="AudioTable_More_DropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots"></i>
                            </button>
                            <ul class="dropdown-menu dropend" aria-labelledby="AudioTable_More_DropDown">
                                {/* <li><a class="dropdown-item" href="#">Add To Queue</a></li>
                                <li><a class="dropdown-item" href="#">Go To Song Radio</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Go To Artist</a></li>
                                <li><a class="dropdown-item" href="#">Go To Album</a></li>
                                <li><a class="dropdown-item" href="#">Show Credits</a></li>
                                <li><hr class="dropdown-divider"/></li>
                                <li><a class="dropdown-item" href="#">Save to Likes</a></li> */}
                                <li> <a type="button" class="btn" data-bs-toggle="modal" data-bs-target={`#playlistModal${this.props.song.song_id}`} class="dropdown-item">
                                <i class="bi bi-plus-square-fill"></i> Add To Playlist</a></li>
                                {/* <li><a class="dropdown-item" href="#">Remove from This Playlist</a></li> */}
                                {/*
                                */}
                                 
                                 {
                                    (this.state.propertyOf)? <><li onClick={()=> {this.deleteSong()}}><a class="dropdown-item" ><i class="bi bi-trash"></i> Delete Song</a></li></>:null  
                                 }
                                  {
                                    (this.props.type == "Playlist")? <><li onClick={()=>{ this.removeSongFromPlaylist()}}><a class="dropdown-item" >
                                        <i class="bi bi-file-x-fill"></i>  Remove From "{this.props.playlist_name}"</a></li></>:null  
                                 }
                                
                                
                                {/* <li><a class="dropdown-item" href="#">Share</a></li> */}
                            </ul>

                            {/* <ul class="dropdown-menu dropend" aria-labelledby="AudioTable_More_DropDown">
                                <li><a class="dropdown-item" href="#">Add To Queue</a></li>
                                <li><a class="dropdown-item" href="#">Go To Song Radio</a></li>
                            </ul> */}
                        </td>:
                            
                        <td>{this.secondsToHms(this.props.song.duration)}</td>
                    }
                    <PlaylistModal id={this.props.song.song_id} song={this.props.song} song_image={this.props.song.song_image}></PlaylistModal>
                </tr>
                
                
                </React.Fragment>)
    }
}


function mapStateToProps(state) {
    return { 
        selectedAudio: state.selected_audio_reducer,
        audioSetting: state.set_audio_reducer
     };
}


export default connect(mapStateToProps, actions)(AudioTable_Row)
