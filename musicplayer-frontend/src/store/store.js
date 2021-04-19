import { createStore, combineReducers} from 'redux'



function saveToLocalStorage(state)
{
    try{
        const serializeState = JSON.stringify(state)
        localStorage.setItem('state', serializeState)
    }catch(err)
    {
        console.log(e)
    }
}

