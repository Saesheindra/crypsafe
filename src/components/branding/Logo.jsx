import React, { useState } from "react";

export default function Logo({ size = "default" }) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    small: { height: "h-12", width: "w-auto", maxWidth: "max-w-[120px]", fontSize: "text-xl" },
    default: { height: "h-14", width: "w-auto", maxWidth: "max-w-[140px]", fontSize: "text-2xl" },
    large: { height: "h-20", width: "w-auto", maxWidth: "max-w-[200px]", fontSize: "text-3xl" }
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
        src="/logo.jpg"
        alt="CrypSafe Logo"
        className={`${currentSize.height} ${currentSize.width} ${currentSize.maxWidth} object-contain rounded-lg`}
        onError={() => setImageError(true)}
      />
    </div>
  );
}