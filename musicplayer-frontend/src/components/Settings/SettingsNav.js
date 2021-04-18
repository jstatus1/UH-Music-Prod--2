import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';


export default class SettingsNav extends PureComponent {
    state = {
        currentpage: "overview"
    }
    onClickFunction(e)
    {
        this.setState({currentpage: e.target.value})
    }

    render() {
        return ( <React.Fragment>
            <div className="library_header mt-4">
                <div className="library_label_group">
                    <Link to="/Library/Account"><button onClick={e=>{this.onClickFunction(e)}} value="account" className={`btn library_labels ${this.state.currentpage==("account")? 'active': null}`}>Account</button></Link>
                    <Link to="/Library/Content"><button onClick={e=>{this.onClickFunction(e)}} value="content" className={`btn library_labels ${this.state.currentpage==("content")? 'active': null}`}>Content</button></Link>
                    <Link to="/Library/Notifications"><button onClick={e=>{this.onClickFunction(e)}} value="notifications" className={`btn library_labels ${this.state.currentpage==("like")? 'active': null}`}>Notifications</button></Link>
                    <Link to="/Library/Streaming"><button onClick={e=>{this.onClickFunction(e)}} value="streaming" className={`btn library_labels ${this.state.currentpage==("playlis")? 'active': null}`}>Streaming</button></Link>
                    <Link to="/Library/Privacy"><button onClick={e=>{this.onClickFunction(e)}} value="privacy" className={`btn library_labels ${this.state.currentpage==("privacy")? 'active': null}`}>Privacy</button></Link>
                    <Link to="/Library/Communications"><button onClick={e=>{this.onClickFunction(e)}} value="communicaitons" className={`btn library_labels ${this.state.currentpage==("stations")? 'active': null}`}>Communications</button></Link>
                    <Link to="/Library/Analytics"><button onClick={e=>{this.onClickFunction(e)}} value="analytics" className={`btn library_labels ${this.state.currentpage==("following")? 'active': null}`}>Following</button></Link>
                    <Link to="/Library/Advertising"><button onClick={e=>{this.onClickFunction(e)}} value="advertising" className={`btn library_labels ${this.state.currentpage==("history")? 'active': null}`}>Advertising</button></Link>
                </div>
            </div>
        </React.Fragment>)
    }
}
