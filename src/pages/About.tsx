
import { Link } from 'react-router-dom';
import { Award, Clock, Smile, Utensils, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative">
          <div className="h-64 md:h-96 w-full bg-gradient-to-r from-brand-primary to-brand-accent opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">About UpaharKendra</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Serving delicious vegetarian meals to the campus community since 2010
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  UpaharKendra began as a small campus canteen with a vision to provide students and staff with nutritious, 
                  delicious vegetarian food at affordable prices. What started as a humble initiative has now grown 
                  into the most beloved food service on campus.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our commitment to quality ingredients, authentic recipes, and excellent service has made us 
                  the go-to place for students and faculty alike. We take pride in our extensive menu that caters 
                  to diverse tastes and dietary preferences.
                </p>
                <p className="text-muted-foreground">
                  With the introduction of our digital ordering system, we've now made it even easier for the 
                  campus community to enjoy their favorite meals without the long waiting lines.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
                  alt="UpaharKendra Restaurant" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At UpaharKendra, our mission is to nourish the campus community with delicious, wholesome vegetarian food
              that brings people together. We believe in the power of good food to fuel academic success and create memorable experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-brand-primary" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Healthy Food</h3>
                <p className="text-muted-foreground">
                  We prioritize nutrition without compromising on taste.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Smile className="text-brand-primary" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Happy Community</h3>
                <p className="text-muted-foreground">
                  We aim to create a welcoming space for everyone on campus.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="text-brand-primary" size={24} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Service</h3>
                <p className="text-muted-foreground">
                  We're committed to excellence in every aspect of our service.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground mb-10 text-center max-w-3xl mx-auto">
              Behind every delicious meal is our dedicated team of food enthusiasts who bring their passion, 
              expertise, and creativity to UpaharKendra every day.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-48 w-48 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4 text-white text-6xl font-bold">
                  ॐ
                </div>
                <h3 className="font-semibold text-lg">Phaneendra</h3>
                <p className="text-brand-primary">Founder</p>
              </div>
              <div className="text-center">
                <div className="h-48 w-48 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-4 text-white text-6xl font-bold">
                  🪷
                </div>
                <h3 className="font-semibold text-lg">Manasa</h3>
                <p className="text-brand-primary">Co-Founder</p>
              </div>
              <div className="text-center">
                <div className="h-48 w-48 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 text-white text-6xl font-bold">
                  🕉️
                </div>
                <h3 className="font-semibold text-lg">Deepika</h3>
                <p className="text-brand-primary">Co-Founder</p>
              </div>
              <div className="text-center">
                <div className="h-48 w-48 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-4 text-white text-6xl font-bold">
                  त्रि
                </div>
                <h3 className="font-semibold text-lg">Dinesh</h3>
                <p className="text-brand-primary">Co-Founder</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Choose UpaharKendra?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Utensils className="text-brand-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">100% Vegetarian</h3>
                  <p className="text-muted-foreground">
                    We specialize exclusively in vegetarian cuisine, ensuring the highest standards of vegetarian food preparation.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Award className="text-brand-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Quality Ingredients</h3>
                  <p className="text-muted-foreground">
                    We source the freshest ingredients to ensure every dish is nutritious and delicious.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Clock className="text-brand-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fast Service</h3>
                  <p className="text-muted-foreground">
                    Our digital ordering system minimizes wait times, allowing you to get your meals quickly.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Smile className="text-brand-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
                  <p className="text-muted-foreground">
                    We value your feedback and continuously strive to improve our service based on your suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Taste Our Delights?</h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-8">
                Whether you're in the mood for a quick snack or a hearty meal, UpaharKendra has something for everyone.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-brand-primary hover:bg-white/90">
                  <Link to="/menu">Explore Our Menu</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
