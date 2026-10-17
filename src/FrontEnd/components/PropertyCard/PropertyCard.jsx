import PropertyDetailsButtonModal from '../PropertyDetailsButtonModal/PropertyDetailsButtonModal';
import UpdatePropertyButtonModal from '../UpdatePropertyButtonModal/UpdatePropertyButtonModal';
import PropertyDetailsProvider from '../PropertyDetailsContext/PropertyDetailsContext';
import PropertyStepFormProvider from '../PropertyStepFormContext/PropertyStepFormContext';
import './PropertyCard.css';
import { useAuth } from '../AuthContext/AuthContext';
import PropertyCardUploaderIcon from '../PropertyCardUploaderIcon/PropertyCardUploaderIcon';
import FavouritePropertyButton from '../FavouritePropertyButton/FavouritePropertyButton';
function PropertyCard({property}) {
    const auth=useAuth();
    
    let heroImageRef= import.meta.env.VITE_IMAGE_API_URL+property.hero_image;
  return (
    <div className="property-card"> 
        <img className='property-card-img' src={heroImageRef} alt='404 no image' />
        <div className="property-details">
            <div className='property-card-beds'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" viewBox='0 0 50 50' > <path xmlns="http://www.w3.org/2000/svg" d="M5 10C3.355469 10 2 11.355469 2 13L2 28.1875C2.003906 28.25 2.015625 28.3125 2.03125 28.375C2.03125 28.386719 2.03125 28.394531 2.03125 28.40625C1.582031 29.113281 1.214844 29.867188 0.9375 30.6875C0.316406 32.519531 0.0507813 34.621094 0 37L0 38C0 38.03125 0 38.0625 0 38.09375L0 50L7 50L7 46C7 45.167969 7.203125 44.734375 7.46875 44.46875C7.734375 44.203125 8.167969 44 9 44L41 44C41.832031 44 42.265625 44.203125 42.53125 44.46875C42.796875 44.734375 43 45.167969 43 46L43 50L50 50L50 38.15625C50.003906 38.105469 50.003906 38.050781 50 38C50 37.65625 50.007813 37.332031 50 37C49.949219 34.621094 49.683594 32.519531 49.0625 30.6875C48.785156 29.875 48.414063 29.136719 47.96875 28.4375C47.988281 28.355469 48 28.273438 48 28.1875L48 13C48 11.355469 46.644531 10 45 10 Z M 5 12L45 12C45.5625 12 46 12.4375 46 13L46 26.15625C45.753906 25.949219 45.492188 25.75 45.21875 25.5625C44.550781 25.101563 43.824219 24.671875 43 24.3125L43 20C43 19.296875 42.539063 18.75 42.03125 18.40625C41.523438 18.0625 40.902344 17.824219 40.125 17.625C38.570313 17.226563 36.386719 17 33.5 17C30.613281 17 28.429688 17.226563 26.875 17.625C26.117188 17.820313 25.5 18.042969 25 18.375C24.5 18.042969 23.882813 17.820313 23.125 17.625C21.570313 17.226563 19.386719 17 16.5 17C13.613281 17 11.429688 17.226563 9.875 17.625C9.097656 17.824219 8.476563 18.0625 7.96875 18.40625C7.460938 18.75 7 19.296875 7 20L7 24.3125C6.175781 24.671875 5.449219 25.101563 4.78125 25.5625C4.507813 25.75 4.246094 25.949219 4 26.15625L4 13C4 12.4375 4.4375 12 5 12 Z M 16.5 19C19.28125 19 21.34375 19.234375 22.625 19.5625C23.265625 19.726563 23.707031 19.925781 23.90625 20.0625C23.988281 20.117188 23.992188 20.125 24 20.125L24 22C17.425781 22.042969 12.558594 22.535156 9 23.625L9 20.125C9.007813 20.125 9.011719 20.117188 9.09375 20.0625C9.292969 19.925781 9.734375 19.726563 10.375 19.5625C11.65625 19.234375 13.71875 19 16.5 19 Z M 33.5 19C36.28125 19 38.34375 19.234375 39.625 19.5625C40.265625 19.726563 40.707031 19.925781 40.90625 20.0625C40.988281 20.117188 40.992188 20.125 41 20.125L41 23.625C37.441406 22.535156 32.574219 22.042969 26 22L26 20.125C26.007813 20.125 26.011719 20.117188 26.09375 20.0625C26.292969 19.925781 26.734375 19.726563 27.375 19.5625C28.65625 19.234375 30.71875 19 33.5 19 Z M 24.8125 24C24.917969 24.015625 25.019531 24.015625 25.125 24C25.15625 24 25.1875 24 25.21875 24C35.226563 24.015625 41.007813 25.0625 44.09375 27.1875C45.648438 28.257813 46.589844 29.585938 47.1875 31.34375C47.707031 32.875 47.917969 34.761719 47.96875 37L2.03125 37C2.082031 34.761719 2.292969 32.875 2.8125 31.34375C3.410156 29.585938 4.351563 28.257813 5.90625 27.1875C8.992188 25.058594 14.785156 24.011719 24.8125 24 Z M 2 39L48 39L48 48L45 48L45 46C45 44.832031 44.703125 43.765625 43.96875 43.03125C43.234375 42.296875 42.167969 42 41 42L9 42C7.832031 42 6.765625 42.296875 6.03125 43.03125C5.296875 43.765625 5 44.832031 5 46L5 48L2 48Z"/></svg>
                <div>{property.baths}</div>
            </div>
            <div className='property-card-baths'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" viewBox='0 0 23 23' ><path d="M23.5 13H23V4.92c.16-2.33-1-3.86-2.2-3.95a2.08 2.08 0 0 0-1.56.67 2.53 2.53 0 0 0-1-.14 4.4 4.4 0 0 0-3.11 1.6.5.5 0 0 0 0 .68l3.06 3.07a.5.5 0 0 0 .36.14.49.49 0 0 0 .32-.12 4.42 4.42 0 0 0 1.63-3.11 2.38 2.38 0 0 0-.42-1.52 1.08 1.08 0 0 1 .64-.24c.62 0 1.4 1.16 1.28 2.91V13H1.5a.5.5 0 0 0 0 1H2v2a6 6 0 0 0 5 5.93.29.29 0 0 0 0 .07v1.5a.5.5 0 0 0 1 0V22h9v1.5a.5.5 0 0 0 1 0V22a.29.29 0 0 0 0-.09A6 6 0 0 0 23 16v-2h.5a.5.5 0 0 0 0-1zm-4.93-7.21L16.2 3.42a3.27 3.27 0 0 1 2.07-.92 1.51 1.51 0 0 1 .88.2l.08.06a1.39 1.39 0 0 1 .27 1 3.32 3.32 0 0 1-.93 2.03zM22 15H7.5a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5H22a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5v-2h19z"/></svg>
                <div>{property.baths}</div>
            </div>
            <div className='property-card-sqm'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" viewBox='0 0 16 16'><path d="M7.5 1.906v.938h1v-.938zm0 1.875v.938h1V3.78h-1zm0 1.875v.938h1v-.938zM1.906 8.5h.938v-1h-.938zm1.875 0h.938v-1H3.78v1zm1.875 0h.938v-1h-.938zm2.813 0v-.031H8.5V7.53h-.031V7.5H7.53v.031H7.5v.938h.031V8.5zm.937 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zm1.875 0h.938v-1h-.938zM7.5 9.406v.938h1v-.938zm0 1.875v.938h1v-.938zm0 1.875v.938h1v-.938z"/><path d="M0 0v16h16V0zm1 1h14v14H1z"/></svg>
                <div>{property.square_meters}</div>
            </div>
        </div>
        <div className='property-actions'>
            <PropertyDetailsProvider>
                <PropertyDetailsButtonModal propertyId={property.property_id}/>
                {auth.user.user_id===property.user_id ?
                        <PropertyStepFormProvider>
                    <UpdatePropertyButtonModal propertyId={property.property_id}/>
                    </PropertyStepFormProvider>
                :<PropertyCardUploaderIcon userId={property.user_id} username={property.uploader_username}/>}
            </PropertyDetailsProvider>
            {auth.user.user_id===property.user_id ? null:<FavouritePropertyButton propertyId={property.property_id}/>}
            
        </div>
    </div>
  )
}

export default PropertyCard