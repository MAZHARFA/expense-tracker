import React, { useState, useEffect } from "react";

import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { AnimatePresence, motion } from "framer-motion";

const DashboardLayout = ({ children, activeMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  return (
   
      <div className="relative min-h-screen flex flex-col bg-white text-black dark:bg-[#1a1a2e] dark:text-white transition-colors duration-300 ">
        <Navbar
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          isOpen={isMenuOpen}
        />

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              <SideMenu
                activeMenu={activeMenu}
                onClose={() => setIsMenuOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        <main className="flex-grow p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ">
          {children}
        </main>
      </div>

  );
};

export default DashboardLayout;
