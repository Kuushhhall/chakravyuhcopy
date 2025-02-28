
import { Button } from "@/components/ui-custom/Button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">StudyAI</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link 
            to="/dashboard" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link 
            to="/explore" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Explore
          </Link>
          <Link 
            to="/resources" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Resources
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          
          {/* Mobile menu button */}
          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-white p-6 pb-32 animate-fade-in md:hidden">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/dashboard"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/explore"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/resources"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              to="/about"
              className="text-lg font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
