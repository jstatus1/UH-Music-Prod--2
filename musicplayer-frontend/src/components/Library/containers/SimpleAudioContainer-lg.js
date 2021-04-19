import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'

import './SimpleAudioContainer-lg.css'

//Props: link, playlist, id

export default class SimpleAudioContainerLg extends PureComponent {
    
    state={
        mouse_in: false
    }

    renderPlaylist()
    {
        return(<div className="d-flex flex-column justify-content-center align-items-center">
        <Link to={this.props.link + `/${this.props.playlist.playlist_name}/${this.props.playlist.playlist_id}`}><div className="col-12 " onMouseEnter={() => this.setState({mouse_in:true})} onMouseLeave={() => this.setState({mouse_in:false})}>
            <span  className="upload-artwork-img">
                <img id="Playlist_Upload_Image" className="image" src={(this.props.playlist.playlist_art != null)?this.props.playlist.playlist_art:null}></img>
            </span>
        </div></Link>
        <div className="col-12 playlist-album-text text-center">
            <t6 >{this.props.playlist.playlist_name}</t6>
        </div>
    </div>)
    }

    renderAlbum()
    {
        return(<div className="d-flex flex-column justify-content-center align-items-center">
            <Link to={this.props.link + `/${this.props.album.album_title}/${this.props.album.album_id}`}><div className="col-12 " onMouseEnter={() => this.setState({mouse_in:true})} onMouseLeave={() => this.setState({mouse_in:false})}>
                <span  className="upload-artwork-img">
                    <img id="Playlist_Upload_Image" className="image" src={(this.props.album.album_art != null)?this.props.album.album_art:null}></img>
                </span>
            </div></Link>
            <div className="col-12 playlist-album-text text-center">
                <t6 >{this.props.album.album_title}</t6>
            </div>
        </div>)
    }

    renderLogic()
    {
        switch(this.props.type){
            case "Album":
                return this.renderAlbum()
            case "Playlist":
                return this.renderPlaylist()
            default:
                break;
        }
    }

    render() {
        return (<div className="col-3 playlist-album-art"  key={this.props.id}>
                {this.renderLogic()}
            </div>)
    }
}
