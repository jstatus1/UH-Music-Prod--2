import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'

//Component Imports
import Header from '../components/Navbar/header'
import Upload from '../components/Upload/upload'
import ProfileEdit from '../components/profile/profileedit'
import DropZone from '../components/Upload/drop-zone'
import MediaPlayer from '../components/MediaPlayer/mediaplayer'
import Home from '../components/Home/Home'
import Notification from '../components/Navbar/notifcations/notificaiton_page'
import Reports from '../components/Reports/Reports'

//Library Imports
import LibraryNav from '../components/Library/LibraryNav'
import Overview from '../components/Library/LibraryPages/Overview'
import Tracks from '../components/Library/LibraryPages/Tracks'
import Playlist from '../components/Library/LibraryPages/Playlist'

const Dashboard = () => <h2>Dashboard</h2>
const Landing = () => <h2>Landing</h2>


const LibraryRoutes = ({ match }) => (
    <div>
        {/* note the addition of the exact property here */}
        <LibraryNav></LibraryNav>
        <Route exact path={match.url} component={Overview}/>
        <Route exact path={match.url + "/overview"} component={Overview}/>
        <Route exact path={match.url + "/tracks"} component={Tracks}/>
        <Route exact path={match.url + "/playlist"} component={Playlist}/>
    </div>
)

let Routes = () =>
{
    return(<div>
        <BrowserRouter>
             <div className="container">
                 <Header/>
                 <Route exact path="/" component={Landing}/>
                 <Route exact path="/discovery" component={Dashboard}/>
                 <Route exact path="/home" component={Home}></Route>
                 <Route exact path="/upload" component={Upload}></Route>
                 <Route exact path="/drop_zone" component={DropZone}></Route>
                 <Route path="/library" component={LibraryRoutes}></Route>
                 <Route exact path="/profileedit" component={ProfileEdit}></Route>
                 <Route exact path="/notification" component={Notification}></Route>
                 <Route exact path="/reports" component={Reports}></Route>
                 <Route exact path="/profileedit" component={ProfileEdit}></Route>


             </div>
             <MediaPlayer/>
        </BrowserRouter> 
     </div>)
}


export default Routes