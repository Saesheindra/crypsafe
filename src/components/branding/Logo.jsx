import React, { useState } from "react";

export default function Logo({ size = "default" }) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    small: { height: "h-16", width: "w-auto", maxWidth: "max-w-[160px]", fontSize: "text-xl" },
    default: { height: "h-20", width: "w-auto", maxWidth: "max-w-[220px]", fontSize: "text-2xl" },
    large: { height: "h-28", width: "w-auto", maxWidth: "max-w-[300px]", fontSize: "text-3xl" }
  };

  const currentSize = sizes[size];

  if (imageError) {
    return (
      <div className="flex items-center">
        <span className={`${currentSize.fontSize} font-bold text-[#00ffc6]`}>
          CrypSafe
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <img
        src="https://i.imgur.com/JvVrBfN.png"
        alt="CrypSafe Logo"
        className={`${currentSize.height} ${currentSize.width} ${currentSize.maxWidth} object-contain brightness-110 contrast-110 rounded-2xl`}
        style={{ mixBlendMode: 'lighten' }}
        onError={() => setImageError(true)}
      />
    </div>
  );
}