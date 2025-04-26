import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDonation } from '../../context/DonationContext';
import { useAuth } from '../../context/AuthContext';

interface DonationFormProps {
  sharerId: string;
  sharerName: string;
  onSuccess?: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ sharerId, sharerName, onSuccess }) => {
  const [amount, setAmount] = useState<number>(500);
  const [recurring, setRecurring] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { addDonation } = useDonation();
  const { currentUser } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      addDonation({
        donorId: currentUser.id,
        sharerId,
        sharerName,
        amount,
        recurring
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form
      setAmount(500);
      setRecurring(false);
    } catch (error) {
      console.error('Error making donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetAmounts = [100, 500, 1000, 5000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <h3 className="text-xl font-semibold mb-4">Donate to {sharerName}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Donation Amount (₹)
          </label>
          
          <div className="grid grid-cols-4 gap-2 mb-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                className={`py-2 px-4 text-sm rounded-md ${
                  amount === preset
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setAmount(preset)}
              >
                ₹{preset}
              </button>
            ))}
          </div>
          
          <input
            type="number"
            id="amount"
            min="10"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full input"
          />
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="h-4 w-4 text-primary-500 focus:ring-primary-500 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Make this a monthly donation</span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || amount <= 0}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'Processing...' : `Donate ₹${amount}`}
        </button>
      </form>
    </motion.div>
  );
};

export default DonationForm;