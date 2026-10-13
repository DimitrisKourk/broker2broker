import './SubscriptionPlanCard.css'
import { useNavigate } from 'react-router'
function SubscriptionPlanCard({title,benefits,price,targetGroup}) {
    const navigate=useNavigate();
    
    const handleBuyPlanClick=(e)=>{
        let url='/buy-plan/'+ e.target.id;
        navigate(url)
    }

  return (
    <div className={title+' plan-card-wrapper'}>
        <div className='plan-card'>
            <div className='plan-title'>
                {title}
            </div>
            <div className="plan-target-group">
                {targetGroup}
            </div>
            <div className="plan-price">
                {price}
            </div>
            <div className='plan-benefits'>
                {benefits.map((element,i) => {return <div key={i} className='benefit'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>
                    {element}</div>})}
            </div>
            <div className='learn-more-button'>
                <a href={'#'+title+'-details'}>Learn More</a>
            </div>
        </div>
        <div className='buy-button' id={title} onClick={handleBuyPlanClick}>
            I Want It
        </div>
    </div>
  )
}

export default SubscriptionPlanCard  