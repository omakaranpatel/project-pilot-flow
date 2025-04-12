
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t border-border mt-auto">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ProjectPilot. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link to="/calendar" className="text-sm text-muted-foreground hover:text-foreground">
              Calendar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
