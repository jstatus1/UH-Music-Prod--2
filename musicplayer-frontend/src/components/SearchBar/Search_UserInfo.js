import React, { PureComponent } from 'react'
import axios from 'axios'
import './Search_UserInfo.css'

export default class Search_UserInfo extends PureComponent 
{
    state={
        isFollowing:(!Number(this.props.data.currentlyfollows) == 0)
    }

    
    FollowerLogic()
    {
        console.log(this.props.data.uid)
        axios.post('/api/toggle/follows', {personToFollow:this.props.data.uid, isFollowing: this.state.isFollowing}).then((res)=> {
            console.log(res.data.isFollowing)
            this.setState({isFollowing: res.data.isFollowing})
        })
    }

    render() {
        return (
            <React.Fragment>
            <div className="d-flex flex-row Search_UserInfo_Profile align-items-center">
                <div className="Search_UserInfo_Profile_Image_Container col-3 ">
                    <img className="Search_UserInfo_Profile_Image" src={(this.props.data.avatar)? this.props.data.avatar : null} ></img>
                    
                </div>
                <div className="Search_UserInfo_Profile_Info col-9">
                    <div className="d-flex flex-column">
                        <h1 className="Search_UserInfo_Profile_Info_Username">{this.props.data.username}<i class="bi bi-check-circle-fill ml-2"></i></h1>
                        <t6>{this.props.data.first_name } {this.props.data.lastname}</t6>
                        <t6>{this.props.data.record_label}</t6>
                        <t7><i class="bi bi-people-fill"></i> 1M+</t7>
                        <div className="col-6 m-3">
                            
                                <button className="mr-3"  onClick={()=> {this.FollowerLogic()}}>
                                    {
                                        (this.state.isFollowing)? <i class="bi bi-person-check-fill">Unfollow</i>:
                                        <i class="bi bi-person-plus-fill"> Follow</i>
                                        
                                    }
                                </button>
                                <button>
                                     <i class="bi bi-chat-right-text-fill"></i>
                                </button>
                                
                            
                        </div>
                    </div>
                </div>
                
            </div>
            <hr></hr>
            </React.Fragment>
        )
    }
}
