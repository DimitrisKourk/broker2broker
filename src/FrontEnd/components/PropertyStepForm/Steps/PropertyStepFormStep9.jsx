import { UsePropertyStepForm } from "../../PropertyStepFormContext/PropertyStepFormContext"
import PropertyDetailsTable from "../../PropertyDetailsTable/PropertyDetailsTable";
const PropertyStepFormStep9 = ({type}) => {
    const context=UsePropertyStepForm();

    const PropertyData=()=> {
        const keys=Object.keys(context.property);
        const data=JSON.parse(JSON.stringify(context.property));
        //convert boolean values to readable text
        if(data.rental===1)data.rental="Rental";
        else if(data.rental===0)data.rental="For Sale";
        if(data.elevator===true)data.elevator="Yes";
        else if(data.elevator===false)data.elevator="No";
        if(data.balcony===true)data.balcony="Yes";
        else if(data.balcony===false)data.balcony="No";
        return keys.map((key,index)=>(
            <li key={index}>
                <strong>{key}:</strong> {data[key].toString()}
            </li>
        ))

    }

  return (
    <div className="PropertyStepFormStep8">
        <h2>Step 8: Review and Submit</h2>
        <h3>Property for {context.property.rental?<span>Rent</span>:<span>Sale</span>}</h3>
        <PropertyDetailsTable parent="stepForm"/>
        {type==='upload'?<button onClick={()=>{context.uploadProperty()}}>Upload Property</button>
             : <button onClick={()=>{context.updateProperty()}}>Update Property</button>}
    </div>
  )
}

export default PropertyStepFormStep9

