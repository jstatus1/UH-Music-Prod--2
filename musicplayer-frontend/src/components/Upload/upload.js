import React, {Component} from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading/loading'


//local imports
import Confetti from '../Decor/confetti'
import SongForm from './song-form'
import './upload.css'
import confetti from 'canvas-confetti';


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
            album: false
        },
        album_title:null,
        is_valid_album_title:true,
        
    }

    //update the uploadedSong state
    updateSongData(id, song)
    {   
        if(this.state.metadata_upload.album && id == 0 && this.state.uploadedSong.length > 1)
        {
            let updatedUploadedSong = []
            for(let i = 0; i < this.state.uploadedSong.length; i++)
            {
                let tempSong = this.state.uploadedSong[i]
                tempSong.basic_info_song.song_image = song.basic_info_song.song_image;  
                updatedUploadedSong.push(tempSong)
              
                this.setState({uploadedSong: updatedUploadedSong})
            }
        }else{
            let updatedUploadedSong = this.state.uploadedSong
            updatedUploadedSong[id] = song
            this.setState({uploadedSong: updatedUploadedSong})
        }
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
                    explicit_content: false,
                    duration: null
                } 
    
                let basic_info_song={
                    title: e.target.files[i].name,
                    selected_genre:null,
                    additional_tag: null,
                    description: null,
                    caption: null,
                    song_image: null,
                    song_image_name:null
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
        
        //upload album
        //upload playlist
        let formData = new FormData()

        if(this.state.uploadedSong.length == 1)
        {
            //upload single
            formData.append("musicUploads", this.state.uploadedSong[0]);
            if(this.state.uploadedSong[0].basic_info_song.song_image) 
            {
                formData.append("audio_image", this.state.uploadedSong[0].basic_info_song.song_image[0])
            }
            formData.append("basic_info", JSON.stringify(this.state.uploadedSong[0].basic_info_song))
            formData.append("metadata", JSON.stringify(this.state.uploadedSong[0].metadata_song)) 
            try{
                 await axios.post('/api/single_audio_upload/', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  });
                  this.setState({successMessage: 'Your Files Have Been Uploaded Successfully!'})
            }catch(err)
            {
                if(err.response.status === 500)
                    this.setState({errMessage: 'There  was a problem with the server'})
                else
                    this.setState({errMessage: err.response.data.msg})
            }

        }else if(this.state.uploadedSong.length > 1 && this.state.metadata_upload.album)
        {
            console.log(this.state.uploadedSong[0].metadata_song)
            //validation to see if album title is null
            if(this.state.uploadedSong[0].metadata_song.album_title == null || this.state.uploadedSong[0].metadata_song.album_title == "")
            {
                this.setState({errMessage: "Album Title Cannot Be Null!"})
                this.setState({is_valid_album_title: false})
                return;
            }else{
                this.setState({is_valid_album_title: true})
            }
            
            for(let i = 0; i < this.state.uploadedSong.length; i++)
            {
                formData.append("musicUploads", this.state.uploadedSong[i]);
                formData.append("basic_info", JSON.stringify(this.state.uploadedSong[i].basic_info_song))
                  
            }

            if(this.state.uploadedSong[0].basic_info_song.song_image) 
                    formData.append("album_art", this.state.uploadedSong[0].basic_info_song.song_image[0])
            formData.append("metadata", JSON.stringify(this.state.uploadedSong[0].metadata_song))

            try{
                const res = await axios.post('/api/album_audio_upload/', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  });
                  this.setState({successMessage: 'Your Album Have Been Uploaded Successfully!'})
            }catch(err)
            {
                if(err.response.status === 500)
                    this.setState({errMessage: 'There was a problem with the server'})
                else
                    this.setState({errMessage: err.response.data.msg})
            }

        }else if(this.state.uploadedSong.length > 1)
        {
            let imageMap = {}
            for(let i = 0; i < this.state.uploadedSong.length; i++)
            {
                formData.append("musicUploads", this.state.uploadedSong[i]);
                formData.append("basic_info", JSON.stringify(this.state.uploadedSong[i].basic_info_song))
                
                //insert image, but watch out for duplicates
                if(this.state.uploadedSong[i].basic_info_song.song_image != null ){
                    if(imageMap[this.state.uploadedSong[i].basic_info_song.song_image_name])
                        continue
                    else{
                        imageMap[this.state.uploadedSong[i].basic_info_song.song_image_name] = true
                        formData.append("album_art", this.state.uploadedSong[i].basic_info_song.song_image[0])
                    }
                }
                

                formData.append("metadata", JSON.stringify(this.state.uploadedSong[i].metadata_song))
            }

            try{
                const res = await axios.post('/api/mulitple_audio_upload/', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  });
                  this.setState({successMessage: 'Your Songs Have Been Uploaded Successfully!'})
                  return(<Confetti/>)
            }catch(err)
            {
                if(err.response.status === 500)
                    this.setState({errMessage: 'There was a problem with the server'})
                else
                    this.setState({errMessage: err.response.data.msg})
            }
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

    removeSong = (e) =>
    {
        let updatedSongList = this.state.uploadedSong.filter(
            (song) => {
                return song !== e;
            }
        );

        this.setState({
            uploadedSong : updatedSongList,
        });
    }
    
    renderUploadModal()
    {
        return(<div class="modal fade" id="UploadReturnModal" tabindex="-1" aria-labelledby="UploadReturnModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="UploadReturnModal">Return Back To Uploads</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are You Sure You Would Like To Return Back To Uploads Page? 
                    All Your Song Progress Will Not Be Saved.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => {this.setState({uploadedSong:null}); }}>Return To Uploads</button>
                </div>
            </div>
            </div>
        </div>)
    }

    renderUploadDialog()
    {
            if(this.state.uploadedSong == null || this.state.uploadedSong.length < 1)
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
                                        <input class="form-check-input me-5" type="checkbox" value="" id="flexCheckDefault"  onChange={e=> {this.setState({metadata_upload: {...this.state.metadata_upload, album:!(this.state.metadata_upload.album)}})}} checked={this.state.metadata_upload.album}/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Make an album when multiple files are selected
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
                                <div class="card-header d-flex flex-row justify-content-around align-items-center">
                                    <div class="col-2">
                                        <button data-bs-toggle="modal" data-bs-target="#UploadReturnModal">
                                            <i class="bi bi-house-fill"></i>
                                        </button>
                                    </div>
                                    <div className="col-8">
                                        <small >Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. Learn more about lossless HD. No file chosen</small>
                                    </div>
                                    <div className="col-2">
                                        <button type="button " >
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
                                </div>

                                <div class="card-body">

                                        {this.state.uploadedSong.map((song,index) => {
                                             return (<SongForm key={index} id={index} metadata_upload={this.state.metadata_upload} song={song} removeSong={this.removeSong.bind(this)} updateSongData={this.updateSongData.bind(this)}  is_valid_album_title={this.state.is_valid_album_title}></SongForm>)
                                        })}
                                </div>

                                <div class="card-footer">
                                    <button className="btn btn-dark col-12 " onClick={e=>this.onSubmit(e)}><i class="bi bi-upload"></i> Upload</button>
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
                album: false,
            }})

        }
    }

    

    render()
    {
        return(<React.Fragment>
                
                {this.checkAlert()}
                <Loading></Loading>
                {this.renderUploadModal()}
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