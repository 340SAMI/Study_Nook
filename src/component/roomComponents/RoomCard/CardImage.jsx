"use client";
import Image from "next/image";
import { useState } from "react";

const CardImage = ({ imageURL, name }) => {
  const [imgSrc, setImgSrc] = useState(imageURL || "/placeholder.jpg");

  return (
    <Image
      src={imgSrc}
      alt={name}
      width={400}
      height={400}
      className="w-full h-40 object-cover"
      onError={() => setImgSrc("/placeholder.jpg")}
    />
  );
};

export default CardImage;