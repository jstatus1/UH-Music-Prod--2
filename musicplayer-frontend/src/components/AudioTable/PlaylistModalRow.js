import React, { PureComponent } from 'react'
import axios from 'axios'
import './PlaylistModalRow.css'

export default class PlaylistModalRow extends PureComponent 
{   
    state={
        errMessage: null,
        successMessage: null
    }


    addToPlaylistLogic()
    {   
        axios.post('/api/addAudio/playlist/', 
        {playlist_id: this.props.playlist.playlist_id, song_id: this.props.song.song_id})
        .then(res => {
            if(res.data)
            {
                this.setState({successMessage: 'This Song Is Successfully Added!'})
            }else{
                this.setState({errMessage: 'This Song Is Already Added!'})
            }
        }).catch(err => {
            if(err.response.status === 401){
                    this.setState({errMessage: 'This Song Has Been Added Already!'})
            }
            else{
                this.setState({errMessage: "Sorry, There Is An Issue With Our Server!"})
            }
        })

    }

    checkAlert(){
        if(this.state.errMessage != null)
        {
            return <div class="alert alert-danger alert-dismissible fade show" role="alert">
             <strong>Holy guacamole!</strong> {this.state.errMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.setState({errMessage:null})}></button>
            </div>
        }

        if(this.state.successMessage != null)
        {
            return <div class="alert alert-success alert-dismissible fade show" role="alert">
             <strong>Great!</strong> {this.state.successMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.setState({successMessage:null})}></button>
            </div>
        }
    }


    render() {
        return (

                <React.Fragment>
                    {this.checkAlert()}
                    <div className="PlaylistModalRow"> 
                        <div className="d-flex flex-row">
                            <div className="col-2 PlaylistModalRow-Image-Container ">
                                <img className="PlaylistModalRow-Image-Image" src={this.props.playlist.playlist_art}></img>
                            </div>
                            <div className="col-6">
                            <t6>{this.props.playlist.playlist_name}</t6>
                                
                            </div>
                            <div className="col-4">
                                <button onClick={() => {this.addToPlaylistLogic()}}>Add To Playlist</button>
                            </div>
                        </div>
                    
                        <hr></hr>
                    </div>
                </React.Fragment>
        )
    }
}
