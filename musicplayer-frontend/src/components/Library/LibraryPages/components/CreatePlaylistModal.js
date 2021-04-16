import React, { PureComponent } from 'react'

import axios from 'axios'

import './CreatePlaylistModal.css'

export default class CreatePlaylistModal extends PureComponent {
    state = {
        name: null,
        isValid: true,
        song_image:null,
        description:null,
        isPublic: true
    }

    onClickUploadTrigger()
    {
        try{
            return document.getElementById('Playlist_Image').click()

        }catch(err)
        {
            return
        }
        
    }


    renderSongImage()
    {
        if(this.state.song_image!= null)
        {
            const reader = new FileReader();
        
            reader.readAsDataURL(this.state.song_image[0])
            
            reader.onload = () =>{
                if(reader.readyState === 2)
                {
                    var dataURL = reader.result;
                    
                    var output = document.getElementById("Playlist_Upload_Image");
                    if(output != null) 
                        output.src = dataURL;
                    
                }
            }
        }else{
            
            var output = document.getElementById("Playlist_Upload_Image");
            if(output != null) 
                output.src = null;
        }

       

        return(
            <div className="image-box" onClick={()=> {this.onClickUploadTrigger()}}>
                <div className="image-container">
                    <span  className="upload-artwork-img">
                        <img id="Playlist_Upload_Image" className="image" ></img>
                    </span>
                </div>
                {this.renderSongUploadButton()}  
             </div>
        )
    }

    renderSongUploadButton()
    {
        if(this.state.song_image == null)
        {
            return(<div className="image-button"> 
                <button type="button">
                    <i class="bi bi-camera-fill me-2"></i>
                    <label for="Playlist_Image">
                        Upload Image
                    </label>
                    <input type="file" id="Playlist_Image" className="sc-visuallyhidden" onChange={e=> this.setState({song_image: Array.from(e.target.files)})} accept="image/jpeg,image/pjpeg,image/gif,image/png"/>
                </button>   
            </div>)
        }else{
            

           return( <div className="image-button-x"> 
                <button type="button" onClick={() => {this.setState({song_image: null})
                                                        var id = `Playlist_Upload_Image`
                                                        var output = document.getElementById(id);
                                                        output.src = null;
                                                        }} className=" btn btn-danger">
                    <label>
                        X
                    </label>
                </button>   
            </div>)
        }
            
    }

    submitPlaylist = async () =>
    {
        let formData = new FormData()
        let metadata = {
            name: this.state.name,
            description: this.state.description,
            isPublic: this.state.isPublic
        }
        if(this.state.name == null)
        {
            return this.setState({isValid: false})
        }

        if(this.state.song_image != null)
            formData.append("playlist_image", this.state.song_image[0])
      
        formData.append("playlist_metadata", JSON.stringify(metadata))
        
        try{
            await axios.post('/api/create/playlist',formData, 
                {headers: {
                  'Content-Type': 'multipart/form-data'
                }}).then((response) => {

                })
        }catch(err)
        {
            console.log(err)
        }
        
    }


    render() {
        return (
            <div class="modal fade" id="CreatePlaylistModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title w-100 text-center" id="exampleModalLabel">Create Playlist</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">
                                <div className="d-flex flex-column">
                                    <div className="col-12">
                                        <form>
                                            <div class="container-fluid d-flex flex-row">
                                                <div className="col-6"> 
                                                    {this.renderSongImage()}
                                                </div>
                                                <div className="col-6">
                                                <div class="mb-3">
                                                    <label for="Playlist_Name_Input" class="form-label">Name</label>
                                                    <input type="text" class={`form-control ${(this.state.isValid)? null:'is-invalid'}`} id="Playlist_Name_Input" 
                                                            aria-describedby="Playlist_Name_Input" placeholder="My Playlist"
                                                            value={this.state.name} onChange={e=> {this.setState({name: e.target.value}); this.setState({isValid:true})}}/>
                                                    {(this.state.isValid)? null : <div id="Playlist_Name_Input" class="form-text">Please Insert A Name For Your Playlist</div>}
                                                    </div>
                                                    <div class="mb-3">
                                                    <label for="Playlist_Description_Input" class="form-label"> Description</label>
                                                    <textarea class="form-control" id="Playlist_Description_Input" rows="3" placeholder="Give your playlist a catchy description" value={this.state.description} onChange={e=> this.setState({description: e.target.value})}></textarea>
                                                    </div>

                                                    <div class="form-check form-switch ml-4">
                                                        <input class="form-check-input" type="checkbox" id="Playlist_Publicity" onChange={()=> {this.setState({isPublic: !(this.state.isPublic)})}}/>
                                                        <label class="form-check-label" for="Playlist_Publicity">
                                                            {  (this.state.isPublic) ? 'Public': 'Private'}
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                
                                   
                                </div>
                                
                            </div>
                            <div class="modal-footer">
                                <div className="col-12 w-100 text-center">
                                    <button type="button " class="btn btn-danger Playlist_Button_Create" onClick={()=> {
                                        this.submitPlaylist()
                                    }}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
