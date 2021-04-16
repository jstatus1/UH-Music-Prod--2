import React from 'react'
const confetti = require('canvas-confetti')


export default class Confetti extends React.Component
{
    componentDidMount()
    {
        
        var myConfetti = confetti.create(null, {
            resize: true,
            useWorker: true
          })

          var end = Date.now() + (4 * 1000);

          // go Buckeyes!
          var colors = ['#bb0000', '#ffffff'];
          
          (function frame() {
            myConfetti({
              particleCount: 2,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: colors
            });
            myConfetti({
              particleCount: 2,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: colors
            });
          
            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          }());
    }

    render()
    {
        return(
            <React.Fragment>

            </React.Fragment>
        )
    }
}