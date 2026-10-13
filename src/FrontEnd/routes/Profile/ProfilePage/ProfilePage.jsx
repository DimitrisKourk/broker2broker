import { useEffect } from "react";
import { useAuth } from "../../../components/AuthContext/AuthContext"
import { useProfile } from "../../../components/UserProfileContext/UserProfileContext";
import { useParams } from "react-router";
import AssociationStatus from "../../../components/AssociationStatus/AssociationStatus";
import ProfileSettingsButtonModal from "../../../components/ProfileSettingsButtonModal/ProfileSettingsButtonModal";
import "./ProfilePage.css"
import PropertiesCounter from "../../../components/PropertiesCounter/PropertiesCounter";
import PropertyCardGrid from "../../../components/PropertyCardGrid/PropertyCardGrid";
import ProfilePicture from "../../../components/ProfilePicture/ProfilePicture";
function MyProfilePage() {
    const auth=useAuth();
    const context=useProfile();
    const {user}=useParams();
    useEffect(()=>{
        context.getUserData(user,false)
    },[])

  return (
    <div className="my-profile-page">
        {context.user.user_id ? 
            <div>
                <div className="profile-page-business-name">{context.user.business_name}</div>
                <div className="profile-page-name">{context.user.name} {context.user.surname}</div>
                <div className="profile-page-area">{context.user.area_of_operation}</div>
                <PropertiesCounter  userId={context.user.user_id} totalCounter={true} forSaleCounter={true} rentalsCounter={true}/>
                {auth.user.username!==user?<AssociationStatus/>:null}
                <ProfileSettingsButtonModal/>
            </div>
        :<h2>404 PAGE NOT FOUND</h2>}
        
    </div>

  )
}

function ProfilePage() {
    const auth=useAuth();
    const context=useProfile();
    const {user}=useParams();
    useEffect(()=>{
        context.getUserData(user,true);
    },[])

  return (
    <div className="profile-page">
        {context.user.user_id? 
            <>
                <div className="profile-top-wrapper">
                    <ProfilePicture userId={context.user.user_id}/>
                    <div className="user-details">
                        <div className="profile-page-business-name">{context.user.business_name}</div>
                        <div className="profile-page-name">{context.user.name} {context.user.surname}</div>
                        <div className="profile-page-area">{context.user.area_of_operation}</div>
                    </div>
                </div>
                <PropertiesCounter userId={context.user.user_id} totalCounter={true} forSaleCounter={true} rentalsCounter={true}/>
                {auth.user.username!==user?<AssociationStatus/>:null}
                <h3>User Properties</h3>
                <PropertyCardGrid properties={context.properties}/>
            </>
        :<h2>404 PAGE NOT FOUND</h2>}
        
        
    </div>

  )
}

export  {MyProfilePage,ProfilePage}