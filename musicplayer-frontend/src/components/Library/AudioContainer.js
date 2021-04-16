import React from 'react'

import './AudioContainer.css'

class AudioContainer extends React.Component
{

    componentDidMount()
    {
        
    }

    render()
    {
        return(<React.Fragment>
            <div>
                <h2>Audio Container</h2>
                <div>
                     <img></img>
                </div>
                <div>
                    <canvas></canvas>
                </div>
            </div>
        </React.Fragment>)
    }
}

export default AudioContainer; 