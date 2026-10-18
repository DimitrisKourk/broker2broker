import { useEffect } from "react";
import { useProfile } from "../UserProfileContext/UserProfileContext"
function AssociationStatus() {
    const context=useProfile();
    useEffect(()=>{
        context.getAssociationStatus()
        //context isn't memoized by UserProfileProvider (a new object every render), so adding it
        //here would refetch in a loop once getAssociationStatus() sets state - fetch once on mount only
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
        {context.associationStatus.associates && <h3>Associates<button onClick={()=>{context.deleteAssociation()}}>Remove</button></h3>}
        
         {(!context.associationStatus.associates && !context.associationStatus.associationRequest)
            && <button onClick={()=>{context.sendAssociationRequest()}}>Send Request</button>}
        
        {(context.associationStatus.associationRequest && context.associationStatus.userIs==='sender') && 
            <h3>request pending.... <button onClick={()=>{context.cancelAssociationRequest()}}>Cancel</button></h3>}

        {(context.associationStatus.associationRequest && context.associationStatus.userIs==='receiver') && 
            <h3>Association Request: <button onClick={()=>{context.acceptAssociationRequest()}}>Accept</button><button onClick={()=>{context.declineAssociationRequest()}}>Decline</button></h3>}
    </div>

  )
}

export default AssociationStatus