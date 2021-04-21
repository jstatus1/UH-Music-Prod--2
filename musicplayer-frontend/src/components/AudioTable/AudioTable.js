import React from 'react'
import "./AudioTable.css"

import AudioTableRow from './AudioTable_Row'

class AudioTable extends React.Component {
    
    renderRows()
    {
        try{
            return this.props.fetch_track.map((song,index)=>{
                return(<AudioTableRow song={song} id={index} type={this.props.type} 
                                      playlist_name={this.props.playlist_name}
                                      removeSong={this.props.removeSong}
                                      playlist_id={this.props.playlist_id}>
                        </AudioTableRow>)
             }) 
        }catch(err)
        {
            console.log(err)
            return null  
        }
    }
    
    render() {
        return (<React.Fragment>
                <table className="AudioTable_Table table">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Album</th>
                        <th scope="col"><i class="bi bi-calendar"></i></th>
                        <th scope="col"><i class="bi bi-clock"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </React.Fragment>)
    }
}



export default AudioTable