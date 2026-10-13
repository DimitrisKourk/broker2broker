import { useEffect,useState } from "react";
import PropertyCardGrid from "../../../components/PropertyCardGrid/PropertyCardGrid";
import { useAuth } from "../../../components/AuthContext/AuthContext";
function AssociatesProperties() {

    const [properties, setProperties]=useState([]);
      const [pageNumber,setPageNumber]=useState(1)//use later for pagination
      const auth=useAuth();
    
      useEffect(()=>{
          fetch('http://localhost:3000/api/property/get-associates-properties', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
                .then(response => response.json())
                .then(res => {
                    if(res?.isAuthenticated===false){
                        auth.logOut();
                    }
                    else if(res.success===true){                    
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

export default AssociatesProperties