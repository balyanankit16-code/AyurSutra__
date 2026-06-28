import React from "react";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-gray-200 py-6">
      <div className="text-center text-emerald-300 text-sm max-w-2xl mx-auto">
        © {new Date().getFullYear()} AyurSutra Panchakarma Center. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;