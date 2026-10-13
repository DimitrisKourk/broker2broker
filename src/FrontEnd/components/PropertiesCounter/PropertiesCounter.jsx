import { useAuth } from '../AuthContext/AuthContext';
import './PropertiesCounter.css'
import {useState,useEffect } from 'react'


function PropertiesCounter({userId,totalCounter,forSaleCounter,rentalsCounter}) {
    const [totalProperties,setTotalProperties]=useState();
    const [forSale,setForSale]=useState();
    const [rentals,setRentals]=useState();
    const auth=useAuth();
    
    useEffect(()=>{
    fetch('http://localhost:3000/api/property/get-properties-count/'+userId, {
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
                setTotalProperties(res.total_properties)             
                setForSale(res.sale_properties)   
                setRentals(res.rental_properties)
            }
            else console.log("something is wrong")
        })
        .catch(e => {
            console.log(e)
        })
    },[])
  return (
    <div className="properties-counters">
        {totalCounter && <div>Total Properties: {totalProperties}</div>}
        {forSaleCounter && <div>For Sale: {forSale}</div>}
        {rentalsCounter && <div>Rentals: {rentals}</div>}
    </div>
  )
}

export default PropertiesCounter