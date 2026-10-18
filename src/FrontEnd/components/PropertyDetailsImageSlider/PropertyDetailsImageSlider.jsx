import './PropertyDetailsImageSlider.css'
import Slider from "react-slick";
import { UsePropertyDetails } from '../PropertyDetailsContext/PropertyDetailsContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState,useEffect,useRef } from 'react';

function PropertyDetailsImageSlider() {

    const context=UsePropertyDetails();
    const imageAPI= import.meta.env.VITE_IMAGE_API_URL;
    
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    return (
    <div className="slider-container">
      <Slider   
            asNavFor={nav2} 
            ref={slider => (sliderRef1 = slider)} 
            arrows={false}
        >
            {context.propertyImages.map((image,index)=>
                <div className='slider-image-container' key={image.image_id}>
                    <img className='slider-image'  src={imageAPI + image.image_path} alt={`Property photo ${index+1}`} />
                </div>
            )}
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={slider => (sliderRef2 = slider)}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {context.propertyImages.map((image,index)=>
                <div key={image.image_id}>
                    <img className='small-slider-image'  src={imageAPI + image.image_path} alt={`Property photo ${index+1} thumbnail`} />
                </div>
            )}
      </Slider>
    </div>
  );

}

export default PropertyDetailsImageSlider;
