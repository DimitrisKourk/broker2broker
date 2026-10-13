import RegistrationRequestsProvider from "../RegistrationRequestsContext/RegistrationRequestsContext"
import RegistrationRequestsTable from "../RegistrationRequestsTable/RegistrationRequestsTable"

function RegistrationRequests() {
    return (
    <RegistrationRequestsProvider>
        <RegistrationRequestsTable/>
    </RegistrationRequestsProvider>)
}

export default RegistrationRequests


