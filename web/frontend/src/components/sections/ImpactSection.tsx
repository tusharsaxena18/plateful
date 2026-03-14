import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Users, Heart } from 'lucide-react';

import SpotlightCard from '../common/spotlightcard';


const ImpactSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          At Plateful, we envision a world where no meal goes to waste and no person goes hungry.
We strive to bridge the gap between excess and need by leveraging technology and community power.
Our platform connects food donors with NGOs in real time, ensuring that surplus food finds its way to those who need it most — efficiently, responsibly, and sustainably.
With AI at our core, we aim to revolutionize food redistribution, reduce environmental impact, and build a future where sharing a plate means changing a life.


          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 165, 0, 0.2)"  >
  

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <Utensils size={32} className="text-primary-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-primary-500 mb-2">15,000+</h3>
            <p className="text-gray-600">Meals Distributed</p>
          </motion.div>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 255, 0, 0.2)">
  

         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-secondary-100 flex items-center justify-center">
                <Users size={32} className="text-secondary-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-secondary-500 mb-2">5,000+</h3>
            <p className="text-gray-600">People Impacted</p>
          </motion.div>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 0, 0.2)">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <Heart size={32} className="text-yellow-500" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-yellow-500 mb-2">50+</h3>
            <p className="text-gray-600">Partner Organizations</p>
          </motion.div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;