const LocalDateTimeNow=()=>{
    const date=new Date();
    const year=date.getFullYear();
    const month=date.getMonth()+1;
    const day=date.getDate();
    const hours=date.getHours();
    const minutes=date.getMinutes();
    const seconds=date.getSeconds();
    const milliseconds=date.getMilliseconds();
    const currentDate= day+'-'+month+'-'+year+'-'+hours+':'+minutes+':'+seconds;

    return currentDate; 
}

export default LocalDateTimeNow;