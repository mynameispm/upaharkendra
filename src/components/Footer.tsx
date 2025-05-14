
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">
                UpaharKendra
              </h2>
            </Link>
            <p className="text-muted-foreground">
              Serving delicious vegetarian meals with love and care. Our mission is to provide healthy and tasty food options.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-brand-primary transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu?category=main-course" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Main Course
                </Link>
              </li>
              <li>
                <Link to="/menu?category=starters" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Starters
                </Link>
              </li>
              <li>
                <Link to="/menu?category=desserts" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Desserts
                </Link>
              </li>
              <li>
                <Link to="/menu?category=beverages" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Beverages
                </Link>
              </li>
              <li>
                <Link to="/menu?category=specials" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  Special Menu
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-brand-primary mt-1" />
                <span className="text-muted-foreground">123 College Road, Campus Area, City, PIN: 123456</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-brand-primary" />
                <span className="text-muted-foreground">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-brand-primary" />
                <span className="text-muted-foreground">contact@upaharkendra.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} UpaharKendra. All rights reserved.
            </p>
            <div className="mt-2 md:mt-0">
              <ul className="flex space-x-4 text-sm text-muted-foreground">
                <li>
                  <Link to="/privacy" className="hover:text-brand-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-brand-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="hover:text-brand-primary transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
