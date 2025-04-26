{/*import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFood } from '../../context/FoodContext';
import { useAuth } from '../../context/AuthContext';

interface FoodListingFormProps {
  onSuccess?: () => void;
}

const FoodListingForm: React.FC<FoodListingFormProps> = ({ onSuccess }) => {
  const [type, setType] = useState<'cooked' | 'raw'>('cooked');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addFoodListing } = useFood();
  const { currentUser } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser?.location || !currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      addFoodListing({
        giverId: currentUser.id,
        giverName: currentUser.name,
        type,
        description,
        quantity,
        expiry: new Date(expiry).toISOString(),
        location: currentUser.location
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form
      setType('cooked');
      setDescription('');
      setQuantity('');
      setExpiry('');
    } catch (error) {
      console.error('Error creating food listing:', error);
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
      <h2 className="text-xl font-semibold mb-6">Add New Food Listing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === 'cooked'}
                onChange={() => setType('cooked')}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Cooked Food</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === 'raw'}
                onChange={() => setType('raw')}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Raw Ingredients</span>
            </label>
          </div>
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
            placeholder="Describe the food you're offering..."
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full input"
            placeholder="e.g., 5kg rice, 20 meals, etc."
          />
        </div>
        
        <div>
          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date & Time
          </label>
          <input
            type="datetime-local"
            id="expiry"
            required
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full input"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !description || !quantity || !expiry}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Add Food Listing'}
        </button>
      </form>
    </motion.div>
  );
};

export default FoodListingForm;*/}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFood } from '../../context/FoodContext';
import { useAuth } from '../../context/AuthContext';

interface FoodListingFormProps {
  onSuccess?: () => void;
  id: string;
  description: string;
  type: 'cooked' | 'raw';
  quantity: string;
  expiry: string;
  giverName: string;
  giverId: string;
  location: string;
  status: 'available' | 'requested' | 'claimed';
  createdAt: string;
  image?: string;

}

const FoodListingForm: React.FC<FoodListingFormProps> = ({ onSuccess }) => {
  const [type, setType] = useState<'cooked' | 'raw'>('cooked');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addFoodListing } = useFood();
  const { currentUser } = useAuth();

  const uploadImage = async (): Promise<string | null> => {
    if (!image) return null;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.location || !currentUser) return;

    setIsSubmitting(true);

    try {
      const imageUrl = await uploadImage();

      await addFoodListing({
        giverId: currentUser.id,
        giverName: currentUser.name,
        type,
        description,
        quantity,
        expiry: new Date(expiry).toISOString(),
        location: currentUser.location,
        image: imageUrl || undefined
      });

      onSuccess?.();
      setType('cooked');
      setDescription('');
      setQuantity('');
      setExpiry('');
      setImage(null);
    } catch (error) {
      console.error('Error creating food listing:', error);
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
      <h2 className="text-xl font-semibold mb-6">Add New Food Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Food Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === 'cooked'}
                onChange={() => setType('cooked')}
                className="h-4 w-4 text-primary-500"
              />
              <span className="ml-2 text-sm">Cooked Food</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={type === 'raw'}
                onChange={() => setType('raw')}
                className="h-4 w-4 text-primary-500"
              />
              <span className="ml-2 text-sm">Raw Ingredients</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full input min-h-[100px]"
            placeholder="Describe the food..."
          />
        </div>

        {/* Quantity */}
       <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="text"
            id="quantity"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full input"
            placeholder="e.g., 5kg rice, 20 meals"
          />
        </div>

        {/* Expiry */}
        <div>
          <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date & Time</label>
          <input
            type="datetime-local"
            id="expiry"
            required
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full input"
          />
        </div>

        {/* Image Upload + Preview */}
<div>
  <label htmlFor="image" className="block text-sm font-medium mb-1">Upload Image (optional)</label>
  <input
    type="file"
    id="image"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0] || null;
      console.log("Selected file:", file);
      setImage(file);
    }}
    className="w-full"
  />

  {/* Image Preview */}
  {image && (
    <div className="mt-4">
      <img
        src={URL.createObjectURL(image)}
        alt="Selected Food"
        className="w-40 h-40 object-cover rounded"
      />
      {console.log("Preview URL:", URL.createObjectURL(image as File))}
    </div>
  )}
</div>

          {/*{image && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-4 flex justify-center"
    >
      <img
        src={URL.createObjectURL(image)}
        alt="Selected Food"
        className="w-40 h-40 object-cover rounded-lg shadow-md"
      />
      
    </motion.div>
    
    )}
    

    
  </div>*/}
 




        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !description || !quantity || !expiry}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Add Food Listing'}
        </button>
      </form>
    </motion.div>
  );
};

export default FoodListingForm;

