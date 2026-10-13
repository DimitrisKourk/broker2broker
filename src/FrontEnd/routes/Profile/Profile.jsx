import { Outlet } from "react-router"
import NavBarProfile from "../../components/NavBarProfile/NavBarProfile"
import NavBarHome from "../../components/NavBarHome/NavBarHome"
import UserProfileProvider from "../../components/UserProfileContext/UserProfileContext"
import './Profile.css'
export function MyProfile() {
  return (
    <>
    <NavBarHome/>
    <div className="main">
    <div className="profile-container">    
        <UserProfileProvider>
          <NavBarProfile/>
          <Outlet/>
        </UserProfileProvider>
    </div>
    </div>
    </>
  )
}

export function UserProfile() {
  return (
    <>
    <NavBarHome/>
    <div className="main">
    <div className="profile-container">
        <UserProfileProvider>
          <Outlet/>
        </UserProfileProvider>
        
    </div>
    </div>
    </>
  )
}