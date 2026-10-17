import TableComponent from "../TableComponent/TableComponent";
import { UseRegistrationRequests } from "../RegistrationRequestsContext/RegistrationRequestsContext";
function RegistrationRequestsTable() {
    const context=UseRegistrationRequests();   
    

    const  handleCategoryChangePending= ()=> {
        context.setUrl('/api/user/admin/pending-registration-requests');
        context.setCategory('pending')
    }
    const  handleCategoryChangeApproved= ()=> {
        context.setUrl('/api/user/admin/approved-registration-requests');
        context.setCategory('approved')
    }
    const  handleCategoryChangeDeclined= ()=> {
        context.setUrl('/api/user/admin/declined-registration-requests');
        context.setCategory('declined')
    }

    //{context.loading?<p>Loading...</p> : <TableComponent data={context.requests}/>}

    return (
    
        <div>
            <div>RegistrationRequests</div>
            <div>
                <button onClick={()=>handleCategoryChangePending()}>Pending Requests</button>
                <button onClick={()=>handleCategoryChangeApproved()}>Approved Requests</button>
                <button onClick={()=>handleCategoryChangeDeclined()}>Declined Requests</button>
            </div>
            <TableComponent data={context.requests}/>
            <div>

            </div>
        </div>)
}

export default RegistrationRequestsTable