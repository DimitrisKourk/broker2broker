import { useEffect,useState } from 'react';
import './FavouritePropertyButton.css'
import { apiFetch } from '../../utils/apiClient';

function FavouritePropertyButton({propertyId}) {
    const [favourite,setFavourite]=useState(false);
    useEffect(()=>{
        apiFetch('/api/property/favourite-status/'+propertyId)
            .then(res => {
                if(res.success===true){
                    setFavourite(res.favourite);
                }
                else console.log("something is wrong")
            })
            .catch(e => {
                console.log(e)
            })
    },[propertyId])

    const handleFavouriteAction= ()=>{
        if(favourite){
        apiFetch('/api/property/remove-favourite/'+propertyId, { method: "DELETE" })
            .then(res => {
                if(res.success===true){
                    //favourite removed so return favourite status = false
                    setFavourite(false);
                }
                else {
                    alert(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            });
    }

    else {apiFetch('/api/property/add-favourite/'+propertyId, { method: "POST" })
            .then(res => {
                if(res.success===true){
                    setFavourite(true);
                }
                else alert(res.message);
            })
            .catch(e => {
                console.log(e);
            })}
    }
  return (
    <div onClick={()=>handleFavouriteAction()} className='property-favourite-button'>
        {favourite? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/></svg>
        :<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white"  viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/></svg>}
    </div>
  )
}

export default FavouritePropertyButton

