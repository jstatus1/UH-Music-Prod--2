import React from 'react'
import axios from 'axios'

class RegularNotificationContainer extends React.Component
{
    state = {
        avatar_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1",
        sender_name: "Bruno Mars",
        date: this.props.data.created_at,
        album_link: null,
        message: "unfollowed you!"
    }

    componentDidMount()
    {
        // switch(this.props.data.notif_type)
        // {
        //     case ""
        // }

        axios.get('/api/get/namefromUID', {params: {
            uid: this.props.data.sender_id 
        }}).then(
            res => {
              
                this.setState({sender_name: res.data.message[0].username})

                if(res.data.message[0].avatar != null)
                    this.setState({avatar_img: res.data.message[0].avatar})
            }
        )


    }

    render()
    {
        return(<div class="follower_content_container mb-2 container notification_item d-flex flex-row justify-content-center align-items-center">
        <div class="col-3">
            <img className="avatar_image" src={this.state.avatar_img} alt={() => this.setState({avatar_img: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fdownload_87237.png&f=1&nofb=1"})}/>
        </div>
        <div class="col-9">
           <small><b>{this.state.sender_name} </b> {this.state.message}</small>
            <div className="date_text d-flex flex-column">  
                <i class="bi bi-people"> {this.state.date}</i>
            </div>
        </div>
    </div>)
        
        
    }
}


export default RegularNotificationContainer