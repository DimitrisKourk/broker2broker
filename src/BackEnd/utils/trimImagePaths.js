
const trimImagePaths=(pathsArray,seperator)=>{
    let trimmedArray=[];
    for(let path of pathsArray){
        trimmedArray.push(path.split(seperator)[1]);
    }
    console.log(trimmedArray);
    return trimmedArray;
}

export {trimImagePaths};