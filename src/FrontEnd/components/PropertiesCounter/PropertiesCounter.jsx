import { apiFetch } from '../../utils/apiClient';
import './PropertiesCounter.css'
import {useState,useEffect } from 'react'


function PropertiesCounter({userId,totalCounter,forSaleCounter,rentalsCounter}) {
    const [totalProperties,setTotalProperties]=useState();
    const [forSale,setForSale]=useState();
    const [rentals,setRentals]=useState();

    useEffect(()=>{
    apiFetch('/api/property/get-properties-count/'+userId)
        .then(res => {
            if(res.success===true){
                setTotalProperties(res.total_properties)
                setForSale(res.sale_properties)
                setRentals(res.rental_properties)
            }
            else console.log("something is wrong")
        })
        .catch(e => {
            console.log(e)
        })
    },[userId])
  return (
    <div className="properties-counters">
        {totalCounter && <div>Total Properties: {totalProperties}</div>}
        {forSaleCounter && <div>For Sale: {forSale}</div>}
        {rentalsCounter && <div>Rentals: {rentals}</div>}
    </div>
  )
}

export default PropertiesCounter