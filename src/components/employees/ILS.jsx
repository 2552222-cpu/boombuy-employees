import React from "react";

export default function ILS({ value, className = "", style = {} }) {
  const clean = String(value ?? "").replace(/[^\d.,-]/g, "");

  return (
    <span
      className={className}
      style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 2, direction: "ltr", ...style }}
    >
      <span>{clean}</span>
      <span>₪</span>
    </span>
  );
}