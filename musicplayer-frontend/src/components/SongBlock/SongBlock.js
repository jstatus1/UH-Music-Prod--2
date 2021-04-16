import React, { useState } from 'react'
import './SongBlock.css'

const SongBlock = (props) => {

    const [isClicked, setIsClicked] = useState(false);
    return (
        <div onClick={() => setIsClicked(!isClicked)}>
            <span className={isClicked ? 'song-block-clicked' : 'song-block-not-clicked'}>
                {props.song.song_title} - {props.song.username}</span>
        </div>
    )
}

export default SongBlock
