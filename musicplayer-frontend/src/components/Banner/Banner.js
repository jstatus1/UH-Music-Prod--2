import React from 'react'
import "./Banner.css"

import {connect} from 'react-redux'
import * as action from '../../store/actions'


class Banner extends React.Component
{
    state={
        TotalDuration: 0
    }

    secondsToHms(d) {

        d = Number(d);
    
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        
        
        return (d < 3600)? ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2) :
        ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    }

    componentDidMount()
    {
        if(this.props.fetch_track)
            this.props.fetch_track.map((song) => {
                console.log(song.duration)
                this.setState({TotalDuration: (song.duration + this.state.TotalDuration)})
            })
    }


  

    render()
    {
        return(<div className={`Banner_Container Banner_Gradient col-12 d-flex flex-row justify-content-around align-items-center ${(this.props.audioSetting)?null:"Paused"}`}>
                { (this.props.selectedAudio!= null )?
                    <React.Fragment>
                    <div className=" flex-column col-6 Banner_Container_Left justify-content-around" >
                        <div className="Banner_Title d-flex flex-row">
                             <button onClick={() => this.props.setAudio(!(this.props.audioSetting))} className="Banner_Play">
                                { (this.props.audioSetting)?
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
                        
                        <img className="Banner_Album_Image" src={this.props.selectedAudio.song_image}></img>
                    </div>
                    </React.Fragment>
                    :null
                }
             </div>)
    }
}

function mapStateToProps(state) {
    return { 
      selectedAudio: state.selected_audio_reducer,
      audioSetting: state.set_audio_reducer
     };
}


export default connect(mapStateToProps, action)(Banner)