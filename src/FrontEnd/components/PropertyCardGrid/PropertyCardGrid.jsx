import PropertyCard from "../PropertyCard/PropertyCard";
import "./PropertyCardGrid.css"

function PropertyCardGrid({properties}) {
  return (
    <div className="properties-grid-wrapper">
      {properties.length===1?<h3> Found  {properties.length}  Property</h3> : <h3> Found {properties.length} Properties</h3> }
      
      <div className="property-card-grid">
        {properties.length>0 ? properties.map((propertyData)=>(<PropertyCard key={propertyData.property_id} property={propertyData}/>)):<div>No Properties Found</div>}
      </div>
    </div>
  )
}

export default PropertyCardGrid