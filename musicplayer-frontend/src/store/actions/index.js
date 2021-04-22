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

export const previousAudio = (song) =>  {
    return{
        type: 'PREVIOUS_AUDIO',
        payload: song
    }
}


export const selectSong = (song) =>  {
 
    return{
        type: 'SONG_SELECTED',
        payload: song
    }
    
}

export let setAudio = (setting) => 
{
    return {
        type: 'AUDIO_SETTING',
        payload: setting
    }
} 

export const fetchTracks = () => async dispatch =>
{
    
    let res = await axios.get('/api/get/user/tracks')   
    
    try{
        dispatch({
            type: "FETCH_TRACKS",
            payload: res.data
        })
    }catch(err)
    {
        dispatch({
            type: "FETCH_TRACKS",
            payload: err
        })
    }
}

export const fetchPlaylist = () => async dispatch =>
{
    
    let res = await axios.get('/api/get/user/playlists/')   
    
    try{
        dispatch({
            type: "FETCH_PLAYLISTS",
            payload: res.data
        })
    }catch(err)
    {
        dispatch({
            type: "FETCH_PLAYLISTS",
            payload: err
        })
    }
}

export const fetchAlbums = () => async dispatch =>
{
    
    let res = await axios.get('/api/get/users/Albums')   
    
    try{
        dispatch({
            type: "FETCH_ALBUMS",
            payload: res.data
        })
    }catch(err)
    {
        dispatch({
            type: "FETCH_ALBUMS",
            payload: err
        })
    }
}

