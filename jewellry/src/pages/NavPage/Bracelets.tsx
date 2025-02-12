import CardBracelets from "@/components/Bracelets";
import React from "react";
import { motion } from "framer-motion";

const Bracelets: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] bg-black overflow-hidden">
        <motion.img
          src="https://www.apm.mc/cdn/shop/files/APM-Monaco-Hiver-Pave_Chain-Cuff_3d0f0a80-d0bb-4290-8f6e-12bfde950519.jpg?v=1737962444&width=1800"
          alt="Bracelets"
          className="absolute inset-0 w-full h-full object-cover opacity-65 "
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0  bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold">Bracelets</h1>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto mt-10">
        <CardBracelets />
      </div>
    </div>
  );
};

export default Bracelets;
