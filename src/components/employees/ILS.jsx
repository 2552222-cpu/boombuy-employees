import React from "react";

export default function ILS({ value, className = "", style = {} }) {
  const clean = String(value ?? "").replace(/[^\d.,-]/g, "");
  return (
    <span className={className} style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline", gap: 3, whiteSpace: "nowrap", ...style }}>
      <span>{clean}</span>
      <span style={{ fontSize: "0.8em", fontWeight: "inherit" }}>₪</span>
    </span>
  );
}