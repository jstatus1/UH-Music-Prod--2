import React from 'react'
import "./Banner.css"

import {connect} from 'react-redux'
import * as action from '../../store/actions'


class Banner extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            TotalDuration: 0,
            current_songPlaying: JSON.parse(localStorage.getItem("isPlaying")),
            explore_track_played:false
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
        if(this.props.explore_track && this.state.explore_track_played)
        {
            this.props.selectSong(this.props.song)
        }
       
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


    renderLogic()
    {
        if(this.props.explore_track)
        {
            return(<>
                { (this.props.selectedAudio!= null)?
                    <React.Fragment>
                    <div className=" flex-column col-6 Banner_Container_Left justify-content-around" >
                        <div className="Banner_Title d-flex flex-row">
                             <button onClick={() => this.audioLogic()} className="Banner_Play">
                                { (this.props.audio_setting)?
                                    <i className="bi bi-pause-circle-fill"></i>:
                                    <i className="bi bi-play-circle-fill"></i>
                                }
                            </button>
                             <div className="Banner_font d-flex flex-column">
                                <t5 className="Banner_font_style">{this.props.song.username}</t5>
                                <h1 className="Banner_font_style">{this.props.song.title}</h1>
                             </div>
                        </div>
                    </div>
                    <div className="col-6  d-flex flex-row Banner_Album">
                        
                        <img className="Banner_Album_Image" src={this.props.song.song_image}></img>
                    </div>
                    </React.Fragment>
                    :null
                
                }
            </>)
        }else{
           return (<>
                { (this.props.selectedAudio!= null )?
                    <React.Fragment>
                    <div className=" flex-column col-6 Banner_Container_Left justify-content-around" >
                        <div className="Banner_Title d-flex flex-row">
                             <button onClick={() => this.audioLogic()} className="Banner_Play">
                                { (this.props.audio_setting)?
                                    <i className="bi bi-pause-circle-fill"></i>:
                                    <i className="bi bi-play-circle-fill"></i>
                                }
                            </button>
                             <div className="Banner_font d-flex flex-column">
                                <t5 className="Banner_font_style">{this.props.selectedAudio.username}</t5>
                                <h1 className="Banner_font_style">{this.props.selectedAudio.title}</h1>
                             </div>
                        </div>
                        <div  className="Banner_Info  d-flex flex-column justify-content-center align-items-center">
                            <h1>{this.props.totalAudio}</h1>
                            <t5>Tracks</t5>
                            <t4>{this.secondsToHms(this.state.TotalDuration)}</t4>
                        </div>
                    </div>
                    <div className="col-6  d-flex flex-row Banner_Album">
                        
                        <img className="Banner_Album_Image" src={this.props.selectedAudio.song_image || this.props.selectedAudio.album_art}></img>
                    </div>
                    </React.Fragment>
                    :null
                
                }
            </>)
        }
    }

    render()
    {
        return(<React.Fragment>
            <div className={`Banner_Container 
                            Banner_Gradient col-12 d-flex flex-row 
                            justify-content-around align-items-center 
                            ${JSON.parse(localStorage.getItem("isPlaying"))?null:"Paused"}`}>
                {this.renderLogic()}
            </div>
        </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return { 
      selectedAudio: state.selected_audio_reducer,
      audio_setting: state.set_audio_reducer
     };
}


export default connect(mapStateToProps, action)(Banner)