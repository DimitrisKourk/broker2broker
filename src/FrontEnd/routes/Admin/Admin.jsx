import { Outlet } from "react-router"
import NavBarAdmin from "../../components/NavBarAdmin/NavBarAdmin"
import NavBarHome from "../../components/NavBarHome/NavBarHome"
import './Admin.css'
export function AdminLayout() {
  return (
    <>
    <NavBarHome/>
    <div className="main">
    <div className="admin-container">
        <NavBarAdmin/>
        <div className="admin-content">
            <Outlet/>
        </div>
    </div>
    </div>
    </>
  )
}
