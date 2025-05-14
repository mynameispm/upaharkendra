
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';
import Loader from '@/components/Loader';

const Contact = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        {/* Header */}
        <div className="container mx-auto max-w-5xl mb-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions, feedback, or special requests? We'd love to hear from you. 
              Get in touch with our team and we'll respond as soon as possible.
            </p>
          </div>
        </div>
        
        {/* Contact Info & Form */}
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center mr-4">
                      <Mail className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">contact@upaharkendra.com</p>
                      <p className="text-muted-foreground">support@upaharkendra.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center mr-4">
                      <Phone className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+91 9876543210</p>
                      <p className="text-muted-foreground">+91 9876543211</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center mr-4">
                      <MapPin className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">
                        123 College Road, Campus Area, City, PIN: 123456
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center mr-4">
                      <Clock className="text-brand-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Hours of Operation</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 9:00 PM</p>
                      <p className="text-muted-foreground">Saturday - Sunday: 9:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-xl font-bold mb-4">Our Location</h2>
                <MapComponent height="250px" interactive={false} />
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message"
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-primary hover:bg-brand-accent text-white transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size="small" className="mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="container mx-auto max-w-5xl mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">What are your operating hours?</h3>
              <p className="text-muted-foreground">
                We are open from 8:00 AM to 9:00 PM on weekdays, and 9:00 AM to 8:00 PM on weekends.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">Do you offer catering services?</h3>
              <p className="text-muted-foreground">
                Yes, we offer catering for campus events. Please contact us at least 48 hours in advance with your requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">How can I provide feedback?</h3>
              <p className="text-muted-foreground">
                You can provide feedback through our contact form, or speak directly to our manager on duty.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-lg mb-2">Do you accommodate dietary restrictions?</h3>
              <p className="text-muted-foreground">
                Yes, we offer options for various dietary needs. Please mention your requirements when ordering.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
