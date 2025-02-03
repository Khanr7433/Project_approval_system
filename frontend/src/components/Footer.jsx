import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="dark py-4">
      <div className="container mx-auto text-center py-4">
        <p>&copy; {year} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
