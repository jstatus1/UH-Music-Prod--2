import React, { PureComponent } from 'react'
import axios from 'axios'


import SearchUserCircle from './Search_UserInfo'

class Search extends PureComponent {

    state={
        people: [],
        albums: [],
        tracks: [],
        id: null
    }

    componentDidMount()
    {
        if(this.state.id == null)
        {
            this.setState({id: this.props.id})
            axios.get('/api/get/search/users', {params:{value: this.props.id}}).then(result=> {
                this.setState({people: result.data})
            })
        }
    }

    componentDidUpdate(prev)
    {
        if(this.props.id != prev.id )
        {
            this.setState({id: this.props.id})
            axios.get('/api/get/search/users', {params:{value: this.props.id}}).then(result=> {
                this.setState({people: result.data})
            })
        }
    }
    
    renderPeople()
    {
        try{
            return this.state.people.map((data) => {
                console.log((data))
                return (<div className="col-12">
                    <SearchUserCircle data={data[0]}></SearchUserCircle>
                </div>)
            })
        }catch(err)
        {
            return null
        }
        
    }


    render() {
        return (
            <React.Fragment>
            <div>
                <h1>Search result for "{this.props.id}":</h1>
                
            </div>
            <div className="container ">
                <div className="row">
                    {this.renderPeople()}
                </div>
            </div>
            </React.Fragment>
        )
    }
}




export default Search
