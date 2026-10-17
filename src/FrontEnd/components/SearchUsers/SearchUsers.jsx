import TextInputComponent from "../TextInputComponent/TextInputComponent";
import { useAssociates } from "../AssociatesContext/AssociatesContext";
import { useState } from "react";
import UserCardGrid from "../UserCardGrid/UserCardGrid";
import "./SearchUsers.css"

function SearchUsers() {
    const context=useAssociates();
    const [businessName,setBusinessName]=useState("");
    const handleBusinessNameChange=(e)=>{
        setBusinessName(e.target.value);
    }
  return (
    <div className="search-users-wrapper">
      <div className="search-users-title">Find Users:</div>
        <div className="search-bar"> 
          <TextInputComponent mode="text" label="Business Name" inputId="businessName" handler={()=>handleBusinessNameChange}/>
          <button onClick={()=>{context.searchUsers(businessName)}}>Search</button>
        </div>
        <UserCardGrid users={context.users} cardsPerRow={3}/>
    </div>
  )
}

export default SearchUsers