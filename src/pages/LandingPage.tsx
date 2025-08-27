import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Phone, Mail, Calendar, ChevronDown, Star, Camera, MessageCircle, Share2, Plus, Minus, ExternalLink } from 'lucide-react';

interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  attendees: number;
  accessibility: string;
  mealPreference: string;
  beveragePreference: string;
}

function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    attendees: 1,
    accessibility: '',
    mealPreference: '',
    beveragePreference: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Event date: March 15, 2025, 10:00 AM
  const eventDate = new Date('2025-03-15T10:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save registration data to localStorage (in real app, this would go to a database)
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const newRegistration = {
      ...registrationData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      confirmationId: `AF2025-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    registrations.push(newRegistration);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    setIsSubmitted(true);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-xl text-green-800">Aris Farm</div>
          <div className="flex space-x-6">
            <a href="#event" className="text-green-700 hover:text-green-900">Event Details</a>
            <a href="#registration" className="text-green-700 hover:text-green-900">RSVP</a>
            <a href="/drinks" className="text-green-700 hover:text-green-900 flex items-center">
              Drinks Menu <ExternalLink className="w-4 h-4 ml-1" />
            </a>
            <a href="/admin" className="text-gray-500 hover:text-gray-700 text-sm">Admin</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-green-600 to-yellow-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="relative z-10 flex items-center justify-center h-full px-4 pt-16">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Grand Opening of
              <span className="block text-yellow-400 mt-2">Aris Farm</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Growing Together in Namibia's Heart
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="font-semibold">March 15, 2025</p>
                <p className="text-sm">Saturday, 10:00 AM</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="font-semibold">Aris Farm</p>
                <p className="text-sm">Windhoek District, Namibia</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="font-semibold">Community Event</p>
                <p className="text-sm">All Welcome</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('registration')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                RSVP Now
              </button>
              <a 
                href="/drinks"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 hover:scale-105 shadow-2xl inline-flex items-center justify-center"
              >
                View Drinks Menu
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Event Information */}
      <section id="event" className="py-16 bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to Our Family</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Join us for a celebration of growth, community, and the rich agricultural heritage of Namibia. 
              The Aris family invites you to witness the culmination of years of dedication and hard work 
              as we officially open our farm to the community.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-center text-green-800 mb-6">Event Countdown</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="bg-green-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-800">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-center text-green-800 mb-8">Event Schedule</h3>
            <div className="space-y-6">
              {[
                { time: '10:00 AM', activity: 'Welcome & Registration', description: 'Traditional Namibian coffee and pastries' },
                { time: '10:30 AM', activity: 'Opening Ceremony', description: 'Welcome speeches and blessing of the farm' },
                { time: '11:00 AM', activity: 'Guided Farm Tours', description: 'Explore our sustainable farming practices' },
                { time: '12:30 PM', activity: 'Traditional Braai', description: 'Authentic Namibian BBQ and local delicacies' },
                { time: '2:00 PM', activity: 'Cultural Performances', description: 'Traditional music and dance' },
                { time: '3:00 PM', activity: 'Children\'s Activities', description: 'Farm animal encounters and games' },
                { time: '4:00 PM', activity: 'Community Celebration', description: 'Music, dancing, and fellowship' },
                { time: '6:00 PM', activity: 'Sunset Gathering', description: 'Closing remarks and group photos' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold text-sm">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800">{item.activity}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Event Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="w-12 h-12 text-yellow-600" />,
                title: 'Farm Tours',
                description: 'Guided walks through our sustainable farming operations'
              },
              {
                icon: <Star className="w-12 h-12 text-yellow-600" />,
                title: 'Cultural Show',
                description: 'Traditional Namibian music and dance performances'
              },
              {
                icon: <Users className="w-12 h-12 text-yellow-600" />,
                title: 'Traditional Braai',
                description: 'Authentic Namibian BBQ with local specialties'
              },
              {
                icon: <Plus className="w-12 h-12 text-yellow-600" />,
                title: 'Family Fun',
                description: 'Activities for children and interactive experiences'
              }
            ].map((highlight, index) => (
              <div key={index} className="text-center bg-green-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{highlight.icon}</div>
                <h3 className="font-bold text-green-800 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration" className="py-16 bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Reserve Your Spot</h2>
                <form onSubmit={handleRegistration} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={registrationData.fullName}
                        onChange={(e) => setRegistrationData({...registrationData, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone/WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={registrationData.phone}
                        onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Attendees</label>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setRegistrationData({...registrationData, attendees: Math.max(1, registrationData.attendees - 1)})}
                          className="p-2 bg-green-100 rounded-lg hover:bg-green-200"
                        >
                          <Minus className="w-4 h-4 text-green-800" />
                        </button>
                        <span className="px-4 py-2 bg-gray-100 rounded-lg font-semibold">{registrationData.attendees}</span>
                        <button
                          type="button"
                          onClick={() => setRegistrationData({...registrationData, attendees: registrationData.attendees + 1})}
                          className="p-2 bg-green-100 rounded-lg hover:bg-green-200"
                        >
                          <Plus className="w-4 h-4 text-green-800" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meal Preference</label>
                    <select
                      value={registrationData.mealPreference}
                      onChange={(e) => setRegistrationData({...registrationData, mealPreference: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select preference</option>
                      <option value="braai">Traditional Braai/Meat</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="namibian">Traditional Namibian (Kapana, Mahangu)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Beverage Preference</label>
                    <select
                      value={registrationData.beveragePreference}
                      onChange={(e) => setRegistrationData({...registrationData, beveragePreference: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select preference</option>
                      <option value="soft">Soft Drinks</option>
                      <option value="beer">Beer</option>
                      <option value="wine">Wine</option>
                      <option value="traditional">Traditional Brews</option>
                      <option value="all">All Options</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requirements</label>
                    <textarea
                      value={registrationData.accessibility}
                      onChange={(e) => setRegistrationData({...registrationData, accessibility: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Any accessibility needs, dietary restrictions, or special requests..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105"
                  >
                    Confirm Registration
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-green-800 mb-4">Registration Confirmed!</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Thank you for registering! We've sent a confirmation with your QR code ticket to your email and WhatsApp.
                </p>
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-green-800">Confirmation ID: AF2025-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  <p className="text-sm text-gray-600 mt-2">Save this ID for event check-in</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                    Add to Calendar
                  </button>
                  <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600">
                    Share Event
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Aris Farm</h3>
              <p className="text-green-200">Growing together in Namibia's heart</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Information</h4>
              <div className="space-y-2 text-green-200">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+264 81 123 4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@arisfarm.na</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: +264 81 123 4567</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-green-200">
                <div><a href="/drinks" className="hover:text-white">Drinks Menu</a></div>
                <div><a href="#registration" className="hover:text-white">RSVP</a></div>
                <div><a href="/admin" className="hover:text-white">Admin Login</a></div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>&copy; 2025 Aris Farm. All rights reserved. | Growing sustainable communities in Namibia</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/26481234567"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}

export default LandingPage;