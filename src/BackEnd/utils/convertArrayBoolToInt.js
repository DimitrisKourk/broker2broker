const convertArrayBooltoInt=(array)=>{
    array.forEach((item,index)=>{if(item===true){array[index]=1;}else if(item===false)array[index]=0})
    
    return array;
}

export {convertArrayBooltoInt};