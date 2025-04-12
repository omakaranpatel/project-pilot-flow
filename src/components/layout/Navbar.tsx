
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b border-border">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold">P</span>
          </div>
          <h1 className="text-xl font-bold">ProjectPilot</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/calendar">
            <Button variant="ghost">Calendar</Button>
          </Link>
          <Link to="/project/new">
            <Button className="gap-2">
              <PlusCircle size={16} />
              <span>New Project</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
