import { useAuth } from "../AuthContext/AuthContext"
import SubscriptionPlanCard from "../SubscriptionPlanCard/SubscriptionPlanCard";
import './SubscriptionPlans.css'
function SubscriptionPlans() {
    const auth=useAuth();

  return (
    <div className="subscriptions-pricing">
        <div className="subscription-plans-wrapper">
        <SubscriptionPlanCard title={'Basic'} price={10} targetGroup={'New Brokers,Small Businesses'} benefits={['Access properties in 1 REGIONAL UNIT','Save Favourite Properties','Unlimited Associates']}/>
        <SubscriptionPlanCard title={'Standard'} price={20} targetGroup={'Established Brokers, Local Real Estate Businesses'} benefits={['Access properties in 1 REGION','Can Unlock Access to Multiple Regions','Access All Public Properties','Save Favourite Properties','Unlimited Associates']}/>
        <SubscriptionPlanCard title={'Unlimited'} price={35} targetGroup={'Big Brokers, Larger Real Estate Companies'} benefits={['Access ALL Properties','2 Free Property Boosts/month']}/>
        <SubscriptionPlanCard title={'Enterprise'} price={'Contact Us'} targetGroup={'Large Real Estate Companies'} benefits={['Everything from Unlimited', '1 Administrator account','Limited Access accounts for employees']}/>
        </div>
        <div className='plan-details'>
            <div id="Basic-details">Basic-details</div>    
            <div id="Standard-details">Standard-details</div>    
            <div id="Unlimited-details">Unlimited-details</div>    
            <div id="Enterprise-details">Enterprise-details</div>     
        </div> 
    </div>  
  )
}

export default SubscriptionPlans