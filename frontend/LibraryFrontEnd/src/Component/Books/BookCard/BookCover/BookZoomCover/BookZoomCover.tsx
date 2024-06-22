import React, { useState } from 'react'

type BookImage = {
  imageUrl?: string;
  zoom: string
}

export const BookZoomCover = ({imageUrl,zoom}:BookImage) => {
  const [imageZoom, setImageZoom] = useState<string>(zoom);
  const toggleZoomImage = () => {
    imageZoom === "zoomOut" ? setImageZoom("zoomIn") : setImageZoom("zoomOut");
  };

  return (
    <div>
      <img
            src={imageUrl && `${imageUrl}`}
            className={`boocard__Image-${imageZoom} boocard__Image`}
            alt="bookImage"
            width="576px"
            height="652px"
            onClick={toggleZoomImage}
          />
    </div>
  )
}
