import React, {Component} from 'react'
import Progress from './progress';
import axios from 'axios'
import { io } from "socket.io-client";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading/loading'


//local imports
import SongForm from './song-form'
import './upload.css'


class Upload extends React.Component
{
    state = {
        uploadedSong: null,
        errMessage: null,
        successMessage: null,
        uploadPercentage: 0,
        uploadedFileLocation: {},
        metadata_upload: {
            userid: null,
            public: true,
            playlist: false,
        }
    }

    //update the uploadedSong state
    updateSongData(id, song)
    {   
        let updatedUploadedSong = this.state.uploadedSong
        updatedUploadedSong[id] = song
        this.setState({uploadedSong: updatedUploadedSong})
    }

   
    musicUpload = (e) => {
        if(e.target.files.length != 0)
        {
           

            //append metadata and basic info for each song
            for(let i = 0; i < e.target.files.length; i++)
            {  
                let metadata_song = {
                    contains_music: true,
                    artist: null,
                    publisher: null,
                    isrc: null,
                    composer: null,
                    release_title: null,
                    buy_link: null,
                    album_title: null,
                    record_label:null,
                    release_date:null,
                    barcode: null,
                    iswc: null,
                    p_line: null,
                    explicit_content: false
                } 
    
                let basic_info_song={
                    title: e.target.files[i].name,
                    selected_genre:null,
                    additional_tag: null,
                    description: null,
                    caption: null,
                    song_image: null
                }

                e.target.files[i].metadata_song = metadata_song
                e.target.files[i].basic_info_song = basic_info_song
            }
            

            this.setState({uploadedSong: Array.from(e.target.files)})
        }
    }

    onSubmit= async (e) =>
    {
        e.preventDefault()
        

        let formData = new FormData()

        //append metadata

        
        for(let i = 0; i < this.state.uploadedSong.length; i++)
        {
            formData.append("musicUploads", this.state.uploadedSong[i]);
            if(this.state.uploadedSong[i].basic_info_song.song_image) 
                formData.append("album_art", this.state.uploadedSong[i].basic_info_song.song_image[0])
            formData.append("basic_info", JSON.stringify(this.state.uploadedSong[i].basic_info_song))
            formData.append("metadata", JSON.stringify(this.state.uploadedSong[i].metadata_song))
            
        }


        try{
            const res = await axios.post('/api/music_upload/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },

                
                //Progress Loading
                onUploadProgress: progressEvent => {
                  this.setState({uploadPercentage:  parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  )})
                
                  console.log(progressEvent.loaded* 100)
                    // Clear percentage
                    setTimeout(() => this.setState({uploadPercentage: 0}), 10000);
                  
                }
              });
        
             
              console.log(res.data)
              this.setState({successMessage: 'Your Files Have Been Uploaded Successfully!'})

        }catch(err)
        {
            if(err.response.status === 500)
                this.setState({errMessage: 'There  was a problem with the server'})
            else
                this.setState({errMessage: err.response.data.msg})
        }
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

    publicOrPrivate () {
        return(<React.Fragment>
                                <h2>Privacy:</h2>
                               
                                    <div class="form-check">
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={e=> {this.setState({metadata_upload: {...this.state.metadata_upload, public:true}})}} checked={this.state.metadata_upload.public}/>
                                                Public
                                            </label>
                                    </div>
                                    <div class="form-check">
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={e=> {this.setState({metadata_upload: {...this.state.metadata_upload, public:false}})}} checked={!this.state.metadata_upload.public}/>
                                                Private
                                            </label>
                                    </div>
            </React.Fragment>
        )
    }

    removeSong = (e,delsong) =>
    {
        e.preventDefault()
        let updatedSongList = this.state.uploadedSong.filter(
            (song) => {
                return song !== delsong;
            }
        );
        
        
        this.setState({
            uploadedSong : updatedSongList
        });
    }

    renderUploadDialog()
    {
            if(this.state.uploadedSong == null)
            {
                return(
                    <div className=" row div-wrapper justify-center align-items-center">
                        <form onSubmit={e=>this.onSubmit(e)}>
                            <h1 className="mb-5">Drag Or Drop Track or Song Here:</h1>
                            <div class="col-12">


                                    <input
                                        type='file'
                                        className="inputFiles"
                                        id='uploadFiles'
                                        accept="audio/*"
                                        onChange={e => this.musicUpload(e)}
                                        multiple
                                        /> 
                            </div>
                            <div className="col-12">
                                        <input class="form-check-input me-5" type="checkbox" value="" id="flexCheckDefault"  onChange={e=> {this.setState({metadata_upload: {...this.state.metadata_upload, playlist:!(this.state.metadata_upload.playlist)}})}} checked={this.state.metadata_upload.playlist}/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Make a playlist when multiple files are selected
                                        </label>
                                    {this.publicOrPrivate()}
                            </div>
                            
                        </form>
                        {/* <Progress percentage={this.state.uploadPercentage} /> */}
                        <p>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. <a target="_blank" href="https://help.soundcloud.com/hc/en-us/articles/115003452847-Uploading-requirements#typeOfFile">Learn more about lossless HD.</a></p>
                    </div>
                )
            }else{
                return (<React.Fragment>
                            <div class="card mb-5">
                                <div class="card-header ">
                                 Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. Learn more about lossless HD. No file chosen
                                 <button type="button " className=" ms-4">
                                        <label for="uploadFiles">
                                            Replace File
                                        </label>
                                        <input
                                        type='file'
                                        className="inputFiles sc-visuallyhidden"
                                        id='uploadFiles'
                                        accept="audio/*"
                                        onChange={e => this.musicUpload(e)}
                                        multiple
                                        /> 
                                </button>   
                                </div>
                                <div class="card-body">
                                        {this.state.uploadedSong.map((song,index) => {
                                    return (<SongForm key={index} id={index} song={song} removeSong={this.removeSong.bind(this)} updateSongData={this.updateSongData.bind(this)}></SongForm>)
                                    })}
                                    
                                </div>
                                <div class="card-footer">
                                    <button className="btn btn-dark col-12 " onClick={e=>this.onSubmit(e)}>Submit</button>
                                </div> 
                        </div>
                        <div class="mb-5">
                                 By uploading, you confirm that your sounds comply with our Terms of Use and you don't infringe anyone else's rights.
                        </div>
                        <br></br>

                </React.Fragment>
                )
            }
        
    }

    componentDidMount()
    {
        //set up user metadata
        if(!this.props.auth)
        {
            return <Redirect to="/"></Redirect>
        }else{
            
        
            this.setState({metadata_upload: {
                userid: this.props.auth.uid,
                public: true,
                playlist: false,
            }})

        }
    }

    

    render()
    {
        return(<React.Fragment>
                
                {this.checkAlert()}
                <Loading></Loading>
                <div className="mt-5">
                    {this.renderUploadDialog()}
                </div>
                
                
            </React.Fragment>
         )
    }
}

function mapStateToProps(state) {
    return { 
      auth: state.auth_reducer
     };
  }

export default connect(mapStateToProps)(Upload);