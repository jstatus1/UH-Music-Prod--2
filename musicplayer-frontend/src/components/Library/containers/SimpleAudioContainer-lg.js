import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'

import './SimpleAudioContainer-lg.css'

//Props: link, playlist, id

export default class SimpleAudioContainerLg extends PureComponent {
    
    state={
        mouse_in: false
    }

    render() {
        return (<div className="col-3 playlist-album-art"  key={this.props.id}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Link to={this.props.link + `/${this.props.playlist.playlist_name}/${this.props.playlist.playlist_id}`}><div className="col-12 " onMouseEnter={() => this.setState({mouse_in:true})} onMouseLeave={() => this.setState({mouse_in:false})}>
                        <span  className="upload-artwork-img">
                            <img id="Playlist_Upload_Image" className="image" src={(this.props.playlist.playlist_art != null)?this.props.playlist.playlist_art:null}></img>
                        </span>
                    </div></Link>
                    <div className="col-12 playlist-album-text text-center">
                        <t6 >{this.props.playlist.playlist_name}</t6>
                    </div>
                </div>
            </div>)
    }
}
