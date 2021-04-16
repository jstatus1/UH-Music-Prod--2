import React from 'react'
import './SimpleAudioContainer.css'

import {connect} from 'react-redux'
import * as action from '../../../store/actions'

class SimpleAudioContainer extends React.Component
{
    state={
        mouse_in: false,
        current_songPlaying: false
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

    render()
    {
        return(
            <div class="badge_items mr-3" key={this.props.id}>
                <div className="audio_artwork" onMouseEnter={() => this.setState({mouse_in:true})} onMouseLeave={() => this.setState({mouse_in:false})}>
                    
                    <span class="sc-artwork sc-artwork-placeholder-3  
                    image__full g-opacity-transition"  aria-role="img">
                        <img className="audio_image" src={this.props.song.song_image}></img>
                    </span>

                    {
                        (this.state.mouse_in)?
                        <div className="playbutton">
                            <a onClick={() => this.audioLogic()}>
                                {(this.props.selectedAudio == this.props.song && this.props.audioSetting)?
                                    <i class="bi bi-pause-circle-fill"></i>:
                                    <i class="bi bi-play-circle-fill"></i>
                                }
                            </a>
                         </div>:null

                    }
                    
                </div>


                <div className="audio_description">
                    <t5 className="song_heading">{this.props.song.title}</t5>
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
      previousAudio: state.set_previous_audio_reducer
     };
}



export default connect(mapStateToProps, action) (SimpleAudioContainer)