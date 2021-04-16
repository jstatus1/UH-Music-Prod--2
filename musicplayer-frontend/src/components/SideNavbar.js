import React from 'react'

const SideNavbar = (props) => {
    return (
        <div className="sidenavbar" style={{ width: props.width }}>
            <button onClick={props.closeNav}>X</button>
            <a href='/home' style={{ color: 'grey' }}>Home</a>
            <h1 style={{ color: 'white' }}>Musician Options</h1>
            <a href='/albums' style={{ color: 'grey' }}>Albums</a>
            <a href='/songs' style={{ color: 'grey' }}>Songs</a>
            <h2 style={{ color: 'white' }}>Listener Menu</h2>
            <a href='/albums' style={{ color: 'grey' }}>Albums</a>
            <a href='/songs' style={{ color: 'grey' }}>Songs</a>
            <a href='/playlists' style={{ color: 'grey' }}>Playlists</a>
            <a href='/createdplaylist' style={{ color: 'grey' }}>Created Playlists</a>
        </div>
    )
}

export default SideNavbar
