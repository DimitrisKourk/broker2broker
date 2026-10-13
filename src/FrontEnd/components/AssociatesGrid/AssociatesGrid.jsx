import { useEffect } from "react";
import { useAssociates } from "../AssociatesContext/AssociatesContext"
import UserCardGrid from "../UserCardGrid/UserCardGrid";
import "./AssociatesGrid.css"
function AssociatesGrid() {
    const context=useAssociates();
    useEffect(()=>{
      
        context.getAssociates()
    },[])
  return (
    <div className="associates-grid">
        <UserCardGrid users={context.associates} cardsPerRow={5}/>
    </div>
  )
}

export default AssociatesGrid