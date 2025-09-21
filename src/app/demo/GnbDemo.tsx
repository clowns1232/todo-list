import { GNB } from "@/components/shared/gnb";
import React from "react";

const GnbDemo = () => {
  return (
    <div
      style={{
        background: "#000",
        width: "100%",
      }}
    >
      <GNB
        brand={{
          image: { name: "logo-doit", width: 151, height: 40, priority: true },
          href: "/",
        }}
        // ...
      />
    </div>
  );
};

export default GnbDemo;
