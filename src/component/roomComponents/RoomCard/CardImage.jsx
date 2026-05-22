"use client";
import Image from "next/image";
import { useState } from "react";

const CardImage = ({ imageURL, name }) => {

  return (
    <Image
      src={imageURL || "https://placehold.co/600x400/12141A/5A6080?text=No+Image"}
      alt={name}
      width={600}
      height={600}
      className="w-full h-60 object-cover"
      onError={(e) => {e.target.src="https://placehold.co/600x400/12141A/5A6080?text=No+Image"}}
    />
  );
};

export default CardImage;