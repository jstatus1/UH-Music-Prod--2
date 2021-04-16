export const TracksReducer = (state = null, action) => {
    switch(action.type) {
      case "FETCH_TRACKS":
        return action.payload || false

    
      default:
        return state
    }
}

export const PlaylistsReducer = (state = null, action) => {
  switch(action.type) {
    case "FETCH_PLAYLISTS":
      return action.payload || false

  
    default:
      return state
  }
}

export const AlbumsReducer = (state = null, action) => {
  switch(action.type) {
    case "FETCH_ALBUMS":
      return action.payload || false

  
    default:
      return state
  }
}