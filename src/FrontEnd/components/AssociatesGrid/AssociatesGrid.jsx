import { useEffect } from "react";
import { useAssociates } from "../AssociatesContext/AssociatesContext"
import UserCardGrid from "../UserCardGrid/UserCardGrid";
import "./AssociatesGrid.css"
function AssociatesGrid() {
    const context=useAssociates();
    useEffect(()=>{
        context.getAssociates()
        //context isn't memoized by AssociatesProvider (a new object every render), so adding it
        //here would refetch in a loop once getAssociates() sets state - fetch once on mount only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="associates-grid">
        <UserCardGrid users={context.associates} cardsPerRow={5}/>
    </div>
  )
}

export default AssociatesGrid