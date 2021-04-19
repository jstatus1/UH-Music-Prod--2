import React, { PureComponent } from 'react'

//styling
import './Landing.css'
import image1 from './images/uhimage2.jpeg'
import image2 from './images/uhimage_new.jpeg'
import image3 from './images/uhimage_new2.jpg'



export default class Carousel extends PureComponent {
    render() {
        return (
        
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

        <h2 style={{"textAlign":"center", "padding":"0.5em"}}>Welcome to CoogMusic!</h2>

        <div class="carousel-indicators">
          
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={image1} class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block" style={{"color":"white", "textShadow":"2px 2px black", "fontSize":"30px"}}>
                <h5>UH Coog Music App</h5>
                <p style={{"fontSize":"15px"}}>Music by Coogs for Coogs</p>
            </div>
          </div>

          <div class="carousel-item">
            <img src={image2} class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block" style={{"color":"white", "textShadow":"2px 2px black", "fontSize":"30px"}}>
                <h5>UH Coog Music App</h5>
                <p style={{"fontSize":"15px"}}>Music by Coogs for Coogs</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src={image3} class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block" style={{"color":"white", "textShadow":"2px 2px black", "fontSize":"30px"}}>
                <h5>UH Coog Music App</h5>
                <p style={{"fontSize":"15px"}}>Music by Coogs for Coogs</p>
            </div>
          </div>
          
          
        </div>

        
        
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        <div style={{"paddingTop":"90px"}}/>
      </div>
        )
    }
}
