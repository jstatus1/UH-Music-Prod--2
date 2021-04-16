import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'

//css import
import './notification_dropdown.css'
import FollowerContainer from './notificaiton_items/follower_container'
import RegularMessageNotificationLink from './notificaiton_items/regular_notification_container_link'
import RegularMessageNotification from './notificaiton_items/regular_notification_container'


class notificationsDropdown extends React.Component
{   
    state = {
        notificationData: null,
        notifcationCount: 0
    }

    componentDidMount()
    {
        let notificationsData = axios.get("/api/get/notifications", {
            params: {
                id: this.props.auth.uid
            }
        })

        

        notificationsData.then(res => {
            this.props.retrieveNotificationCounter(res.data.message.length)
            this.setState({notificationData: res.data.message})
        })
    }

    renderNotificationItems()
    {
        let renderNotification = []
        
        for (var key in this.state.notificationData)
        {
            
            var obj = this.state.notificationData[key]
            console.log(obj)
            switch(obj.notif_type)
            {
                case "NEWALBUM":
                    renderNotification.push(<RegularMessageNotificationLink key={key} data={obj}/>)
                    break;
                case "NEWMUSIC":
                    renderNotification.push(<h1>Tacos</h1>)
                    break;
                case "NEWFOLLOWER":
                    renderNotification.push(<FollowerContainer key={key} data={obj}/>)
                    break;
                case "UNFOLLOWED":
                    renderNotification.push(<RegularMessageNotification key={key} data={obj}/>)
                    break;
                case "NEWS":
                    renderNotification.push(<h1>Tacos</h1>)
                    break;
                default:
                    break;

            }
            renderNotification.push(<li><hr class="dropdown-divider"/></li> )
            
        }

        return (renderNotification)
    }

    render()
    {
        return(
            <ul class="dropdown-menu notification_dropdown" aria-labelledby="notification_dropdown" >
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <small><b>Notifications</b></small>  
                    <Link className="header_setting" to={`/settings/notification`}> Settings</Link>
                </div>
                <li><hr class="dropdown-divider"/></li>
                
                <div className="notification_body">
                    {
                        this.renderNotificationItems()
                    }
                </div>
              
                
                <li><hr class="dropdown-divider"/></li>
                <li>
                    <Link  className="dropdown-item view_all_notification_text" to={`/notification`}>
                        View all notifications
                    </Link>
                </li>
           </ul>
        )
        
    }
}


function mapStateToProps(state) {
    return { 
      auth: state.auth_reducer
     };
}

export default connect(mapStateToProps, actions) (notificationsDropdown)