
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' 
        : 'bg-transparent py-4'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
              UpaharKendra
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-foreground/80 hover:text-brand-primary transition-colors",
                location.pathname === "/" && "text-brand-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={cn(
                "text-foreground/80 hover:text-brand-primary transition-colors",
                location.pathname === "/menu" && "text-brand-primary font-medium"
              )}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-foreground/80 hover:text-brand-primary transition-colors",
                location.pathname === "/about" && "text-brand-primary font-medium"
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-foreground/80 hover:text-brand-primary transition-colors",
                location.pathname === "/contact" && "text-brand-primary font-medium"
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/location" 
                  className="text-foreground/80 hover:text-brand-primary p-2 rounded-full transition-colors"
                >
                  <MapPin size={20} />
                </Link>
                <Link 
                  to="/cart" 
                  className="relative p-2 text-foreground/80 hover:text-brand-primary rounded-full transition-colors"
                >
                  <ShoppingCart size={20} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User size={20} />
                  </Button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 animate-fade-in">
                    <div className="p-3 border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-foreground/60">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-muted transition-colors">
                        My Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 hover:bg-muted transition-colors">
                        My Orders
                      </Link>
                      <button 
                        onClick={logout}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-destructive"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative p-2 text-foreground/80 hover:text-brand-primary rounded-full transition-colors">
                  <ShoppingCart size={20} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
                <div className="hidden md:block">
                  <Link to="/login">
                    <Button variant="outline" className="mr-2">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background animate-slide-down">
          <div className="px-4 py-5 space-y-4">
            <Link 
              to="/" 
              className={cn(
                "block py-2 text-lg",
                location.pathname === "/" && "text-brand-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link 
              to="/menu" 
              className={cn(
                "block py-2 text-lg",
                location.pathname === "/menu" && "text-brand-primary font-medium"
              )}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "block py-2 text-lg",
                location.pathname === "/about" && "text-brand-primary font-medium"
              )}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "block py-2 text-lg",
                location.pathname === "/contact" && "text-brand-primary font-medium"
              )}
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <div className="pt-4 flex flex-col space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
