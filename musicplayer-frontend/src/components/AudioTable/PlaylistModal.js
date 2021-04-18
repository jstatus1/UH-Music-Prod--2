import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import $ from "jquery";
import axios from 'axios'

import './PlaylistModal.css'


import PlaylistModalRow from './PlaylistModalRow'



class PlaylistModal extends PureComponent {
    
    state = {
        currentpage: "AddToPlaylist",
        song_image: this.props.song_image,
        isPublic: true,
        title: null,
        isValid: true,
        UploadSuccess: false
    }

    onClickFunction(e)
    {
       this.setState({currentpage: e.target.value})
    }

    renderUsersPlaylist()
    {
        return this.props.fetch_playlist.map((playlist)=> {
            return <PlaylistModalRow song={this.props.song} playlist={playlist}></PlaylistModalRow>
        })
    }
    
    renderPlayistNav()
    {
        return(<div key={this.props.id} className="container" >
                    <div className="PlayistModal_Nav_Header d-flex flex-row justify-content-start">
                        <div className="library_header mt-4">
                            <div className="library_label_group">   
                                <button onClick={e=>{this.onClickFunction(e)}} value="AddToPlaylist" className={`btn  PlaylistModal_Label ${this.state.currentpage==("AddToPlaylist")? 'active': null}`}>Add To Playlist</button>
                            </div>
                        </div>
                        <div className="library_header mt-4">
                            <div className="library_label_group">   
                                <button onClick={e=>{this.onClickFunction(e)}} value="CreateAPlaylist" className={`btn  PlaylistModal_Label ${this.state.currentpage==("CreateAPlaylist")? 'active': null}`}>Create New Playlist</button>
                            </div>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>)
    }


    checkAlert(){
        if(!this.state.UploadSuccess)
        {
            return <div class="alert alert-danger alert-dismissible fade show" role="alert">
             <strong>Holy guacamole!</strong> {this.state.errMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.setState({errMessage:null})}></button>
            </div>
        }else{
            return <div class="alert alert-success alert-dismissible fade show" role="alert">
             <strong>Great!</strong> {this.state.successMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => this.setState({successMessage:null})}></button>
            </div>
        }
    }

    

    submitPlaylist()
    {
        if(this.state.title == null || this.state.title == "")
        {
            return this.setState({isValid:false})
        }

        axios.post('/api/create/playlist_with_audio', 
            {title: this.state.title, songId: this.props.song.song_id, isPublic: this.state.isPublic})
            .then((res) => {
                if(res.data)
                {
                    
                }     
            })
    }

    renderCreatePlaylist()
    {
        return(<div className="d-flex flex-column">
                <div class="mb-3 mt-3">
                    <label for="PlaylistTitleInput" class="form-label">Playlist Title*</label>
                    <input type="text" class={`form-control ${this.state.isValid ? null : 'is-invalid'}`}  id="PlaylistTitleInput" onChange={(e)=> {this.setState({title: e.target.value}); this.setState({isValid: true})}} value={this.state.title}/>
                    {(this.state.isValid)?null:<div id="PlaylistTitleHelp" class="form-text">Please Input A Title</div>}
                    <div className="d-flex flex-row">
                        <label  class="form-label col-4">Privacy:</label>
                        <div className="col-12 form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="PublicRadio" onClick={()=>{this.setState({isPublic:true})}} checked/>
                            <label class="form-check-label mr-5" for="PublicRadio">
                                Public
                            </label>
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="PrivateRadio" onClick={()=>{this.setState({isPublic:false})}}/>
                            <label class="form-check-label" for="PrivateRadio">
                                Private
                            </label>
                        </div>
                    </div>
                    <hr></hr>
                    <h6>Adding Current Songs: </h6>
                    <div className="audioSelection col-12">
                        <div >
                            <img className="audioSelection-Image" src={this.state.song_image}></img>
                            <t2>{this.props.song.username}-{this.props.song.title}</t2>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <button onClick={() => this.submitPlaylist()} data-bs-dismiss="modal"> Save</button>
        </div>)
    }


    render() {
        return (<div class="modal fade" id={`playlistModal`+this.props.id} tabindex="-1" aria-labelledby="playlistModalLabel" aria-hidden="false">
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-body">
                        {this.renderPlayistNav()}

                        <div className="d-flex flex-column">
                         
                            {
                                (this.state.currentpage =="CreateAPlaylist")?this.renderCreatePlaylist():this.renderUsersPlaylist()
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        fetch_playlist: state.fetch_playlists_reducer
     };
}


export default connect(mapStateToProps, actions) (PlaylistModal)


