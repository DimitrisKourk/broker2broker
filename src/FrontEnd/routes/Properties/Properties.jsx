import { Outlet } from "react-router"
import NavBarProperties from "../../components/NavBarProperties/NavBarProperties"
import NavBarHome from "../../components/NavBarHome/NavBarHome"
import './Properties.css'
function Properties() {
  return (
    <>
      <NavBarHome/>
      <main className="main">
          <div className="properties-container">
              <NavBarProperties/>    
              <Outlet/>
        </div>
      </main>
    </>
  )
}

export default Properties