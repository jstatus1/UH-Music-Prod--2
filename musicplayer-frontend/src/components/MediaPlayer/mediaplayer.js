import React from 'react'

//css
import "./MediaPlayer.css"

class MediaPlayer extends React.Component
{
    render()
    {
        return(<div class="playControls col-12 ">
                <section role="contentinfo" aria-label="miniplayer" class="playControls__inner d-flex justify-content-around">
                    <audio class="col-4" controls>
                        <source src="https://musicplayer-song.s3.us-east-2.amazonaws.com/05e9b653-8f86-4962-a359-fea7db94ba43" type="audio/mpeg"/>
                    </audio>
                </section>
        </div>)
    }
}


export default MediaPlayer