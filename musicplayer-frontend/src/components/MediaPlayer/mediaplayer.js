import React from 'react'
import { connect } from 'react-redux'
import * as action from '../../store/actions'

//css
import "./MediaPlayer.css"

class MediaPlayer extends React.Component
{   
    state ={
        songDuration: null,
        currentDuration: null,
        timeFormatNormal: true,
        isMuted: false
    }

    componentDidUpdate(prevProps, prevState) {

        let audio = document.getElementById('audio');
        
        if(this.props.audioSetting || JSON.parse(localStorage.getItem('isPlaying')))
        {
            this.props.setAudio(true)
            audio.play()
        }else{
            this.props.setAudio(false)
            audio.pause()
        }
    }

    componentDidMount()
    {
        this.setState({currentDuration: this.secondsToHms(0)})
        this.setState({songDuration: this.secondsToHms(0)})
        this.setState({isPlaying: JSON.parse(localStorage.getItem("isPlaying"))})
    }


    secondsToHms(d) {

        d = Number(d);
    
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        
        
        return (d < 3600)? ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2) :
        ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }

    audioLoad = (e) => {
        this.setState({songDuration:this.secondsToHms(e.target.duration)})
    }

    audioToggle = () =>  {

        if (this.props.audioSetting){
            this.props.setAudio(false)
            localStorage.setItem('isPlaying', false)
        }else{
            this.props.setAudio(true)
            localStorage.setItem('isPlaying', true) 
        }   
    }

    updateProgress = (e) => 
    {
        this.setState({currentDuration: this.secondsToHms(e.target.currentTime)})
        let progress = document.querySelector(".mediaplayer_progress")

        progress.style.width = `${((e.target.currentTime)/(e.target.duration))*100}%`
    }


    setProgress = (e) => {

        let audio = document.getElementById('audio');
        let width = e.target.clientWidth
        let clickX =e.nativeEvent.offsetX
        
      
        audio.currentTime = (clickX/width) * audio.duration
       
    }

    nextSong()
    {

    }

    prevSong()
    {

    }

    toggleVolume()
    {
        let audio = document.getElementById('audio');

        if(this.state.isMuted)
        {
            this.setState({isMuted: false})
            audio.muted = false
        }else{
            this.setState({isMuted: true})
            audio.muted = true
        }
    }

    changeVolume(e)
    {
        let audio = document.getElementById('audio')
        audio.volume = e.target.value
    }
    
    renderAudio()
    {
        if(this.props.selectedAudio)
        return(<div class="mediaplayer_container col-12 ">
                <section role="contentinfo" aria-label="miniplayer" class="playControls__inner  d-flex flex-row justify-content-center align-items-center">
                    <audio id="audio" onTimeUpdate={e=> {this.updateProgress(e)}} 
                            src={this.props.selectedAudio.song_link} 
                            onLoadedMetadata={e=>{this.audioLoad(e)}}
                            onEnded={() => this.nextSong()}
                    >

                    </audio>
                    
                    <div className="mediaplayer_navigation col-2 d-flex flex-row justify-content-end">
                        <button><i class="bi bi-skip-backward-fill"></i></button>
                        <button className="mediaplayer_btn_play" onClick={() => this.audioToggle()} >
                            {(this.props.audioSetting)?
                                <i class="bi bi-pause-circle-fill"></i>:
                                <i class="bi bi-play-fill"></i>
                            }
                           
                        </button>
                        <button><i class="bi bi-skip-forward-fill"></i></button>
                        <button><i class="bi bi-shuffle"></i></button>
                        <button><i class="bi bi-arrow-repeat"></i></button>
                       
                        <div className="dropdown">
                            <div class="dropdown-content">
                                <div className="slider-wrapper">
                                    <input type="range"
                                           min="0" 
                                           max="1" 
                                           step=".01" 
                                           defaultValue=".5" 
                                           orient="veritical"
                                           onChange={(e) => this.changeVolume(e)}/>
                                </div> 
                            </div>
                            <button id="volumeButton" onClick={()=> this.toggleVolume()}  type="button"  className="dropbtn">
                                { (this.state.isMuted)?
                                        <i class="bi bi-volume-mute-fill"></i>
                                        :
                                        <i class="bi bi-volume-down-fill"></i>}
                            </button>
                        </div>
                    </div>
                    <div className="col-4 d-flex flex-row  align-items-center">
                        <t6 className="mediaplayer_timer">{this.state.currentDuration}</t6>
                        <div class="mediaplayer_progress_container" id="mediaplayer_progress_container" onClick={e=> {this.setProgress(e)}}>
                            
                            <div class="mediaplayer_progress" id="mediaplayer_progress" ></div>
                            
                        </div>
                        <t6 className="mediaplayer_timer">{this.state.songDuration}</t6>
                    </div>
                    
                    <div className="col-3 d-flex flex-row mediaplayer_info">
                        <div className="mediaplayer_audio_image_container">
                            <img alt="music_cover" src={this.props.selectedAudio.song_image} classname="media_image_cover" id="media_image_cover"></img>
                        </div>
                        <div className="flex-column mediaplayer_info_text">
                            <div>
                                <t5 id="mediaplayer_artist truncate">{this.props.selectedAudio.username}</t5>
                                <h6 className="truncate" id="mediaplayer_title">{this.props.selectedAudio.title}</h6>
                            </div>
                        </div>
                            
                        <div>

                        </div>
                    </div>

                    <div className="mediaplayer_extra col-3 d-flex flex-row">
                        <button><i class="bi bi-heart-fill"></i></button>
                        <button><i class="bi bi-person-plus-fill"></i></button>
                        <button><i class="bi bi-music-note-list"></i></button>
                    </div>
                    
                </section>
            </div>)
        else
            return(<div class="mediaplayer_container col-12 ">
            <section role="contentinfo" aria-label="miniplayer" class="playControls__inner  d-flex flex-row justify-content-center align-items-center">
                <audio id="audio" ></audio>
                <div className="mediaplayer_navigation col-2 d-flex flex-row justify-content-end">
                    <button><i class="bi bi-skip-backward-fill"></i></button>
                    <button onClick={() => this.audioToggle()} ><i class="bi bi-play-fill"></i></button>
                    <button><i class="bi bi-skip-forward-fill"></i></button>
                    <button><i class="bi bi-shuffle"></i></button>
                    <button><i class="bi bi-arrow-repeat"></i></button>
                   
                    <div class="btn-group dropup">
                        <button id="dropdownMenuButton1" onClick={()=> this.toggleVolume()}  type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        { (this.state.isMuted)?
                                <i class="bi bi-volume-mute-fill"></i>
                                :
                                <i class="bi bi-volume-down-fill"></i>}
                        </button>
                        {/* <ul class="dropdown-menu" aria-labelledby="volumeButton">
                            <input type="range" class="vranger"/>
                        </ul> */}
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-4 d-flex flex-row  align-items-center">
                        <t6 className="mediaplayer_timer">{this.state.currentDuration}</t6>
                        <div class="mediaplayer_progress_container" id="mediaplayer_progress_container">
                            
                            <div class="mediaplayer_progress" id="mediaplayer_progress"></div>
                            
                        </div>
                        <t6 className="mediaplayer_timer">{this.state.songDuration}</t6>
                    </div>
                
                <div className="col-3 d-flex flex-row mediaplayer_info">
                    <div className="mediaplayer_audio_image_container">
                        <img alt="music_cover" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f101ee52097223.590463d3471b4.jpg" classname="media_image_cover" id="media_image_cover"></img>
                    </div>
                    <div className="flex-column mediaplayer_info_text">
                        <div>
                            <t5 id="mediaplayer_artist truncate">Artist</t5>
                            <h6 className="truncate" id="mediaplayer_title">Title asdfasdfasdfasdfa sfasdfasdf asasdfasdfasfafafasfsd</h6>
                        </div>
                    </div>
                        
                    <div>

                    </div>
                </div>

                <div className="mediaplayer_extra col-3 d-flex flex-row">
                    <button><i class="bi bi-heart-fill"></i></button>
                    <button><i class="bi bi-person-plus-fill"></i></button>
                    <button><i class="bi bi-music-note-list"></i></button>
                </div>
                
            </section>
        </div>)
    }

   
    render()
    {
        return (<React.Fragment>
            {this.renderAudio()}
        </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return { 
      selectedAudio: state.selected_audio_reducer,
      audioSetting: state.set_audio_reducer
     };
}

export default connect(mapStateToProps, action) (MediaPlayer)