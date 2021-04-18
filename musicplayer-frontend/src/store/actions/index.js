import axios from 'axios'
import {FETCH_USER} from './action_types'

export const fetchUser = () => async dispatch =>
{
    
    const res = await axios.get('/api/current_user')   
    
    try{
        dispatch({
            type: FETCH_USER,
            payload: res.data
        })
    }catch(err)
    {
        dispatch({
            type: FETCH_USER,
            payload: err
        })
    }
}


export const updateSong = () => async dispatch => {


    
}
        

