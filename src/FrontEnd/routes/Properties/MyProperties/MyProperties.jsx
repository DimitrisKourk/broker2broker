import { useAuth } from "../../../components/AuthContext/AuthContext";
import PropertiesCounter from "../../../components/PropertiesCounter/PropertiesCounter";
import PropertyCardGrid from "../../../components/PropertyCardGrid/PropertyCardGrid";
import { apiFetch } from "../../../utils/apiClient";
import { useEffect,useState } from "react";
import './MyProperties.css'

function MyProperties() {
  const [properties, setProperties]=useState([]);
  //const [pageNumber,setPageNumber]=useState(1)//use later for pagination
  const auth=useAuth();

  useEffect(()=>{
      apiFetch('/api/property/get-user-properties')
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
    <div className="my-properties-wrapper">      
        <PropertiesCounter userId={auth.user.user_id} totalCounter={true} forSaleCounter={true} rentalsCounter={true}/>
        <PropertyCardGrid properties={properties}/>
    </div>
  )
}

export default MyProperties