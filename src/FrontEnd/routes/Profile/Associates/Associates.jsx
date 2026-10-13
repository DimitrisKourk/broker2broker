import AssociatesProvider from "../../../components/AssociatesContext/AssociatesContext";
import AssociatesGrid from "../../../components/AssociatesGrid/AssociatesGrid";
import SearchUsersModalButton from "../../../components/SearchUsersModalButton/SearchUsersModalButton";
import "./Associates.css";
function Associates() {

  return (
    <div className="profile-associates">
        <AssociatesProvider>
            <SearchUsersModalButton/>
            <AssociatesGrid/>
        </AssociatesProvider>
    </div>

  )
}

export default Associates