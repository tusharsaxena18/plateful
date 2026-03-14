import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, CreditCard, TrendingUp } from 'lucide-react';

const DonateSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Support Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your donation helps us connect more food providers with NGOs, ensuring that surplus food reaches those who need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <Gift size={24} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold">One-time Donation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Make a single donation to support our food distribution efforts and help feed families in need.
            </p>
            <Link to="/register" className="btn btn-primary w-full">
              Donate Now
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
                <CreditCard size={24} className="text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold">Monthly Support</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Become a regular supporter and help us create sustainable impact through monthly donations.
            </p>
            <Link to="/register" className="btn btn-secondary w-full">
              Subscribe Monthly
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                <TrendingUp size={24} className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold">Track Impact</h3>
            </div>
            <p className="text-gray-600 mb-6">
              See exactly how your donations are making a difference with our transparent impact tracking.
            </p>
            <Link to="/register" className="btn btn-outline w-full">
              Learn More
            </Link>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            100% of your donation goes directly to supporting food distribution efforts.
          </p>
          <p className="text-sm text-gray-500">
            Plateful is a registered non-profit organization. All donations are tax-deductible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;