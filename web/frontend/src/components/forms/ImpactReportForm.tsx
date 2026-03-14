import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDonation } from '../../context/DonationContext';
import { useAuth } from '../../context/AuthContext';

interface ImpactReportFormProps {
  onSuccess?: () => void;
}

const ImpactReportForm: React.FC<ImpactReportFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mealsServed, setMealsServed] = useState<number>(0);
  const [peopleImpacted, setPeopleImpacted] = useState<number>(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addImpactReport } = useDonation();
  const { currentUser } = useAuth();

  const handleAddImage = () => {
    if (currentImageUrl && !imageUrls.includes(currentImageUrl)) {
      setImageUrls([...imageUrls, currentImageUrl]);
      setCurrentImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      addImpactReport({
        sharerId: currentUser.id,
        title,
        description,
        mealsServed,
        peopleImpacted,
        imageUrls
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setMealsServed(0);
      setPeopleImpacted(0);
      setImageUrls([]);
    } catch (error) {
      console.error('Error creating impact report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <h2 className="text-xl font-semibold mb-6">Create Impact Report</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Report Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full input"
            placeholder="e.g., July Food Distribution"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full input min-h-[100px]"
            placeholder="Describe the impact of your work..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mealsServed" className="block text-sm font-medium text-gray-700 mb-1">
              Meals Served
            </label>
            <input
              type="number"
              id="mealsServed"
              required
              min="0"
              value={mealsServed}
              onChange={(e) => setMealsServed(Number(e.target.value))}
              className="w-full input"
            />
          </div>
          
          <div>
            <label htmlFor="peopleImpacted" className="block text-sm font-medium text-gray-700 mb-1">
              People Impacted
            </label>
            <input
              type="number"
              id="peopleImpacted"
              required
              min="0"
              value={peopleImpacted}
              onChange={(e) => setPeopleImpacted(Number(e.target.value))}
              className="w-full input"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <div className="flex">
            <input
              type="text"
              value={currentImageUrl}
              onChange={(e) => setCurrentImageUrl(e.target.value)}
              className="w-full input"
              placeholder="Add image URL"
            />
            <button
              type="button"
              onClick={handleAddImage}
              disabled={!currentImageUrl}
              className="ml-2 btn btn-outline"
            >
              Add
            </button>
          </div>
          
          {imageUrls.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Report image ${index + 1}`}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !title || !description}
          className="btn btn-secondary w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Create Report'}
        </button>
      </form>
    </motion.div>
  );
};

export default ImpactReportForm;