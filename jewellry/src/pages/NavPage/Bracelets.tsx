// pages/NavPage/Bracelets.tsx
import CardBracelets from "@/components/Bracelets";
import React from "react";

const Bracelets: React.FC = () => {
  return (
    <div>
      <h1>Bracelets Collection</h1>
      <p>Explore our exclusive bracelets collection.</p>
      <CardBracelets/>
    </div>
  );
};

export default Bracelets;
