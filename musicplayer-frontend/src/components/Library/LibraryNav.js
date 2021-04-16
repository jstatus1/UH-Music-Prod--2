import React from 'react'
import { Link } from 'react-router-dom';
import './LibraryNav.css'


class Library extends React.Component
{
    state = {
        currentpage: "overview"
    }

    onClickFunction(e)
    {
       this.setState({currentpage: e.target.value})
    }


    render()
    {
        return(
            <React.Fragment>
                <div className="library_header mt-4">
                    <div className="library_label_group">
                        <Link to="/Library/Overview"><button onClick={e=>{this.onClickFunction(e)}} value="overview" className={`btn library_labels ${this.state.currentpage==("overview")? 'active': null}`}>Overview</button></Link>
                        <Link to="/Library/Tracks"><button onClick={e=>{this.onClickFunction(e)}} value="tracks" className={`btn library_labels ${this.state.currentpage==("tracks")? 'active': null}`}>Tracks</button></Link>
                        <Link to="/Library/Like"><button onClick={e=>{this.onClickFunction(e)}} value="like" className={`btn library_labels ${this.state.currentpage==("like")? 'active': null}`}>Likes</button></Link>
                        <Link to="/Library/Playlist"><button onClick={e=>{this.onClickFunction(e)}} value="playlist" className={`btn library_labels ${this.state.currentpage==("playlist")? 'active': null}`}>Playlists</button></Link>
                        <Link to="/Library/Album"><button onClick={e=>{this.onClickFunction(e)}} value="album" className={`btn library_labels ${this.state.currentpage==("album")? 'active': null}`}>Albums</button></Link>
                        <Link to="/Library/Stations"><button onClick={e=>{this.onClickFunction(e)}} value="stations" className={`btn library_labels ${this.state.currentpage==("stations")? 'active': null}`}>Stations</button></Link>
                        <Link to="/Library/Following"><button onClick={e=>{this.onClickFunction(e)}} value="following" className={`btn library_labels ${this.state.currentpage==("following")? 'active': null}`}>Following</button></Link>
                        <Link to="/Library/History"><button onClick={e=>{this.onClickFunction(e)}} value="history" className={`btn library_labels ${this.state.currentpage==("history")? 'active': null}`}>History</button></Link>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default Library