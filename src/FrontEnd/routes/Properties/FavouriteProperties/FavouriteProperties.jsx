import { useEffect,useState } from "react";
import PropertyCardGrid from "../../../components/PropertyCardGrid/PropertyCardGrid";
import { apiFetch } from "../../../utils/apiClient";
function FavouriteProperties() {
    const [properties, setProperties]=useState([]);
    //const [pageNumber,setPageNumber]=useState(1)//use later for pagination

    useEffect(()=>{
        apiFetch('/api/property/get-favourite-properties')
            .then(res => {
                if(res.success===true){
                    setProperties(res.properties);
                }
                else console.log("something is wrong")
            })
            .catch(e => {
                console.log(e)
            })
    },[])

  return (
    <>
        <PropertyCardGrid properties={properties}/>
    </>
  )
}

export default FavouriteProperties