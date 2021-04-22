import React from 'react'
import './SimpleAudioContainer.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as action from '../../../store/actions'
import axios from 'axios'

import PlaylistModal from '../../AudioTable/PlaylistModal'
class SimpleAudioContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            mouse_in: false,
            link: '/Library/Overview',
            current_songPlaying: false,
            authorityToDelete: false
        }
        
    }


    componentDidMount()
    {
        
        try
        {
            if(this.props.song.user_id == this.props.auth.uid)
            {
                this.setState({authorityToDelete:true})
            }
            
        }catch(error)
        {
            
        }
        

        switch(this.props.type)
        {
            case "track":
                this.setState({link: this.props.link})
                break
            case "playlist":
                this.setState({link: `${this.props.link}/${this.props.song.playlist_name}/${this.props.song.playlist_id}`})
                break
            case "album":
                this.setState({link: `${this.props.link}/${this.props.song.album_title}/${this.props.song.album_id}`})
                break
            default:
                this.setState({link: `/Library/Overview`})
                break;
        }
    }
    


    audioLogic()
    {
        this.props.selectSong(this.props.song)
        if(this.state.current_songPlaying)
        {
            //pause the music
            localStorage.setItem("isPlaying", false)
            this.setState({current_songPlaying:false})
            this.props.setAudio(false)
        }else{
            //play the music
            localStorage.setItem("isPlaying", true)
            this.setState({current_songPlaying:true})
            this.props.setAudio(true)
        }
    }

    deleteLogic = async () =>
    {
        switch(this.props.type)
        {
            case "track":
                await axios.delete('/api/delete/trackById',
                { params:{song_id: this.props.song.song_id, 
                  user_id: this.props.song.user_id,
                  s3_audio_key: this.props.song.s3_audio_key,
                  s3_image_key: this.props.song.s3_image_key
                }})
                .then(response => {
                    if(response.data)
                    {
                        console.log("Successfully Deleted This: " + this.props.song.song_id)
                        this.props.fetchTracks()
                    }
                }).then(() => {
                    this.props.removeFromArray(this.props.song, "Tracks")
                })
                    
                break
            case "playlist":
                
                await axios.delete('/api/delete/playlistById',
                { params:{playlist_id: this.props.song.playlist_id, 
                  user_id: this.props.song.user_id,
                  s3_playlist_image_key: this.props.song.s3_playlist_image_key
                }})
                .then(response => {
                    if(response.data)
                    {
                        this.props.fetchPlaylist()
                    }
                }).then(() => {
                    this.props.removeFromArray(this.props.song, "Playlists")
                })
                break
            case "album":
                await axios.delete('/api/delete/albumById',
                { params:{album_id: this.props.song.album_id, 
                  user_id: this.props.song.user_id,
                  s3_album_image_key: this.props.song.s3_album_image_key
                }})
                .then(response => {
                    if(response.data)
                    {
                        this.props.fetchAlbums()
                    }
                }).then(() => {
                    this.props.removeFromArray(this.props.song, "Albums")
                })
                break
            default:
                this.setState({link: `/Library/Overview`})
                break;
        }
    }

    moreFeatureLogic()
    {
        switch(this.props.type)
        {
            case "track":
               return(<ul class="dropdown-menu dropend" aria-labelledby="trackDropdownExtra">
                            <li><a class="dropdown-item"><i class="bi bi-music-note-list"></i> Add To Next Up</a></li>
                            <li> <a type="button" class="btn" data-bs-toggle="modal" data-bs-target={`#playlistModal${this.props.song.song_id}`} class="dropdown-item">Add To Playlist</a></li>    
                     </ul>)
            case "playlist":
                return(<ul class="dropdown-menu dropend" aria-labelledby="trackDropdownExtra">
                            <li><a class="dropdown-item"><i class="bi bi-music-note-list"></i> Add To Next Up</a></li>
                     </ul>)
            case "album":
                return(<ul class="dropdown-menu dropend" aria-labelledby="trackDropdownExtra">
                            <li><a class="dropdown-item"><i class="bi bi-music-note-list"></i> Add To Next Up</a></li>
                     </ul>)
            default:
                break;
        }
    }

    renderPlayButton()
    {
        try{
            
            return((this.props.selectedAudio.song_id == this.props.song.song_id && 
                JSON.parse(localStorage.getItem('isPlaying')))?
                    <i class="bi bi-pause-circle-fill"></i>:
                    <i class="bi bi-play-circle-fill"></i>)
        }catch(err)
        {
            return(<i class="bi bi-play-circle-fill"></i>)
        }
    }


    displayLogic()
    {
        return(<>
                {(this.state.authorityToDelete)?
                    <div className="deleteButton">
                        <a onClick={() => this.deleteLogic()}>
                            <i class="bi bi-x-circle-fill"></i>
                        </a> 
                    </div>:null
                }
                
                <div className="playbutton">
                    <a onClick={() => this.audioLogic()}>
                       
                        {this.renderPlayButton()}
                    </a>
                </div>
                
                <div className="likeButton">
                    <i class="bi bi-heart-fill"></i>
                </div>
                <div className="addToPlaylistButton dropdown" >
                    <Link className=" buttonStyle" role="button" id="trackDropdownExtra" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots"></i></Link>
                    {this.moreFeatureLogic()}
                </div>
                </>)
    }

    render()
    {
        return(
            <React.Fragment>
            <div class="badge_items mr-3" key={this.props.id}>
                <div className="audio_artwork" onMouseEnter={() => this.setState({mouse_in:true})} onMouseLeave={() => this.setState({mouse_in:false})}>
                    <Link to={this.state.link}>
                        <span class="sc-artwork sc-artwork-placeholder-3  
                        image__full g-opacity-transition"  aria-role="img">
                            <img className="audio_image" src={this.props.song.song_image || this.props.song.album_art || this.props.song.playlist_art}></img>
                        </span>
                    </Link>
                    {
                        (this.state.mouse_in)?this.displayLogic():null
                    }


                </div>

                <div className="audio_description">
                    <t5 className="song_heading">{this.props.song.title || this.props.song.album_title || this.props.song.playlist_name}</t5>
                    <div className="playableTile__usernameHeadingContainer">
                        <t6>{this.props.song.username}</t6>
                    </div>
                </div>
            </div>
            <PlaylistModal id={this.props.song.song_id} song={this.props.song} song_image={this.props.song.song_image}></PlaylistModal>

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return { 
      selectedAudio: state.selected_audio_reducer,
      previousAudio: state.set_previous_audio_reducer,
      auth: state.auth_reducer
     };
}



export default connect(mapStateToProps, action) (SimpleAudioContainer)