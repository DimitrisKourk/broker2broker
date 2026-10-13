
const UploadImagePreviewContainer = ({images,imageSize,Ratio}) => {
  const createImagePreviewURL=(image)=>{
    return URL.createObjectURL(image);
  }
  const imageStyle={
    width:imageSize,
    aspectRatio:Ratio,
    objectFit:"cover",
    borderRadius:"1rem"
  };

  return (
    <>
        {images.length>0 && images.map(image=><img src={createImagePreviewURL(image)} key={image.name} alt="404" style={imageStyle} />)
                         }
    </>
  )
}

export default UploadImagePreviewContainer
//images.map(image=>{<img src={URL.createObjectURL(image)} alt="404" width={100} height={100}/>}) 

