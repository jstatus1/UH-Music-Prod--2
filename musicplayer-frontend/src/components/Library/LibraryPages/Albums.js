import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

import SimpleAudioContainerLG from '../containers/SimpleAudioContainer-lg'


class Album extends PureComponent {
    constructor(props)
    {
        super(props);
        this.props.fetchAlbums()
    }

    renderAlbumsRow()
    {
        try{
            return this.props.fetch_album.map((album, index) => {
               return(<SimpleAudioContainerLG id={index} album={album} link="/Library/Albums" type="Album"></SimpleAudioContainerLG>)
             })
        }catch(err)
        {
            return null
        }
    }
    
    render() {
        return (<React.Fragment>
                
                <div className="Playlist_Container container mt-5 mb-5">
                    <div className="row">
                        {this.renderAlbumsRow()}
                    </div>
                </div>
            </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return { 
      fetch_album: state.fetch_albums_reducer
     };
}


export default connect(mapStateToProps, actions) (Album)
