
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui-custom/Card";
import { Button } from "@/components/ui-custom/Button";
import { MapPin, Mail, Phone, Clock, MessageSquare, Users, Lightbulb } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Reach out with any questions or feedback.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">General Inquiries</h3>
                  <p className="text-muted-foreground mb-4">For general questions about our platform and services</p>
                  <p className="font-medium">contact@chakravyuh.edu</p>
                  <p className="text-muted-foreground">+91 80123 45678</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Student Support</h3>
                  <p className="text-muted-foreground mb-4">For technical support and help with your account</p>
                  <p className="font-medium">support@chakravyuh.edu</p>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Partnerships</h3>
                  <p className="text-muted-foreground mb-4">For business partnerships and collaboration opportunities</p>
                  <p className="font-medium">partnerships@chakravyuh.edu</p>
                  <p className="text-muted-foreground">+91 70123 45678</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                      <h3 className="font-bold mb-2">Thank You!</h3>
                      <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone (optional)</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                          <select
                            id="subject"
                            name="subject"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={formData.subject}
                            onChange={handleChange}
                          >
                            <option value="">Select a subject</option>
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Billing Question">Billing Question</option>
                            <option value="Partnership">Partnership</option>
                            <option value="Feedback">Feedback</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      
                      <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">Headquarters</h3>
                      <p className="text-muted-foreground">
                        123 Education Lane<br />
                        Bangalore, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-primary h-5 w-5 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1">Office Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="h-[300px] overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9901012985384!2d77.59630857576306!3d12.97169221761859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1689920326252!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chakravyuh office location"
                ></iframe>
              </Card>
            </div>
          </div>
          
          <div className="bg-secondary/20 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">What are your customer support hours?</h3>
                <p className="text-muted-foreground">Our customer support team is available 24/7 to assist you with any questions or issues.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">How quickly can I expect a response?</h3>
                <p className="text-muted-foreground">We typically respond to all inquiries within 24 hours, and most technical support requests are addressed within 4 hours.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Do you offer phone support?</h3>
                <p className="text-muted-foreground">Yes, phone support is available during business hours. For after-hours support, please use our email or in-app chat support.</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">How can I report a technical issue?</h3>
                <p className="text-muted-foreground">Technical issues can be reported through the "Help" section in your account, or by emailing support@chakravyuh.edu with details of the problem.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
