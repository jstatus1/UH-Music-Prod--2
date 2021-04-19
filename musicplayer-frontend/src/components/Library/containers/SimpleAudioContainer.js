import React from 'react'
import './SimpleAudioContainer.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as action from '../../../store/actions'
import axios from 'axios'

class SimpleAudioContainer extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            mouse_in: false,
            current_songPlaying: false,
            link: '/Library/Overview',
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
            
            this.setState({current_songPlaying:false})
            this.props.setAudio(false)
        }else{
            
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
                    {(this.props.selectedAudio == this.props.song && this.props.audioSetting)?
                        <i class="bi bi-pause-circle-fill"></i>:
                        <i class="bi bi-play-circle-fill"></i>
                    }
                        </a>
                    </div></>)
    }

    render()
    {
        return(
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
        )
    }
}

function mapStateToProps(state) {
    return { 
      selectedAudio: state.selected_audio_reducer,
      audioSetting: state.set_audio_reducer,
      previousAudio: state.set_previous_audio_reducer,
      auth: state.auth_reducer
     };
}



export default connect(mapStateToProps, action) (SimpleAudioContainer)