import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Heart, Users, Map } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FoodListingCard from '../components/common/FoodListingCard';
import ImpactReportCard from '../components/common/ImpactReportCard';
import { useFood } from '../context/FoodContext';
import { useDonation } from '../context/DonationContext';
import ImpactSection from '../components/sections/ImpactSection';
import DonateSection from '../components/sections/DonateSection';
import ContactSection from '../components/sections/ContactSection';
//import CircularGallery from '../components/common/CircularGallery';
// import { useNotification } from '../components/common/NotificationContext';
// import { FoodType, FoodUnit } from '../components/common/food';






const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { foodListings } = useFood();
  const { impactReports } = useDonation();

  // Take only the most recent listings and reports
  const recentListings = foodListings
    .filter(listing => listing.status === 'available')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const recentReports = impactReports
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-r from-[#2F2F2F]/90 to-[#2F2F2F]/90">
  <div className="absolute inset-0 z-0">
          <img
            src= "https://media.istockphoto.com/id/619643870/photo/hungry-african-children-asking-for-food-africa.jpg?s=612x612&w=0&k=20&c=HuSbhCK-BNFVSQsVfSa63gehixkKAfRak2HmQYw7mhY="
            alt="Food donation"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 pt-24 z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              A plate for every hand
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white mb-8"
            >
              Turning surplus into smiles, and waste into hope.<br />
              With AI-powered connections, Plateful feeds lives —
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="btn btn-primary">
                    Join Now
                  </Link>
                  <Link to="/about" className="btn btn-outline bg-white/20 text-white hover:bg-white/30">
                    Learn More
                  </Link>
                </>
              ) : (
                <>
                  {/*<Link to="/map" className="btn btn-primary">
                    <Map size={18} className="mr-2" />
                    View Map
                  </Link>*/}
                  <Link to="/about" className="btn btn-outline bg-white/20 text-white hover:bg-white/30">
                    <Users size={18} className="mr-2" />
                    About Us
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Plateful Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <ChefHat size={30} className="text-secondary-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plate Givers</h3>
              <p className="text-gray-600">
                Restaurants, grocery stores, and cafes list their excess food, which would otherwise go to waste.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <Heart size={30} className="text-primary-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plate Sharers</h3>
              <p className="text-gray-600">
                NGOs and community organizations find and request available food through our interactive map.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="card text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Users size={30} className="text-yellow-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Donors</h3>
              <p className="text-gray-600">
                Support verified NGOs financially and track exactly how your contributions help through transparent reporting.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* the problem */}
      


      {recentListings.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Recent Food Listings</h2>
              <Link to="/map" className="text-primary-500 hover:text-primary-600 font-medium">
                View All →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.map(listing => (
                <FoodListingCard key={listing.id} listing={listing} showRequest={false} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Impact Section */}
      <ImpactSection />
      
      {/* Recent Impact Reports */}
      {recentReports.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Recent Impact</h2>
              <Link to="/impact" className="text-primary-500 hover:text-primary-600 font-medium">
                See All Impact →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentReports.map(report => (
                <ImpactReportCard key={report.id} report={report} />
              ))}*
              
            </div>
          </div>
        </section>
      )}

      {/* Donate Section */}
      <DonateSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Call to Action */}
      <section className="py-20 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community today and help create a world where food waste is minimized and hunger is reduced.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn bg-white text-primary-500 hover:bg-gray-100">
                Sign Up Now
              </Link>
              <Link to="/login" className="btn bg-transparent border border-white text-white hover:bg-white/10">
                Log In
              </Link>
            </div>
          ) : (
            <Link to="/map" className="btn bg-white text-primary-500 hover:bg-gray-100">
              Go to Food Map
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;