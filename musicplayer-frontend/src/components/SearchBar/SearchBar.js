import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';


export default class SearchBar extends PureComponent {
    state={
        searchTerm: null
    }
    
    render() {
        return (
            <div className="d-flex flex-row"> 
                 <input class="form-control me-2" type="search" 
                    placeholder="Search" aria-label="Search" 
                    onChange={(e)=> {this.setState({searchTerm: e.target.value})}}/>
                 <Link to={ `${'/Search/'+this.state.searchTerm}` } className="btn btn-danger">Search</Link> 
            </div>
        )
    }
}
