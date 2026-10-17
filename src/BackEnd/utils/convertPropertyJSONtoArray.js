import { convertArrayBooltoInt } from "./convertArrayBoolToInt.js";
const convertPropertyJSONtoArray=(operation,property,userId)=>{
    
    if(operation==="create"){
        let propertyArray=['',0,0,0,'Greece','','','','','','',0,0,0,0,0,0,0,'',0,0,'','','','','','Private',userId,'','']
    
        if('property_type' in property){propertyArray[0]=property.property_type};
        if('rental' in property)(propertyArray[1]=property.rental);
        if('construction_date' in property)(propertyArray[2]=property.construction_date);
        if('kaek' in property)(propertyArray[3]=property.kaek);
        if('country' in property)(propertyArray[4]=property.country);
        if('region' in property)(propertyArray[5]=property.region);
        if('regional_unit' in property)(propertyArray[6]=property.regional_unit);
        if('municipality' in property)(propertyArray[7]=property.municipality);
        if('city' in property)(propertyArray[8]=property.city);
        if('neighborhood' in property)(propertyArray[9]=property.neighborhood);
        if('property_address' in property)(propertyArray[10]=property.property_address);
        if('square_meters' in property)(propertyArray[11]=property.square_meters);
        if('price' in property)(propertyArray[12]=property.price);
        if('floor' in property)(propertyArray[13]=property.floor);
        if('elevator' in property)(propertyArray[14]=property.elevator);
        if('beds' in property)(propertyArray[15]=property.beds);
        if('baths' in property)(propertyArray[16]=property.baths);
        if('parking_spaces' in property)(propertyArray[17]=property.parking_spaces);
        if('property_state' in property)(propertyArray[18]=property.property_state);
        if('balcony' in property)(propertyArray[19]=property.balcony);
        if('balcony_square_meters' in property)(propertyArray[20]=property.balcony_square_meters);
        if('property_orientation' in property)(propertyArray[21]=property.property_orientation);
        if('heating_type' in property)(propertyArray[22]=property.heating_type);
        if('heating_means' in property)(propertyArray[23]=property.heating_means);
        if('energy_class' in property)(propertyArray[24]=property.energy_class);
        if('description' in property)(propertyArray[25]=property.description);
        if('visibility' in property)(propertyArray[26]=property.visibility);
        //userId
        if('property_owner_name' in property)(propertyArray[28]=property.property_owner_name);
        if('property_owner_phone' in property)(propertyArray[29]=property.property_owner_phone);
        
        propertyArray=convertArrayBooltoInt(propertyArray);
        return propertyArray;
    }
    else if(operation==="update"){
        
        let propertyArray=['',0,0,0,'Greece','','','','','','',0,0,0,0,0,0,0,'',0,0,'','','','','','Private','','']
    
        if('property_type' in property){propertyArray[0]=property.property_type};
        if('rental' in property)(propertyArray[1]=property.rental);
        if('construction_date' in property)(propertyArray[2]=property.construction_date);
        if('kaek' in property)(propertyArray[3]=property.kaek);
        if('country' in property)(propertyArray[4]=property.country);
        if('region' in property)(propertyArray[5]=property.region);
        if('regional_unit' in property)(propertyArray[6]=property.regional_unit);
        if('municipality' in property)(propertyArray[7]=property.municipality);
        if('city' in property)(propertyArray[8]=property.city);
        if('neighborhood' in property)(propertyArray[9]=property.neighborhood);
        if('property_address' in property)(propertyArray[10]=property.property_address);
        if('square_meters' in property)(propertyArray[11]=property.square_meters);
        if('price' in property)(propertyArray[12]=property.price);
        if('floor' in property)(propertyArray[13]=property.floor);
        if('elevator' in property)(propertyArray[14]=property.elevator);
        if('beds' in property)(propertyArray[15]=property.beds);
        if('baths' in property)(propertyArray[16]=property.baths);
        if('parking_spaces' in property)(propertyArray[17]=property.parking_spaces);
        if('property_state' in property)(propertyArray[18]=property.property_state);
        if('balcony' in property)(propertyArray[19]=property.balcony);
        if('balcony_square_meters' in property)(propertyArray[20]=property.balcony_square_meters);
        if('property_orientation' in property)(propertyArray[21]=property.property_orientation);
        if('heating_type' in property)(propertyArray[22]=property.heating_type);
        if('heating_means' in property)(propertyArray[23]=property.heating_means);
        if('energy_class' in property)(propertyArray[24]=property.energy_class);
        if('description' in property)(propertyArray[25]=property.description);
        if('visibility' in property)(propertyArray[26]=property.visibility);
        if('property_owner_name' in property)(propertyArray[27]=property.property_owner_name);
        if('property_owner_phone' in property)(propertyArray[28]=property.property_owner_phone);

        propertyArray=convertArrayBooltoInt(propertyArray);
        return propertyArray;
    }
    
    
};

export {convertPropertyJSONtoArray};