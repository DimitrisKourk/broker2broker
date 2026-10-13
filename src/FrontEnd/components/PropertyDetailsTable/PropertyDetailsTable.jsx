import { UsePropertyDetails } from "../PropertyDetailsContext/PropertyDetailsContext";
import { UsePropertyStepForm } from "../PropertyStepFormContext/PropertyStepFormContext";
import "./PropertyDetailsTable.css"

function PropertyDetailsTable({parent}) {
    let context;

    if(parent==="stepForm") {
        context=UsePropertyStepForm();
    }
    else {
        context=UsePropertyDetails();
    }
    
    const handlePriceperSQM=()=>{
        if(context.property?.price|| context.property?.square_meters || context.property.price===0 || context.property.square_meters===0) return 0;
        else return (context.property.price/context.property.square_meters).toFixed(2);
    }
  return (
        <div className="table-wrapper">
            <table className="spec-table">
                <caption>Property Details</caption>
                <tbody>
                    <tr className="spec-category">
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Price</td>
                        <td className="spec-value">{context.property.price||0}€</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Price per sqm</td>
                        <td className="spec-value">{handlePriceperSQM()||0}€</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Property State</td>
                        <td className="spec-value">{context.property.property_state||'Not Defined'}</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Construction Year</td>
                        <td className="spec-value">{context.property.construction_date||'Not Defined'}</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Square Meters</td>
                        <td className="spec-value">{context.property.square_meters||0} m&#178;</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Floor</td>
                        <td className="spec-value">{context.property.floor||0}</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Elevator</td>
                        <td className="spec-value">{context.property.elevator?'Yes':'No'}</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Bedrooms</td>
                        <td className="spec-value">{context.property.beds||0}</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Bathrooms</td>
                        <td className="spec-value">{context.property.baths||0}</td>
                    </tr>
                    <tr>
                        <td className="spec-feature">Balcony</td>
                        <td className="spec-value">{context.property.balcony?'Yes':'No'}</td>
                    </tr>
                    {context.property.balcony?
                        <tr>
                            <td className="spec-feature">Balcony Square Meters</td>
                            <td className="spec-value">{context.property.balcony_square_meters||0}</td>
                        </tr>
                        :null
                    }
                    <tr>
                        <td className="spec-feature">Parking Space</td>
                        <td className="spec-value">{context.property.parking_space||0}</td>
                    </tr>
                    {context.property?.property_orientation?
                        <tr>
                            <td className="spec-feature">Orientation</td>
                            <td className="spec-value">{context.property.property_orientation||'Not Defined'}</td>
                        </tr>
                        :null
                    }
                    
                    {context.property?.heating_type ?
                        <tr>
                            <td className="spec-feature">Heating Type</td>
                            <td className="spec-value">{context.property.heating_type}</td>
                        </tr>
                        :null
                    }
                    {context.property?.heating_type && context.property.heating_type!=="No Heating" &&  context.property.heating_means?
                        <tr>
                            <td className="spec-feature">Heating Means</td>
                            <td className="spec-value">{context.property.heating_means||'Not Defined'}</td>
                        </tr>
                        :null
                    }
                    <tr>
                        <td className="spec-feature">Energy Class</td>
                        <td className="spec-value">{context.property.energy_class||'Not Defined'}</td>
                    </tr>
                    {("property_owner_name" in context.property )&& context.property.property_owner_name!==""?
                        <tr>
                            <td className="spec-feature">Owner's Name</td>
                            <td className="spec-value">{context.property.property_owner_name}</td>
                        </tr>
                        :null
                    }
                    {("property_owner_phone" in context.property) && context.property.property_owner_phone!==""?
                        <tr>
                            <td className="spec-feature">Owner's Phone</td>
                            <td className="spec-value">{context.property.property_owner_phone}</td>
                        </tr>
                        :null
                    }
                    
                </tbody>
            </table>
        </div>
  )
}

export default PropertyDetailsTable
