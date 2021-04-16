import React from 'react'

/*
    This Will Be The Official Music Profile That Will Be Used. 
    The Other Profile in the container is just a reference
*/

class Profile extends React.Component 
{
    render()
    {
        return(
            <div>
                <h1>Music Profile</h1>
                <h2>Johnson Tran</h2>
                <button>Edit</button>
                <button>Share</button>
                
            </div>
        )
    }
}


export default Profile;