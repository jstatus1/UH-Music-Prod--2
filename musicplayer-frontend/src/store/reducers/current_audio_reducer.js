export const PreviousAudioReducer = (previousSong=null, action) => {
    if(action.type == 'PREVIOUS_AUDIO')
    {
       
        return action.payload
    }

    return previousSong
}

export const SelectedAudioReducer = (selectedSong=null, action) => {
    if(action.type == 'SONG_SELECTED')
    {
       
        return action.payload
    }

    return selectedSong
}


export const SetAudioReducer = (setting=null, action) => {
    if(action.type == 'AUDIO_SETTING')
    {
        return action.payload
    }

    return false
}
