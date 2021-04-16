import React from 'react'
import "./AudioTable.css"

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

import AudioTableRow from './AudioTable_Row'

class AudioTable extends React.Component {
    
    renderRows()
    {
        if(this.props.fetch_track)
         return this.props.fetch_track.map((song,index)=>{
            return(<AudioTableRow song={song} id={index}></AudioTableRow>)
         }) 
         return null   
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