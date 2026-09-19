import React from "react";

export default function Logo({ size = "default" }) {
  const sizes = {
    small: { height: "h-16", width: "w-auto", maxWidth: "max-w-[160px]" },
    default: { height: "h-20", width: "w-auto", maxWidth: "max-w-[220px]" },
    large: { height: "h-28", width: "w-auto", maxWidth: "max-w-[300px]" }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center">
      <img 
        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f88f2cb7165a70a22ee871/06da0fb10_8EC9E123-75CC-4D0D-A649-15AB24AD2065.PNG"
        alt="CrypSafe Logo"
        className={`${currentSize.height} ${currentSize.width} ${currentSize.maxWidth} object-contain brightness-110 contrast-110 rounded-2xl`}
        style={{ mixBlendMode: 'lighten' }}
      />
    </div>
  );
}