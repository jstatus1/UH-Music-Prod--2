import React from 'react'
import './Loading.css'


//Pops up whenever the music is uploading
class Loading extends React.Component
{
    render()
    {
        return(
            <div class="modal  fade" id="UploadingProgress" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Please Wait For Your Audio To Upload</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            
                        </div>
                        <div class="modal-body ">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span class="sr-only">Uploading...</span>
                                <br></br>
                                <br></br>
                                <p > Feel Free To Grab A Drink Or Listen To Some Hits While Waiting!</p>
                        </div>
                        <div class="modal-footer">
                            
                            <button type="button" class="btn btn-primary">Library</button>
                            <button type="button" class="btn btn-primary">Home</button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


export default Loading